import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './userRegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Define the validation schema using Yup
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[A-Z]+$/, 'First name must be in uppercase letters')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .matches(/^[A-Z]+$/, 'Last name must be in uppercase letters')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
});

const UserRegistrationForm: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (values: FormValues) => {
        try {
            await (values);
            navigate('/login');
            console.log(values, "<<<<<<<<<<");
        } catch (error) {
            alert(`email already exists!!, ${error}`);
        };
        {

            try {
                const response = await axios.post('http://localhost:3003/register', values);

                console.log('Success:', response.data);
                alert('Registration successful!');
                navigate('/login'); // Redirect to login page after successful registration
            } catch (error) {
                console.error('Error:', error);
                alert('Registration failed!');
            }
        };
    }
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }}

            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <h2>Register</h2>
                    <div className='container'>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" />
                            <ErrorMessage name="firstName" component="div" />
                        </div>

                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" />
                            <ErrorMessage name="lastName" component="div" />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                    </div>

                    {/* Change button type to submit for form submission */}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default UserRegistrationForm;
