from flask import Blueprint
from flask_restplus import Api, Resource
from marshmallow import INCLUDE

from .library import verify_payload
from .schemas import CardSchema


routes = Blueprint("route", __name__)
api = Api(routes)


@api.route("/inventory")
class Inventory(Resource):
    """Fetch inventory."""

    def get(self):
        """ This should return everything in
            my collection.
        """
        # Calculate 'InStock' and 'InDeck'
        # attributes.
        # InStock = card.quantity - sum_for_all_decks(n of cards)
        #   this means that if a card is in another deck it can
        #   not be selected for current deck. (We should still
        #   return cards with a 0 InStock value).
        # InDeck = 0 (this depends on the client side and the
        #   current deck that has been selected.
        return [
            # Card,
            # Card,
            # Card,
        ]

    @verify_payload(CardSchema, unknown=INCLUDE)
    def post(self, payload):
        """Add a card to the collection."""
        # Return base64'd card name, this will
        # be used as an ID.
        return {"id": payload["id"]}


@api.route("/deck")
class AllDecks(Resource):
    """Fetch decks."""

    def get(self):
        """Fetch all decks."""
        return [
            # Deck,
            # Deck,
            # Deck,
        ]

    @verify_payload(CardSchema, unknown=INCLUDE)
    def post(self):
        """Create a new deck."""
        # When creating a new deck the id of
        # the items within the deck with need
        # to be added to a card_deck table.

        # Returns a uuid of the new deck
        pass


@api.route("/deck/<string:id>")
class Deck(Resource):
    """Interact against Deck resource."""

    def get(self, id):
        """Fetch a deck by it's id."""
        # Returns 'Deck' object
        # this will contain a list of items in
        # the deck and how many of each items
        # exist in the deck. E.g. (2x of item.id)
        pass

    def delete(self, id):
        """Delete a deck by id."""
        # Once a deck is deleted items that have
        # been added to this deck will have to
        # be removed.

        # Returns 'success' once deck is deleted
        pass
