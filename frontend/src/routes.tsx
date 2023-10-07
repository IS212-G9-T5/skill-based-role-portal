import type { RouteObject } from "react-router"
import { Link } from "react-router-dom"

import AccessControl from "./auth/AccessControl"
import AllRoleListing from "./pages/applicant/AllRoleListing"
import ViewRoleListing from "./pages/applicant/main"
import CreateRoleListing from "./pages/hr/CreateRoleListing"
import UpdateRoleListing from "./pages/hr/UpdateRoleListing"
import LoginForm from "./pages/login"
const role = localStorage.getItem("role")

const routes: RouteObject[] = [
  {
    path: "role-listing/:id",
    element: (
      <AccessControl
        userPermissions={role ? role : ""}
        allowedPermissions={["ADMIN", "USER", "MANAGER", "HR"]}
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
        allowedPermissions={["ADMIN", "USER", "MANAGER", "HR"]}
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
        allowedPermissions={["ADMIN"]}
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
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "update-role-listing/:id",
    element: <UpdateRoleListing/>
  }
]

export default routes