import StaffNavbar from "../../components/Navbar"
import ApplicationTable from "../../components/table/applications/applications-table"

const ViewApplications = () => {
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
        <h1 className="text-2xl font-bold text-[#1976d2]">
          Available Role Listings
        </h1>
        <div className="pt-4">
          <ApplicationTable />
        </div>
      </div>
    </div>
  )
}

export default ViewApplications
