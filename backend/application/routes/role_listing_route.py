from flask import abort, json, jsonify, request, current_app as app
from marshmallow import ValidationError

from application.models.role_listing import RoleListing
from application.dto.role_listing import RoleListingDTO
from . import api
from application.services import role_listing_service, role_service
from application.dto.response import ResponseBodyJSON

DEFAULT_PAGE_SIZE = 10


@api.route("/hi", methods=["GET"])
def hello():
    app.logger.info("Hello world")
    return jsonify({"message": "hello world"}), 200


@api.route("/listings", methods=["GET"])
def find_all_listings_paginated():
    page = request.args.get("page", 1, type=int)
    page = page if page > 0 else 1
    page_size = request.args.get("size", DEFAULT_PAGE_SIZE, type=int)
    page_size = page_size if page_size > 0 else DEFAULT_PAGE_SIZE

    listings = role_listing_service.find_all_paginated(page=page, page_size=page_size)

    data = {
        "page": listings.page,
        "size": listings.per_page,
        "items": [l.json() for l in listings.items] if listings.items else [],
        "total": listings.total,
        "pages": listings.pages,
        "has_prev": listings.has_prev,
        "has_next": listings.has_next,
    }

    return jsonify(data), 200


@api.route("/listings/<string:name>", methods=["GET"])
def find_listing_by_name(name: str):
    listing = role_listing_service.find_by_name(name)

    if listing is None:
        abort(404, description=f"RoleListing {name} not found.")

    data = listing.json()
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/listings", methods=["POST"])
def create_listing():
    body = request.get_json()
    app.logger.info(f"POST /listings with request body: {body}")

    # region: validate the request body (required fields and types)
    schema = RoleListingDTO()
    _ = schema.load(
        body
    )  # raises ValidationError if invalid (handled globally in errors.py)

    # validate start_date < end_date
    if body["start_date"] >= body["end_date"]:
        raise ValidationError(
            "Invalid start date and end date. Start date must be before the end date."
        )
    # endregion

    # Check if role exists
    role = role_service.find_by_name(body["role_name"])
    if role is None:
        abort(404, description=f"Role {body['role_name']} not found.")

    listing = RoleListing(
        start_date=body["start_date"], end_date=body["end_date"], role=role
    )
    data = role_listing_service.create(listing)
    res = ResponseBodyJSON(data=data.json()).json()
    return jsonify(res), 201
