import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}register/`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}login/`, credentials);
    return response.data;
};

export const logoutUser = async (refreshToken) => {
    const response = await axios.post(`${API_URL}logout/`, { refresh: refreshToken });
    return response.data;
};

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}products/`);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${API_URL}products/${id}/`);
    return response.data;
};