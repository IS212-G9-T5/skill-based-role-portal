from flask.testing import FlaskClient
from application.services import role_service

ENDPOINT = "/api/listings"


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
