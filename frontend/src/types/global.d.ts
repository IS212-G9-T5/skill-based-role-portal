declare global {
  type Roles = {
    id: string
    name: string
    description: string
    start_date: string
    end_date: string
    status: string
    skills: string[]
    userSkills: SkillObject[]
    roleMatchData: RoleMatch
  }

  type RoleMatch = {
    skills_match_count: number
    skills_match_pct: number
    skills_matched: SkillObject[]
    skills_unmatched: SkillObject[]
    has_applied: boolean
  }
  
  type SkillObject = {
    name: string;
    description: string;
  };
  

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





