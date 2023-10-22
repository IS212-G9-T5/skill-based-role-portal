import { useLocation } from "react-router-dom"

import StaffNavbar from "../../components/Navbar"
import RoleCard from "../../components/RoleCard"

const ViewApplicants = () => {
  const { state } = useLocation()
  console.log(state)
  const navbarProps: NavBar = {
    title: "SKILLS BASED ROLE PORTAL",
    items: [
      { label: "View Applications", to: "/view-applications" },
      { label: "Create Listings", to: "/create-role-listing" },
      { label: "Logout", to: "/" },
    ],
  }
  return (
    <div>
      <StaffNavbar {...navbarProps} />
      <div className="p-10">
        <div className="text-2xl font-bold text-[#1976d2] pb-6">
          View Applicants for Application {state.role.id}
        </div>
        <RoleCard {...state.role} />
      </div>
    </div>
  )
}

export default ViewApplicants
