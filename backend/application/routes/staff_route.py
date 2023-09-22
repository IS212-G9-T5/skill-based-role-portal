from flask import abort, jsonify
from application.extensions import db
from application.models.staff import Staff
from . import api
from application.dto.response import ResponseBodyJSON

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
