from typing import List, Optional
from application.models.role_listing import RoleListing
from application.extensions import db
from flask_sqlalchemy.pagination import Pagination
from sqlalchemy import select
from application.models.role_skill import role_skills
from application.models.role_application import role_applications
from application.models.staff import Staff
from application.enums import RoleStatus


def find_all_by_role_and_skills_paginated(
    skills_to_filter: List[str],
    role: str,
    page: int,
    page_size: int,
) -> Pagination:
    roles_filtered_by_skills = (
        (
            select(role_skills.c.role_name)
            .where(
                role_skills.c.skill_name.in_(skills_to_filter),
                role_skills.c.role_name.ilike(f"{role}%"),
            )
            .group_by(role_skills.c.role_name)
            .having(db.func.count(role_skills.c.skill_name) >= len(skills_to_filter))
        )
        if skills_to_filter
        else (
            select(role_skills.c.role_name).where(
                role_skills.c.role_name.ilike(f"{role}%")
            )
        )
    )

    stmt = (
        select(RoleListing)
        .where(
            RoleListing.start_date <= db.func.current_date(),
            db.func.current_date() <= RoleListing.end_date,
        )
        .where(RoleListing.role_name.in_(roles_filtered_by_skills))
        .order_by(RoleListing.end_date.asc())
    )

    return db.paginate(stmt, page=page, per_page=page_size, error_out=False)


def find_all_available_listings_paginated(page: int, page_size: int) -> Pagination:
    stmt = (
        select(RoleListing)
        .where(
            RoleListing.start_date <= db.func.current_date(),
            db.func.current_date() <= RoleListing.end_date,
        )
        .order_by(RoleListing.end_date.asc())
    )

    return db.paginate(stmt, page=page, per_page=page_size, error_out=False)


def find_by_id(id: int) -> Optional[RoleListing]:
    listing = (
        db.session.execute(db.select(RoleListing).where(RoleListing.id == id))
        .scalars()
        .first()
    )
    return listing


def save(listing: RoleListing) -> RoleListing:
    db.session.add(listing)
    db.session.commit()
    return listing


def find_one_random() -> Optional[RoleListing]:
    res = (
        db.session.execute(select(RoleListing).order_by(db.func.random()).limit(1))
        .scalars()
        .first()
    )
    return res


def compute_skills_match_data(staff: Staff, listing: RoleListing):
    staff_skills = set(staff.skills)

    listing_skills = listing.role.skills
    skills_required = set(listing_skills if listing_skills is not None else [])

    skills_matched = skills_required.intersection(staff_skills)
    skills_unmatched = skills_required.difference(staff_skills)
    skills_match_count = len(skills_matched)
    skills_match_pct = round(skills_match_count / len(skills_required), 2)

    res = {
        "skills_matched": [s.json() for s in skills_matched],
        "skills_unmatched": [s.json() for s in skills_unmatched],
        "skills_match_count": skills_match_count,
        "skills_match_pct": skills_match_pct,
    }

    return res


def create_role_application(role_listing_id: int, staff_id: int):
    stmt = role_applications.insert().values(
        role_listing_id=role_listing_id,
        staff_id=staff_id,
    )
    db.session.execute(stmt)
    db.session.commit()


def delete_role_application(role_listing_id: int, staff_id: int):
    stmt = role_applications.delete().where(
        role_applications.c.role_listing_id == role_listing_id,
        role_applications.c.staff_id == staff_id,
    )
    db.session.execute(stmt)
    db.session.commit()


def find_by_most_matched_skills(
    skills_to_filter: List[str], limit: int = 10
) -> List[RoleListing]:
    open_listings = (
        select(RoleListing.role_name)
        .where(
            RoleListing.start_date <= db.func.current_date(),
            db.func.current_date() <= RoleListing.end_date,
            RoleListing.status == RoleStatus.OPEN.value,
        )
        .distinct(RoleListing.role_name)
    )

    best_matched_roles = (
        select(RoleListing.role_name)
        .join(role_skills, RoleListing.role_name == role_skills.c.role_name)
        .where(
            role_skills.c.role_name.in_(open_listings),
            role_skills.c.skill_name.in_(skills_to_filter),
        )
        .group_by(RoleListing.role_name)
        .order_by(
            (
                db.func.count(db.func.distinct(role_skills.c.skill_name))
                / len(skills_to_filter)
            ).desc()
        )
        .limit(limit)
    )
    stmt = (
        select(RoleListing)
        .distinct(RoleListing.role_name)  # return role listings with unique role names
        .where(
            RoleListing.role_name.in_(best_matched_roles),
        )
    )

    res = db.session.execute(stmt).scalars().all()
    return res
