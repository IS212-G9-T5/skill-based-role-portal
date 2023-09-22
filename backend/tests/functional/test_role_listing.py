from flask.testing import FlaskClient
from application.services import role_service
from application.routes.role_listing_route import DEFAULT_PAGE_SIZE

ENDPOINT = "/api/listings"


# region: get individual role listing
def test_get_indiv_role_listing(test_client: FlaskClient, init_database):
    """
    GIVEN there are at least 30 role listings created,
    WHEN the API endpoint 'role_listing' is requested (GET) with /{id} where id is a valid role listing id
    THEN check that
        - the response returns HTTP 200
        - role listing object id matches the id in the request path
    """
    id = 25
    response = test_client.get(path=f"{ENDPOINT}/{id}")

    # check response
    assert response.status_code == 200
    data = response.json["data"]
    assert data is not None
    assert data["id"] == id


# endregion


# region: creation of role listing
def test_create_role_listing_success(test_client: FlaskClient, init_database):
    """
    GIVEN there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that exists
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 201 and the response body contains the same role name, start date and end date
    """
    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    # POST to create role listing
    start_date = "2023-09-14"
    end_date = "2023-10-14"
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role.name, "start_date": start_date, "end_date": end_date},
    )

    # check response
    assert response.status_code == 201
    assert response.json["data"]["role"]["name"] == role.name
    assert response.json["data"]["start_date"] == start_date
    assert response.json["data"]["end_date"] == end_date


# missing fields e.g. start date, end date, role name
def test_create_role_listing_missing_fields(test_client: FlaskClient, init_database):
    """
    GIVEN there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing any following fields that are missing
        - role_name
        - start_date
        - end_date
    THEN check that the response returns HTTP 400
    """

    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    start_date = "2023-09-14"
    end_date = "2023-10-14"

    # region: role_name missing
    response = test_client.post(
        path=ENDPOINT,
        json={"start_date": start_date, "end_date": end_date},
    )

    assert response.status_code == 400
    # endregion

    # region: start_date missing
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role.name, "end_date": end_date},
    )
    assert response.status_code == 400
    # endregion

    # region: end_date missing
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role.name, "start_date": start_date},
    )
    assert response.status_code == 400
    # endregion


def test_create_role_listing_start_date_gt_end_date(
    test_client: FlaskClient, init_database
):
    """
    GIVEN there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that exists
        - the start date for the role listing (greater than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 400
    """
    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    # POST to create role listing
    start_date = "2023-09-14"
    end_date = "2023-08-14"
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role.name, "start_date": start_date, "end_date": end_date},
    )

    # check response
    assert response.status_code == 400


def test_create_role_listing_role_name_not_exist(
    test_client: FlaskClient, init_database
):
    """
    GIVEN there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that does not exist
        - the start date for the role listing (lesser than end date)
        - the end date for the role listing
    THEN check that the response returns HTTP 404
    """

    role_name = "Astronaut"

    # POST to create role listing
    start_date = "2023-09-14"
    end_date = "2023-10-14"
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role_name, "start_date": start_date, "end_date": end_date},
    )

    # check response
    assert response.status_code == 404


# endregion


# region: get role listings
def test_get_role_listing_paginated_success_no_params(
    test_client: FlaskClient, init_database
):
    """
    GIVEN there are at least 30 role listings created,
    WHEN the API endpoint 'role_listing' is requested (GET)
    THEN check that
        - the response returns HTTP 200
        - there are 10 items in the `items` field
        - `page` field is 1
        - `size` field is 10
        - `has_prev` field is False
        - `has_next` field is True
    """

    response = test_client.get(path=ENDPOINT)

    # check response
    assert response.status_code == 200
    assert response.json["items"] is not None
    assert len(response.json["items"]) == DEFAULT_PAGE_SIZE
    assert response.json["has_prev"] == False
    assert response.json["has_next"] == True


def test_get_role_listing_paginated_success_page_size_params_given(
    test_client: FlaskClient, init_database
):
    """
    GIVEN there are at least 30 role listings created,
    WHEN the API endpoint 'role_listing' is requested (GET) with query params `size=15`, `page=2`,
    THEN check that
        - the response returns HTTP 200
        - `page` field is 2
        - `size` field is 15
        - there are 15 items in the `items` field
        - `has_prev` field is True
        - `has_next` field is True
    """
    page, size = 2, 15
    response = test_client.get(path=ENDPOINT, query_string={"page": page, "size": size})

    # check response
    assert response.status_code == 200
    assert response.json["page"] == page
    assert response.json["size"] == size
    assert response.json["items"] is not None
    assert len(response.json["items"]) == size
    assert response.json["has_prev"] == True
    assert response.json["has_next"] == True


def test_get_role_listing_paginated_negative_page_or_negative_size(
    test_client: FlaskClient, init_database
):
    """
    GIVEN there are at least 30 role listings created,
    WHEN the API endpoint 'role_listing' is requested (GET) with query params `size` and/or `page` as negative,
    THEN check that
        - the response returns HTTP 200
        - there are 10 items in the `items` field
        - `page` field is 1
        - `size` field is 10
        - `has_prev` field is False
        - `has_next` field is True
    """
    # region: negative page and no size param
    response = test_client.get(path=ENDPOINT, query_string={"page": -1})

    # check response
    assert response.status_code == 200
    assert response.json["items"] is not None
    assert len(response.json["items"]) == DEFAULT_PAGE_SIZE
    assert response.json["has_prev"] == False
    assert response.json["has_next"] == True
    # endregion

    # region: negative size and no page param
    response = test_client.get(path=ENDPOINT, query_string={"size": -1})

    # check response
    assert response.status_code == 200
    assert response.json["items"] is not None
    assert len(response.json["items"]) == DEFAULT_PAGE_SIZE
    assert response.json["has_prev"] == False
    assert response.json["has_next"] == True
    # endregion


def test_get_role_listing_paginated_exceed_available_pages(
    test_client: FlaskClient, init_database
):
    """
    GIVEN there are at least 30 role listings created,
    WHEN the API endpoint 'role_listing' is requested (GET) with query params `page=100`,
    THEN check that
        - the response returns HTTP 200
        - there are 0 items in the `items` field
        - `page` field matches the query param `page`
        - `has_prev` field is False
        - `has_next` field is False
    """
    page = 100
    response = test_client.get(path=ENDPOINT, query_string={"page": page})

    # check response
    assert response.status_code == 200
    assert response.json["items"] is not None
    assert len(response.json["items"]) == 0
    assert response.json["page"] == page
    assert response.json["has_prev"] == False
    assert response.json["has_next"] == False


def test_get_role_listing_paginated_exceed_available_pages(
    test_client: FlaskClient, init_database
):
    """
    GIVEN there are at least 30 role listings created,
    WHEN the API endpoint 'role_listing' is requested (GET) with query params `size=100`,
    THEN check that
        - the response returns HTTP 200
        - there are at least 30 but less than 100 items in the `items` field
        - `page` field == 1
        - `has_prev` field is False
        - `has_next` field is False
    """
    size = 100
    response = test_client.get(path=ENDPOINT, query_string={"size": size})

    # check response
    assert response.status_code == 200
    assert response.json["items"] is not None
    assert len(response.json["items"]) >= 30 and len(response.json["items"]) < size
    assert response.json["page"] == 1
    assert response.json["has_prev"] == False
    assert response.json["has_next"] == False


# endregion
