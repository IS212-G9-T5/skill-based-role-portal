from marshmallow import Schema, fields


class RoleListingDTO(Schema):
    role_name = fields.Str(required=True)
    start_time = fields.DateTime(required=True)
    end_time = fields.DateTime(required=True)
