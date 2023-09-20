from typing import List, Optional
from application.dao import role_listing_dao
from application.models.role_listing import RoleListing


def find_all() -> List[RoleListing]:
    listings = role_listing_dao.find_all()
    return listings


def find_by_name(name: str) -> Optional[RoleListing]:
    listing = role_listing_dao.find_by_name(name)
    return listing


def create(listing: RoleListing) -> RoleListing:
    role_listing_dao.create(listing)
    return listing.json()


# def random_create() -> RoleListing:
# listing = RoleListing()
# listing = role_listing_dao.create()
# return listing.json()
