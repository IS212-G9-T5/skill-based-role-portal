import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import ApplicantCardBottom from "./ApplicantCardBottom"

const ApplicantCard = ({
  application,
  setSelectedApplicant,
  selectedApplicant,
}: {
  application: Application
  setSelectedApplicant: Function
  selectedApplicant: string
}) => {
  const isSelected = application.applicant.email === selectedApplicant
  const isMobile = useMediaQuery("(max-width:1000px)")
  return (
    <div
      className={`mb-4 ${isMobile ? "" : "max-w-xl"}`}
      onClick={() => setSelectedApplicant(application.applicant.email)}
    >
      <div
        className={`flex flex-col rounded-lg ${
          isSelected ? "border-4 border-blue-300" : "border-2 border-slate-200"
        }`}
      >
        <div className="flex flex-col rounded-t-lg px-5 pb-2 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center justify-start sm:flex-nowrap">
              <div className="mr-2.5">
                <AccountCircleOutlinedIcon
                  className="text-[#1976d2]"
                  sx={{ fontSize: "32px" }}
                />
              </div>
              <div className="pr-2 font-semibold text-slate-700">
                {application.applicant.fname} {application.applicant.lname}
              </div>
              <div className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {application.applicant.dept}
              </div>
            </div>
            <div className="font-semibold text-[#1976d2]">
              {application.skills_match_pct * 100}% match
            </div>
          </div>
          <div className="whitespace-pre-wrap md:pl-10">
            <div className="text-sm text-slate-500">
              <LocationOnIcon sx={{ fontSize: "14px" }} />{" "}
              <span className="pl-2">{application.applicant.country}</span>
            </div>
            <div className="text-sm text-slate-500">
              <EmailIcon sx={{ fontSize: "14px" }} />{" "}
              <span className="pl-2">{application.applicant.email}</span>
            </div>
            <div className="mt-2.5 h-[1px]"></div>
          </div>
        </div>
        <hr className="h-px mx-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <ApplicantCardBottom {...application} />
      </div>
    </div>
  )
}

export default ApplicantCard
