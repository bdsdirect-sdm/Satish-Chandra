import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ProfileForm.css'
interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
}

// Initial values for the form
const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
};

// Validation schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    dob: Yup.date().required('Date of Birth is required').nullable(),
    gender: Yup.string().required('Gender is required'),
});

const ProfileForm: React.FC = () => {
    const onSubmit = (values: FormValues) => {
        console.log('Profile Updated', values);
        console.log("values::::")
        // Here you would typically handle the update logic (e.g., API call)
    };

    return (
        <div className="profile-form-container">
            <h2>Update Profile</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div>
                            <label htmlFor="firstName">First Name:</label>
                            <Field type="text" id="firstName" name="firstName" />
                            <ErrorMessage name="firstName" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="lastName">Last Name:</label>
                            <Field type="text" id="lastName" name="lastName" />
                            <ErrorMessage name="lastName" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="dob">Date of Birth:</label>
                            <Field type="date" id="dob" name="dob" />
                            <ErrorMessage name="dob" component="div" className="error" />
                        </div>

                        <div>
                            <label>Gender:</label>
                            <div>
                                <label>
                                    <Field type="radio" name="gender" value="male" />
                                    Male
                                </label>
                                <label>
                                    <Field type="radio" name="gender" value="female" />
                                    Female
                                </label>
                                <ErrorMessage name="gender" component="div" className="error" />
                            </div>

                        </div>

                        <button type="submit">Update Profile</button>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileForm;
