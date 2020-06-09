"""Iterates a list of card names and requests
information from the scryfall api.
"""
import time
import json
import base64
import urllib.parse
from pathlib import Path

import requests


API = "https://api.scryfall.com"
GET_CARD = "/cards/named?exact={card_name}"
CACHE_REQUESTS = "./data/scryfall/"
FAILED_CARDS = "failed_cards.txt"


def read_cards(file_name):
    """Iterate each card from file."""
    with open(file_name) as file:
        for line in file:
            yield line.strip().strip('"')


def check_cache(card_name):
    base64_name = base64.b64encode(bytes(card_name, "utf-8"))
    file = Path(CACHE_REQUESTS + base64_name.decode("utf-8"))
    return file.exists()


def write_cache(card_name, data):
    base64_name = base64.b64encode(bytes(card_name, "utf-8"))
    file_path = CACHE_REQUESTS + base64_name.decode("utf-8")
    with open(file_path, "w+") as file:
        json.dump(data, file)


def append_line(line):
    with open(FAILED_CARDS, "a") as file:
        file.write(line + "\n")


def get_card_info(card_name):
    safe = urllib.parse.quote_plus(card_name.lower())

    if not check_cache(safe):
        # check local cache
        uri = API + GET_CARD.format(card_name=safe)
        print(f"Calling URL: {uri}")
        resp = requests.get(uri)
        if resp.status_code == 200:
            write_cache(safe, resp.json())
        else:
            print(f"Failed: {card_name}")
            append_line(card_name)
        time.sleep(0.5)  # 200ms

    else:
        pass
        # print(f"Skipped: {card_name}")


if __name__ == "__main__":
    # file = "test_card_names.txt"
    file = "./data/card_names.txt"
    for i, card in enumerate(read_cards(file)):
        get_card_info(card)
