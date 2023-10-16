import type { RouteObject } from "react-router"
import { Link } from "react-router-dom"

import AccessControl from "./auth/AccessControl"
import AllRoleListing from "./pages/applicant/AllRoleListing"
import ViewRoleListing from "./pages/applicant/main"
import SkillsProfile from "./pages/applicant/SkillsProfile"
import CreateRoleListing from "./pages/hr/CreateRoleListing"
import UpdateRoleListing from "./pages/hr/UpdateRoleListing"
import ViewApplications from "./pages/hr/ViewApplications"
import LoginForm from "./pages/login"

const role = localStorage.getItem("role")

const routes: RouteObject[] = [
  {
    path: "profile",
    element: (
      <AccessControl
        userPermissions={role ? role : ""}
        allowedPermissions={["Admin", "User", "Manager", "HR"]}
        renderNoAccess={() => (
          <div className="p-5">
            You are not authenticated. Please proceed to {""}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              log in
            </Link>
          </div>
        )}
      >
        <SkillsProfile />
      </AccessControl>
      // <SkillsProfile />
    ),
  },
  {
    path: "role-listing/:id",
    element: (
      <AccessControl
        userPermissions={role ? role : ""}
        allowedPermissions={["Admin", "User", "Manager", "HR"]}
        renderNoAccess={() => (
          <div className="p-5">
            You are not authenticated. Please proceed to {""}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              log in
            </Link>
          </div>
        )}
      >
        <ViewRoleListing />
      </AccessControl>
    ),
  },
  {
    path: "all-role-listing",
    element: (
      <AccessControl
        userPermissions={role ? role : ""}
        allowedPermissions={["Admin", "User", "Manager", "HR"]}
        renderNoAccess={() => (
          <div className="p-5">
            You are not authenticated. Please proceed to {""}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              log in
            </Link>
          </div>
        )}
      >
        <AllRoleListing />
      </AccessControl>
    ),
  },
  {
    path: "create-role-listing",
    element: (
      <AccessControl
        userPermissions={role ? role : ""}
        allowedPermissions={["Admin", "HR"]}
        renderNoAccess={() => (
          <div className="p-5">
            You do not have permission to access this page. Please proceed to{" "}
            {""}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              log in
            </Link>
          </div>
        )}
      >
        <CreateRoleListing />
      </AccessControl>
    ),
  },
  {
    path: "applications",
    element: (
      <AccessControl
        userPermissions={role ? role : ""}
        allowedPermissions={["Admin", "HR"]}
        renderNoAccess={() => (
          <div className="p-5">
            You do not have permission to access this page. Please proceed to{" "}
            {""}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              log in
            </Link>
          </div>
        )}
      >
        <CreateRoleListing />
      </AccessControl>
    ),
  },
  {
    path: "update-role-listing/:id",
    element: (
      <AccessControl
        userPermissions={role ? role : ""}
        allowedPermissions={["Admin", "HR"]}
        renderNoAccess={() => (
          <div className="p-5">
            You do not have permission to access this page. Please proceed to{" "}
            {""}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              log in
            </Link>
          </div>
        )}
      >
        <UpdateRoleListing />
      </AccessControl>
    ),
  },
  {
    path: "view-applications",
    element: (
      <AccessControl
        userPermissions={role ? role : ""}
        allowedPermissions={["Admin", "Manager", "HR"]}
        renderNoAccess={() => (
          <div className="p-5">
            You do not have permission to access this page. Please proceed to{" "}
            {""}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              log in
            </Link>
          </div>
        )}
      >
        <ViewApplications />
      </AccessControl>
    ),
  },
  {
    path: "/",
    element: <LoginForm />,
  },
]

export default routes
