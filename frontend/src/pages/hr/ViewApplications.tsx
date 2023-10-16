import StaffNavbar from "../../components/Navbar"
import ApplicationTable from "../../components/table/applications/applications-table"

const ViewApplications = () => {
  const navbarProps: NavBar = {
    title: "SKILLS BASED ROLE PORTAL",
    items: [
      { label: "View Applications", to: "/all-role-listing" },
      { label: "Create Listings", to: "/profile" },
      { label: "Logout", to: "/" },
    ],
  }
  return (
    <div>
      <StaffNavbar {...navbarProps} />
      <div className="p-10">
        <h1 className="text-2xl font-bold text-[#1976d2]">
          Open Role Listings
        </h1>
        <div className="pt-4">
          <ApplicationTable />
        </div>
      </div>
    </div>
  )
}

export default ViewApplications
