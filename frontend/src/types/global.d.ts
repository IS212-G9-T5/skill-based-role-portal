declare global {
  type Roles = {
    id: string
    name: string
    description: string
    start_date: string
    end_date: string
    status: boolean
    skills: string[]
    userSkills: SkillObject[]
    roleMatchData: RoleMatch
  }

  type RoleApplication = {
    status: string
    start_date: string
    end_date: string
  }

  type RoleMatch = {
    skills_match_count: number
    skills_match_pct: number
    skills_matched: SkillObject[]
    skills_unmatched: SkillObject[]
  }

  type SkillObject = {
    name: string
    description: string
  }

  type NavItem = {
    label: string
    to: string
  }

  type NavBar = {
    title: string
    items: NavItem[]
  }

  type MyFormValues = {
    role_name: string
    description: string
    start_date: Dayjs | number | undefined
    end_date: Dayjs | number | undefined
  }

  type RoleListings = {
    has_next: boolean
    has_prev: boolean
    items: Array[]
    page: number
    pages: number
    size: number
    total: number
  }
}

export type AccessControlProps = {
  userPermissions: string
  allowedPermissions: string[]
  children: React.ReactNode
  renderNoAccess: () => React.ReactNode
}
