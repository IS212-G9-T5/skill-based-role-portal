import calendar
from flask import Flask
from flask.testing import FlaskClient
import pytest
from datetime import date
from application.config import TestConfig
from application import init_app
from application.extensions import db as _db
from application import register_blueprints, register_error_handlers
from sqlalchemy.orm import close_all_sessions
from application.services import staff_service
from application.enums import AccessControlRole
from application.models.skill import Skill
from application.models.access_control import AccessControl
from application.models.role import Role
from application.models.staff import Staff
from application.models.role_listing import RoleListing


@pytest.fixture(scope="session")
def app():
    app = init_app(TestConfig)
    return app


@pytest.fixture(scope="session")
def db(app):
    with app.app_context():
        close_all_sessions()
        _db.drop_all()
        _db.create_all()
        yield _db
        close_all_sessions()
        _db.drop_all()


@pytest.fixture(scope="module")
def init_database(db):
    print("Initializing database in test db")
    # region: Create access control roles
    user = AccessControl(AccessControlRole.User.value)
    admin = AccessControl(AccessControlRole.Admin.value)
    manager = AccessControl(AccessControlRole.Manager.value)
    hr = AccessControl(AccessControlRole.HR.value)

    db.session.add(user)
    db.session.add(admin)
    db.session.add(manager)
    db.session.add(hr)
    db.session.commit()
    # endregion

    # region: Create skills
    skill_adaptability = Skill(name="Adaptability", description="lorem ipsum")
    skill_building_inclusivity = Skill(
        name="Building Inclusivity", description="lorem ipsum"
    )
    skill_collaboration = Skill(name="Collaboration", description="lorem ipsum")
    skill_communication = Skill(name="Communication", description="lorem ipsum")
    skill_creative_thinking = Skill(name="Creative Thinking", description="lorem ipsum")
    skill_customer_orientation = Skill(
        name="Customer Orientation", description="lorem ipsum"
    )
    skill_decision_making = Skill(name="Decision Making", description="lorem ipsum")
    skill_developing_people = Skill(name="Developing People", description="lorem ipsum")
    skill_digital_fluency = Skill(name="Digital Fluency", description="lorem ipsum")
    skill_global_perspective = Skill(
        name="Global Perspective", description="lorem ipsum"
    )
    skill_influence = Skill(name="Influence", description="lorem ipsum")
    skill_learning_agility = Skill(name="Learning Agility", description="lorem ipsum")
    skill_problem_solving = Skill(name="Problem Solving", description="lorem ipsum")
    skill_self_management = Skill(name="Self Management", description="lorem ipsum")
    skill_sense_making = Skill(name="Sense Making", description="lorem ipsum")
    skill_transdisciplinary_thinking = Skill(
        name="Transdisciplinary Thinking", description="lorem ipsum"
    )
    skills_to_create = [
        skill_adaptability,
        skill_building_inclusivity,
        skill_collaboration,
        skill_communication,
        skill_creative_thinking,
        skill_customer_orientation,
        skill_decision_making,
        skill_developing_people,
        skill_digital_fluency,
        skill_global_perspective,
        skill_influence,
        skill_learning_agility,
        skill_problem_solving,
        skill_self_management,
        skill_sense_making,
        skill_transdisciplinary_thinking,
    ]
    for s in skills_to_create:
        db.session.add(s)
    db.session.commit()
    # endregion

    # region: Create Staff (2 users, 2 admins, 2 managers, 2 HRs)
    admin1 = Staff(
        fname="admin1",
        lname="Tan",
        country="Singapore",
        dept="HR",
        email="admin1@email.com",
        access_control=admin,
    )
    db.session.add(admin1)

    admin2 = Staff(
        fname="admin2",
        lname="Tan",
        country="Singapore",
        dept="HR",
        email="admin2@email.com",
        access_control=admin,
    )
    db.session.add(admin2)

    staff1 = Staff(
        fname="staff1",
        lname="Tan",
        country="Singapore",
        dept="Consultancy",
        email="staff1@email.com",
        access_control=user,
        skills=[
            skill_adaptability,
            skill_sense_making,
            skill_collaboration,
            skill_communication,
        ],
    )
    db.session.add(staff1)

    staff2 = Staff(
        fname="staff2",
        lname="Tan",
        country="Singapore",
        dept="Engineering Operations",
        email="staff2@email.com",
        access_control=user,
        skills=[skill_adaptability, skill_creative_thinking, skill_digital_fluency],
    )
    db.session.add(staff2)

    manager1 = Staff(
        fname="manager1",
        lname="Tan",
        country="Singapore",
        dept="Finance",
        email="manager1@email.com",
        access_control=manager,
    )
    db.session.add(manager1)

    manager2 = Staff(
        fname="manager2",
        lname="Tan",
        country="Singapore",
        dept="Sales",
        email="manager2@email.com",
        access_control=manager,
    )

    db.session.add(manager2)

    hr1 = Staff(
        fname="hr1",
        lname="Tan",
        country="Singapore",
        dept="HR",
        email="hr1@email.com",
        access_control=hr,
    )
    db.session.add(hr1)

    hr2 = Staff(
        fname="hr2",
        lname="Tan",
        country="Singapore",
        dept="HR",
        email="hr2@email.com",
        access_control=hr,
    )
    db.session.add(hr2)

    db.session.commit()
    # endregion

    # region: Create roles
    role_account_manager = Role(
        name="Account Manager",
        description="lorem ipsum",
        skills=[
            skill_adaptability,
            skill_creative_thinking,
            skill_communication,
            skill_problem_solving,
        ],
    )
    db.session.add(role_account_manager)

    role_developer = Role(
        name="Developer",
        description="lorem ipsum",
        skills=[skill_communication, skill_problem_solving, skill_digital_fluency],
    )
    db.session.add(role_developer)

    role_consultant = Role(
        name="Consultant",
        description="lorem ipsum",
        skills=[skill_collaboration, skill_communication, skill_learning_agility],
    )
    db.session.add(role_consultant)

    role_junior_engineer = Role(
        name="Junior Engineer",
        description="lorem ipsum",
        skills=[skill_learning_agility, skill_problem_solving],
    )
    db.session.add(role_junior_engineer)

    db.session.commit()
    # endregion


