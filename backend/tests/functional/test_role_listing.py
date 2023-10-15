from datetime import date, datetime, timedelta
from flask.testing import FlaskClient
from sqlalchemy import select
from application.services import role_service, role_listing_service
from application.routes.role_listing_route import DEFAULT_PAGE_SIZE
from application.models.role import Role
from application.models.skill import Skill
from application.models.role_listing import RoleListing
from application.services import skill_service

ENDPOINT = "/api/listings"


# def test_stuff(db):
#     role = Role(name="Astronaut", description="To go to space")
#     role_service.create(role)
#     assert role.name == "Astronaut"


# region: get individual role listing
def test_get_indiv_role_listing(db, random_user_client: FlaskClient, init_database):
    """
    GIVEN the user is logged in as HR, there is 1 role listing created,
    WHEN the API endpoint 'role_listing' is requested (GET) with /{id} where id is a valid role listing id
    THEN check that
        - the response returns HTTP 200
        - role listing object id matches the id in the request path
    """
    # region create role listing
    role = role_service.find_one_random()

    today = date.today()
    start_date = date(today.year, today.month, today.day)
    end_date = start_date + timedelta(days=30)

    role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
    db.session.add(role_listing)
    db.session.commit()
    # endregion

    id = role_listing.id
    response = random_user_client.get(path=f"{ENDPOINT}/{id}")

    # check response
    assert response.status_code == 200
    assert response.json is not None
    assert response.json["listing"]["id"] == id


# endregion


# region: creation of role listing
def test_create_role_listing_success(
    random_hr_client: FlaskClient,
    random_hr_client_x_csrf_token_header,
    init_database,
):
    """
    GIVEN the user is logged in as HR, there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that exists
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 201 and the response body contains the same role name, start date and end date
    """
    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    start_date = date.today().strftime("%Y-%m-%d")
    end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")
    response = random_hr_client.post(
        path=ENDPOINT,
        headers=random_hr_client_x_csrf_token_header,
        json={"role_name": role.name, "start_date": start_date, "end_date": end_date},
    )

    # check response
    assert response.status_code == 201
    assert response.json["data"]["role"]["name"] == role.name
    assert response.json["data"]["start_date"] == start_date
    assert response.json["data"]["end_date"] == end_date


# missing fields e.g. start date, end date, role name
def test_create_role_listing_missing_fields(
    random_hr_client: FlaskClient, random_hr_client_x_csrf_token_header, init_database
):
    """
    GIVEN the user is logged in as HR, there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing any following fields that are missing
        - role_name
        - start_date
        - end_date
    THEN check that the response returns HTTP 400
    """

    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    start_date = date.today().strftime("%Y-%m-%d")
    end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

    # role_name missing
    response = random_hr_client.post(
        path=ENDPOINT,
        headers=random_hr_client_x_csrf_token_header,
        json={"start_date": start_date, "end_date": end_date},
    )

    assert response.status_code == 400

    # start_date missing
    response = random_hr_client.post(
        path=ENDPOINT,
        headers=random_hr_client_x_csrf_token_header,
        json={"role_name": role.name, "end_date": end_date},
    )
    assert response.status_code == 400

    # end_date missing
    response = random_hr_client.post(
        path=ENDPOINT,
        headers=random_hr_client_x_csrf_token_header,
        json={"role_name": role.name, "start_date": start_date},
    )
    assert response.status_code == 400


def test_create_role_listing_start_date_gt_end_date(
    random_hr_client: FlaskClient, random_hr_client_x_csrf_token_header, init_database
):
    """
    GIVEN the user is logged in as HR, there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that exists
        - the start date for the role listing (greater than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 400
    """
    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    start_date = date.today().strftime("%Y-%m-%d")
    end_date = (date.today() - timedelta(days=30)).strftime("%Y-%m-%d")
    response = random_hr_client.post(
        path=ENDPOINT,
        headers=random_hr_client_x_csrf_token_header,
        json={"role_name": role.name, "start_date": start_date, "end_date": end_date},
    )

    # check response
    assert response.status_code == 400


def test_create_role_listing_role_name_not_exist(
    random_hr_client: FlaskClient, random_hr_client_x_csrf_token_header, init_database
):
    """
    GIVEN the user is logged in as HR, there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that does not exist
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 404
    """

    role_name = "Astronaut"

    start_date = date.today().strftime("%Y-%m-%d")
    end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")
    response = random_hr_client.post(
        path=ENDPOINT,
        headers=random_hr_client_x_csrf_token_header,
        json={"role_name": role_name, "start_date": start_date, "end_date": end_date},
    )

    # check response
    assert response.status_code == 404


