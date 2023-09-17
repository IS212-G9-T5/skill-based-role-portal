from datetime import datetime
from application.models.role_listing import RoleListing, time_format

def test_end_time_gt_start_time():
    """
    GIVEN a RoleListing model
    WHEN a new RoleListing object is instantiated
    THEN the end_time is greater than the start_time
    """
    listing = RoleListing("software developer", "develop software", "2021-10-01T00:00:00Z", "2021-10-31T00:00:00Z")
    # parse start_time and end_time to datetime objects
    listing.start_time = datetime.strptime(listing.start_time, time_format)
    listing.end_time = datetime.strptime(listing.end_time, time_format)
    assert listing.start_time < listing.end_time