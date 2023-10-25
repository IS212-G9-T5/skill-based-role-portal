from flask import abort, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from application.extensions import db
from application.models.staff import Staff
from application.services import staff_service
from . import api


@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = staff_service.find_by_id(user_id)

    if user is None:
        abort(404, description=f"Staff {user_id} not found.")

    res = user.json()
    res["skills"] = [s.json() for s in user.skills]
    return jsonify(res), 200
