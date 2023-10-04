from flask import jsonify
from functools import wraps
from application.enums import AccessControlRole

from flask_jwt_extended import (
    verify_jwt_in_request,
    get_jwt,
)


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims[AccessControlRole.ADMIN.value]:
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Unauthorised. Admin Rights Required"), 401

        return decorator

    return wrapper