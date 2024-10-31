'use client'
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import Cookies from "js-cookie";
import { authState } from "@/lib/atom/atom";
import { useRecoilState } from "recoil";
import axios from "axios";

export default function SignUpPage() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
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
                console.log("ないよ");
                
            }
            setName("");
            setEmail("");
            setPassword("");
            setPasswordConfirmation("");

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !passwordConfirmation) {
          setError("すべてのフィールドを入力してください");
          return;
        }
        if (password !== passwordConfirmation) {
          setError("パスワードが一致しません");
          return;
        }
        if (password.length < 6) {
          setError("パスワードは6文字以上である必要があります");
          return;
        }
        signUp(name, email, password,passwordConfirmation);
      };

    return (
        <div className="bg-red-50 flex flex-col">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="名前"
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="メールアドレス"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="パスワード"
                />
                <input 
                    type="password" 
                    value={passwordConfirmation} 
                    onChange={(e) => setPasswordConfirmation(e.target.value)} 
                    placeholder="パスワード（確認用）"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "登録中..." : "登録"}
                </button>
            </form>
            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
}