def test_create_role_listing_user(
    random_user_client: FlaskClient,
    random_user_client_x_csrf_token_header,
    init_database,
):
    """
    GIVEN the user is logged in as user,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that exists
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 403
    """
    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    start_date = date.today().strftime("%Y-%m-%d")
    end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

    # User should get 403
    response = random_user_client.post(
        path=ENDPOINT,
        headers=random_user_client_x_csrf_token_header,
        json={"role_name": role.name, "start_date": start_date, "end_date": end_date},
    )

    # check response
    assert response.status_code == 403


def test_create_role_listing_manager(
    random_manager_client: FlaskClient,
    random_manager_client_x_csrf_token_header,
    init_database,
):
    """
    GIVEN the user is logged in as manager,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that exists
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 403
    """
    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    start_date = date.today().strftime("%Y-%m-%d")
    end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

    # User should get 403
    response = random_manager_client.post(
        path=ENDPOINT,
        headers=random_manager_client_x_csrf_token_header,
        json={"role_name": role.name, "start_date": start_date, "end_date": end_date},
    )

    # check response
    assert response.status_code == 403


# endregion of create role listing


def test_update_role_listing_user(
    random_user_client: FlaskClient,
    random_user_client_x_csrf_token_header,
    init_database,
):
    """
    GIVEN the user is logged in as user,
    WHEN the API endpoint 'role_listing' is requested (PUT) with valid request body containing
        - the role name for the role that exists
        - the start date for the role listing
        - the end date for the role listing
    THEN check that the response returns HTTP 403
    """
    listing = role_listing_service.find_one_random()
    if listing is None:
        # Create a role listing
        role = role_service.find_one_random()
        assert role is not None, "No roles found in database"

        start_date = date.today().strftime("%Y-%m-%d")
        end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

        role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
        listing = role_listing_service.save(role_listing)

    id = listing.id

    # Update the role listing, including applicants and skills
    start_date = "2023-09-14"
    end_date = "2023-10-14"
    status = "OPEN"
    response = random_user_client.put(
        path=f"{ENDPOINT}/{id}",
        headers=random_user_client_x_csrf_token_header,
        json={
            "start_date": start_date,
            "end_date": end_date,
            "status": status,
        },
    )
    # check response
    assert response.status_code == 403


def test_update_role_listing_manager(
    random_manager_client: FlaskClient,
    random_manager_client_x_csrf_token_header,
    init_database,
):
    """
    GIVEN the user is logged in as manager,
    WHEN the API endpoint 'role_listing' is requested (PUT) with valid request body containing
        - the role name for the role that exists
        - the start date for the role listing
        - the end date for the role listing
    THEN check that the response returns HTTP 403
    """
    listing = role_listing_service.find_one_random()
    if listing is None:
        # Create a role listing
        role = role_service.find_one_random()
        assert role is not None, "No roles found in database"

        start_date = date.today().strftime("%Y-%m-%d")
        end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

        role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
        listing = role_listing_service.save(role_listing)

    id = listing.id

    # Update the role listing, including applicants and skills
    start_date = "2023-09-14"
    end_date = "2023-11-14"
    status = "OPEN"
    response = random_manager_client.put(
        path=f"{ENDPOINT}/{id}",
        headers=random_manager_client_x_csrf_token_header,
        json={
            "start_date": start_date,
            "end_date": end_date,
            "status": status,
        },
    )
    # check response
    assert response.status_code == 403


def test_create_role_listing_manager(
    random_manager_client: FlaskClient,
    random_manager_client_x_csrf_token_header,
    init_database,
):
    """
    GIVEN the user is logged in as manager,
    WHEN the API endpoint 'role_listing' is requested (PUT) with request body containing
        - the role name for the role that exists
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 403
    """
    listing = role_listing_service.find_one_random()
    if listing is None:
        # Create a role listing
        role = role_service.find_one_random()
        assert role is not None, "No roles found in database"

        start_date = date.today().strftime("%Y-%m-%d")
        end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

        role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
        listing = role_listing_service.save(role_listing)

    id = listing.id

    # Update the role listing, including applicants and skills
    start_date = "2023-09-14"
    end_date = "2023-10-14"
    status = "OPEN"
    response = random_manager_client.put(
        path=f"{ENDPOINT}/{id}",
        headers=random_manager_client_x_csrf_token_header,
        json={
            "start_date": start_date,
            "end_date": end_date,
            "status": status,
        },
    )
    # check response
    assert response.status_code == 403


