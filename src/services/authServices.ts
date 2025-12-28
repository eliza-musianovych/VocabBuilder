import axios from "axios";
import type { LoginRequest, RegisterRequest } from "../types/userTypes";

const URL = 'https://vocab-builder-backend.p.goit.global/api';

export const getUser = async () => {
    const response = await axios.get(`${URL}/users/current`);
    return response.data;
};

export const register = async (data: RegisterRequest) => {
    const response = await axios.post(`${URL}/users/signup`, data);
    return response.data;
};

export const login = async (data: LoginRequest) => {
    const response = await axios.post(`${URL}/users/signin`, data);
    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${URL}/users/signout`);
    return response.data;
}