from application.models.staff import Staff
from application.extensions import db
from typing import List, Optional


def find_all() -> List[Staff]:
    res = db.session.execute(db.select(Staff)).scalars().all()
    return res


def find_by_id(id: str) -> Optional[Staff]:
    res = db.session.execute(db.select(Staff).where(Staff.id == id)).scalars().first()
    return res


def create(staff: Staff) -> Staff:
    db.session.add(staff)
    db.session.commit()
    return staff
