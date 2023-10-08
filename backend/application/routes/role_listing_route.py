from typing import List
from flask import abort, jsonify, request, current_app as app
from marshmallow import ValidationError

from application.models.role_listing import RoleListing

# from application.dto.role_listing import UpdateRoleListingDTO
from application.dto.role_listing import (
    RoleListingDTO,
    RoleListingSkillMatchDTO,
    UpdateRoleListingDTO,
)
from application.services import staff_service
from application.enums import RoleStatus
from application.models.skill import Skill
from . import api
from application.services import (
    role_listing_service,
    role_service,
    staff_service,
    skill_service,
)
from application.dto.response import ResponseBodyJSON
from .route_decorators import admin_or_hr_required
from flask_jwt_extended import get_jwt_identity, jwt_required



DEFAULT_PAGE_SIZE = 10


@api.route("/hi", methods=["GET"])
def hello():
    return jsonify(msg="hello world"), 200


@api.route("/listings", methods=["GET"])
@jwt_required()
def find_all_listings_paginated():
    page = request.args.get("page", 1, type=int)
    page = page if page > 0 else 1
    page_size = request.args.get("size", DEFAULT_PAGE_SIZE, type=int)
    page_size = page_size if page_size > 0 else DEFAULT_PAGE_SIZE
    app.logger.info(f"GET /listings with params: {request.args}")

    role = request.args.get("role") or ""
    body = request.get_json(silent=True)
    skills_to_filter = []
    if body is not None:
        skills_to_filter = body.get("skills") or []

    current_user_id = get_jwt_identity()
    user = staff_service.find_by_id(current_user_id)
    if user is None:
        return jsonify(msg="User not found."), 401

    user_skills = (
        set([s.name for s in user.skills]) if user.skills is not None else set()
    )
    app.logger.info(f"user skills: {user_skills}")

    paginated_listings = role_listing_service.find_all_by_role_and_skills_paginated(
        skills_to_filter=skills_to_filter, role=role, page=page, page_size=page_size
    )

    data: List[RoleListingSkillMatchDTO] = []
    for listing in paginated_listings.items:
        # app.logger.info(f"listing: {listing}")
        if listing.role is None:
            continue  # skip this listing, not sure why listing does not have role

        listing_skills = listing.role.skills if listing.role.skills is not None else []
        skills_required = set([s.name for s in listing_skills])

        skills_matched = skills_required.intersection(user_skills)
        skills_unmatched = skills_required.difference(user_skills)
        skills_match_count = len(skills_matched)
        skills_match_pct = round(skills_match_count / len(skills_required), 2)

        data.append(
            RoleListingSkillMatchDTO(
                listing=listing.json(),
                skills_matched=list(skills_matched),
                skills_unmatched=list(skills_unmatched),
                skills_match_count=skills_match_count,
                skills_match_pct=skills_match_pct,
            )
        )

    res = {
        "page": paginated_listings.page,
        "size": paginated_listings.per_page,
        "items": data,
        "total": paginated_listings.total,
        "pages": paginated_listings.pages,
        "has_prev": paginated_listings.has_prev,
        "has_next": paginated_listings.has_next,
    }

    return jsonify(res), 200


@api.route("/listings/<int:id>", methods=["GET"])
@jwt_required()
def find_listing_by_id(id: int):
    app.logger.info(f"GET /listings/{id}")
    listing = role_listing_service.find_by_id(id)

    if listing is None:
        abort(404, description=f"RoleListing {id} not found.")

    current_user_id = get_jwt_identity()
    user = staff_service.find_by_id(current_user_id)
    if user is None:
        return jsonify(msg="User not found."), 401

    user_skills = set(user.skills)
    app.logger.info(f"user skills: {user_skills}")

    listing_skills = listing.role.skills
    skills_required = set(listing_skills if listing_skills is not None else [])

    skills_matched = skills_required.intersection(user_skills)
    skills_unmatched = skills_required.difference(user_skills)
    skills_match_count = len(skills_matched)
    skills_match_pct = round(skills_match_count / len(skills_required), 2)

    res = {
        "listing": listing.json(),
        "skills_matched": [s.json() for s in skills_matched],
        "skills_unmatched": [s.json() for s in skills_unmatched],
        "skills_match_count": skills_match_count,
        "skills_match_pct": skills_match_pct,
    }

    return jsonify(res), 200


@api.route("/listings", methods=["POST"])
@jwt_required()
@admin_or_hr_required()
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
@admin_or_hr_required()
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
