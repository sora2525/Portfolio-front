//axiosInstance
import axios from "axios";
import Cookies from "js-cookie";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1"
})

axiosInstance.interceptors.request.use(
    (config) =>{
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        if(accessToken && client && uid){
            config.headers["access-token"] = accessToken;
            config.headers["client"] = client;
            config.headers["uid"] = uid;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
)