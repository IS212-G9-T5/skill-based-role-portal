from typing import List, Optional
from application.dao import role_dao
from application.models.role import Role


def find_all() -> List[Role]:
    res = role_dao.find_all()
    return res


def find_by_name(name: str) -> Optional[Role]:
    res = role_dao.find_by_name(name)
    return res


def create(role: Role) -> Role:
    role_dao.create(role)
    return role.json()
