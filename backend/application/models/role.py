from application.extensions import db
from sqlalchemy import Column, TEXT, VARCHAR
from sqlalchemy.orm import relationship
from .role_skill import role_skills


class Role(db.Model):
    __tablename__ = "role"

    name = Column(name="role_name", primary_key=True, type_=VARCHAR(50), nullable=False)
    description = Column(name="role_desc", type_=TEXT, nullable=True)

    role_listing = relationship("RoleListing", back_populates="role", lazy=True)

    skills = relationship(
        "Skill", secondary=role_skills, lazy=True, back_populates="roles"
    )

    @property
    def role_name(self):
        return self.name

    def __init__(self, name, description, skills=[]):
        self.name = name
        self.description = description
        self.skills = skills

    def json(self) -> dict:
        return {
            "name": self.name,
            "description": self.description,
            "skills": [skill.name for skill in self.skills],
        }

    def __repr__(self):
        return f"{self.json()}"
