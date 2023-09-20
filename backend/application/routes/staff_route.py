from flask import abort, jsonify, request
from application.extensions import db, app
from application.models.staff import Staff
from application.enums.access_control_role import AccessControlRole
from . import api
from application.dto.response import ResponseBodyJSON
from application.services import access_control_service as ac_service

# TODO: /staff endpoint should be admin accessible only


@api.route("/staff", methods=["GET"])
def find_all_staff():
    results = db.session.execute(db.select(Staff)).scalars().all()
    data = [r.json() for r in results]
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/staff/<int:id>", methods=["GET"])
def find_staff_by_id(id: int):
    results = (
        db.session.execute(db.select(Staff).where(Staff.id == id)).scalars().first()
    )

    if results is None:
        abort(404, description=f"Staff {id} not found.")

    data = results.json()
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/staff", methods=["POST"])
def create_staff():
    body: dict = request.get_json()
    app.logger.info(f"POST /staff with body: {body}")

    access_control_name = body.pop("access_control")
    # app.logger.info(f"access_control_name: {access_control_name}")
    if (
        access_control_name is None
        or access_control_name not in AccessControlRole.__members__
    ):
        abort(
            400,
            description=f"Invalid access control name: '{access_control_name}'. name can only be the following: {AccessControlRole.__members__.keys()}",
        )

    access_control = ac_service.find_by_name(access_control_name)
    if access_control is None:
        abort(400, description=f"access_control '{access_control}' not found")

    s = Staff(**body, access_control=access_control)
    app.logger.info(f"staff object initialised: {s}")
    db.session.add(s)
    db.session.commit()
    return jsonify(s.json()), 201


@api.route("/staff/<int:id>/skills", methods=["PATCH"])
def update_staff_skills():
    pass
