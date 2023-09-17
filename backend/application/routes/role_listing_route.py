from flask import jsonify, request

from application.models.role_listing import RoleListing
from . import api
from application.services import role_listing_service
from application.dto.response import ResponseBodyJSON


@api.route("/hi", methods=["GET"])
def hello():
    return jsonify({"message": "hello world"}), 200


@api.route("/listings", methods=["GET"])
def find_all_listings():
    listings = role_listing_service.find_all()
    data = [l.json() for l in listings]
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/listings/<uuid:id>", methods=["GET"])
def find_listing_by_id(id):
    listing = role_listing_service.find_by_id_or_throw(id)
    res = ResponseBodyJSON(data=listing).json()
    return jsonify(res), 200


@api.route("/listings", methods=["POST"])
def create_listing():
    body = request.get_json()
    print(f"POST /listings with body: {body}")

    listing = RoleListing(**body)
    data = role_listing_service.create(listing)
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 201

# @api.route("/test", methods=["POST"])
# def test_listing():
#     body = request.get_json()
#     print(f"POST /listings with body: {body}")

#     listing = RoleListing(**body)
#     print(f'listing.start_time: {listing.start_time}')

#     return jsonify(listing.json()), 201