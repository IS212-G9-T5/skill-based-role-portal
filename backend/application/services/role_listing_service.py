from typing import List, Optional
from application.models.role_listing import RoleListing
from application.extensions import db


def find_all() -> List[RoleListing]:
    listings = db.session.execute(db.select(RoleListing)).scalars().all()
    return listings


def find_by_name(name: str) -> Optional[RoleListing]:
    listing = (
        db.session.execute(db.select(RoleListing).where(RoleListing.name == name))
        .scalars()
        .first()
    )
    return listing


def create(listing: RoleListing) -> RoleListing:
    db.session.add(listing)
    db.session.commit()
    return listing
