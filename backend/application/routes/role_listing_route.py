from flask import abort, jsonify, request, current_app as app
from marshmallow import ValidationError

from application.models.role_listing import RoleListing
from application.dto.role_listing import RoleListingDTO
from . import api
from application.services import role_listing_service, role_service
from application.dto.response import ResponseBodyJSON


@api.route("/hi", methods=["GET"])
def hello():
    app.logger.info("Hello world")
    return jsonify({"message": "hello world"}), 200


@api.route("/listings", methods=["GET"])
def find_all_listings():
    listings = role_listing_service.find_all()
    data = [l.json() for l in listings]
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/listings/<string:name>", methods=["GET"])
def find_listing_by_name(name: str):
    # print(f"GET /listings/{name}")
    listing = role_listing_service.find_by_name(name)

    if listing is None:
        abort(404, description=f"RoleListing {name} not found.")

    data = listing.json()
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/listings", methods=["POST"])
def create_listing():
    body = request.get_json()
    print(f"POST /listings with body: {body}")

    # region: validate the request body (required fields and types)
    schema = RoleListingDTO()
    _ = schema.load(
        body
    )  # raises ValidationError if invalid (handled globally in errors.py)

    # validate start_time < end_time
    if body["start_time"] >= body["end_time"]:
        raise ValidationError(
            "Invalid start time and end time. Start time must be before the end time."
        )
    # endregion

    # Check if role exists
    role = role_service.find_by_name(body["role_name"])
    if role is None:
        abort(404, description=f"Role {body['role_name']} not found.")

    listing = RoleListing(
        start_time=body["start_time"], end_time=body["end_time"], role=role
    )
    data = role_listing_service.create(listing)
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 201
