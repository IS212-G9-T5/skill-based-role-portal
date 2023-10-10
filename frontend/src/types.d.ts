declare type Roles = {
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

declare type RoleMatch = {
  skills_match_count: number
  skills_match_pct: number
  skills_matched: SkillObject[]
  skills_unmatched: SkillObject[]
}

declare type SkillObject = {
  name: string;
  description: string;
};


declare type NavBar = {
  title: string
  items: string[]
}

declare type MyFormValues = {
  role_name: string
  description: string
  start_date: Dayjs | number | undefined
  end_date: Dayjs | number | undefined
}