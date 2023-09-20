from application.extensions import db
from application.enums.access_control_role import AccessControlRole
from sqlalchemy import Column, INTEGER, Enum
from sqlalchemy.orm import relationship


class AccessControl(db.Model):
    __tablename__ = "access_control"

    id = Column(
        name="access_id",
        primary_key=True,
        type_=INTEGER,
        nullable=False,
        autoincrement=True,
    )
    name = Column(
        name="access_control_name", type_=Enum(AccessControlRole), nullable=False
    )
    staff = relationship("Staff", back_populates="access_control", lazy=True)

    @classmethod
    def get_id(cls, name):
        return cls.query.filter_by(name=name).first().id

    def __init__(self, name):
        self.name = AccessControlRole[name]

    def json(self) -> dict:
        return {
            "id": self.id,
            "name": self.name.name,  # self.name is enum object, self.name.name is name of the enum object
        }

    def __repr__(self):
        return f"{self.json()}"
