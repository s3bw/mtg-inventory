from envconfig import param
from envconfig import EnvConfig


class AppConfig(EnvConfig):
    """Configuration for the app."""

    HOST = param.Str(required=True)
    PORT = param.Int(required=True)
    VERSION = param.Int()

    ENV = param.Str(default="prod")
    DEBUG = param.Bool(default=False)
    LOG_LEVEL = param.Str(default="INFO")

    ENABLE_CORS = param.Bool(default=False)

    SQLALCHEMY_DATABASE_URI = param.Str(default="sqlite:///db.sqlite")
    SQLALCHEMY_TRACK_MODIFICATIONS = param.Bool(default=False)
