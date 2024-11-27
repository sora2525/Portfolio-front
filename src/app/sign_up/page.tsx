'use client';
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

export default function SignUpPage() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [validationError, setValidationError] = useState<string | null>(null); 
    const { signUp, loading, error, success } = useAuth();
   
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !passwordConfirmation) {
            setValidationError("すべてのフィールドを入力してください");
            return;
        }
        if (password !== passwordConfirmation) {
            setValidationError("パスワードが一致しません");
            return;
        }
        if (password.length < 6) {
            setValidationError("パスワードは6文字以上である必要があります");
            return;
        }
        signUp(name, email, password, passwordConfirmation);
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen p-6">
             <Link href="/" className="absolute top-[80px] left-4 text-3xl text-[#008080] pointer-events-auto">
                <span className="material-icons" style={{ fontSize: '48px' }}>
                reply
                </span>
            </Link>
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg space-y-6 pointer-events-auto">
                <h2 className="text-2xl font-semibold text-center text-teal-600">ユーザー登録</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="名前" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="メールアドレス" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="パスワード" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <input 
                            type="password" 
                            value={passwordConfirmation} 
                            onChange={(e) => setPasswordConfirmation(e.target.value)} 
                            placeholder="パスワード（確認用）" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        {loading ? "登録中..." : "登録"}
                    </button>
                </form>

                {/* 成功、エラー、バリデーションエラーメッセージ */}
                {success && <p className="text-green-600 text-center mt-4">{success}</p>}
                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                {validationError && <p className="text-red-600 text-center mt-4">{validationError}</p>}
            </div>
        </div>
    );
}