#     # region: Create role listings
#     today = date.today()
#     dd = today.day
#     mm = today.month
#     end_month = (mm % 12) + 1
#     yyyy = today.year
#     # find how many days in the current month
#     days = calendar.monthrange(yyyy, mm)[1]

#     for i in range(1, days + 1):
#         if i < 11:
#             role_listing = RoleListing(
#                 role=role_account_manager,
#                 start_date=date(yyyy, mm, dd),
#                 end_date=date(yyyy, end_month, dd),
#             )
#             db.session.add(role_listing)

#         elif i < 21:
#             role_listing = RoleListing(
#                 role=role_developer,
#                 start_date=date(yyyy, mm, dd),
#                 end_date=date(yyyy, end_month, dd),
#                 applicants=[staff1, staff2] if dd % 3 == 0 else [],
#             )
#             db.session.add(role_listing)

#         else:
#             role_listing = RoleListing(
#                 role=role_consultant,
#                 start_date=date(yyyy, mm, dd),
#                 end_date=date(yyyy, end_month, dd),
#             )
#             db.session.add(role_listing)

#         db.session.commit()
#     # endregion


@pytest.fixture(scope="function")
def random_user(init_database):
    user = staff_service.find_random_user()
    assert user is not None
    return user


@pytest.fixture(scope="function")
def random_hr(init_database):
    hr = staff_service.find_random_hr()
    assert hr is not None
    return hr


@pytest.fixture(scope="function")
def random_manager(init_database):
    hr = staff_service.find_random_manager()
    assert hr is not None
    return hr


@pytest.fixture(scope="function")
def random_user_client(app: Flask, random_user: Staff):
    with app.test_client() as client:
        res = client.post(
            "/api/login",
            json={"email": random_user.email},
        )
        assert res.status_code == 200
        assert res.json["status"] == "success"
        yield client


@pytest.fixture(scope="function")
def random_hr_client(app: Flask, random_hr: Staff):
    with app.test_client() as hr_client:
        res = hr_client.post(
            "/api/login",
            json={"email": random_hr.email},
        )
        assert res.status_code == 200
        assert res.json["status"] == "success"
        yield hr_client


@pytest.fixture(scope="function")
def random_manager_client(app: Flask, random_manager: Staff):
    with app.test_client() as manager_client:
        res = manager_client.post(
            "/api/login",
            json={"email": random_manager.email},
        )
        assert res.status_code == 200
        assert res.json["status"] == "success"
        yield manager_client


@pytest.fixture(scope="function")
def random_user_client_x_csrf_token_header(random_user_client: FlaskClient):
    return {"X-CSRF-TOKEN": random_user_client.get_cookie("csrf_access_token").value}


@pytest.fixture(scope="function")
def random_hr_client_x_csrf_token_header(random_hr_client: FlaskClient):
    return {"X-CSRF-TOKEN": random_hr_client.get_cookie("csrf_access_token").value}


@pytest.fixture(scope="function")
def random_manager_client_x_csrf_token_header(random_manager_client: FlaskClient):
    return {"X-CSRF-TOKEN": random_manager_client.get_cookie("csrf_access_token").value}
