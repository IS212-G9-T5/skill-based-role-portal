declare type Roles = {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  status: boolean
  skills: string[]
}

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