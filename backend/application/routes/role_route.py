from flask import abort, jsonify
from application.services import role_service
from . import api
from application.dto.response import ResponseBodyJSON


@api.route("/roles", methods=["GET"])
def find_all_roles():
    results = role_service.find_all()
    data = [r.json() for r in results]
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/roles/<string:name>", methods=["GET"])
def find_role_by_name(name: str):
    result = role_service.find_by_name(name)

    if result is None:
        abort(404, description=f"Role {name} not found.")

    data = result.json()
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


# region: Creation of roles not required for now; roles are created in the database from scheduled sync jobs with other systems
# @api.route("/roles", methods=["POST"])
# def create_role():
#     body: dict = request.get_json()
#     print(f"POST /roles with body: {body}")

#     skill_names = body.pop("skills")
#     if skill_names is None:
#         abort(400, description="`name` field cannot be empty")

#     for skill_name in skill_names:
#         if skill_name is None:
#             abort(400, description="`name` field cannot be empty")

#     s = Role(**body)
#     # print(f"roles object initialised: {s}")
#     db.session.add(s)
#     db.session.commit()
#     return jsonify(s.json()), 201
# endregion
