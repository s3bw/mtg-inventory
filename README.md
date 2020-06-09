# MTG Inventory

## Jupyter Lab

```
pip install -r requirements-data.txt
jupyter lab
```

## Update data

```
# After replacing the inventory file
python create_card_list.py

# Then gather data from scryfall
python gether_scryfall_data.py
```

## ScryFall API

```bash
curl https://api.scryfall.com/cards/named?exact=deathless+knight
```

Peculiar Card Names:

```
# Solve with %27
Yarok's Fenlurker

# Solve with %2C
"Yorvo, Lord of Garenbrig"A

# Solve with %2f
Ardenvale Tactician // Dizzying Swoop
```
