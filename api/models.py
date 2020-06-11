import enum
import uuid
from datetime import datetime

from sqlalchemy import Enum
import sqlalchemy.types as types
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class CardType(enum.Enum):
    Creature = 1
    Artifact = 2
    Enchantment = 3
    Instant = 4
    Land = 5
    Sorcery = 6


class Rarity(enum.Enum):
    common = 1
    uncommon = 2
    rare = 3
    mythic = 4


class PythonList(types.TypeDecorator):

    impl = types.String

    def process_bind_param(self, value, dialect):
        return "|".join(value)

    def process_result_value(self, value, dialect):
        return [v for v in value.split("|") if v]


class Cards(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.String(130), primary_key=True)
    name = db.Column(db.String(130))
    mana_cost = db.Column(db.String(100))
    cmc = db.Column(db.DECIMAL(3, 1))
    type_line = db.Column(db.String(100))
    card_type = db.Column(Enum(CardType))
    image_url = db.Column(db.Text)
    rarity = db.Column(Enum(Rarity))
    edhrec = db.Column(db.BigInteger)
    color_identity = db.Column(PythonList)
    quantity = db.Column(db.Integer)

    @property
    def to_json(self):
        return dict(
            id=self.id,
            name=self.name,
            mana_cost=self.mana_cost,
            cmc=float(self.cmc),
            type_line=self.type_line,
            card_type=self.card_type.name,
            image_url=self.image_url,
            rarity=self.rarity.name,
            edhrec=self.edhrec,
            color_identity=self.color_identity,
            quantity=self.quantity,
        )


def _gen_uuid():
    """This is not recommended on databases the support uuid."""
    return str(uuid.uuid4())


class Decks(db.Model):
    __tablename__ = "decks"

    id = db.Column(db.String(36), primary_key=True, default=_gen_uuid)
    name = db.Column(db.String(40))
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    @property
    def to_json(self):
        return dict(id=self.id, name=self.name)


class DeckCards(db.Model):
    __tablename__ = "deck_cards"

    id = db.Column(db.String(36), primary_key=True, default=_gen_uuid)
    card_id = db.Column(db.String(130), db.ForeignKey("cards.id"), nullable=False)
    deck_id = db.Column(db.String(36), db.ForeignKey("decks.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    @property
    def to_json(self):
        return dict(id=self.card_id, quantity=self.quantity)