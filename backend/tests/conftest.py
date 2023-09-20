import pytest
from application.config import TestConfig
from application import init_app
from application.extensions import db
from application import register_blueprints, register_error_handlers


@pytest.fixture(scope="session")
def app():
    app = init_app(TestConfig)
    app = register_blueprints(app)
    app = register_error_handlers(app)
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()
    return app


@pytest.fixture(scope="function")
def client(app):
    return app.test_client()
