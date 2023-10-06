from flask import abort, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from application.extensions import db
from application.models.skill import Skill
from application.services import staff_service, skill_service
from . import api
from application.dto.response import ResponseBodyJSON


@api.route("/skills", methods=["GET"])
@jwt_required()
def find_all_skills():
    current_user_id = get_jwt_identity()
    user = staff_service.find_by_id(current_user_id)
    if user is None:
        abort(404, description="User not found.")

    data = [s.json() for s in user.skills]
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/skills/<string:name>", methods=["GET"])
def find_skill_by_name(name: str):
    result = skill_service.find_by_name(name)

    if result is None:
        abort(404, description=f"Skill {name} not found.")

    data = result.json()
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200
