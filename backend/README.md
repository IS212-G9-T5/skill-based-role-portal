### Prerequisites

- Install [Poetry] (https://python-poetry.org/docs/#installation)
- Python 3.11

### Code Folder Structure for Backend

```
backend
├── README.md
├── wsgi.py (entry point)
├── config.py (config file)
├── application
│   ├── __init__.py (create app)
│   ├── models (database models)
│   │   ├── __init__.py
│   │   ├── ...
|   ├── routes (route mappings for each resouce's endpoint)
│   │   ├── __init__.py
│   │   ├── ...
│   ├── services (business logic to support each resource's endpoint)
│   │   ├── __init__.py
│   │   ├── ...
│   ├── dao (data access object to interact with database; used to support services)
│   │   ├── __init__.py
│   │   ├── ...
│   ├── dto (Data Transmission Objects)
│   │   ├── __init__.py
│   │   ├── ...
├── tests
│   ├── functional (functional/integration tests)
│   │   ├── ...
│   ├── unit (unit tests)
│   │   ├── ...
├── Dockerfile (docker file to build backend image)
├── pyproject.toml (python dependencies)
├── poetry.lock (lock file for python dependencies)
```

### How to run backend locally

Run `localDev.bat` (windows) or `localDev.sh` (mac) to start the backend server locally.

or run the following commands in the terminal:

```
cd backend
poetry install
poetry run python wsgi.py
```

### Running tests

```
poetry run python -B -m pytest
```
