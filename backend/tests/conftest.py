from flask.testing import FlaskClient
import pytest

from application.config import TestConfig
from application import init_app
from application.extensions import db
from application import register_blueprints, register_error_handlers
from sqlalchemy.orm import close_all_sessions
from application import init_db


@pytest.fixture(scope="module")
def test_client():
    app = init_app(TestConfig)
    app = register_blueprints(app)
    app = register_error_handlers(app)
    with app.test_client() as client:
        with app.app_context():
            yield client


@pytest.fixture(scope="module")
def init_database(test_client: FlaskClient):
    init_db()
    yield
    close_all_sessions()
    db.drop_all()
