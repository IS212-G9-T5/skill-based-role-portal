### Prerequisites

- Install [Poetry] (https://python-poetry.org/docs/#installation)
- Python 3.11

### Code Folder Structure for Backend

```
backend
├── README.md
├── wsgi.py (entry point)
|── init_database.py (script to initialize database with data)
├── config.py (config file)
├── .env (environment variables)
├── application
│   ├── __init__.py (create app)
│   ├── models (database models)
|   ├── routes (route mappings for each resource's endpoint)
│   ├── services (business logic to support each resource's endpoint; meant to be reusable across routes, services)
│   ├── dto (Data Transmission Objects)
├── logs (logs of backend application)
├── tests
│   ├── functional (functional/integration tests)
│   ├── unit (unit tests)
│   ├── conftest.py (pytest configuration; fixtures)
├── Dockerfile (docker file to build backend image)
├── pyproject.toml (python dependencies)
├── poetry.lock (lock file for python dependencies)
```

### How to run backend locally

- Create a .env file in the backend folder with the following content:

```
SQLALCHEMY_DATABASE_URI=postgresql://{username}:{password}@{host}:{port}/{db}
SQLALCHEMY_TEST_DATABASE_URI=postgresql://{username}:{password}@{host}:{port}/{db}
```

- Replace the values in {} with the actual values
- Run the following commands:

```
cd backend
poetry shell # activate virtual environment
poetry install
poetry run python -m flask --app wsgi:app run
```

### Running backend with Waitress server (production)

```
cd backend
poetry run waitress-serve --port 5000 wsgi:app
```

### Running tests

```
poetry run python -B -m pytest
```

To capturing the std output (-s flag) and more detailed information (-v flag), run the following command:

```
poetry run python -B -m pytest -s -v
```

### Starting backend development

```
cd backend
poetry shell # activate virtual environment
poetry install
python -m flask --app wsgi:app --debug run
```

- Create a route in routes folder for the API endpoint for a new resource
- Create a service in services folder to support operations relating to the resource (for reusing the service across routes, services)
- Think of test cases; document them down in the test plan for future testers to review
- Write test cases for the new feature in `tests/functional` and `tests/unit` folders for API endpoint testing and unit testing respectively
- Add the new route under imports in the `application/__init__.py` file

### Database schema migration

Migrate SQLAlchemy models schema to database

```
cd backend
poetry shell # activate virtual environment
python -m flask db init
python -m flask db migrate -m "initial migration" # create migration script
python -m flask db upgrade # apply migration script
```

### Database seeding

```
cd backend
poetry shell # activate virtual environment
python drop_tables.py # drop all tables
python -m flask db migrate -m "initial migration" # create migration script
python -m flask db upgrade # apply migration script
```

Enter PSQL shell in PGAdmin or terminal connected to the postgres db and run the following commands:

```
\copy access_control from '{absolute_path_to_csv}\Access_Control.csv' WITH DELIMITER ',' CSV HEADER;

\copy role from '{absolute_path_to_csv}\role.csv' WITH DELIMITER ',' CSV HEADER;

\copy skill from '{absolute_path_to_csv}\skill.csv' WITH DELIMITER ',' CSV HEADER;

\copy role_skill from '{absolute_path_to_csv}\role_skill.csv' WITH DELIMITER ',' CSV HEADER;

\copy staff from '{absolute_path_to_csv}\staff.csv' WITH DELIMITER ',' CSV HEADER;

\copy staff_skill from '{absolute_path_to_csv}\staff_skill.csv' WITH DELIMITER ',' CSV HEADER;

```

Inserting data for role listings

```
python init_database.py
```
