import sys
import logging

from flask import Flask, jsonify
from flask_cors import CORS
from flask_alembic import Alembic
from werkzeug.exceptions import HTTPException

from .models import db
from .routes import routes
from .config import AppConfig


def create_app(conf):
    app = Flask(__name__, static_folder="build")
    env = AppConfig(conf, override=True)
    app.config.from_object(env)
    setup_logger(app)

    app.logger.setLevel(app.config["LOG_LEVEL"])

    setup_app(app)
    logging.info("Ready to serve!")
    return app


def setup_logger(app):
    handler = logging.StreamHandler(sys.stdout)

    root_logger = logging.getLogger()
    root_logger.addHandler(handler)
    app.logger = root_logger


def setup_app(app):
    #: This should only be active in development!
    if app.config["ENABLE_CORS"] and app.config["ENV"] == "local":
        cors = CORS(supports_credentials=True)
        cors.init_app(app)

    alembic = Alembic()

    alembic.init_app(app)
    db.init_app(app)

    app.register_blueprint(routes, url_prefix="/api/v1")

    @app.errorhandler(Exception)
    def handle_error(e):
        """Transform all error message into json from html."""
        code = 500
        if isinstance(e, HTTPException):
            code = e.code
        else:
            raise e
        return jsonify(error=str(e)), code
