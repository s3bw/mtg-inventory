import wrapt
from flask import request
from marshmallow import ValidationError, RAISE
from werkzeug.exceptions import BadRequest


def verify_payload(schema, unknown=RAISE, **kwgs):
    """ Decorator for verifying JSON payloads in requests."""

    @wrapt.decorator()
    def wrapper(wrapped, instance, args, kwargs):
        req = request.get_json(silent=True)
        if not req:
            raise BadRequest(
                "No JSON was provided, or an invalid mimetype was specified."
            )
        try:
            result = schema().load(req, unknown=unknown, **kwgs)
        except ValidationError as err:
            raise BadRequest(err.messages)

        return wrapped(*args, result, **kwargs)

    return wrapper
