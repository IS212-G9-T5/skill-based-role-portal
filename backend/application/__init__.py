from flask import Flask

from sqlalchemy.exc import IntegrityError
from marshmallow import ValidationError

from application.extensions import db, cors


def init_app(config):
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    cors.init_app(app)

    return app


def register_blueprints(app: Flask):
    with app.app_context():
        from application.models import access_control, staff, skill, role, role_listing

        # Include our Routes
        from .routes import (
            api,
            role_listing_route,
            # staff_route,
            access_control_route,
            # skills_route,
        )

        # Register routes
        app.register_blueprint(api, url_prefix="/api")
        # app.register_blueprint(staff_route.api, url_prefix="/api")

        return app


def register_error_handlers(app: Flask):
    with app.app_context():
        # Register error handlers
        from . import errors

        app.register_error_handler(404, errors.handle_resource_not_found)
        app.register_error_handler(400, errors.handle_bad_request)
        app.register_error_handler(KeyError, errors.handle_key_error)
        app.register_error_handler(IntegrityError, errors.handle_integrity_error)
        app.register_error_handler(Exception, errors.handle_unhandled_exception)
        app.register_error_handler(ValidationError, errors.handle_validation_error)

        return app
