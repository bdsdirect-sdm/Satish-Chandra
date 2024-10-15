import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUsers.css';
import { useNavigate } from 'react-router-dom';


const jobSeekersToHtml = (jobSeekers: any[]) => {
    return jobSeekers.map((jobSeeker) => (
        <li key={jobSeeker.id}>
            {jobSeeker.firstName} {jobSeeker.lastName} - {jobSeeker.email}
        </li>
    ));
};

const agencyToHtml = (agency: any) => {
    return (
        <div>
            <p><strong>firstName:</strong> {agency.name}</p>
            <p><strong>lastName:</strong> {agency.email}</p>
            <p><strong>email:</strong> {agency.address}</p>

        </div>
    );
};

const JobSeekersList: React.FC<{ agencyId: string }> = ({ agencyId }) => {
    const navigate = useNavigate();
    const [jobSeekers, setJobSeekers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobSeekers = async () => {
            try {
                const response = await axios.get(`http://localhost:3004/jobSeekers`);
                setJobSeekers(response.data);
            } catch (err) {
                setError('Failed to fetch job seekers.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobSeekers();
    }, [agencyId]);

    if (loading) return <div>Loading job seekers...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Job Seekers</h2>
            <ul>
                {jobSeekersToHtml(jobSeekers)}
            </ul>
        </div>
    );
};

// AgencyDetails component to fetch and display the selected agency details
const AgencyDetails: React.FC<{ agencyId: string }> = ({ agencyId }) => {
    const [agency, setAgency] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgencyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3004/agency/3`);
                setAgency(response.data);
            } catch (err) {
                setError('Failed to fetch agency details...');
            } finally {
                setLoading(false);
            }
        };

        fetchAgencyDetails();
    }, [agencyId]);
    console.log(agency)

    if (loading) return <div>Loading agency details...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Agency Details</h2>
            {agency ? agencyToHtml(agency) : <div>No agency data available.</div>}
        </div>
    );
};

// Main UserDashboard component
const UserDashboard: React.FC<{ userRole: string; agencyId: string }> = ({ userRole, agencyId }) => {
    const navigate = useNavigate();


    const handleLogOut = () => {
        // Perform any logout logic here (e.g., clear tokens or user data)
        navigate("/login");
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            {userRole === 'agency' ?
                (
                    <JobSeekersList agencyId={agencyId} />
                ) : userRole === 'jobSeeker' ? (
                    <AgencyDetails agencyId={agencyId} />
                ) : (
                    <div>Please log in as a job seeker or agency.</div>
                )}
            <button onClick={handleLogOut}>Logout</button>
        </div>
    );
};

export default UserDashboard;
