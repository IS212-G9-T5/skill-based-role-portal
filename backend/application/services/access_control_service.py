from typing import List, Optional
from application.dao import access_control_dao
from application.models.access_control import AccessControl


def find_all() -> List[AccessControl]:
    res = access_control_dao.find_all()
    return res


def find_by_id(id: int) -> Optional[AccessControl]:
    res = access_control_dao.find_by_id(id)
    return res


def find_by_name(name: str) -> Optional[AccessControl]:
    res = access_control_dao.find_by_name(name)
    return res


def create(obj: AccessControl) -> AccessControl:
    access_control_dao.create(obj)
    return obj.json()