# region: update role listing success
def test_update_role_listing_success(
    random_hr_client: FlaskClient, random_hr_client_x_csrf_token_header, init_database
):
    """
    GIVEN the user is logged in as HR, there is an existing role listing,
    WHEN the API endpoint 'role_listing' is requested (PUT) with request body containing
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
        - a status that exists in the enum
    THEN check that the response returns HTTP 200 and the response body contains the updated data.
    """
    listing = role_listing_service.find_one_random()
    if listing is None:
        # Create a role listing
        role = role_service.find_one_random()
        assert role is not None, "No roles found in database"

        start_date = date.today().strftime("%Y-%m-%d")
        end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

        role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
        listing = role_listing_service.save(role_listing)

    id = listing.id

    # Update the role listing, including applicants and skills
    start_date = "2023-09-14"
    end_date = "2023-10-14"
    status = "OPEN"
    response = random_hr_client.put(
        path=f"{ENDPOINT}/{id}",
        headers=random_hr_client_x_csrf_token_header,
        json={
            "start_date": start_date,
            "end_date": end_date,
            "status": status,
        },
    )
    # Check response
    assert response.status_code == 200
    assert response.json["data"]["start_date"] == start_date
    assert response.json["data"]["end_date"] == end_date
    assert response.json["data"]["status"] == status


def test_update_role_listing_status_not_exist(
    random_hr_client: FlaskClient, random_hr_client_x_csrf_token_header, init_database
):
    """
    GIVEN the user is logged in as HR, there is an existing role listing,
    WHEN the API endpoint 'role_listing' is requested (PUT) with request body containing
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
        - a status that DOES NOT exist in the enum
    THEN check that the response returns HTTP 400
    """
    listing = role_listing_service.find_one_random()
    if listing is None:
        # Create a role listing
        role = role_service.find_one_random()
        assert role is not None, "No roles found in database"

        start_date = date.today().strftime("%Y-%m-%d")
        end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

        role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
        listing = role_listing_service.save(role_listing)

    id = listing.id

    # Update the role listing, including applicants and skills
    start_date = "2023-09-14"
    end_date = "2023-10-14"
    status = "OPEN"
    response = random_hr_client.put(
        path=f"{ENDPOINT}/{id}",
        headers=random_hr_client_x_csrf_token_header,
        json={
            "start_date": start_date,
            "end_date": end_date,
            "status": "NIL",
        },
    )

    # Check response
    assert response.status_code == 400


def test_update_role_listing_start_date_gt_end_date(
    random_hr_client: FlaskClient, random_hr_client_x_csrf_token_header, init_database
):
    """
    GIVEN the user is logged in as HR, there is an existing role listing,
    WHEN the API endpoint 'role_listing' is requested (PUT) with request body containing
        - the start date for the role listing is GREATER than end date
        - the end date for the role listing
        - a status that exists in the enum
    THEN check that the response returns HTTP 400
    """
    listing = role_listing_service.find_one_random()
    if listing is None:
        # Create a role listing
        role = role_service.find_one_random()
        assert role is not None, "No roles found in database"

        start_date = date.today().strftime("%Y-%m-%d")
        end_date = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")

        role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
        listing = role_listing_service.save(role_listing)

    id = listing.id

    # Update the role listing, including applicants and skills
    start_date = "2023-11-14"
    end_date = "2023-10-14"
    response = random_hr_client.put(
        path=f"{ENDPOINT}/{id}",
        headers=random_hr_client_x_csrf_token_header,
        json={
            "start_date": start_date,
            "end_date": end_date,
            "status": "CLOSED",
        },
    )
    # Check response
    assert response.status_code == 400


# endregion: update role listings


# region: get role listings
def test_get_role_listing_paginated_success_no_params(
    random_user_client: FlaskClient,
    init_database,
    create_role_listings,
):
    """
    GIVEN the user is logged in as user, there are at least 20 role listings created,
    WHEN the API endpoint 'role_listing' is requested (GET)
    THEN check that
        - the response returns HTTP 200
        - there are 10 items in the `items` field
        - `page` field is 1
        - `size` field is 10
        - `has_prev` field is False
        - `has_next` field is True
    """

    response = random_user_client.get(
        path=ENDPOINT,
    )

    # check response
    data = response.json
    assert response.status_code == 200
    assert data["items"] is not None
    assert len(data["items"]) == DEFAULT_PAGE_SIZE
    assert data["has_prev"] == False
    assert data["has_next"] == True
    assert data["page"] == 1


