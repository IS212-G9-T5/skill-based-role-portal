from typing import List, Optional
from application.models.skill import Skill
from application.extensions import db
import uuid


def find_all() -> List[Skill]:
    res = db.session.execute(db.select(Skill)).scalars().all()
    return res


def find_by_name(name: str) -> Optional[Skill]:
    res = (
        db.session.execute(db.select(Skill).where(Skill.name == name)).scalars().first()
    )
    return res


def create(skill: Skill) -> Skill:
    db.session.add(skill)
    db.session.commit()
    return skill


def find_one_random() -> Optional[Skill]:
    res = db.session.execute(db.select(Skill)).scalars().first()
    return res
