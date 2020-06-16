import csv
import json
from pathlib import Path

import requests

from library import features
from library.cards import base64_name


SCRY_DATA = "./data/scryfall"
FAILED_CARDS = "failed.txt"
SUCCESSFUL_CARDS = "success.json"


def read_csv(file_path):
    with open(file_path) as file:
        reader = csv.DictReader(file)
        for line in reader:
            yield line
        yield None


def write_success(line):
    requests.post("http://localhost:4000/api/v1/inventory", json=line)

    # with open(SUCCESSFUL_CARDS, "a") as file:
    #     file.write(json.dumps(line) + ",\n")


def write_failure(line):
    with open(FAILED_CARDS, "a") as file:
        file.write(line + "\n")


def fetch_json(key):
    path = Path(SCRY_DATA) / key
    if path.exists():
        with open(path) as file:
            return json.load(file)


def enrich(item):
    key = base64_name(item["Name"])
    data = fetch_json(key)
    if not data:
        print(f"Key: {key} not found for '{item['Name']}'")
        return None

    item.update(data)
    return item


def create_features(row):
    row["id"] = base64_name(row["Name"])
    row["card_type"] = features.classify_card_type(row)
    return row


def flatten(row):
    row["image_url"] = row["image_uris"]["border_crop"]
    return row


def rename_and_drop(row):
    return {
        "id": row["id"],
        "name": row["Name"],
        "mana_cost": row["mana_cost"],
        "cmc": row["cmc"],
        "type_line": row["type_line"],
        "card_type": row["card_type"],
        "image_url": row["image_url"],
        "rarity": row["rarity"],
        "edhrec": row.get("edhrec_rank", 90001),
        "color_identity": row["color_identity"],
        "quantity": row["Count"],
        "inDeck": 0,
    }


def process(item):
    # Enrich attributes
    row = enrich(item)
    if not row:
        # Append to failed file
        write_failure(item["Name"])
        return

    # Create features
    row = create_features(row)

    # Flatten attributes
    row = flatten(row)

    # Rename and drop attributes
    return rename_and_drop(row)


def combine(a, b):
    n = {
        "Count": int(a["Count"]) + int(b["Count"]),
    }
    a.update(n)
    return a


def isDuplicate(a, b):
    return b and (base64_name(a["Name"]) == base64_name(b["Name"]))


def main(file_path):
    count = 0
    inventory = read_csv(file_path)

    curr_item = next(inventory)
    while curr_item:
        next_item = next(inventory)
        duplicate = isDuplicate(curr_item, next_item)

        # De-duplication
        while next_item and duplicate:
            curr_item = combine(curr_item, next_item)
            next_item = next(inventory)
            duplicate = isDuplicate(curr_item, next_item)

        print(f"Processing: {curr_item['Name']}, n: {count}")
        data = process(curr_item)
        if data:
            write_success(data)

        curr_item = next_item
        count += 1


if __name__ == "__main__":
    # inventory = "test_file.csv"
    inventory = "./data/inventory.csv"
    main(inventory)
