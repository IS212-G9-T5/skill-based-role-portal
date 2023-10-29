import StaffNavbar from "../../components/Navbar"
import ApplicationTable from "../../components/table/applications/applications-table"

const ViewApplications = () => {
  const user = localStorage.getItem("role")
  const CRlabel = user === "HR" ? "Create Listings" : ""
  const CRurl = user === "HR" ? "/create-role-listing" : ""
  const navbarProps: NavBar = {
    title: "SKILLS BASED ROLE PORTAL",
    items: [
      { label: CRlabel, to: CRurl },
      { label: "View Applications", to: "/view-applications" },
      { label: "Logout", to: "/" },
    ],
  }
  return (
    <div>
      <StaffNavbar {...navbarProps} />
      <div className="p-10">
        <div className="pt-4">
          <ApplicationTable />
        </div>
      </div>
    </div>
  )
}

export default ViewApplications
