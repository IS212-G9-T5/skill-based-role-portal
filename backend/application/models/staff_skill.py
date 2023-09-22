from application.extensions import db

staff_skills = db.Table(
    "staff_skill",
    db.Column("skill_name", db.VARCHAR(20), db.ForeignKey("skill.skill_name")),
    db.Column("staff_id", db.INTEGER, db.ForeignKey("staff.staff_id")),
)
