from flask.testing import FlaskClient
from application.services import role_service

ENDPOINT = "/api/listings"


def test_create_role_listing_success(test_client: FlaskClient, init_database):
    """
    GIVEN there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that exists
        - the start time for the role listing (lesser than end time)
        - the end time for the role listing
    THEN check that the response returns HTTP 201 and the response body contains the same role name, start time and end time
    """
    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    # POST to create role listing
    start_time = "2023-09-14T08:15:33Z"
    end_time = "2023-10-14T08:15:33Z"
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role.name, "start_time": start_time, "end_time": end_time},
    )

    # check response
    assert response.status_code == 201
    assert response.json["data"]["role"]["name"] == role.name
    assert response.json["data"]["start_time"] == start_time
    assert response.json["data"]["end_time"] == end_time


# missing fields e.g. start time, end time, role name
def test_create_role_listing_missing_fields(test_client: FlaskClient, init_database):
    """
    GIVEN there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing any following fields that are missing
        - role_name
        - start_time
        - end_time
    THEN check that the response returns HTTP 400
    """

    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    start_time = "2023-09-14T08:15:33Z"
    end_time = "2023-10-14T08:15:33Z"

    # region: role_name missing
    response = test_client.post(
        path=ENDPOINT,
        json={"start_time": start_time, "end_time": end_time},
    )

    assert response.status_code == 400
    # endregion

    # region: start_time missing
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role.name, "end_time": end_time},
    )
    assert response.status_code == 400
    # endregion

    # region: end_time missing
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role.name, "start_time": start_time},
    )
    assert response.status_code == 400
    # endregion


def test_create_role_listing_start_time_gt_end_time(
    test_client: FlaskClient, init_database
):
    """
    GIVEN there are skills created and skills mapped to a role,
    WHEN the API endpoint 'role_listing' is requested (POST) with request body containing
        - the role name for the role that exists
        - the start time for the role listing (greater than end time)
        - the end time for the role listing
    THEN check that the response returns HTTP 400
    """
    # find existing role from db
    role = role_service.find_one_random()
    assert role is not None, "No roles found in database"

    # POST to create role listing
    start_time = "2023-09-14T08:15:33Z"
    end_time = "2023-08-14T08:15:33Z"
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role.name, "start_time": start_time, "end_time": end_time},
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
        - the start time for the role listing (lesser than end time)
        - the end time for the role listing
    THEN check that the response returns HTTP 404
    """

    role_name = "Astronaut"

    # POST to create role listing
    start_time = "2023-09-14T08:15:33Z"
    end_time = "2023-10-14T08:15:33Z"
    response = test_client.post(
        path=ENDPOINT,
        json={"role_name": role_name, "start_time": start_time, "end_time": end_time},
    )

    # check response
    assert response.status_code == 404
