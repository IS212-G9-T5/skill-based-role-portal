from application.extensions import db
from sqlalchemy import Column, TEXT, VARCHAR
from sqlalchemy.orm import relationship

from .role_skill import role_skills
from application.models.staff_skill import staff_skills


class Skill(db.Model):
    __tablename__ = "skill"

    name = Column(
        name="skill_name", primary_key=True, type_=VARCHAR(50), nullable=False
    )
    description = Column(name="skill_desc", type_=TEXT, nullable=True)

    @property
    def skill_name(self):
        return self.name

    roles = relationship(
        "Role", secondary=role_skills, lazy=True, back_populates="skills"
    )

    staff_with_skill = relationship(
        "Staff", secondary=staff_skills, back_populates="skills", lazy=True
    )  # staff_with_skill is a list of Staff objects with this skill

    def __init__(self, name, description, roles=[], staff_with_skill=[]):
        self.name = name
        self.description = description
        self.roles = roles
        self.staff_with_skill = staff_with_skill

    def json(self) -> dict:
        return {"name": self.name, "description": self.description}

    def __repr__(self):
        return f"{self.json()}"
