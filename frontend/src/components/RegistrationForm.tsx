import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userRegistrationForm.css';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [userType, setUserType] = useState('');
    const [hobbies, setHobbies] = useState<string[]>([]);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [resume, setResume] = useState<File | null>(null);
    const [selectedAgency, setSelectedAgency] = useState('');
    const [agencies, setAgencies] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const response = await axios.get('http://localhost:3004/register');
                setAgencies(response.data);
                alert('Successfully Registered');
            } catch (error) {
                console.error('Error fetching agencies:', error);
            }
        };
        fetchAgencies();
    }, []);

    const handleHobbyChange = (hobby: string) => {
        setHobbies(prev =>
            prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
        );
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!firstName) newErrors.firstName = 'First name is required.';
        if (!lastName) newErrors.lastName = 'Last name is required.';
        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email format is invalid.';
        }
        if (!phone) newErrors.phone = 'Phone number is required.';
        if (!/^\d+$/.test(phone)) newErrors.phone = 'Phone number can only contain digits.';
        if (!gender) newErrors.gender = 'Gender is required.';
        if (!userType) newErrors.userType = 'User type is required.';
        if (userType === 'jobSeeker' && !profileImage) newErrors.profileImage = 'Profile image is required.';

        if (userType === 'jobSeeker') {
            if (resume) {
                const validResumeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                if (!validResumeTypes.includes(resume.type)) {
                    newErrors.resume = 'Resume must be a .docx or .pdf file.';
                }
            } else {
                newErrors.resume = 'Resume is required.';
            }
            if (!selectedAgency) newErrors.selectedAgency = 'Selecting an agency is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('gender', gender);
            formData.append('userType', userType);
            formData.append('hobbies', JSON.stringify(hobbies));
            if (profileImage) formData.append('profileImage', profileImage);
            if (resume) formData.append('resume', resume);
            formData.append('selectedAgency', selectedAgency);
            console.log('formData', formData);
            navigate("/login");
            try {
                const response = await axios.post('http://localhost:3004/register', formData);
                console.log('Registration successful:', response.data);
                alert('User Registerd Successfully!!')
                // Reset form logic can be added here
            } catch (error) {
                console.error('Error during registration:', error);
                alert('User already Exists!!')
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registration Form</h1>
            <div className='container'>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        required
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
            </div>

            <div>
                <label>Gender:</label>
                <label>
                    <input
                        type="radio"
                        value="male"
                        checked={gender === 'male'}
                        onChange={e => setGender(e.target.value)}
                    />
                    Male
                </label>
                <label>
                    <input
                        type="radio"
                        value="female"
                        checked={gender === 'female'}
                        onChange={e => setGender(e.target.value)}
                    />
                    Female
                </label>
                <label>
                    <input
                        type="radio"
                        value="other"
                        checked={gender === 'other'}
                        onChange={e => setGender(e.target.value)}
                    />
                    Other
                </label>
                {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div>
                <label>User Type:</label>
                <select value={userType} onChange={e => setUserType(e.target.value)} required>
                    <option value="">Select...</option>
                    <option value="jobSeeker">Job Seeker</option>
                    <option value="agency">Agency</option>
                </select>
                {errors.userType && <span className="error">{errors.userType}</span>}
            </div>

            {userType === 'jobSeeker' && (
                <div className="hobbies">
                    <label>Hobbies:</label>
                    {['Sports', 'Dance', 'Reading', 'Singing'].map(hobby => (
                        <label key={hobby}>
                            <input
                                type="checkbox"
                                checked={hobbies.includes(hobby)}
                                onChange={() => handleHobbyChange(hobby)}
                            />
                            {hobby}
                        </label>
                    ))}
                </div>
            )}

            <div>
                <label>Profile Image (PNG, JPEG,JPG):</label>
                <input
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={e => setProfileImage(e.target.files?.[0] || null)}
                    required
                />
                {errors.profileImage && <span className="error">{errors.profileImage}</span>}
            </div>

            {userType === 'jobSeeker' && (
                <>
                    <div>
                        <label>Upload Resume (.docx, .pdf):</label>
                        <input
                            type="file"
                            accept=".docx,.pdf"
                            onChange={e => setResume(e.target.files?.[0] || null)}
                            required
                        />
                        {errors.resume && <span className="error">{errors.resume}</span>}
                    </div>
                    <div>
                        <label>Select Agency:</label>
                        <select value={selectedAgency} onChange={e => setSelectedAgency(e.target.value)} required>
                            <option value="">Select an Agency...</option>
                            {agencies.length > 0 ? (
                                agencies.map(agency => (
                                    <option key={agency} value={agency}>{agency}</option>
                                ))

                            ) : (
                                <>
                                    <option disabled>No agencies available</option>
                                    <option value="agency1">Agency One</option>
                                    <option value="agency2">Agency Two</option>
                                    <option value="agency3">Agency Three</option>
                                    <option value="agency4">Agency Four</option>
                                </>
                            )}
                        </select>
                        {errors.selectedAgency && <span className="error">{errors.selectedAgency}</span>}
                    </div>
                </>
            )}

            <button type="submit">Register</button>
            <Link to="/login"><button> Already Have An Account</button></Link>

        </form>
    );
};

export default RegistrationForm;
