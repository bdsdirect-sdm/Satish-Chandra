import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './personRegister.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    companyAddress: string;
    companyCity: string;
    companyState: string;
    companyZipCode: string;
    homeAddress: string;
    homeCity: string;
    homeState: string;
    homeZipCode: string;
    profilePhoto?: File;
    appointmentLetter?: File;
    termsAccepted: boolean;
}

const EditUserForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/users/getUsers/${id}`);
                console.log("response.data", response.data)
                formik.setValues(response.data);

                // Set the profile image if available
                if (response.data.profilePhoto) {
                    const profilePic = response.data.profilePhoto.split('/');
                    setProfileImage(`http://localhost:3030/${profilePic}`);
                }
            } catch (error) {
                alert('Error fetching user data. Please try again.');
            }
        };
        fetchUserData();
    }, [id]);

    const formik = useFormik<FormValues>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            companyAddress: "",
            companyCity: "",
            companyState: "",
            companyZipCode: "",
            homeAddress: "",
            homeCity: "",
            homeState: "",
            homeZipCode: "",
            profilePhoto: undefined,
            appointmentLetter: undefined,
            termsAccepted: false,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string()
                .email("Email is invalid")
                .required("Email is required"),
            companyAddress: Yup.string().required("Company Address is required"),
            companyCity: Yup.string().required("Company City is required"),
            companyState: Yup.string().required("Company State is required"),
            companyZipCode: Yup.string()
                .matches(/^[0-9]{6}$/, "Company Zip Code must be exactly 6 digits")
                .required("Company Zip Code is required"),
            homeAddress: Yup.string().required("Home Address is required"),
            homeCity: Yup.string().required("Home City is required"),
            homeState: Yup.string().required("Home State is required"),
            homeZipCode: Yup.string()
                .matches(/^[0-9]{6}$/, "Home Zip Code must be exactly 6 digits")
                .required("Home Zip Code is required"),
            profilePhoto: Yup.mixed(),
            appointmentLetter: Yup.mixed(),
            termsAccepted: Yup.boolean()
                .oneOf([true], "You must accept the terms and conditions")
                .required("You must accept the terms and conditions"),
        }),
        onSubmit: async (values: any) => {
            console.log(values);

            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });
            console.log("dsffffffffff");

            try {
                await axios.put(`http://localhost:3030/users/updateUser/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('User updated successfully!');
                navigate('/users'); // Adjust the navigation as needed
            } catch (error: any) {
                alert('User not updated. Please try again.');
            }
        },
    });
    const handleFileChange = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        formik.setFieldValue(field, file);
        if (field === 'profilePhoto' && file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleCancel = () => {
        formik.resetForm();
    };

    const handleSubmit = () => {
        formik.submitForm();
    }
    return (
        <form onSubmit={formik.handleSubmit} className="registration-form">
            <h2>Update User</h2>

            {/* Profile Picture Display */}
            <div className="profile-picture">
                {profileImage ? (
                    <img src={profileImage} alt="Profile" style={{ width: "180px", height: "140px" }} />
                ) : (
                    <span>No Profile Picture</span>
                )}
            </div>

            {/* Form Fields */}
            {Object.entries(formik.values).map(([key, value]) => {
                if (key === "profilePhoto" || key === "appointmentLetter") return null; // Skip file fields for rendering
                return (
                    <div key={key}>
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: </label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                    </div>
                );
            })}

            {/* File Upload Fields */}
            <div>
                <label htmlFor="profilePhoto">Upload Profile Photo:</label>
                <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileChange("profilePhoto")}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.profilePhoto && formik.errors.profilePhoto && (
                    <span className="error">{formik.errors.profilePhoto}</span>
                )}
            </div>

            <div>
                <label htmlFor="appointmentLetter">Upload Appointment Letter:</label>
                <input
                    type="file"
                    id="appointmentLetter"
                    name="appointmentLetter"
                    onChange={handleFileChange("appointmentLetter")}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.appointmentLetter && formik.errors.appointmentLetter && (
                    <span className="error">{formik.errors.appointmentLetter}</span>
                )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        defaultChecked={formik.values.termsAccepted}
                        onChange={(e) => { formik.setFieldValue("termsAccepted", e.target.checked) }
                        }
                        onBlur={formik.handleBlur}
                    />
                    I accept the terms and conditions
                </label>
                {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                    <span className="error">{formik.errors.termsAccepted}</span>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button type="button" onClick={handleSubmit}>Update</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditUserForm;
