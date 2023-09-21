import type { RouteObject } from "react-router"

import ViewRoleListing from "./pages/applicant/main"
import Signup from "./pages/hr/signup"

const routes: RouteObject[] = [
  {
    path: "role-listing",
    element: <ViewRoleListing />,
  },
  {
    path: "create-role-listing",
    element: <Signup/>
  }
]

export default routes