def test_get_role_listing_paginated_success_page_size_params_given(
    random_user_client: FlaskClient,
    init_database,
    create_role_listings,
):
    """
    GIVEN the user is logged in as user, there are at least 30 role listings created,
    WHEN the API endpoint 'role_listing' is requested (GET) with query params `size=15`, `page=2`,
    THEN check that
        - the response returns HTTP 200
        - `page` field is 2
        - `size` field is 10
        - there are 15 items in the `items` field
        - `has_prev` field is True
        - `has_next` field is True
    """
    page, size = 2, 10
    response = random_user_client.get(
        path=ENDPOINT, query_string={"page": page, "size": size}
    )

    # check response
    assert response.status_code == 200
    assert response.json["page"] == page
    assert response.json["size"] == size
    assert response.json["items"] is not None
    assert len(response.json["items"]) == size
    assert response.json["has_prev"] == True
    assert response.json["has_next"] == True


def test_get_role_listing_paginated_search_by_role(
    random_user_client: FlaskClient, init_database
):
    """
    GIVEN the user is logged in as user, there is a role listing with role name "Software Developer" created,
    WHEN the API endpoint 'role_listing' is requested (GET) with query params `role=software`,
    THEN check that
        - the response returns HTTP 200
        - there is at least 1 item in the `items` field
        - each of the item in the `items` field has a role name that contains "software"
    """
    # create role listing with role Software Developer
    skills = skill_service.find_unique(2)
    role = Role(name="Software Developer", description="lorem ipsum", skills=skills)
    role_service.create(role)

    today = date.today()
    start_date = date(today.year, today.month - 1, today.day)
    end_date = start_date + timedelta(days=30)

    role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
    role_listing_service.save(role_listing)

    response = random_user_client.get(path=ENDPOINT, query_string={"role": "software"})

    # check response
    assert response.status_code == 200
    data = response.json
    assert data["items"] is not None
    assert len(data["items"]) >= 1
    items = data["items"]
    for item in items:
        assert "dev" in item["listing"]["role"]["name"].lower()


def test_get_role_listing_paginated_search_by_role_empty_string(
    db, random_user_client: FlaskClient, init_database
):
    """
    GIVEN the user is logged in as user, there are role listings created
    WHEN the API endpoint 'role_listing' is requested (GET) with no query params for role
    THEN check that
        - the response returns HTTP 200
        - there is at least 1 item in the `items` field
        - the `total` field is the same as number of role listings in the database
    """

    response = random_user_client.get(path=ENDPOINT, query_string={"role": ""})
    # db_res = db.session.execute(db.select(RoleListing)).scalars().all()
    # db_res = role_listing_service.find_all_by_role_and_skills_paginated([], "", 1, 10)
    stmt = (
        select(RoleListing)
        .where(
            RoleListing.start_date <= db.func.current_date(),
            db.func.current_date() <= RoleListing.end_date,
        )
        .order_by(RoleListing.end_date.asc())
    )
    db_res = db.session.execute(stmt).scalars().all()

    # check response
    assert response.status_code == 200
    data = response.json
    assert data["items"] is not None
    assert len(data["items"]) >= 1
    assert data["total"] == len(db_res)


def test_get_role_listing_paginated_search_by_role_no_match(
    db, random_user_client: FlaskClient, init_database
):
    """
    GIVEN the user is logged in as user, there are role listings created
    WHEN the API endpoint 'role_listing' is requested (GET) for a role that does not exist
    THEN check that
        - the response returns HTTP 200
        - there is no item in the `items` field
        - the `total` field is 0
    """

    response = random_user_client.get(path=ENDPOINT, query_string={"role": "软件工程师"})

    # check response
    assert response.status_code == 200
    data = response.json
    assert data["items"] is not None
    assert len(data["items"]) == 0
    assert data["total"] == 0


