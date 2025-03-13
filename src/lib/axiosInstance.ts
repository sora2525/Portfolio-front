import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

export const axiosInstance = axios.create({
    baseURL, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access-token");
        const client = localStorage.getItem("client");
        const uid = localStorage.getItem("uid");


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
