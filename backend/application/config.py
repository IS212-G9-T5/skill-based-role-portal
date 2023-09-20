from dotenv import load_dotenv
from os import environ

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestConfig:
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_TEST_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
