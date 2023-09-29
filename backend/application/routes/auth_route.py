from flask import current_app as app
from flask import jsonify
from flask import request
from flask import Response
from . import api
from functools import wraps
from flask_cors import cross_origin

from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    verify_jwt_in_request,
    get_jwt,
)


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["admin"]:
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Admins only!"), 403

        return decorator

    return wrapper


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    # Create the tokens we will be sending back to the user
    access_token = create_access_token(
        identity=email, additional_claims={"admin": True}
    )
    refresh_token = create_refresh_token(identity=email)

    # Set the JWTs and the CSRF double submit protection cookies
    # in this response
    resp = jsonify({"login": True})
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp, 200


@api.route("/token/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    # Create the new access token
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    # Set the access JWT and CSRF double submit protection cookies
    # in this response
    resp = jsonify({"refresh": True})
    set_access_cookies(resp, access_token)
    return resp, 200


@api.route("/logout", methods=["POST"])
def logout():
    resp = jsonify({"logout": True})
    unset_jwt_cookies(resp)
    return resp, 200


@api.route("/example", methods=["GET"])
@jwt_required()
@admin_required()
def protected():
    email = get_jwt()
    resp = Response(jsonify({"hello": "from {}".format(email)}), 200)
    return resp, 200
