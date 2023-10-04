from flask import abort, json, jsonify, request, current_app as app
from marshmallow import ValidationError

from application.models.role_listing import RoleListing

# from application.dto.role_listing import UpdateRoleListingDTO
from application.dto.role_listing import RoleListingDTO, UpdateRoleListingDTO
from application.services import staff_service
from application.enums import RoleStatus
from . import api
from application.services import role_listing_service, role_service
from application.dto.response import ResponseBodyJSON
from .route_decorators import admin_required
from flask_jwt_extended import jwt_required

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


@api.route("/listings/<int:id>", methods=["GET"])
def find_listing_by_id(id: int):
    listing = role_listing_service.find_by_id(id)

    if listing is None:
        abort(404, description=f"RoleListing {id} not found.")

    data = listing.json()
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/listings", methods=["POST"])
@jwt_required()
@admin_required()
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
    data = role_listing_service.save(listing)
    res = ResponseBodyJSON(data=data.json()).json()
    return jsonify(res), 201


@api.route("/listings/<int:id>", methods=["PUT"])
@jwt_required()
@admin_required()
def update_role_listing(id: int):
    body = request.get_json()
    print(f"PUT /listings/{id} with body: {body}")

    # Find the existing role listing by id
    existing_listing = role_listing_service.find_by_id(id)

    if existing_listing is None:
        abort(404, description=f"RoleListing {id} not found.")

    # Validate the request body (required fields and types)
    schema = UpdateRoleListingDTO()
    updated_data = schema.load(body)

    # Validate start_time < end_time
    if updated_data["start_date"] >= updated_data["end_date"]:
        return (
            jsonify(
                {
                    "message": "Invalid start time and end time. Start time must be before the end time."
                }
            ),
            400,
        )

    # Validate that the status is valid
    if (
        updated_data["status"] is None
        or updated_data["status"] not in RoleStatus.__members__
    ):
        abort(
            400,
            description=f"Invalid role status: '{id}'. name can only be the following: {RoleStatus.__members__.keys()}",
        )

    # Update the existing role listing
    existing_listing.start_date = updated_data["start_date"]
    existing_listing.end_date = updated_data["end_date"]
    # existing_listing.role = role
    existing_listing.status = updated_data["status"]

    # Save the updated listing
    updated_listing = role_listing_service.save(existing_listing)

    data = updated_listing.json()
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200
