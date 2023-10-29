import { useEffect, useState } from "react"

import { getAvailableListings } from "../../.../../../api/ApplicationsAPI"
import { DataTable } from "../data-table"
import { columns, OpenRoleApplication } from "./columns"

const ApplicationTable = () => {
  const [data, setData] = useState<OpenRoleApplication[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const handleTotalPagesChange = (newTotalPages: number) => {
    setTotalPages(newTotalPages)
  }
  const size = 200

  const fetchData = async (page: number, size: number) => {
    const res = await getAvailableListings(page, size)
    if (res) {
      const filteredData: OpenRoleApplication[] = []
      for (let i = 0; i < res.items.length; i++) {
        const item = res.items[i]
        const temp: OpenRoleApplication = {
          id: item.id,
          name: item.role.name,
          description: item.role.description,
          skills: item.role.skills,
          start_date: item.start_date,
          end_date: item.end_date,
          status: item.status,
        }
        filteredData.push(temp)
      }
      setData(filteredData)
    }
  }

  useEffect(() => {
    fetchData(totalPages, size)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        onTotalPagesChange={handleTotalPagesChange}
      />
    </div>
  )
}

export default ApplicationTable
