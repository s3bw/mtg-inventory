import enum
from datetime import datetime

from sqlalchemy import Enum
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


class Card(db.Model):
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
    color_identity = db.Column(db.String(50))
    quantity = db.Column(db.Integer)


class Deck(db.Model):
    __tablename__ = "decks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


class DeckCard(db.Model):
    __tablename__ = "deck_cards"

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.String(130), db.ForeignKey("cards.id"), nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey("decks.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
