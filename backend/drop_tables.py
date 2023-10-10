from application import init_app
from application.config import Config
from sqlalchemy.orm import close_all_sessions
from application.extensions import db

if __name__ == "__main__":
    app = init_app(Config)
    with app.app_context():
        close_all_sessions()
        db.drop_all()
    print("Dropped all tables in db")
