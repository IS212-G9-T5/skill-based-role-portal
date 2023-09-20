import traceback
from application.dto.exception import CustomExceptionJson
from flask import jsonify, current_app as app
from sqlalchemy.exc import IntegrityError
from marshmallow import ValidationError


def handle_resource_not_found(e):
    res = CustomExceptionJson(str(e)).json()
    traceback.print_exc()
    app.logger.error(f"Resource not found: {e}")
    return jsonify(res), 404


def handle_bad_request(e):
    res = CustomExceptionJson(str(e)).json()
    traceback.print_exc()
    app.logger.error(f"Bad request: {e}")
    return jsonify(res), 400


def handle_unhandled_exception(e: Exception):
    res = CustomExceptionJson(str(e)).json()
    traceback.print_exc()
    app.logger.error(f"Unhandled exception: {e}")
    return jsonify(res), 500


def handle_key_error(e: KeyError):
    """Handles exception thrown when KeyError is thrown most probably when a field is missing in request body."""
    res = CustomExceptionJson(f"Fields missing from request body {e.args}").json()
    traceback.print_exc()
    app.logger.error(f"Key error: {e}")
    return jsonify(res), 400


def handle_integrity_error(e: IntegrityError):
    """Handles exception when integrity constraint in database are violated. E.g. not nullable fields are null (due to missing fields in request body)"""
    res = CustomExceptionJson(
        f"Integrity constraint in database are violated. Error message: {str(e)}"
    ).json()
    traceback.print_exc()
    app.logger.error(f"Integrity error: {e}")
    return jsonify(res), 400


def handle_validation_error(e: ValidationError):
    """Handles exception request body fields are invalid)"""
    res = CustomExceptionJson(f"ValidationError: {e.messages}").json()
    traceback.print_exc()
    app.logger.error(f"ValidationError: {e.messages}")
    return jsonify(res), 400
