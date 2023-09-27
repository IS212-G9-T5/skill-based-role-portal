import {useState, useEffect, useRef} from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Chip, Grid, Typography, Container, Button, MenuItem } from "@mui/material";
import { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import React from 'react'


interface MyFormValues {
    roleListing: string
    description: string
    startDate: string
    endDate: string
}

const FORM_VALIDATION = Yup.object().shape({
    roleListing: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    startDate: Yup.string().required("Required"),
    endDate: Yup.string().required("Required"),

})

const endpointUrl = 'http://127.0.0.1:5000/api/listings'


const RolelistingForm = () => {
    const rolesArray = new Array<string>
    const skillsSet = new Set<string>()
    const [data, setData] = useState(null)
    const [roles, setRoles] = useState<string[]>([]);
    const [selectedRole, setSelectedRole] = useState('')
    const [retrievedSkills, setRetrievedSkills] = useState<string[]>([])
    useEffect(() => {
          fetch(endpointUrl)
            .then((response) => response.json())
            .then(res => {
                setData(res.items)
                const result = res.items
                result.forEach(item => {
                    const roleName = item.role.name;
                    const skills = item.role.skills;
                    skills.forEach(skill => {
                        skillsSet.add(skill)
                    })

                    rolesArray.push(roleName)
                    setRoles(rolesArray)
                })
            })
      },
      [])
    const handleSuccess = (msg) =>
        toast.success(msg, {position: "top-center"})

    const handleError = (msg) =>
        toast.error(msg, {position: "top-center"})

    const initialValues: MyFormValues = {
        roleListing: "",
        description: "",
        startDate: "",
        endDate: ""
    }
    const handleFormSubmit = async (values) => {
        try {
            console.log("Form data", values)
            const response = await fetch("http://127.0.0.1:5000/api/listings", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (response.ok){
                if (data.success) {
                    handleSuccess("Create Role Listing")
                }
                else {
                    handleError("Failed to create Role Listing")
                }
            }
        } catch (error) {
            handleError("Error occurred when submitting form")
            console.log(error)
        }
    }
    const handleChange = (event) => {
        const selectedRoleName = event.target.value
        setSelectedRole(selectedRoleName)
        const items = data
        items.forEach(item => {
            const roleName =  item.role.name
            const skills = item.role.skills
            if (roleName === selectedRoleName) {
                setRetrievedSkills(skills)
            }

        })

    }
    const [startDatevalue, setstartDateValue] = React.useState<Dayjs | null>(null);
    const [endDatevalue, setendDateValue] = React.useState<Dayjs | null>(null);

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                        <Typography className="text-center" variant="h4">Role Listing Form</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <div className="mt-2 mb-2">
                            <Formik
                              initialValues={initialValues}
                              validationSchema={FORM_VALIDATION}
                              onSubmit={handleFormSubmit}
                            >
                                {({ touched, errors }) => (
                                  <Form className="flex flex-col gap-4">
                                      <Grid container spacing={2}>
                                          <Grid item xs={12}>
                                              <Typography variant="h5">
                                                  <strong>
                                                      Role
                                                  </strong>
                                              </Typography>
                                              <TextField
                                                name="Role"
                                                label="Role"
                                                value={selectedRole}
                                                select
                                                onChange={handleChange}
                                                fullWidth
                                                error={Boolean(touched.Role) && Boolean(errors.Role)}
                                                helperText={Boolean(touched.Role) && Boolean(errors.Role)}
                                              >
                                                  {roles.map((option,index) => (
                                                      <MenuItem key={index} value={option}>
                                                          {option}
                                                      </MenuItem>
                                                  ))}

                                              </TextField>

                                          </Grid>

                                          <Grid item xs={12}>
                                              <div className="text-left">
                                                  <Typography variant="h5">
                                                      <strong>
                                                          Description
                                                      </strong>
                                                  </Typography>

                                                  <TextField
                                                    name="Description"
                                                    label="Description"
                                                    fullWidth
                                                    error={Boolean(touched.Description) && Boolean(errors.Description)}
                                                    placeholder="Description"
                                                  />
                                              </div>
                                          </Grid>

                                          <Grid item xs={6}>
                                              <div className="text-left">
                                                  <Typography variant="h5">
                                                    <strong>
                                                        Start Date
                                                    </strong>
                                                  </Typography>

                                                  <DatePicker value={startDatevalue} onChange={(newValue) => setstartDateValue(newValue)} label="Start Date"/>
                                              </div>
                                          </Grid>

                                          <Grid item xs={6}>
                                              <div className="text-left">
                                                  <Typography variant="h5">
                                                      <strong>
                                                          End Date
                                                      </strong>
                                                  </Typography>
                                                  <DatePicker value={endDatevalue} onChange={(newValue) => setendDateValue(newValue)} label="End Date"/>
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
                                                    <Chip key={index} label={skill} className="mr-[1%] mt-[1%]" />
                                                  ))}
                                              </Typography>
                                          </Grid>

                                          <Grid item xs={12}>
                                              <Button variant='contained' fullWidth type="submit">Submit</Button>
                                          </Grid>
                                      </Grid>

                                  </Form>
                                )}
                            </Formik>
                        </div>
                    </Container>
                </Grid>
            </Grid>

        </>
    )
}
export default RolelistingForm