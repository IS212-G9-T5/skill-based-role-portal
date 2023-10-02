from flask import jsonify, request, abort
from . import api
from application.models.staff import Staff
from application.extensions import db

from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
)


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    # password = request.json.get("password", None)
    results = (
        db.session.execute(db.select(Staff).where(Staff.email == email))
        .scalars()
        .first()
    )

    if results is None:
        abort(404, description=f"Staff with {email} not found.")
    data = results.json()

    if data["email"] != email:
        return jsonify({"msg": "user is not registered in system"}), 401

    # Create the tokens
    access_token = create_access_token(
        identity=email, additional_claims={data["access_control"]: True}
    )
    refresh_token = create_refresh_token(identity=email)

    # Set the JWTs and the CSRF double submit protection cookies in this response
    data = {
        "status": "success",
        "role": data["access_control"],
    }
    resp = jsonify(data)
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp, 200


@api.route("/token/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    resp = jsonify({"refresh": True})
    set_access_cookies(resp, access_token)
    return resp, 200


@api.route("/logout", methods=["POST"])
def logout():
    resp = jsonify({"logout": True})
    unset_jwt_cookies(resp)
    return resp, 200


# Endpoint used to test protected routes
# @api.route("/example", methods=["GET"])
# @jwt_required()
# @admin_required()
# def protected():
#     email = get_jwt_identity()
#     return jsonify({"hello": "from {}".format(email)}), 200
