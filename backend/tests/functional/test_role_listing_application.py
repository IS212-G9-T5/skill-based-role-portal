from flask.testing import FlaskClient
from application.models.role_listing import RoleListing
from . import LISTINGS_ENDPOINT as ENDPOINT


# region find role listing applicants
def test_get_role_listing_applicants_unauthorised_success(
    random_user_client: FlaskClient, listing_with_applicants: RoleListing
):
    """
    GIVEN the user is logged in as a user,
    # WHEN the user sends GET request to viewa the role listing applicants,
    THEN check that
        - the response returns HTTP 403
    """
    response = random_user_client.get(
        path=f"{ENDPOINT}/{listing_with_applicants.id}/applications",
    )

    # check response
    assert response.status_code == 403


def test_get_role_listing_applicants_sorted_desc_order_skills_match(
    random_hr_client: FlaskClient,
    random_hr_client_x_csrf_token_header,
    listing_with_applicants: RoleListing,
):
    """
    GIVEN the user is logged in as HR, there is at least one application for a role listing
    WHEN the user sends GET request to view the role listing applicants,
    THEN check that
        - the response returns HTTP 200
        - the role listing applicants are sorted in descending order of number of skills matched
    """
    # given there is a listing with applications

    response = random_hr_client.get(
        path=f"{ENDPOINT}/{listing_with_applicants.id}/applications",
        headers=random_hr_client_x_csrf_token_header,
    )

    # check response
    assert response.status_code == 200
    json = response.json
    applicants = json["applicants"]

    sorted_applicants = sorted(
        applicants, key=lambda a: a["skills_match_pct"], reverse=True
    )
    assert sorted_applicants == applicants


# endregion
