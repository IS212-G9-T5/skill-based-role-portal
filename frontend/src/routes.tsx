import type { RouteObject } from "react-router"

import ViewRoleListing from "./pages/applicant/main"
import Login from "./pages/login"

const routes: RouteObject[] = [
  {
    path: "role-listing",
    element: <ViewRoleListing />,
  },
  {
    path: "/",
    element: <Login />,
  },
]

export default routes
