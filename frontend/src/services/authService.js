import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // Update with your Django backend URL

// Register a new user
export const register = async (userData) => {
    const response = await axios.post(`${API_URL}register/`, userData);
    return response.data;
};

// Log in a user
export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}login/`, credentials);
    return response.data;
};

// Log out a user
export const logout = async () => {
    // Implement logout functionality if needed
};

// Request a password reset
export const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}forgot-password/`, { email });
    return response.data;
};

// Reset password
export const resetPassword = async (uid, token, newPassword) => {
    const response = await axios.post(`${API_URL}reset-password/${uid}/${token}/`, { password: newPassword });
    return response.data;
};