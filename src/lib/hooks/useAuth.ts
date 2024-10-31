import { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atom/atom";
import { axiosInstance } from "../axiosInstance";
import Cookies from "js-cookie";
import axios from "axios";



export const useAuth = ()=>{
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setAuth] = useRecoilState(authState);

    const signUp = async (name: string, email: string, password: string, passwordConfirmation: string) => {
        setLoading(true);
        try{
            const response = await axiosInstance.post("/auth",{
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            })

            console.log(response);
            

            const { "access-token": accessToken,client,uid} = response.headers;
            if (accessToken && client && uid){
                Cookies.set("access-token", accessToken, { expires: 7 });
                Cookies.set("client", client, { expires: 7 });
                Cookies.set("uid", uid, { expires: 7 });

                setAuth({isAuthenticated: true,user: response.data.data});
                setSuccess("ユーザー登録に成功しました！");
                setError(null);
            }else{
                console.log("トークン情報なし");
                
            }

        }catch(e: unknown){
            if(axios.isAxiosError(e)){
                setError(e.response?.data?.errors?.[0] || "登録に失敗しました");
            }else{
                setError("登録に失敗しました")
            }
            setSuccess(null);
        }finally{
            setLoading(false)
        }
    }
    return { success,error,loading,signUp}
}