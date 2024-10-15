import axios from 'axios';
import './App.css';
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const RegistrationForm = async (data: { username: string; password: string }) => {
    const response = await api.post('/register', data);
    return response.data;
};

export const LoginForm = async (data: { username: string; password: string }) => {
    const response = await api.post('/login', data);
    return response.data;
};

export const ProfileForm = async (data: { id: string; username: string; password: string }) => {
    const response = await api.put(`/users/${data.id}`, data);
    return response.data;
};

