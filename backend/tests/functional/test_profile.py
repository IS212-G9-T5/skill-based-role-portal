from flask import Flask
from flask.testing import FlaskClient
from . import PROFILE_ENDPOINT
from application.models.staff import Staff


def test_get_profile_success(app: Flask, random_user: Staff, init_database):
    """
    GIVEN the user is logged in as user,
    WHEN the profile API endpoint is requested
    THEN check that
        - the response returns HTTP 200
        - the response body contains the user's profile data (fname, lname, dept, country, email)
    """
    with app.test_client() as client:
        res = client.post(
            "/api/login",
            json={"staffId": random_user.id},
        )

        assert res.status_code == 200

        response = client.get(path=PROFILE_ENDPOINT)

        # check response
        assert response.status_code == 200
        data = response.json
        assert data["country"] == random_user.country
        assert data["dept"] == random_user.dept
        assert data["email"] == random_user.email
        assert data["fname"] == random_user.fname
        assert data["lname"] == random_user.lname
