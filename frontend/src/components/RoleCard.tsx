import { useState } from "react"

import { OpenRoleApplication } from "./table/applications/columns"

const RoleCard = (role: OpenRoleApplication) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleView = () => {
    setIsExpanded(!isExpanded)
  }
  const statuses = {
    OPEN: "text-green-700 bg-green-50 ring-green-600/20",
    CLOSED: "text-red-700 bg-red-50 ring-red-600/10",
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border-2 border-slate-200 p-4">
        <div className="px-6 py-4">
          <div className="mb-2 flex flex-wrap items-center text-lg sm:text-xl">
            <div className="font-bold text-slate-700">{role.name}</div>
            <div className="flex items-center md:pl-4">
              <div
                className={`${
                  statuses[role.status]
                } rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset sm:text-sm`}
              >
                {role.status}
              </div>
              <div className="pl-4 text-xs text-slate-500 sm:text-sm">
                Date: {role.start_date} to {role.end_date}
              </div>
            </div>
          </div>
          <div className="mb-2 md:text-base text-sm text-slate-700 sm:text-base">
            <span
              className={`${isExpanded ? "" : "line-clamp-3 overflow-hidden"}`}
            >
              {role.description}
            </span>
            <span
              onClick={toggleView}
              className="cursor-pointer text-sm text-blue-500 sm:text-base"
            >
              {isExpanded ? "View less" : "View more"}
            </span>
          </div>
          <div className="flex flex-wrap">
            {role.skills.map((skill) => (
              <span
                key={skill}
                className="mb-2 mr-2 inline-block rounded-full bg-blue-100 px-3 py-1 md:text-sm text-xs text-blue-700 sm:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleCard
