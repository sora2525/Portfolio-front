import axios from "axios";
import Cookies from "js-cookie";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export const axiosInstance = axios.create({
    baseURL, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        if (accessToken && client && uid) {
            config.headers["access-token"] = accessToken;
            config.headers["client"] = client;
            config.headers["uid"] = uid;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
