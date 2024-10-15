import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
    email: string;
    password: string;
}

const initialValues: FormValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});


const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);

    const onSubmit = async (values: FormValues) => {
        // Reset error message
        setLoginError(null);

        // Validate against mock data
        try {
            const response = await axios.post('http://localhost:3004/login', values);
            console.log('API Response:', response.data); // Log the response

            // Ensure you check the exact structure of the response
            console.log(response.data.success)
            if (response.data && response.data.success) {
                alert('Log In Successfully!');
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                // Handle invalid credentials
                setLoginError(response.data.message || 'Invalid credentials.'); // Use message from API if available
                alert('Log In Failed!!');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setLoginError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-form-container">
            <h1>Login</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='container'>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <Field type="email" id="email" name="email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>

                            <div>
                                <label htmlFor="password">Password:</label>
                                <Field type="password" id="password" name="password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>
                        </div>

                        {loginError && <div className="error">{loginError}</div>}

                        <button type="submit" disabled={isSubmitting}>Login</button>
                        <Link to="/"><button type="button">Don't Have An Account?</button></Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
