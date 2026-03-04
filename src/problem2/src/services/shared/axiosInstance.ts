import axios from "axios";
import { API_TIMEOUT_MS } from "../../config/constants";
import env from "../../config/env";

const baseURL = new URL(env.PRICES_API_URL).origin;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: API_TIMEOUT_MS,
});


axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || error.message || "Something went wrong";
        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;
