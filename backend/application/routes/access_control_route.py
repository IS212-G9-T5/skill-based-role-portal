from flask import abort, jsonify, request
from application.extensions import db
from application.models.access_control import AccessControl
from application.services import access_control_service as ac_service
from application.enums.access_control_role import AccessControlRole
from . import api
from application.dto.response import ResponseBodyJSON


@api.route("/access_control", methods=["GET"])
def find_all_access_control():
    results = ac_service.find_all()
    data = [r.json() for r in results]
    print(f"/GET all access control data: {data}")
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/access_control/<int:id>", methods=["GET"])
def find_access_control_by_id(id: int):
    result = ac_service.find_by_id(id)

    if result is None:
        abort(404, description=f"AccessControl {id} not found.")

    data = result.json()
    print(f"access control data: {data}")
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/access_control", methods=["POST"])
def create_access_control():
    body: dict = request.get_json()
    name = body.get("name")
    if name is None or name not in AccessControlRole.__members__:
        abort(
            400,
            description=f"Invalid access control name: '{name}'. name can only be the following: {AccessControlRole.__members__.keys()}",
        )

    # print(f"POST /access_control with body: {body}")

    o = AccessControl(**body)
    # print(f"acccess control object initialised: {o}")
    ac_service.create(o)
    return jsonify(o.json()), 201
