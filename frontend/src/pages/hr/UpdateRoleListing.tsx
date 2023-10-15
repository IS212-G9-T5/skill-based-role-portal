import { useEffect, useState } from "react"
import { Button, Chip, Container, Grid, Typography } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import { Form, Formik } from "formik"
import { toast, Toaster } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import * as yup from "yup"
import {getRoleListingById} from "../../../src/api/RoleListingAPI"
import StaffNavbar from "../../components/Navbar"

interface MyFormValues {
  id?: string
  role_name: string
  description: string
  skills?: string[]
  status: string
  start_date: Dayjs
  end_date: Dayjs
}
const signupSchema = yup.object().shape({
  status: yup.string().required("Status is required"),
  start_date: yup.date().required("Start Date is required"),
  end_date: yup.date().required("End Date is required"),
})

const RolelistingForm = () => {
  const { id } = useParams()
  const title = "SKILLS BASED ROLE PORTAL"
  const items = ["View Listings", "View Profile", "Logout"]
  const status = ["OPEN", "CLOSED"]
  const navigate = useNavigate()
  const [storeData, setData] = useState({
    id: id,
    role: {
      name: "",
      description: "",
      skills: [],
    },
    status: "",
    start_date: dayjs(Date.now()),
    end_date: dayjs(Date.now()),
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoleListingById(id);
        console.log(data);
        setData(data["listing"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id])

  const handleSuccess = (msg) => toast.success(msg, { position: "top-center" })
  const handleError = (msg) => toast.error(msg, { position: "top-center" })

  const initialValues: MyFormValues = {
    role_name: storeData.role.name,
    description: storeData.role.description,
    status: storeData.status,
    skills: storeData.role.skills,
    start_date: dayjs(storeData.start_date),
    end_date: dayjs(storeData.end_date),
  }
  const handleFormSubmit = async (values, { resetForm }) => {
    const formattedValues = {
      status: values.status,
      start_date: values.start_date
        ? dayjs(values.start_date).format("YYYY-MM-DD")
        : "",
      end_date: values.end_date
        ? dayjs(values.end_date).format("YYYY-MM-DD")
        : "",
    }
    function getCookie(name) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop().split(";").shift()
    }
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie('csrf_access_token'),
        },
        body: JSON.stringify(formattedValues),
      })
      if (response.ok) {
        handleSuccess("Update Role Listing")
        setTimeout(() => {
          navigate(`/role-listing/${id}`)
        }, 1000)
      } else {
        handleError("Failed to update Role Listing")
        resetForm()
      }
    } catch (error) {
      handleError("Error occurred when updating role listing")
      resetForm()
    }
  }
  return (
    <>
      <StaffNavbar title={title} items={items} />
      <Toaster />
      <Grid container className="mt-5">
        <Grid item xs={12}>
          <Typography className="mt-5 text-center" variant="h4">
            Update Role Listing
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div className="mb-2 mt-2">
              <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={signupSchema}
                enableReinitialize={true}
              >
                {({ values, touched, errors, handleChange, handleSubmit }) => {
                  const handleStatusChange = (event) => {
                    const updatedArray = storeData
                    updatedArray.status = event.target.value
                    setData(updatedArray)
                    handleChange(event)
                  }
                  const handleStartDateChange = (event) => {
                    //retrieve storeData, edit array and setData
                    const updatedArray = storeData
                    updatedArray.start_date = event
                    setData(updatedArray)
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
                    const updatedArray = storeData
                    updatedArray.end_date = event
                    setData(updatedArray)
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
                          <Typography variant="h5">
                            {storeData.role.name}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <div className="text-left">
                            <Typography variant="h5">
                              <strong>Description</strong>
                            </Typography>
                            <Typography variant="body2">
                                {storeData.role.description}
                            </Typography>
                          </div>
                        </Grid>

                        <Grid item xs={12}>
                          <div className="text-left">
                            <Typography variant="h5">
                              <strong>Status</strong>
                            </Typography>

                            <TextField
                              name="status"
                              id="status"
                              select
                              value={values.status}
                              fullWidth
                              onChange={handleStatusChange}
                              error={
                                Boolean(touched.status) &&
                                Boolean(errors.status)
                              }
                              helperText={touched.status && errors.status}
                            >
                              {status.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </TextField>
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
                              value={values.start_date}
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
                              disablePast
                              format="DD/MM/YYYY"
                              value={values.end_date}
                              onChange={handleEndDateChange}
                              className="w-full"
                            />
                          </div>
                        </Grid>

                        <Grid item xs={12} className="mb-1">
                          <Typography variant="h5">
                            <strong>
                              <span className="mr-2 bg-[#1976D2] pl-2"></span>
                              Skills Required
                            </strong>
                            <br></br>
                            {storeData.role.skills.map((skill, index) => (
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
