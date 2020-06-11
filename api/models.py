import enum
import uuid
from datetime import datetime

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


class PythonEnum(types.TypeDecorator):

    impl = types.String

    def __init__(self, enumtype, *args, **kwargs):
        super(PythonEnum, self).__init__(*args, **kwargs)
        self._enumtype = enumtype

    def process_bind_param(self, value, dialect):
        if isinstance(value, int):
            return value
        return self._enumtype(value).name

    def process_result_value(self, value, dialect):
        return self._enumtype[value].name


class Cards(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.String(130), primary_key=True)
    name = db.Column(db.String(130))
    mana_cost = db.Column(db.String(100))
    cmc = db.Column(db.DECIMAL(3, 1))
    type_line = db.Column(db.String(100))
    card_type = db.Column(PythonEnum(CardType))
    image_url = db.Column(db.Text)
    rarity = db.Column(PythonEnum(Rarity))
    edhrec = db.Column(db.BigInteger)
    color_identity = db.Column(PythonList)
    quantity = db.Column(db.Integer)


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
