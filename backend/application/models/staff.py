from application.extensions import db
from sqlalchemy import Column, INTEGER, VARCHAR, ForeignKey
from sqlalchemy.orm import relationship
from application.models.staff_skill import staff_skills
from application.models.access_control import AccessControl

from application.models.role_application import role_applications


class Staff(db.Model):
    __tablename__ = "staff"

    id = Column(
        name="staff_id",
        primary_key=True,
        type_=INTEGER,
        nullable=False,
        autoincrement=True,
    )
    fname = Column(name="staff_fname", type_=VARCHAR(50), nullable=False)
    lname = Column(name="staff_lname", type_=VARCHAR(50), nullable=False)
    dept = Column(name="dept", type_=VARCHAR(50), nullable=False)
    country = Column(name="country", type_=VARCHAR(50), nullable=False)
    email = Column(name="email", type_=VARCHAR(50), nullable=False)
    role_id = Column(
        INTEGER,
        ForeignKey("access_control.access_id"),
        nullable=False,
        default=lambda: AccessControl.get_id("USER"),
    )

    access_control = relationship("AccessControl", back_populates="staff", lazy=True)

    skills = relationship(
        "Skill",
        secondary=staff_skills,
        back_populates="staff_with_skill",
        lazy="subquery",
    )

    applications = relationship(
        "RoleListing",
        secondary=role_applications,
        lazy=True,
        back_populates="applicants",
    )

    def __init__(self, fname, lname, dept, country, email, access_control, skills):
        self.fname = fname
        self.lname = lname
        self.dept = dept
        self.country = country
        self.email = email
        self.access_control = access_control
        self.skills = skills
        # self.applications = []

    def json(self) -> dict:
        return {
            "id": self.id,
            "fname": self.fname,
            "lname": self.lname,
            "dept": self.dept,
            "country": self.country,
            "email": self.email,
            "access_control": None
            if self.access_control is None
            else self.access_control.json().get("name", None),
            # "role_applications": [
            #     application.json() for application in self.applications
            # ],
        }

    def __repr__(self):
        return f"{self.json()}"
