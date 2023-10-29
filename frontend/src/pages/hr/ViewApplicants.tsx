import { useEffect, useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useLocation } from "react-router-dom"

import { getAllApplications } from "../../api/ApplicationsAPI"
import ApplicantCard from "../../components/applicant/ApplicantCard"
import ApplicantDetail from "../../components/applicant/ApplicantDetail"
import StaffNavbar from "../../components/Navbar"
import RoleCard from "../../components/RoleCard"

const ViewApplicants = () => {
  const { state } = useLocation()
  const [data, setData] = useState([]) // Assuming Application[] type
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const isMobile = useMediaQuery("(max-width:1000px)")
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.role && state.role.id) {
          const res = await getAllApplications(state.role.id)
          if (res && res.length > 0) {
            setData(res)
            setSelectedApplicant(res[0]?.applicant.email)
          } else {
            setData([])
            setSelectedApplicant(null)
          }
        } else {
          console.log("role id not found")
        }
      } catch (error) {
        console.error("An error occurred:", error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.role.id])

  return (
    <div>
      <StaffNavbar {...navbarProps} />
      <div className="p-4 md:p-10">
        <div className="pb-10">
          <div className="pb-6 text-2xl font-bold text-[#1976d2]">
            View Applicants for Application {state.role.id}
          </div>
          <div>
            <RoleCard {...state.role} />
          </div>
        </div>
        <div className="pb-6 text-2xl font-bold text-[#1976d2]">
          All Applicants
        </div>
        {data.length === 0 ? (
          <div>No Applicants</div>
        ) : (
          <div className={`flex ${isMobile ? "flex-col gap-0" : "gap-6"}`}>
            <div className={`flex flex-col ${isMobile ? "" : "basis-1/3"}`}>
              {data.map((application) => (
                <ApplicantCard
                  key={application.applicant.email}
                  setSelectedApplicant={setSelectedApplicant}
                  selectedApplicant={selectedApplicant}
                  application={application}
                />
              ))}
            </div>
            <div className={`flex h-fit ${isMobile ? "" : "basis-2/3"}`}>
              <ApplicantDetail
                application={data.find(
                  (application) =>
                    application.applicant.email === selectedApplicant
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewApplicants
