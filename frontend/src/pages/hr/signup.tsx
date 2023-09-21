import React from 'react'
import { Formik, Field, Form } from 'formik'

interface MyFormValues {
    roleListing: string;
    description: string;
    applicationDeadline: string;
    toggle: boolean;
    skills: string[];
}

const RolelistingForm = () => {
    const initialValues: MyFormValues = { roleListing: '', description: '', applicationDeadline: '', toggle: false, skills: [] };
    return (
        <>
        <h1 className="text-left mb-10">Role Listing Form</h1>
        <div>
            <Formik initialValues={{
                roleListing: '',
                description: '',
                applicationDeadline: '',
                toggle: false,
                skills: []
            }}
                onSubmit={
                    async (values, { setSubmitting }) => {
                        await new Promise(r => setTimeout(r, 500));
                        setSubmitting(false);
                    }
                }>
                {({ values }) => (
                    <div className="h-full w-full">
                    <Form className="flex flex-col gap-4">
                            <div className="text-left">
                                <h2 className="text-base font-semibold">Role Listing Title</h2>
                                <label htmlFor="roleListing">
                                    <Field
                                        id="roleListing"
                                        name="roleListing"
                                        type="text"
                                        placeholder="Title"
                                    />
                                </label>
                            </div>

                            <div className="text-left">
                            <h2 className="text-base font-semibold">Description</h2>
                            <label htmlFor="description"><Field
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Description"
                            /></label>
                            </div>

                            <div className="text-left">
                                <div className="flex flex-row" id="checkbox-group">Skills</div>
                                <div className="flex flex-row gap-2" role="group" aria-labelledby="checkbox-group">

                                    <div className="flex">
                                        <label>
                                            <Field type="checkbox" name="checked" value="One" />
                                            Skill 1
                                        </label>
                                    </div>
                                                
                                    <div className="flex">
                                    <label>
                                        <Field type="checkbox" name="checked" value="Two" />
                                        Skill 2
                                    </label>
                                    </div>

                                    <div className="flex">
                                    <label>
                                        <Field type="checkbox" name="checked" value="Three" />
                                        Skill 3
                                    </label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit">Submit</button>
                    </Form>
                    </div>
             
                )}

            </Formik>
        </div>
        </>
    );
};

export default RolelistingForm;