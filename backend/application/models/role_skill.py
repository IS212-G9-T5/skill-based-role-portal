from application.extensions import db

role_skills = db.Table(
    "role_skill",
    db.Column("role_name", db.VARCHAR(50), db.ForeignKey("role.role_name")),
    db.Column("skill_name", db.VARCHAR(50), db.ForeignKey("skill.skill_name")),
)
