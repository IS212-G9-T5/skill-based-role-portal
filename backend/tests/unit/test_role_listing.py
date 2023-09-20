from flask import Flask
from application.services import role_listing_service, skill_service
from application.models.skill import Skill


def test_create_role_listing(app: Flask):
    skill1 = skill_service.create(Skill(name="skill1", description="lorem ipsum"))
    skill2 = skill_service.create(Skill(name="skill2", description="lorem ipsum"))
    skill3 = skill_service.create(Skill(name="skill3", description="lorem ipsum"))

    # print(f"skill1: {skill1}")
    assert skill1.name == "skill1"
    assert skill2.name == "skill2"
    assert skill3.name == "skill3"
