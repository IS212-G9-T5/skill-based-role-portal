from application import init_app
from application.config import TestConfig

# app = None
# if app.config["ENV"] == "test":
#     app = init_app(TestConfig)
#     print("Running flask with test config")
# else:
app = init_app()
# print(f'app.config["DEBUG"]: {app.config["DEBUG"]}')
