import type { RouteObject } from "react-router"

import ViewRoleListing from "./pages/applicant/main"
import AllRoleListing from "./pages/applicant/AllRoleListing";

const routes: RouteObject[] = [
  {
    path: "role-listing",
    element: <ViewRoleListing />,
  },
  {
    path: "all-role-listing",
    element: <AllRoleListing />,
  },
]

export default routes
