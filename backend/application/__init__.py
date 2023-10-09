from flask import Flask
from datetime import date, datetime
import logging
from logging.handlers import TimedRotatingFileHandler

from application.config import Config

from sqlalchemy.exc import IntegrityError
from marshmallow import ValidationError

from application.extensions import db, cors, jwt, migrate


def init_app(config=Config):
    app = Flask(__name__)
    app.config.from_object(config)

    configure_extensions(app)
    app = register_blueprints(app)
    app = register_error_handlers(app)
    configure_logging(app)

    return app


def configure_extensions(app: Flask):
    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)


def configure_logging(app: Flask):
    current_date = datetime.now().strftime("%Y-%m-%d")
    file_handler = TimedRotatingFileHandler(
        f"logs/app-{current_date}.log",
        when="midnight",
        backupCount=10,
        encoding="utf-8",
    )
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(
        logging.Formatter("[%(asctime)s] [%(levelname)s | %(module)s] >>> %(message)s")
    )
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.DEBUG)


def register_blueprints(app: Flask):
    with app.app_context():
        # Include our Routes
        from .routes import (
            api,
            role_listing_route,
            staff_route,
            access_control_route,
            skills_route,
            role_route,
            auth_route,
        )

        # Register routes
        app.register_blueprint(api, url_prefix="/api")

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
