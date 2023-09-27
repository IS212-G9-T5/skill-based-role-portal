import {useState, useEffect} from "react";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { Chip, Grid, Typography, Container, Button, MenuItem } from "@mui/material";
import { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import React from 'react'


interface MyFormValues {
    role: string
    description: string
    startDate: string
    endDate: string
}

// const validationSchema = Yup.object({
//     description: Yup
//         .string()
//         .required('Description is required'),
//     startDate: Yup
//         .string()
//         .required('Start Date is required'),
//     endDate: Yup
//         .string()
//         .required('End Date is required')
// });


const endpointUrl = 'http://127.0.0.1:5000/api/listings'


const RolelistingForm = () => {
    const rolesArray = new Array<string>
    const skillsSet = new Set<string>()
    const [data, setData] = useState(null)
    const [roles, setRoles] = useState<string[]>([]);
    const [selectedRole, setSelectedRole] = useState('')
    const [retrievedSkills, setRetrievedSkills] = useState<string[]>([])
    const [startDateValue, setstartDateValue] = useState<Dayjs | null>(null);
    const [endDateValue, setendDateValue] = useState<Dayjs | null>(null);

    useEffect(() => {
          fetch(endpointUrl)
            .then((response) => response.json())
            .then(res => {
                console.log("res", res)
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
        role: "",
        description: "",
        startDate: "",
        endDate: ""
    }

    const handleFormSubmit = async (values) => {
        console.log("Form data", values)

        try {
            const response = await fetch("http://localhost:5000/api/listings", {
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

    const handleDropDownChange = (event) => {
        const selectedRoleName = event.target.value
        console.log("selectedRoleName", selectedRoleName)
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
                              onSubmit={handleFormSubmit}
                            >
                                {({ values, touched, errors, handleChange, handleSubmit }) => {
                                    const combinedHandler = (event) => {
                                        handleDropDownChange(event)
                                        handleChange(event)
                                    }
                                    const handleStartDateChange = (event: Dayjs | null) => {
                                       console.log("start date", event)
                                       setstartDateValue(event)
                                       handleChange(event)
                                    }
                                    const handleEndDateChange = (event: Dayjs | null) => {
                                        console.log("end date", event)
                                        setendDateValue(event)
                                    }
                                    return (
                                        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5">
                                                        <strong>
                                                            Role
                                                        </strong>
                                                    </Typography>
                                                    <TextField
                                                        name="role"
                                                        id="role"
                                                        value={selectedRole}
                                                        select
                                                        onChange={combinedHandler}
                                                        fullWidth
                                                        error={Boolean(touched.role) && Boolean(errors.role)}
                                                        helperText={touched.role && errors.role}
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
                                                            <strong>
                                                                Description
                                                            </strong>
                                                        </Typography>

                                                        <TextField
                                                            name="description"
                                                            id="description"
                                                            label="Description"
                                                            fullWidth
                                                            placeholder="Description"
                                                            onChange={handleChange}
                                                            error={Boolean(touched.description) && Boolean(errors.description)}
                                                            helperText={touched.description && errors.description}
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
                                                        <DatePicker value={startDateValue} onChange={handleStartDateChange} label="StartDate"/>
                                                    </div>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <div className="text-left">
                                                        <Typography variant="h5">
                                                            <strong>
                                                                End Date
                                                            </strong>
                                                        </Typography>
                                                        <DatePicker value={endDateValue} onChange={handleEndDateChange} label="EndDate"/>
                                                    </div>
                                                </Grid>

                                                <Grid item xs={12} style={{marginBottom: "3%"}}>
                                                    <Typography variant="h5">
                                                        <strong>
                                                            <span className="mr-2 bg-[#1976D2] pl-2"></span>
                                                            Skills Required
                                                        </strong>
                                                        <br></br>
                                                        {retrievedSkills.map((skill, index) => (
                                                            <Chip key={index} label={skill} className="mr-[1%] mt-[1%]"/>
                                                        ))}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Button variant='contained' fullWidth type="submit">Submit</Button>
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