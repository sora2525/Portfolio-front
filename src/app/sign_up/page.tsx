'use client'
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import Cookies from "js-cookie";
import { authState } from "@/lib/atom/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useAuth } from "@/lib/hooks/useAuth";

export default function SignUpPage() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const { signUp, loading, error,success } = useAuth();
   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !passwordConfirmation) {
          return;
        }
        if (password !== passwordConfirmation) {
          return;
        }
        if (password.length < 6) {
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
