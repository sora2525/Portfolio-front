'use client'
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function SignInPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validationError, setValidationError] = useState<string | null>(null); 
    const { signIn, loading, error,success } = useAuth();
   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ( !email || !password) {
            setValidationError("すべてのフィールドを入力してください");
            return;
        }
        if (password.length < 6) {
            setValidationError("パスワードは6文字以上である必要があります");
            return;
        }
        signIn(email, password,);
      };

    return (

        <>
        <div className="bg-red-50 flex flex-col pointer-events-auto">
            <form onSubmit={handleSubmit}>
                
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
                
                <button type="submit" disabled={loading}>
                    {loading ? "登録中..." : "登録"}
                </button>
            </form>
            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
            {validationError && <p className="text-red-600">{validationError}</p>}
        </div>
        </>
    );
}
