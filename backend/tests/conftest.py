from flask.testing import FlaskClient
import pytest
from datetime import datetime

from application.config import TestConfig
from application import init_app
from application.extensions import db
from application import register_blueprints, register_error_handlers
from application.models.skill import Skill
from application.models.access_control import AccessControl
from application.models.role import Role
from application.models.staff import Staff
from application.enums.access_control_role import AccessControlRole
from application.models.role_listing import RoleListing
from application.models.role_listing import time_format
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
