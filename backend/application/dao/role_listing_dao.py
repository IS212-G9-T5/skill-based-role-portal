from application.models.role_listing import RoleListing
from application.extensions import db
from typing import List, Optional


def find_all() -> List[RoleListing]:
    listings = db.session.execute(db.select(RoleListing)).scalars().all()
    return listings


def find_by_name(
    name: str,
) -> Optional[RoleListing]:  # Optional[RoleListing] is same as RoleListing | None
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
