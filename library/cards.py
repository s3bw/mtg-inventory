import base64
import urllib.parse


def websafe_name(name):
    return urllib.parse.quote_plus(name.lower())


def base64_name(name):
    return base64.b64encode(bytes(websafe_name(name), "utf-8")).decode("utf-8")
