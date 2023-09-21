import React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {Grid, Typography} from "@mui/material";
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface MyFormValues {
    roleListing: string
    description: string
    applicationDeadline: string
    toggle: boolean
    skills: string[]
}

const FORM_VALIDATION = Yup.object().shape({
    roleListing: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    applicationDeadline: Yup.string().required("Required"),
})

const response = fetch('https://localhost:8080/roles')


const RolelistingForm = () => {
    const initialValues: MyFormValues = {
        roleListing: "",
        description: "",
        applicationDeadline: "",
        toggle: false,
        skills: [],
    }
    const handleFormSubmit = async (values) => {
        try {
            await new Promise((r) => setTimeout(r, 500))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1 className="mb-10 text-left">Role Listing Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleFormSubmit}
            >
                {({ values }) => (
                    <Form className="flex flex-col gap-4">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography>
                                    Role
                                </Typography>
                                <Select
                                name="Role"
                                label="role"
                                options={response}
                                />

                            </Grid>

                            <Grid item xs={12}>
                                <div className="text-left">
                                    <Typography>
                                        Description
                                    </Typography>

                                    <TextArea
                                        name="Description"
                                        label="description"
                                        className="w-80 font-sans font-normal"
                                        placeholder="Description"
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <div className="text-left">
                                    <Typography>
                                        Start Date
                                    </Typography>
                                    <DatePicker label="Start Date"/>
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <div className="text-left">
                                    <Typography>
                                        End Date
                                    </Typography>
                                    <DatePicker label="End Date"/>
                                </div>
                            </Grid>

                        </Grid>


                        <div className="text-left">
                            <div className="flex flex-row" id="checkbox-group">
                                Skills
                            </div>
                            <div
                                className="flex flex-row gap-2"
                                role="group"
                                aria-labelledby="checkbox-group"
                            >
                                <div className="flex">
                                    <label>
                                        <Field type="checkbox" name="checked" value="One" />
                                    </label>
                                    <div className="ml-1">Skill 1</div>
                                </div>

                                <div className="flex">
                                    <label>
                                        <Field type="checkbox" name="checked" value="Two" />
                                    </label>
                                    <div className="ml-1">Skill 2</div>
                                </div>

                                <div className="flex">
                                    <label>
                                        <Field type="checkbox" name="checked" value="Three" />
                                    </label>
                                    <div className="ml-1">Skill 3</div>
                                </div>
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                    )}
            </Formik>
        </>
    )
}
export default RolelistingForm
