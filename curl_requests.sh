curl -XPOST localhost:4000/api/v1/inventory \
    -H "Content-Type: application/json" \
    -d '{"id": "YWJ1bmErYWNvbHl0ZQ==", "name": "Abuna Acolyte", "mana_cost": "{1}{W}", "cmc": 2.0, "type_line": "Creature \u2014 Cat Cleric", "card_type": "Creature", "image_url": "https://img.scryfall.com/cards/border_crop/front/9/e/9e17bbf7-00c0-46f2-9718-2762fd7388d3.jpg?1562820968", "rarity": "uncommon", "edhrec": 15558, "color_identity": ["W"], "quantity": 2, "inDeck": 0}'

curl -XPOST localhost:4000/api/v1/inventory \
    -H "Content-Type: application/json" \
    -d '{"id": "YWVyaWFsK2Fzc2F1bHQ=", "name": "Aerial Assault", "mana_cost": "{2}{W}", "cmc": 3.0, "type_line": "Sorcery", "card_type": "Sorcery", "image_url": "https://img.scryfall.com/cards/border_crop/front/6/4/64d9c182-cbb3-4791-90dd-0e533ddeebda.jpg?1563898171", "rarity": "common", "edhrec": 10177, "color_identity": ["W"], "quantity": "3", "inDeck": 0}'

curl -XPOST localhost:4000/api/v1/deck \
    -H 'Content-Type: application/json' \
    -d '{"name": "White/Black", "items": []}'


curl -XPOST localhost:4000/api/v1/deck \
    -H 'Content-Type: application/json' \
    -d '{"name": "White/Black", "items": ["YWVyaWFsK2Fzc2F1bHQ="]}'
