from application.models.access_control import AccessControl
from application.extensions import db
from typing import List, Optional


def find_all() -> List[AccessControl]:
    res = db.session.execute(db.select(AccessControl)).scalars().all()
    return res


def find_by_id(id: int) -> Optional[AccessControl]:
    res = (
        db.session.execute(db.select(AccessControl).where(AccessControl.id == id))
        .scalars()
        .first()
    )
    return res


def find_by_name(name: str) -> Optional[AccessControl]:
    res = (
        db.session.execute(db.select(AccessControl).where(AccessControl.name == name))
        .scalars()
        .first()
    )
    return res


def create(obj: AccessControl) -> AccessControl:
    db.session.add(obj)
    db.session.commit()
    return obj
