import os
import csv
import json
from pathlib import Path

from toolz import keyfilter


DATA_DIR = "./data/scryfall"
KEEP_ITEMS = {
    "name",
    "mana_cost",
    "cmc",
    "type_line",
    "oracle_text",
    "power",
    "toughness",
    "colors",
    "color_identity",
    "keywords",
    "rarity",
    "edhrec_rank",
}


def load_json(file_name):
    with open(DATA_DIR + "/" + file_name) as file:
        return json.load(file)


def write_row(row):
    write_header = False
    enriched_data = Path("./data/enriched_data.csv")
    if not enriched_data.exists():
        write_header = True

    with open(enriched_data, "a") as file:
        writer = csv.DictWriter(file, KEEP_ITEMS)
        if write_header:
            writer.writeheader()

        writer.writerow(row)


def Row(data, columns):
    is_in = lambda x: x in columns
    data = keyfilter(is_in, data)
    # print(data)
    # data["oracle_text"] = data["oracle_text"].replace("\n", "")
    return data


if __name__ == "__main__":
    for i, file in enumerate(os.listdir(DATA_DIR)):
        data = load_json(file)
        row = Row(data, KEEP_ITEMS)
        write_row(row)

    print("Enriched Data Created!")