def test_get_role_listing_paginated_search_by_skills(
    random_user_client: FlaskClient, init_database
):
    """
    GIVEN the user is logged in as user role, there is a role listing created with certain skills,
    WHEN the API endpoint 'role_listing' is requested (GET) with request param containing the skills,
    THEN check that
        - the response returns HTTP 200
        - there is at least 1 item in the `items` field
        - each of the item in the `items` field has a role that contains the skills in the request param
    """
    # create role listing with some skills
    skills = skill_service.find_unique(2)
    role = Role(name="Astronaut", description="To go to space", skills=skills)
    role_service.create(role)

    today = date.today()
    start_date = date(today.year, today.month - 1, today.day)
    end_date = start_date + timedelta(days=30)

    role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
    role_listing_service.save(role_listing)

    # search by skills
    request_param = [skill.name for skill in skills]
    # body = [skill.name for skill in skills]
    response = random_user_client.get(
        path=ENDPOINT, query_string={"skills": request_param}
    )

    # check response
    assert response.status_code == 200
    data = response.json
    items = data["items"]
    assert items is not None
    assert len(items) > 0
    for item in items:
        skills_required = set(item["listing"]["role"]["skills"])
        skills_matched = set(request_param).intersection(skills_required)
        assert len(skills_matched) >= len(request_param)


def test_get_role_listing_paginated_search_by_role_and_skills(
    random_user_client: FlaskClient, init_database
):
    """
    GIVEN the user is logged in as user, there is a role listing with role name "Risk Manager" created with certain skills,
    WHEN the API endpoint 'role_listing' is requested (GET) with query params containing the role name e.g. `role=man` and request body containing the skills,
    THEN check that
        - the response returns HTTP 200
        - there is at least 1 item in the `items` field
        - each of the item in the `items` field
            - has a role name that contains "dev"
            - has a role that contains the skills in the request body
    """

    # create role listing with some skills
    skills = skill_service.find_unique(2)
    role = Role(name="Risk Manager", description="lorem ipsum", skills=skills)
    role_service.create(role)

    today = date.today()
    start_date = date(today.year, today.month - 1, today.day)
    end_date = start_date + timedelta(days=30)

    role_listing = RoleListing(role=role, start_date=start_date, end_date=end_date)
    role_listing_service.save(role_listing)

    # search by role and skills
    request_param = [skill.name for skill in skills]
    role_to_search = "risk"
    response = random_user_client.get(
        path=ENDPOINT,
        query_string={"role": role_to_search, "skills": request_param},
    )

    # check response
    assert response.status_code == 200
    data = response.json
    items = data["items"]
    assert items is not None
    assert len(items) > 0
    for item in items:
        role_res = item["listing"]["role"]
        assert role_to_search in role_res["name"].lower()
        skills_required = set(role_res["skills"])
        skills_matched = set(request_param).intersection(skills_required)
        assert len(skills_matched) >= len(request_param)


# endregion


# region: apply role listing
def test_apply_role_listing_success(
    random_user_client: FlaskClient,
    random_user_client_x_csrf_token_header,
    init_database,
):
    """
    GIVEN the user is logged in as user, there are role listings created
    WHEN PATCH 'api/listings/{id}' to the created listing id  with request body containing
        - `apply` field is `true`
    THEN check that
        - the response returns HTTP 200
        - the `has_applied` field is `true`
    """
    listing = role_listing_service.find_one_random()

    response = random_user_client.patch(
        path=f"{ENDPOINT}/{listing.id}",
        headers=random_user_client_x_csrf_token_header,
        json={"apply": True},
    )

    # check response
    assert response.status_code == 200
    assert response.json["has_applied"] == True


def test_withdraw_role_listing_success(
    random_user_client: FlaskClient,
    random_user_client_x_csrf_token_header,
    init_database,
):
    """
    GIVEN the user is logged in as user, the user has already applied for a role listing
    WHEN PATCH 'api/listings/{id}' to the created listing id  with request body containing
        - `apply` field is `false`
    THEN check that
        - the response returns HTTP 200
        - the `has_applied` field is `false`
    """
    # create an application for role listing
    listing = role_listing_service.find_one_random()
    response = random_user_client.patch(
        path=f"{ENDPOINT}/{listing.id}",
        headers=random_user_client_x_csrf_token_header,
        json={"apply": True},
    )

    assert response.status_code == 200
    assert response.json["has_applied"] == True

    # withdraw application
    response = random_user_client.patch(
        path=f"{ENDPOINT}/{listing.id}",
        headers=random_user_client_x_csrf_token_header,
        json={"apply": False},
    )

    # check response
    assert response.status_code == 200
    assert response.json["has_applied"] == False


# endregion
