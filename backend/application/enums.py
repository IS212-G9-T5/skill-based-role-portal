from enum import Enum


class AccessControlRole(Enum):
    USER = "USER"
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"


class ApplicationStatus(Enum):
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    PENDING = "PENDING"


class RoleStatus(Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"
    PENDING = "PENDING"
