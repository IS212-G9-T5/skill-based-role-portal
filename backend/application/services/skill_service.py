from typing import List, Optional
from application.models.skill import Skill
from application.extensions import db
from sqlalchemy import select


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
    res = (
        db.session.execute(select(Skill).order_by(db.func.random()).limit(1))
        .scalars()
        .first()
    )
    return res


def find_unique(n) -> List[Skill]:
    # find unique skills based on their names
    res = (
        db.session.execute(db.select(Skill).distinct(Skill.name).limit(n))
        .scalars()
        .all()
    )
    return res
