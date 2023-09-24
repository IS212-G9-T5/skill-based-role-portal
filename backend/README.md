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
poetry shell
poetry install
poetry run python wsgi.py
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

- Create a route in routes folder for the API endpoint for a new resource
- Create a service in services folder to support operations relating to the resource (for reusing the service across routes, services)
- Think of test cases; document them down in the test plan for future testers to review
- Write test cases for the new feature in `tests/functional` and `tests/unit` folders for API endpoint testing and unit testing respectively
- Add the new route under imports in the `application/__init__.py` file
