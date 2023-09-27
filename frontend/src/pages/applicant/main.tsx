import { useEffect, useState } from "react"

import NavBar from "../../components/Navbar"
import RoleListing from "./RoleListing"

const ViewRoleListing = () => {
  const [apiRoleData, setApiRoleData] = useState<Roles[]>([])
  

  useEffect(() => {
    const currUrl = window.location.href
    const id = currUrl.split("/").pop()
    const endpointUrl = `http://127.0.0.1:5000/api/listings/${id}`

    fetch(endpointUrl)
      .then((response) => response.json())
      .then((res) => {
        if (Array.isArray(res.data)) {
          setApiRoleData(res.data)
        } else if (typeof res.data === "object") {
          setApiRoleData([res.data])
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const title = "SKILLS BASED ROLE PORTAL"
  const items = ["View Listings", "View Profile", "Logout"]

  return (
    <div>
      <NavBar title={title} items={items} />
      {apiRoleData.map((roleData) => (
        <RoleListing
          key={roleData.id}
          id={roleData.id}
          name={roleData["role"].name}
          description={roleData["role"].description}
          start_date={roleData.start_date}
          end_date={roleData.end_date}
          status={roleData.status}
          skills={roleData["role"].skills}
        />
      ))}
    </div>
  )
}

export default ViewRoleListing
