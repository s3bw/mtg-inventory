from marshmallow import Schema, fields
from marshmallow.validate import OneOf, Length


CARD_TYPES = [
    "Creature",
    "Enchantment",
    "Sorcery",
    "Instant",
    "Artifact",
    "Land",
]
RARITY = [
    "common",
    "uncommon",
    "rare",
    "mythic",
]


class CardSchema(Schema):

    id = fields.Str(required=True)
    name = fields.Str(required=True)
    cmc = fields.Float(required=True)
    mana_cost = fields.Str(required=True)
    type_line = fields.Str(required=True)
    card_type = fields.Str(required=True, validate=OneOf(CARD_TYPES))
    image_url = fields.Str(required=True)
    rarity = fields.Str(required=True, validate=OneOf(RARITY))

    edhrec = fields.Int()
    color_identity = fields.List(fields.Str())
    quantity = fields.Int()


class DeckItemSchema(Schema):

    id = fields.Str(required=True)
    quantity = fields.Int(required=True)


class DeckSchema(Schema):

    name = fields.Str(required=True, validate=[Length(min=6, max=36)])
    items = fields.List(fields.Nested(DeckItemSchema), required=True)
