import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"

import Matches from "./Matches"

type ApplicantDetailProps = {
  application: Application
}

const ApplicantDetail = ({ application }: ApplicantDetailProps) => {
  return (
    <div className="w-full rounded-lg border-2 border-slate-200">
      <div className="flex flex-col rounded-t-lg border-b px-5 pb-2 pt-5">
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
          <div>
            <button className="mr-4 rounded border border-[#1976d2] bg-transparent px-4 py-2 font-semibold text-[#1976d2] hover:border-transparent hover:bg-[#1976d2] hover:text-white">
              Accept
            </button>
            <button className="rounded border border-slate-500 px-4 py-2">
              Reject
            </button>
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
      <div className="border-b">
        <Matches title="Matched Skills" skills={application.skills_matched} />
      </div>
      <div>
        <Matches
          title="Unmatched Skills"
          skills={application.skills_unmatched}
        />
      </div>
    </div>
  )
}

export default ApplicantDetail
