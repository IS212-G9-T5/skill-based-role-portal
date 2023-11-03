<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
   <a href="https://github.com/IS212-G9-T5/skill-based-role-portal">
</div>
<div align="center">
   <img src="../.github/assets/logo_white.png" width="80" height="80">
</div>

<!-- TITLE -->

<h3 align="center">
   Internal Skill-based Role Portal Backend
</h3>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#about-the-project">About The Web Application</a></li>
    <li><a href="#target-group-of-users">Target Group of Users</a></li>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#initial-setup">Initial Setup</a></li>
        <ul>
            <li><a href="#use-hosted-database-for-setup">Use hosted database for setup</li>
            <li><a href="#starting-backend-server-using-docker-compose">Starting backend server using docker compose</li>
            <li><a href="#starting-local-backend-development-with-hot-reloading">Starting local backend development with hot reloading</li>
        <ul>
    <li><a href="approach-to-backend-development">Approach to backend development</a></li>
  </ul>
</details>

## About The Web Application

Our application is a platform for All-In-One staff to apply for open positions within the organisation based on skills that they have currently acquired from the organisation's internal Learning Management System (LMS) and Learning Journey Planning (LJP) System. HR, respective managers or directors will be able to view the applicants for these open positions that they are looking to fill. HR will also be able to list out open roles in the organisation. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Target Group of Users 

### Staff 
Staff can view open roles and apply for them. They can view their matched and missing skills for the role that they are applying.

### Managers and Directors 
Managers and Directors can view the skills of applicants. They can find candidates that are suitable for a role based on the skills required for that role. 

### Human Resource 
Administrators of the system. The system allows them to create role listings with the skills required for the role. They can perform the functions of Managers and Directors. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies

