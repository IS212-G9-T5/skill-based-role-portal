import { useParams } from "react-router-dom"

import StaffNavbar from "../../components/Navbar"

const ViewApplicants = () => {
  const { id } = useParams()
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
      <div className="p-10">{id}</div>
    </div>
  )
}

export default ViewApplicants
