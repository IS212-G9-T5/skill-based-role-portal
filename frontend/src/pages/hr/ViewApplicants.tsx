import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { getAllApplications } from "../../api/ApplicationsAPI"
import ApplicantCard from "../../components/applicant/ApplicantCard"
import StaffNavbar from "../../components/Navbar"
import RoleCard from "../../components/RoleCard"

const ViewApplicants = () => {
  const { state } = useLocation()
  const [data, setData] = useState<Application[]>([])
  const [selectedApplicant, setSelectedApplicant] = useState<string>(data[0]?.applicant.email);
  const navbarProps: NavBar = {
    title: "SKILLS BASED ROLE PORTAL",
    items: [
      { label: "View Applications", to: "/view-applications" },
      { label: "Create Listings", to: "/create-role-listing" },
      { label: "Logout", to: "/" },
    ],
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.role && state.role.id) {
          const res = await getAllApplications(state.role.id)
          if (res) {
            setData(res)
            setSelectedApplicant(res[0]?.applicant.email);
          }
        } else {
          console.log("role id not found")
        }
      } catch (error) {
        console.error("An error occurred:", error)
      }
    }
    fetchData()
  }, [state.role.id])

  return (
    <div>
      <StaffNavbar {...navbarProps} />
      <div className="p-4 md:p-10">
        <div className="pb-10">
          <div className="pb-6 text-2xl font-bold text-[#1976d2]">
            View Applicants for Application {state.role.id}
          </div>
          <RoleCard {...state.role} />
        </div>
        <div>
          <div className="pb-6 text-2xl font-bold text-[#1976d2]">
            All Applicants
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col basis-1/3">
              {data.map((application) => (
                <ApplicantCard
                  key={application.applicant.email}
                  setSelectedApplicant={setSelectedApplicant}
                  selectedApplicant={selectedApplicant}
                  application={application}
                />
              ))}
            </div>
            <div>More details</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewApplicants
