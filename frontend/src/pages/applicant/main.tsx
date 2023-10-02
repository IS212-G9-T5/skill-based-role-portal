import { useEffect, useState } from "react"

import NavBar from "../../components/Navbar"
import RoleListing from "./RoleListing"

const ViewRoleListing = () => {
  const [apiRoleData, setApiRoleData] = useState<Roles | null>(null)

  // To obtain the skills of the user
  const [userSkills, setUserSkills] = useState<{ name: string; description: string }[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('http://localhost:5000/api/skills');
        const data = await response.json();
        const skillsArray = data.data;
        setUserSkills(skillsArray);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchSkills();
  }, []);

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
          setApiRoleData(res.data)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const title = "SKILLS BASED ROLE PORTAL"
  const items = ["View Listings", "View Profile", "Logout"]

  return (
    <div>
      <NavBar title={title} items={items} />
      {apiRoleData && (
        <RoleListing
          key={apiRoleData.id}
          id={apiRoleData.id}
          name={apiRoleData["role"].name}
          description={apiRoleData["role"].description}
          start_date={apiRoleData.start_date}
          end_date={apiRoleData.end_date}
          status={apiRoleData.status}
          skills={apiRoleData["role"].skills}
          userSkills={userSkills}
      />
      )}
    </div>
  )
}

export default ViewRoleListing
