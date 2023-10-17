from typing import List, Optional
from application.models.staff import Staff
from application.extensions import db
from application.enums import AccessControlRole
from sqlalchemy import select, join

from application.models.access_control import AccessControl


def find_all() -> List[Staff]:
    res = db.session.execute(db.select(Staff)).scalars().all()
    return res


def find_by_id(id: int) -> Optional[Staff]:
    res = db.session.execute(db.select(Staff).where(Staff.id == id)).scalars().first()
    return res


def find_random_users(n: int = 1) -> List[Staff]:
    res = (
        db.session.execute(
            select(Staff)
            .join(AccessControl)
            .where(AccessControl.name == AccessControlRole.User.name)
            .order_by(db.func.random())
            .limit(n)
        )
        .scalars()
        .all()
    )

    return res


def find_random_hr() -> Optional[Staff]:
    res = (
        db.session.execute(
            select(Staff)
            .join(AccessControl)
            .where(AccessControl.name == AccessControlRole.HR.name)
            .order_by(db.func.random())
            .limit(1)
        )
        .scalars()
        .first()
    )

    return res


def find_random_manager() -> Optional[Staff]:
    res = (
        db.session.execute(
            select(Staff)
            .join(AccessControl)
            .where(AccessControl.name == AccessControlRole.Manager.name)
            .order_by(db.func.random())
            .limit(1)
        )
        .scalars()
        .first()
    )

    return res


def create(staff: Staff) -> Staff:
    db.session.add(staff)
    db.session.commit()
    return staff
