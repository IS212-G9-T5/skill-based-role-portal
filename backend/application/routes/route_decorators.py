from flask import jsonify
from functools import wraps
from application.enums import AccessControlRole

from flask_jwt_extended import (
    verify_jwt_in_request,
    get_jwt,
)


def admin_or_hr_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            role = claims.get("role")
            if (
                role == AccessControlRole.Admin.value
                or role == AccessControlRole.HR.value
            ):
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="You are not authorized to access this page."), 403

        return decorator

    return wrapper


def admin_or_hr_or_manager_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            role = claims.get("role")
            if (
                role == AccessControlRole.Admin.value
                or role == AccessControlRole.HR.value
                or role == AccessControlRole.Manager.value
            ):
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="You are not authorized to access this page."), 403

        return decorator

    return wrapper
