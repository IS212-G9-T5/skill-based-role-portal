import calendar
from datetime import date
from application import init_app
from application.extensions import db
from application.models.role_listing import RoleListing
from application.config import Config
from application.services import role_service, skill_service, staff_service


def insert_role_listings_data():
    today = date.today()
    mm = today.month
    end_month = (mm % 12) + 1
    yyyy = today.year
    days = calendar.monthrange(yyyy, mm)[1] - 1

    for i in range(1, 101):
        role = role_service.find_one_random()
        role_listing = RoleListing(
            role=role,
            start_date=date(yyyy, mm - 1, (i % days) + 1),
            end_date=date(yyyy, end_month, (i % days) + 1),
        )
        db.session.add(role_listing)
        db.session.commit()


def insert_user_skills_data():
    user_ids = [140002, 140003, 140004]  # hardcoded staff of role User in db
    for uid in user_ids:
        user = staff_service.find_by_id(uid)
        skills = skill_service.find_unique(40)
        user.skills = skills
        db.session.add(user)
        db.session.commit()
    print(f"Inserted user skills data in db for user ids: {user_ids}")


if __name__ == "__main__":
    app = init_app(Config)
    with app.app_context():
        insert_user_skills_data()
        insert_role_listings_data()
    print("Inserted role listings data in db")
