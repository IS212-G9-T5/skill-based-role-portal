from application.extensions import db
from application.enums.application_status import ApplicationStatus


role_applications = db.Table(
    "role_application",
    db.Column(
        "role_listing_id", db.INTEGER, db.ForeignKey("role_listing.role_listing_id")
    ),
    db.Column("staff_id", db.INTEGER, db.ForeignKey("staff.staff_id")),
    db.Column(
        "application_status",
        db.Enum(ApplicationStatus),
        nullable=False,
        default=ApplicationStatus.PENDING,
    ),
)
