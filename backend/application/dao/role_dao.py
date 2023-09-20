from application.models.role import Role
from application.extensions import db
from typing import List, Optional


def find_all() -> List[Role]:
    res = db.session.execute(db.select(Role)).scalars().all()
    return res


def find_by_name(name: str) -> Optional[Role]:
    res = db.session.execute(db.select(Role).where(Role.name == name)).scalars().first()
    return res


def create(role: Role) -> Role:
    db.session.add(role)
    db.session.commit()
    return role
