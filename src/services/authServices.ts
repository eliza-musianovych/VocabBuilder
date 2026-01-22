import axios from "axios";
import type { LoginRequest, RegisterRequest } from "../types/userTypes";
import { clearToken, setToken } from "../utils/token";

const URL = 'https://vocab-builder-backend.p.goit.global/api';

export const getUser = async () => {
    try {
        const response = await axios.get(`${URL}/users/current`);
    return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return null;
        }
        throw error;
    }
};

export const register = async (data: RegisterRequest) => {
    const response = await axios.post(`${URL}/users/signup`, data);

    const token = response.data.token;

    localStorage.setItem('token', token);
    setToken(token);

    return response.data;
};

export const login = async (data: LoginRequest) => {
    const response = await axios.post(`${URL}/users/signin`, data);

    const token = response.data.token;

    localStorage.setItem('token', token);
    setToken(token);

    return response.data;
};

export const logout = async () => {
    await axios.post(`${URL}/users/signout`);
    localStorage.removeItem('token');
    clearToken();
};