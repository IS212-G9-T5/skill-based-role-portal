declare global {
  type Roles = {
    id: string
    name: string
    description: string
    start_date: string
    end_date: string
    status: boolean
    skills: string[]
  }

  type NavBar = {
    title: string
    items: string[]
  }

  type MyFormValues = {
    role_name: string
    description: string
    start_date: Dayjs | number | undefined
    end_date: Dayjs | number | undefined
  }
}

export type AccessControlProps = {
  userPermissions: string
  allowedPermissions: string[]
  children: React.ReactNode
  renderNoAccess: () => React.ReactNode
}
