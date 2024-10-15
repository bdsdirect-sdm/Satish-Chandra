import axios, { AxiosResponse } from 'axios';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(
            'https://localhost:3000/signUp.com/login',
            { email, password }
        );
        console.log("response:::::::::: ", response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            throw error;
        } else {
            console.error('Unknown error:', error);
            throw error;
        }
    }
};

// Usage example
const email = 'example@email.com';
const password = 'mypassword';

loginUser(email, password)
    .then((response) => {
        console.log('Login successful:', response);
        // Handle successful login (e.g., store token, update state)
    })
    .catch((error) => {
        console.error('Login error:', error);
        // Handle login error (e.g., display error message)
    });
