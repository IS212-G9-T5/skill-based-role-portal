import type { RouteObject } from "react-router"
import AllRoleListing from "./pages/applicant/AllRoleListing"
import ViewRoleListing from "./pages/applicant/main"
import Signup from "./pages/hr/CreateRoleListing"
import UpdateRoleListing from "./pages/hr/UpdateRoleListing"

const routes: RouteObject[] = [
  {
    path: "role-listing/:id",
    element: <ViewRoleListing />,
  },
  {
    path: "all-role-listing",
    element: <AllRoleListing />,
  },
  {
    path: "create-role-listing",
    element: <Signup />,
  },
  {
    path: "update-role-listing/:id",
    element: <UpdateRoleListing/>
  }
]

export default routes