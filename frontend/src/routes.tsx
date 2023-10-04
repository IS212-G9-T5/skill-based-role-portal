import type { RouteObject } from "react-router"
import AllRoleListing from "./pages/applicant/AllRoleListing"
import ViewRoleListing from "./pages/applicant/IndividualRoleListing"
import CreateRoleListing from "./pages/hr/CreateRoleListing"

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
    element: <CreateRoleListing />,
  },
]

export default routes
