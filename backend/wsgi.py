from datetime import datetime
import logging
from logging.handlers import TimedRotatingFileHandler
from application import init_app, register_blueprints, register_error_handlers
from application.config import Config
from application.extensions import db


if __name__ == "__main__":
    app = init_app(Config)
    app = register_blueprints(app)
    # CORS(app, supports_credentials=True)
    app = register_error_handlers(app)

    # region: configure logging
    current_date = datetime.now().strftime("%Y-%m-%d")
    file_handler = TimedRotatingFileHandler(
        f"logs/app-{current_date}.log",
        when="midnight",
        backupCount=10,
        encoding="utf-8",
    )
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(
        logging.Formatter("[%(asctime)s] [%(levelname)s | %(module)s] >>> %(message)s")
    )
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.DEBUG)
    # endregion

    with app.app_context():
        db.create_all()

    app.run(host="0.0.0.0", debug=True, port=5000)
