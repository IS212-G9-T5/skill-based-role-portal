import { useEffect, useState } from "react"

import NavBar from "../../components/Navbar"
import RoleListing from "./RoleListing"
import { useEffect, useState } from "react"

type apiRoleDataProps = {
  roleID: string
  roleName: string
  roleDescription: string
  roleStartTime: string
  roleEndTime: string
  status: boolean
  skillsRequired: string[]
}

const ViewRoleListing = () => {

  const [apiRoleData, setApiRoleData] = useState<apiRoleDataProps[]>([]);
  const endpointUrl = "http://localhost:5000/api/listings/25";

  useEffect(() => {
    fetch(endpointUrl)
    .then((response) => response.json())
    .then(res => {
      if (Array.isArray(res.data)) {
        setApiRoleData(res.data);
      } else if (typeof res.data === 'object') {
        // If it's a single object, wrap it in an array
        console.log(res.data);
        setApiRoleData([res.data]);
      }
    })
    .catch((error) => console.log(error))
  }, []);

  const title = "SKILLS BASED ROLE PORTAL"
  const items = ["View Listings", "View Profile", "Logout"]

  return (
    <div>
      <NavBar title={title} items={items} />
      {apiRoleData.map((roleData) => (
        <RoleListing
          key={roleData.id} // Provide a unique key for each RoleListing
          roleID={roleData.id}
          roleName={roleData["role"].name}
          roleDescription={roleData["role"].description}
          roleStartTime={roleData.start_date}
          roleEndTime={roleData.end_date}
          status={roleData.status}
          skillsRequired={roleData["role"].skills}
        />
      ))}
    </div>
  )
}

export default ViewRoleListing
