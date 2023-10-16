import { ColumnDef } from "@tanstack/react-table"

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
    accessorKey: "applicants",
    header: "View Applicants",
  }
]
