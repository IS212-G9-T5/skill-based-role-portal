from flask import abort, jsonify, request
from application.extensions import db
from application.models.skill import Skill
from . import api
from application.dto.response import ResponseBodyJSON


@api.route("/skills", methods=["GET"])
def find_all_skills():
    results = db.session.execute(db.select(Skill)).scalars().all()
    data = [r.json() for r in results]
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/skills/<string:name>", methods=["GET"])
def find_skill_by_name(name: str):
    result = (
        db.session.execute(db.select(Skill).where(Skill.name == name)).scalars().first()
    )

    if result is None:
        abort(404, description=f"Skill {name} not found.")

    data = result.json()
    res = ResponseBodyJSON(data=data).json()
    return jsonify(res), 200


@api.route("/skills", methods=["POST"])
def create_skill():
    body: dict = request.get_json()
    print(f"POST /skills with body: {body}")

    skill_name = body.get("name", None)
    if skill_name is None:
        abort(400, description="`name` field cannot be empty")

    s = Skill(**body)
    # print(f"skills object initialised: {s}")
    db.session.add(s)
    db.session.commit()
    return jsonify(s.json()), 201
