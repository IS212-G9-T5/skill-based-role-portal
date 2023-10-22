import EditIcon from "@mui/icons-material/Edit"
import PersonIcon from "@mui/icons-material/Person"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

export type OpenRoleApplication = {
  id: string
  name: string
  description: string
  skills: string[]
  start_date: string
  end_date: string
  status: "OPEN" | "CLOSED"
}

export const columns: ColumnDef<OpenRoleApplication>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex align-middle">
          <div>ID</div>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <div className="flex align-middle">
          <div>Start Date</div>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <div className="flex align-middle">
          <div>End Date</div>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex align-middle">
          <div>Status</div>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const role = row.original
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const navigate = useNavigate()
      return (
        <div className="flex gap-4">
          <EditIcon
            onClick={() => navigate(`/update-role-listing/${role.id}`)}
            className="h-5 w-5 cursor-pointer text-blue-500 hover:scale-105"
          />
          <PersonIcon
            onClick={() =>
              navigate(`/view-applicants/${role.id}`, { state: { role } })
            }
            className="mr-2 h-5 w-5 cursor-pointer text-blue-500 hover:scale-105"
          />
        </div>
      )
    },
  },
]
