import { useEffect, useState } from "react"

import { getRoleListingById, getUserSkills } from "../../api/RoleListingAPI"
import NavBar from "../../components/Navbar"
import RoleListing from "./RoleListing"

const ViewRoleListing = () => {
  const [apiRoleData, setApiRoleData] = useState<Roles | null>(null)
  const [roleMatchData, setRoleMatchData] = useState<RoleMatch | null>(null)

  // To obtain the skills of the user
  const [userSkills, setUserSkills] = useState<
    { name: string; description: string }[]
  >([])

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getUserSkills()
        setUserSkills(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSkills()
  }, [])

  useEffect(() => {
    const currUrl = window.location.href
    const id = currUrl.split("/").pop()

    const fetchData = async () => {
      try {
        const data = await getRoleListingById(id)
        console.log(data)
        setApiRoleData(data["listing"])
        const roleDataObj = {
          skills_match_count: data["skills_match_count"],
          skills_match_pct: data["skills_match_pct"],
          skills_matched: data["skills_matched"],
          skills_unmatched: data["skills_unmatched"],
          has_applied: data["has_applied"],
        }
        setRoleMatchData(roleDataObj)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const navbarProps = {
    title: "SKILLS BASED ROLE PORTAL",
    items: [
      { label: "View Listings", to: "/all-role-listing" },
      { label: "View Profile", to: "/profile" },
      { label: "Logout", to: "/" },
    ],
  }

  return (
    <div>
      <NavBar {...navbarProps} />
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
          roleMatchData={roleMatchData}
        />
      )}
    </div>
  )
}

export default ViewRoleListing
