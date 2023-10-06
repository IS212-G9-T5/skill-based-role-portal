from datetime import timedelta
from flask import jsonify, request, abort

from application.services import staff_service
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
    id = request.json.get("id", None)
    # password = request.json.get("password", None)
    results = staff_service.find_by_id(id)

    if results is None:
        abort(404, description=f"Staff with {id} not found.")
    data = results.json()

    if data["id"] != id:
        return jsonify({"msg": "user is not registered in system"}), 400

    # Create the tokens
    access_token = create_access_token(
        identity=id,
        additional_claims={"role": data["access_control"]},
        expires_delta=timedelta(hours=4),
    )
    refresh_token = create_refresh_token(identity=id)

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
# @admin_or_hr_required()
# def protected():
#     email = get_jwt_identity()
#     return jsonify({"hello": "from {}".format(email)}), 200
