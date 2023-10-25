from application.extensions import db
from datetime import date, datetime, timedelta
from sqlalchemy import INTEGER, Column, VARCHAR, Enum, ForeignKey, DATE
from sqlalchemy.orm import relationship
from application.enums import RoleStatus

from application.models.role_application import role_applications


date_format = "%Y-%m-%d"


# time_format = "%Y-%m-%dT%H:%M:%SZ"
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

    start_date = Column(
        name="start_date", type_=DATE, nullable=False, default=date.today()
    )

    end_date = Column(
        name="end_date",
        type_=DATE,
        nullable=False,
        default=date.today() + timedelta(days=30),
    )

    status = Column(
        name="status", type_=Enum(RoleStatus), nullable=False, default=RoleStatus.OPEN
    )

    role = db.relationship("Role", back_populates="role_listing", lazy="joined")

    applicants = relationship(
        "Staff",
        secondary=role_applications,
        lazy=True,
        back_populates="applications",
    )

    def __init__(
        self,
        role,
        start_date=datetime.utcnow(),
        end_date=datetime.utcnow() + timedelta(days=30),
        status=RoleStatus.OPEN,
        applicants=[],
    ):
        self.role = role
        self.start_date = start_date
        self.end_date = end_date
        self.status = status
        self.applicants = applicants

    def json(self) -> dict:
        return {
            "id": self.id,
            "start_date": self.start_date.strftime(date_format),
            "end_date": self.end_date.strftime(date_format),
            "status": self.status.name,
            "role": self.role.json() if self.role else None,
            # "applicants": [applicant.id for applicant in self.applicants],
        }

    def __repr__(self):
        return f"{self.json()}"
