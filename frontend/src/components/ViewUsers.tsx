import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUsers.css';
import { useNavigate } from 'react-router-dom';
const ViewUsers = () => {
    const [users, setUsers] = useState<any>({}); // Adjust type as necessary
    const navigate: any = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3030/users');
                setUsers(response.data);
                console.log(response, "..............");

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleUpdate = async (id: string) => {
        if (window.confirm("Are you sure you want to Updating this users?")) {
            try {
                navigate(`/Edit/${users.id}`);
                await axios.put(`http://localhost:3030/users/${id}`);
                //setUsers(users.filter(Users=> users._id !== id));
            } catch (error) {
                console.error("Error Updating users:", error);
            }
        }

    };

    return (
        <div>
            <h2>View Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Profile Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company Address</th>
                        <th>Company City</th>
                        <th>Company State</th>
                        <th>Company Zip Code</th>
                        <th>Home Address</th>
                        <th>Home City</th>
                        <th>Home State</th>
                        <th>Home Zip Code</th>
                        <th>Appointment Letter</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td></td>
                        <td>{users.firstName} {users.lastName}</td>
                        <td>{users.email}</td>
                        <td>{users.companyAddress}</td>
                        <td>{users.companyCity}</td>
                        <td>{users.companyState}</td>
                        <td>{users.companyZip}</td>
                        <td>{users.homeAddress}</td>
                        <td>{users.homeCity}</td>
                        <td>{users.homeState}</td>
                        <td>{users.homeZip}</td>
                        <td>
                            {users.appointmentLetter && (
                                <a href={users.appointmentLetter} target="_blank" rel="noopener noreferrer">
                                    Download
                                </a>
                            )}
                        </td>
                        <td>
                            <button onClick={() => handleUpdate(users._id)}>Update</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;
