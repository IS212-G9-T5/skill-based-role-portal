import { DataTable } from "../data-table"
import { columns, OpenRoleApplication } from "./columns"

const data: OpenRoleApplication[] = [
  {
    id: "1",
    name: "Role 1",
    description: "Description 1",
    start_date: "2021-01-01",
    end_date: "2021-01-01",
    status: "Open",
    applicants: "View Applicants",
  },
  {
    id: "2",
    name: "Role 2",
    description: "Description 2",
    start_date: "2021-01-01",
    end_date: "2021-01-01",
    status: "Open",
    applicants: "View Applicants",
  },
  {
    id: "3",
    name: "Role 3",
    description: "Description 3",
    start_date: "2021-01-01",
    end_date: "2021-01-01",
    status: "Open",
    applicants: "View Applicants",
  },
  {
    id: "4",
    name: "Role 4",
    description: "Description 4",
    start_date: "2021-01-01",
    end_date: "2021-01-01",
    status: "Closed",
    applicants: "View Applicants",
  },
  {
    id: "5",
    name: "Role 5",
    description: "Description 5",
    start_date: "2021-01-01",
    end_date: "2021-01-01",
    status: "Closed",
    applicants: "View Applicants",
  },
]
const ApplicationTable = () => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default ApplicationTable
