from dotenv import load_dotenv
from os import environ

load_dotenv()


class Config:  # Default config for development
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")
    TESTING = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY")
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SECURE = False
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_REFRESH_COOKIE_PATH = "/token/refresh"
    JWT_COOKIE_CSRF_PROTECT = True


class ProdConfig(Config):
    TESTING = False


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_TEST_DATABASE_URI")
