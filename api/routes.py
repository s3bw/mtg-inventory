from flask import Blueprint
from flask_restplus import Api, Resource
from flask_restplus import fields
from marshmallow import INCLUDE
from sqlalchemy import case

from .library import verify_payload
from .schemas import CardSchema, DeckSchema
from .models import db
from .models import Cards, Decks, DeckCards


routes = Blueprint("route", __name__)
api = Api(routes)

Card = {
    "id": fields.String(),
    "image_url": fields.String(),
    "name": fields.String(),
    "quantity": fields.Integer(),
    "inStock": fields.Integer(),
    "card_type": fields.String(),
    "cmc": fields.Float(),
    "edhrec": fields.Integer,
    "color_identity": fields.List(fields.String),
}


@api.route("/inventory")
class InventoryRoutes(Resource):
    """Fetch inventory."""

    @api.marshal_with(Card, as_list=True)
    def get(self):
        """ This should return everything in
            my collection.
        """
        # InStock = card.quantity - sum_for_all_decks(n of cards)
        #   this means that if a card is in another deck it can
        #   not be selected for current deck. (We should still
        #   return cards with a 0 InStock value).
        cards = (
            db.session.query(
                Cards.id,
                Cards.image_url,
                Cards.name,
                Cards.quantity,
                case(
                    [
                        (
                            DeckCards.quantity,
                            Cards.quantity - db.func.sum(DeckCards.quantity),
                        )
                    ],
                    else_=Cards.quantity,
                ).label("inStock"),
                Cards.card_type,
                Cards.cmc,
                Cards.edhrec,
                Cards.color_identity,
            )
            .outerjoin(DeckCards, Cards.id == DeckCards.card_id)
            .group_by(Cards.id)
            .all()
        )
        return [card._asdict() for card in cards]

    @verify_payload(CardSchema, unknown=INCLUDE)
    def post(self, payload):
        """Add a card to the collection."""
        card = Cards.query.filter_by(id=payload["id"]).first()
        if card:
            card.quantity += payload["quantity"]
        else:
            card = Cards(
                id=payload["id"],
                name=payload["name"],
                mana_cost=payload["mana_cost"],
                cmc=payload["cmc"],
                type_line=payload["type_line"],
                card_type=payload["card_type"],
                image_url=payload["image_url"],
                rarity=payload["rarity"],
                edhrec=payload["edhrec"],
                color_identity=payload["color_identity"],
                quantity=payload["quantity"],
            )
        db.session.add(card)
        db.session.commit()
        return {"id": payload["id"]}


Deck = {
    "id": fields.String(),
    "name": fields.String(),
}


@api.route("/deck")
class AllDeckRoutes(Resource):
    """Fetch decks."""

    @api.marshal_with(Deck, as_list=True)
    def get(self):
        """Fetch all decks."""
        decks = Decks.query.all()
        return [deck.to_json for deck in decks]

    @verify_payload(DeckSchema, unknown=INCLUDE)
    def post(self, payload):
        """Create a new deck."""
        deck = Decks.query.filter_by(name=payload["name"]).first()
        if deck:
            return {"message": f"Deck of name '{payload['name']}' already exists!"}, 403

        deck = Decks(name=payload["name"])

        db.session.add(deck)
        for item in payload["items"]:
            card = Cards.query.filter_by(id=item["id"]).first()
            if not card:
                return {"message": f"Card of id '{item['id']}' does not exist"}, 404

            deck_card = DeckCards(
                card_id=item["id"], deck_id=deck.id, quantity=item["quantity"],
            )
            db.session.add(deck_card)

        db.session.commit()
        return {"id": deck.id}


DeckItem = {"id": fields.String(), "quantity": fields.Integer()}


@api.route("/deck/<string:id>")
class DeckRoutes(Resource):
    """Interact against Deck resource."""

    @api.marshal_with(DeckItem, as_list=True)
    def get(self, id):
        """Fetch a deck contents by it's id."""
        items = DeckCards.query.filter_by(deck_id=id).all()
        return [i.to_json for i in items]

    @verify_payload(DeckSchema, unknown=INCLUDE)
    def post(self, payload, id):
        deck = Decks.query.filter_by(id=id).first()
        if not deck:
            return {"message": "Deck does not found"}, 404

        deck.name = payload["name"]
        deleted_cards = DeckCards.query.filter_by(deck_id=deck.id).all()
        for card in deleted_cards:
            db.session.delete(card)

        for item in payload["items"]:
            card = Cards.query.filter_by(id=item["id"]).first()
            if not card:
                return {"message": "Card does not exist"}, 404

            deck_card = DeckCards(
                card_id=item["id"], deck_id=deck.id, quantity=item["quantity"],
            )
            db.session.add(deck_card)

        db.session.commit()
        return {"message": "success"}

    def delete(self, id):
        """Delete a deck by id."""
        deck = Decks.query.filter_by(id=id).first()
        if not deck:
            return {"message": "Deck does not exist"}, 404

        deleted_cards = DeckCards.query.filter_by(deck_id=deck.id).all()
        for card in deleted_cards:
            db.session.delete(card)

        db.session.delete(deck)
        db.session.commit()
        return {"message": "success"}
