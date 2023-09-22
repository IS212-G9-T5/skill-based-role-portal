from flask import Flask
from datetime import datetime

from application.enums import AccessControlRole
from application.models.skill import Skill
from application.models.access_control import AccessControl
from application.models.role import Role
from application.models.staff import Staff
from application.models.role_listing import RoleListing
from application.models.role_listing import time_format


from sqlalchemy.exc import IntegrityError
from marshmallow import ValidationError

from application.extensions import db, cors


def init_app(config):
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    cors.init_app(app)

    return app


def register_blueprints(app: Flask):
    with app.app_context():
        # Include our Routes
        from .routes import (
            api,
            role_listing_route,
            staff_route,
            access_control_route,
            skills_route,
            role_route,
        )

        # Register routes
        app.register_blueprint(api, url_prefix="/api")

        return app


def register_error_handlers(app: Flask):
    with app.app_context():
        # Register error handlers
        from . import errors

        app.register_error_handler(404, errors.handle_resource_not_found)
        app.register_error_handler(400, errors.handle_bad_request)
        app.register_error_handler(KeyError, errors.handle_key_error)
        app.register_error_handler(IntegrityError, errors.handle_integrity_error)
        app.register_error_handler(Exception, errors.handle_unhandled_exception)
        app.register_error_handler(ValidationError, errors.handle_validation_error)

        return app


def init_db():
    db.create_all()

    # region: Create access control roles
    user = AccessControl(AccessControlRole.USER.value)
    admin = AccessControl(AccessControlRole.ADMIN.value)
    manager = AccessControl(AccessControlRole.MANAGER.value)

    db.session.add(user)
    db.session.add(admin)
    db.session.add(manager)
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

    # region: Create Staff
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

    # region: Create role listings
    for i in range(1, 31):
        if i < 11:
            role_listing = RoleListing(
                role=role_account_manager,
                start_time=datetime.strptime(f"2023-09-{i}T08:15:33Z", time_format),
                end_time=datetime.strptime(f"2023-10-{i}T08:15:33Z", time_format),
            )
            db.session.add(role_listing)

        elif i < 21:
            role_listing = RoleListing(
                role=role_developer,
                start_time=datetime.strptime(f"2023-09-{i}T08:15:33Z", time_format),
                end_time=datetime.strptime(f"2023-10-{i}T08:15:33Z", time_format),
                applicants=[staff1, staff2] if i % 3 == 0 else [],
            )
            db.session.add(role_listing)

        else:
            role_listing = RoleListing(
                role=role_consultant,
                start_time=datetime.strptime(f"2023-09-{i}T08:15:33Z", time_format),
                end_time=datetime.strptime(f"2023-10-{i}T08:15:33Z", time_format),
            )
            db.session.add(role_listing)

        db.session.commit()

    # endregion
