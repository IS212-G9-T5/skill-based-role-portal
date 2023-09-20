from typing import List, Optional
from application.dao import staff_dao
from application.models.staff import Staff


def find_all() -> List[Staff]:
    res = staff_dao.find_all()
    return res


def find_by_id(id: int) -> Optional[Staff]:
    res = staff_dao.find_by_id(id)
    return res


def create(staff: Staff) -> Staff:
    staff_dao.create(staff)
    return staff
