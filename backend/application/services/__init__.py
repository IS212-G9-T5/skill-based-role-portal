from flask import abort
from application.dao import role_listing_dao
from application.models.role_listing import RoleListing

def find_all() -> list:
    listings = role_listing_dao.find_all()
    return listings

def find_by_id_or_throw(id) -> RoleListing:
    listing = role_listing_dao.find_by_id(id)

    if listing is None:
        abort(404, description=f"RoleListing {str(id)} not found.")

    return listing.json()

def create(listing: RoleListing) -> RoleListing:
    role_listing_dao.create(listing)
    return listing.json()