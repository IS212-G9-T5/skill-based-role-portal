from enum import Enum


class AccessControlRole(Enum):
    User = "User"
    Admin = "Admin"
    Manager = "Manager"
    HR = "HR"


class ApplicationStatus(Enum):
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    PENDING = "PENDING"


class RoleStatus(Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"
    PENDING = "PENDING"
