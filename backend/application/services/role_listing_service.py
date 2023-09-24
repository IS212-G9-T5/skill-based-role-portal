from typing import List, Optional
from application.models.role_listing import RoleListing
from application.extensions import db
from flask_sqlalchemy.pagination import Pagination
from sqlalchemy.orm import joinedload


def find_all_paginated(page: int, page_size: int) -> Pagination:
    # listings = db.session.execute(db.select(RoleListing)).scalars().all() # without pagination

    listings = (
        RoleListing.query.order_by(RoleListing.end_date.desc())
        .options(joinedload(RoleListing.role))  # eager load the role object
        .paginate(page=page, per_page=page_size, error_out=False)
    )

    return listings


def find_by_id(id: int) -> Optional[RoleListing]:
    listing = (
        db.session.execute(db.select(RoleListing).where(RoleListing.id == id))
        .scalars()
        .first()
    )
    return listing


def create(listing: RoleListing) -> RoleListing:
    db.session.add(listing)
    db.session.commit()
    return listing
