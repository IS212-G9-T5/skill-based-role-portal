from application.extensions import db
from datetime import datetime, timedelta
from sqlalchemy import INTEGER, Column, TIMESTAMP, VARCHAR, Enum, ForeignKey
from sqlalchemy.orm import relationship
from application.enums.role_status import RoleStatus

from application.models.role_application import role_applications

time_format = "%Y-%m-%dT%H:%M:%SZ"


class RoleListing(db.Model):
    __tablename__ = "role_listing"

    id = Column(
        name="role_listing_id",
        primary_key=True,
        type_=INTEGER,
        nullable=False,
        autoincrement=True,
    )

    role_name = Column(VARCHAR(50), ForeignKey("role.role_name"), nullable=False)

    start_time = Column(
        name="start_time", type_=TIMESTAMP, nullable=False, default=datetime.utcnow
    )

    end_time = Column(
        name="end_time",
        type_=TIMESTAMP,
        nullable=False,
        default=datetime.utcnow() + timedelta(days=30),
    )

    status = Column(
        name="status", type_=Enum(RoleStatus), nullable=False, default=RoleStatus.OPEN
    )

    role = relationship("Role", back_populates="role_listing", lazy="subquery")

    applicants = relationship(
        "Staff",
        secondary=role_applications,
        lazy=True,
        back_populates="applications",
    )

    def __init__(self, start_time, end_time, role, status=None, applicants=[]):
        self.start_time = start_time
        self.end_time = end_time
        self.role = role
        self.status = status
        self.applicants = applicants

    def json(self) -> dict:
        return {
            "id": self.id,
            "start_time": self.start_time.strftime(time_format),
            "end_time": self.end_time.strftime(time_format),
            "status": self.status.name,
            "role": self.role.json(),
            # "applicants": [applicant.id for applicant in self.applicants],
        }

    def __repr__(self):
        return f"{self.json()}"
