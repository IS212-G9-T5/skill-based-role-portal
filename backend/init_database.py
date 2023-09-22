from application import init_app, register_blueprints, init_db
from application.config import Config
from application.extensions import db
from sqlalchemy.orm import close_all_sessions

if __name__ == "__main__":
    app = init_app(Config)
    app = register_blueprints(app)
    with app.app_context():
        close_all_sessions()
        db.drop_all()
        init_db()
    print("Initialized database in production db")
