from typing import List
from marshmallow import Schema, fields
from dataclasses import dataclass

from application.models.role_listing import RoleListing


class RoleListingDTO(Schema):
    role_name = fields.Str(required=True)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)


class UpdateRoleListingDTO(Schema):
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)
    status = fields.Str(required=True)


@dataclass
class RoleListingSkillMatchDTO:
    listing: RoleListing
    skills_matched: List[str]
    skills_unmatched: List[str]
    skills_match_count: int
    skills_match_pct: float
