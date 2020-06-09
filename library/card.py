import base64
import urllib.parse


class Card:
    def __init__(self, name):
        self.name = name

    @property
    def websafe_name(self):
        return urllib.parse.quote_plus(self.name.lower())

    @property
    def base64_name(self):
        return base64.b64encode(bytes(self.websafe_name, "utf-8")).decode("utf-8")
