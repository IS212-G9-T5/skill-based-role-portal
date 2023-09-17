from application.models.role_listing import RoleListing
from application import db

def find_all() -> list:
    listings = db.session.execute(db.select(RoleListing)).scalars().all()
    return listings

def find_by_id(id) -> RoleListing != None:
    listing = (
        db.session.execute(db.select(RoleListing).where(RoleListing.id == id)).scalars().first()
    )
    return listing

def create(listing: RoleListing) -> RoleListing:
    db.session.add(listing)
    db.session.commit()
    return listing