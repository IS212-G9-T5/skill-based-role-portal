from typing import List, Optional
from application.models.role_listing import RoleListing
from application.extensions import db
from flask_sqlalchemy.pagination import Pagination
from sqlalchemy import select
from application.models.role_skill import role_skills


def find_all_by_role_and_skills_paginated(
    skills_to_filter: List[str],
    role: str,
    page: int,
    page_size: int,
) -> Pagination:
    roles_filtered_by_skills = (
        (
            select(role_skills.c.role_name)
            .where(role_skills.c.skill_name.in_(skills_to_filter))
            .where(role_skills.c.role_name.icontains(role))
        )
        if skills_to_filter
        else (
            select(role_skills.c.role_name).where(
                role_skills.c.role_name.icontains(role)
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
        .order_by(RoleListing.end_date.desc())
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
    res = db.session.execute(db.select(RoleListing)).scalars().first()
    return res
