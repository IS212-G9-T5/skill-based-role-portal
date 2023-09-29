import { useEffect, useState } from "react"
import {
  Button,
  Chip,
  Container,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material"
import TextField from "@mui/material/TextField"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import { Form, Formik } from "formik"
import { toast, Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

import StaffNavbar from "../../components/Navbar"

interface MyFormValues {
  role_name: string
  description: string
  start_date: Dayjs | number | undefined
  end_date: Dayjs | number | undefined
}
const signupSchema = yup.object().shape({
  role_name: yup.string().required("Role Name is required"),
  description: yup.string().required("Description is required"),
  start_date: yup.date().required("Start Date is required"),
  end_date: yup.date().required("End Date is required"),
})

const endpointUrl = "http://127.0.0.1:5000/api/roles"
const RolelistingForm = () => {
  const title = "SKILLS BASED ROLE PORTAL"
  const items = ["View Listings", "View Profile", "Logout"]
  const navigate = useNavigate()
  const rolesArray = new Array<string>()
  const skillsSet = new Set<string>()
  const [data, setData] = useState(null)
  const [roles, setRoles] = useState<string[]>([])
  const [retrievedSkills, setRetrievedSkills] = useState<string[]>([])
  const [startDateValue, setstartDateValue] = useState<Dayjs | null>(null)
  const [endDateValue, setendDateValue] = useState<Dayjs | null>(null)

  useEffect(() => {
    fetch(endpointUrl)
      .then((response) => response.json())
      .then((res) => {
        setData(res.data)
        const result = res.data
        result.forEach((item) => {
          const roleName = item.name
          const skills = item.skills
          skills.forEach((skill) => {
            skillsSet.add(skill)
          })

          rolesArray.push(roleName)
          setRoles(rolesArray)
        })
      })
  }, [])
  const handleSuccess = (msg) => toast.success(msg, { position: "top-center" })
  const handleError = (msg) => toast.error(msg, { position: "top-center" })

  const initialValues: MyFormValues = {
    role_name: "",
    description: "",
    start_date: dayjs(null),
    end_date: dayjs(null),
  }
  const handleFormSubmit = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      start_date: startDateValue ? startDateValue.format("YYYY-MM-DD") : "",
      end_date: endDateValue ? endDateValue.format("YYYY-MM-DD") : "",
    }
    //temporary fix before endpoint is fixed to take in role description
    delete formattedValues.description
    try {
      const response = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedValues),
      })
      if (response.ok) {
        handleSuccess("Create Role Listing")
        resetForm()
      } else {
        handleError("Failed to create Role Listing")
        resetForm()
      }
      setTimeout(() => {
        navigate("/all-role-listing")
      }, 2000)
    } catch (error) {
      handleError("Error occurred when submitting form")
      resetForm()
    }
  }
  const handleDropDownChange = (event) => {
    const selectedRoleName = event.target.value
    const items = data
    items.forEach((item) => {
      const roleName = item.name
      const skills = item.skills
      if (roleName === selectedRoleName) {
        setRetrievedSkills(skills)
      }
    })
  }
  return (
    <>
      <StaffNavbar title={title} items={items} />
      <Toaster />
      <Grid container style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Typography className="mt-5 text-center" variant="h4">
            Role Listing Form
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div className="mb-2 mt-2">
              <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={signupSchema}
              >
                {({ values, touched, errors, handleChange, handleSubmit }) => {
                  const handleDropDown = (event) => {
                    console.log("role event", event)
                    handleDropDownChange(event)
                    handleChange(event)
                  }
                  const handleStartDateChange = (event) => {
                    setstartDateValue(event)
                    const newEvent = {
                      ...event,
                      target: {
                        name: "start_date",
                        value: event ? dayjs(event) : dayjs(Date.now()),
                      },
                    }
                    handleChange(newEvent)
                  }
                  const handleEndDateChange = (event) => {
                    setendDateValue(event)
                    const newEvent = {
                      ...event,
                      target: {
                        name: "end_date",
                        value: event ? dayjs(event) : dayjs(Date.now()),
                      },
                    }
                    handleChange(newEvent)
                  }
                  return (
                    <Form
                      className="flex flex-col gap-4"
                      onSubmit={handleSubmit}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h5">
                            <strong>Role</strong>
                          </Typography>
                          <TextField
                            name="role_name"
                            id="role_name"
                            value={values.role_name}
                            select
                            onChange={handleDropDown}
                            fullWidth
                            error={
                              Boolean(touched.role_name) &&
                              Boolean(errors.role_name)
                            }
                            helperText={touched.role_name && errors.role_name}
                          >
                            {roles.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <div className="text-left">
                            <Typography variant="h5">
                              <strong>Description</strong>
                            </Typography>

                            <TextField
                              name="description"
                              id="description"
                              label="Description"
                              value={values.description}
                              fullWidth
                              placeholder="Description"
                              onChange={handleChange}
                              error={
                                Boolean(touched.description) &&
                                Boolean(errors.description)
                              }
                              helperText={
                                touched.description && errors.description
                              }
                            />
                          </div>
                        </Grid>

                        <Grid item xs={6}>
                          <div className="text-left">
                            <Typography variant="h5">
                              <strong>Start Date</strong>
                            </Typography>

                            <DatePicker
                              slotProps={{
                                textField: {
                                  error:
                                    Boolean(touched.start_date) &&
                                    Boolean(errors.start_date),
                                  helperText:
                                    touched.start_date && errors.start_date,
                                },
                              }}
                              format="DD/MM/YYYY"
                              disablePast
                              value={dayjs(values.start_date)}
                              onChange={handleStartDateChange}
                              className="w-full"
                            />
                          </div>
                        </Grid>

                        <Grid item xs={6}>
                          <div className="text-left">
                            <Typography variant="h5">
                              <strong>End Date</strong>
                            </Typography>
                            <DatePicker
                              slotProps={{
                                textField: {
                                  error:
                                    Boolean(touched.end_date) &&
                                    Boolean(errors.end_date),
                                  helperText:
                                    touched.end_date && errors.end_date,
                                },
                              }}
                              format="DD/MM/YYYY"
                              disablePast
                              value={dayjs(values.end_date)}
                              onChange={handleEndDateChange}
                              className="w-full"
                            />
                          </div>
                        </Grid>

                        <Grid item xs={12} style={{ marginBottom: "3%" }}>
                          <Typography variant="h5">
                            <strong>
                              <span className="mr-2 bg-[#1976D2] pl-2"></span>
                              Skills Required
                            </strong>
                            <br></br>
                            {retrievedSkills.map((skill, index) => (
                              <Chip
                                key={index}
                                label={skill}
                                className="mr-[1%] mt-[1%]"
                              />
                            ))}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Button variant="contained" fullWidth type="submit">
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}
export default RolelistingForm
