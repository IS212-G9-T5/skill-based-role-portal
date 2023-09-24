from marshmallow import Schema, fields


class RoleListingDTO(Schema):
    role_name = fields.Str(required=True)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)