import EditIcon from "@mui/icons-material/Edit"
import PersonIcon from "@mui/icons-material/Person"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"

export type OpenRoleApplication = {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  status: "Open" | "Closed"
  applicants: string
}

export const columns: ColumnDef<OpenRoleApplication>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original
      const navigate = useNavigate()
      return (
        <div className="flex gap-4">
          <EditIcon
            onClick={() => navigate(`/update-role-listing/${user.id}`)}
            className="h-5 w-5 cursor-pointer text-blue-500 hover:scale-105"
          />
          <PersonIcon
            onClick={() => navigator.clipboard.writeText(user.id)}
            className="mr-2 h-5 w-5 cursor-pointer text-blue-500 hover:scale-105"
          />
        </div>
      )
    },
  },
]
