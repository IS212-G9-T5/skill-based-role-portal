import type { RouteObject } from "react-router"

import ViewRoleListing from "./pages/applicant/main"

const routes: RouteObject[] = [
  {
    path: "role-listing",
    element: <ViewRoleListing />,
  },
]

export default routes
