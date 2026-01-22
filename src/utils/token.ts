import axios from "axios"

export const setToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
    delete axios.defaults.headers.common.Authorization;
};