from typing import List, Optional
from application.models.role import Role
from application.extensions import db
from sqlalchemy import select


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


def find_one_random() -> Optional[Role]:
    res = (
        db.session.execute(select(Role).order_by(db.func.random()).limit(1))
        .scalars()
        .first()
    )
    return res