- Python Flask (https://flask.palletsprojects.com/en/3.0.x/)
- AWS RDS (https://aws.amazon.com/rds/)
- Poetry (https://python-poetry.org/docs/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Prerequisites

- Python 3.11
- [Poetry] for dependency management and virtual environment (https://python-poetry.org/docs/#installation)
- [Docker] for containerization (https://docs.docker.com/get-docker/)
- [Docker Compose] for container orchestration (https://docs.docker.com/compose/install/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

There are three ways to run the backend server and the database depending on your use case:

1. [Use hosted database for sharing data and front end integration] (#use-hosted-database)
2. [Starting backend and database using docker compose] (#starting-backend-server-using-docker-compose)
3. [Start local postgres database for backend development with hot reloading] (#starting-local-backend-development-with-hot-reloading)

## Initial setup

- Create a .env file in the backend folder with the following content:

```
JWT_SECRET_KEY=9a65ab65c5590c07be441f017993524e317f4e9961e45db66de261a9700806f8

# docker compose environment
SQLALCHEMY_DATABASE_URI=postgresql://postgres:postgres@db:5432/dev
SQLALCHEMY_TEST_DATABASE_URI=postgresql://postgres:postgres@db:5432/test
```

```
cd backend
poetry shell
poetry shell
python -m flask --app wsgi:app run

```

### Use hosted database for setup

- Uncomment the following lines in .env file and comment out the other lines with the same variable name

```env
# region: Use hosted database for sharing data and front end integration]
SQLALCHEMY_DATABASE_URI=[hosted database url]
SQLALCHEMY_TEST_DATABASE_URI=[hosted database url]
# endregion
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Starting backend server using docker compose

- Uncomment the following lines in .env file and comment out the other lines with the same variable name

```
# region: For starting backend and database using docker compose
SQLALCHEMY_DATABASE_URI=postgresql://postgres:postgres@db:5432/dev
SQLALCHEMY_TEST_DATABASE_URI=postgresql://postgres:postgres@db:5432/test
# endregion
```

- Build docker compose images and start backend server and database

```
cd backend
docker-compose up -d
```

- You can view the logs by `docker-compose logs -f` that database is ready to accept connections

- Insert data into database (only needs to be run once). Open a new terminal tab (for the backend) and run the following commands:

```
docker exec -it backend bash
```

- Once in backend container, run the following commands:

```
poetry shell
rm -r migrations
python -m flask db init
python -m flask db migrate -m "initial migration"
python -m flask db upgrade
```

- Seed provided csv data into database. Open a new terminal tab (for the database) and run the following commands:

```bash
docker exec -it db bash
```

- Once in db container, run the following commands:

```bash
cd data

psql -U postgres --password -d dev

# enter password as postges

\copy access_control from 'Access_Control.csv' WITH DELIMITER ',' CSV HEADER;

\copy role from 'role.csv' WITH DELIMITER ',' CSV HEADER;

\copy skill from 'skill.csv' WITH DELIMITER ',' CSV HEADER;

\copy role_skill from 'role_skill.csv' WITH DELIMITER ',' CSV HEADER;

\copy staff from 'staff.csv' WITH DELIMITER ',' CSV HEADER;

\copy staff_skill from 'staff_skill.csv' WITH DELIMITER ',' CSV HEADER;

\q

Ctrl + D or Cmd + D to exit the db container

```

- Go to your backend terminal tab. Seed additional data to simulate data ported from other systems by running the following command:

```python
python init_database.py
```

- The backend server should be mapped as running on http://localhost:5000

#### Stopping backend server

```bash
docker-compose stop
```

#### Restarting backend server

```bash
docker-compose start
```

#### Teardown

- Exit poetry shell by running `exit`

- Exit backend container by pressing `Ctrl + D` or `Cmd + D`

- Stopping backend server

```bash
docker-compose down
```

#### Running tests (from backend docker container)

- Go into the backend docker container

```bash
docker exec -it backend bash
```

```
cd backend
poetry run python -B -m pytest --exitfirst

```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Starting local backend development with hot reloading

- Uncomment the following lines in .env file and comment out the other lines with the same variable name

```env
# region: for local backend dev
SQLALCHEMY_DATABASE_URI=postgresql://postgres:postgres@localhost:5432/dev # uncomment for local backend dev
SQLALCHEMY_TEST_DATABASE_URI=postgresql://postgres:postgres@localhost:5432/test # uncomment for local backend dev
# endregion
```

- Start the database

```
cd backend
docker-compose -f docker-compose-dev.yml up -d
```

- Check the logs by `docker logs -f pg_db` that database is ready to accept connections

- Insert data into database (only needs to be run once). Open a new terminal tab (for the database) and run the following commands:

```
cd backend
poetry shell
rm -r migrations
python -m flask db init
python -m flask db migrate -m "initial migration"
python -m flask db upgrade
```

- Seed provided csv data into database. Open a new terminal tab (for the database) and run the following commands:

```

docker exec -it pg_db bash

cd data

psql -U postgres --password -d dev

\copy access_control from 'Access_Control.csv' WITH DELIMITER ',' CSV HEADER;

\copy role from 'role.csv' WITH DELIMITER ',' CSV HEADER;

\copy skill from 'skill.csv' WITH DELIMITER ',' CSV HEADER;

\copy role_skill from 'role_skill.csv' WITH DELIMITER ',' CSV HEADER;

\copy staff from 'staff.csv' WITH DELIMITER ',' CSV HEADER;

\copy staff_skill from 'staff_skill.csv' WITH DELIMITER ',' CSV HEADER;

\q

Ctrl + D or Cmd + D to exit the container

```

- Go to your backend terminal tab. Seed additional data to simulate data ported from other systems by running the following command:

```
python init_database.py
```

- Start the backend server for local development with hot reloading

```
poetry shell
poetry install
python -m flask --app wsgi:app --debug run
```

- Exit poetry shell by running `exit`

#### Stop backend server

```bash
docker-compose -f docker-compose-dev.yml stop
```

#### Restart backend server

```bash
docker-compose -f docker-compose-dev.yml start
```

#### Tear down

- Stopping the database (data is persisted in the volume so long as the volume is not removed)

```bash
docker-compose -f docker-compose-dev.yml down
```

#### Running tests (locally)

```
cd backend
poetry run python -B -m pytest --exitfirst

```

To capturing the std output (-s flag) and more detailed information (-v flag), run the following command:

```
poetry run python -B -m pytest -s -v --exitfirst
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Approach to backend development

- Create a route in routes folder for the API endpoint for a new resource
- Create a service in services folder to support operations relating to the resource (for reusing the service across routes, services)
- Think of test cases; document them down in the test plan for future testers to review
- Write test cases for the new feature in `tests/functional`for API endpoint testing
- Add the new route under imports in the `application/__init__.py` file

<p align="right">(<a href="#readme-top">back to top</a>)</p>