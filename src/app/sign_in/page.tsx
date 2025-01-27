'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginButton from "@/components/GoogleLogin";
import LineLoginButton from "@/components/LineLogin";

export default function SignInPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validationError, setValidationError] = useState<string | null>(null);
    const [redirectMessage, setRedirectMessage] = useState<string | null>(null);
    const { signIn, loading, error, success } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("redirected") === "true") {
            setRedirectMessage("ログインが必要です");
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setValidationError("すべてのフィールドを入力してください");
            return;
        }
        if (password.length < 6) {
            setValidationError("パスワードは6文字以上である必要があります");
            return;
        }
        signIn(email, password);
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-screen p-6 mt-[50px]">
                <Link href="/" className="absolute top-[80px] left-4 text-3xl text-[#008080] pointer-events-auto ">
                    <span className="material-icons" style={{ fontSize: '48px' }}>
                        reply
                    </span>
                </Link>
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg space-y-6 pointer-events-auto mb-10">
                    <h2 className="text-2xl font-semibold text-center text-teal-600">ログイン</h2>

                    {/* リダイレクトメッセージ */}
                    {redirectMessage && (
                        <p className="text-red-600 text-center mb-4">{redirectMessage}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            {loading ? "ログイン中..." : "ログイン"}
                        </button>
                    </form>

                    <Link 
                        href="/sign_up" 
                        className="block text-center pointer-events-auto bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 py-3"
                    >
                        メールアドレスから登録
                    </Link>
                    <LoginButton />
                    <LineLoginButton />

                    {/* 新規登録リンク */}

                    {/* 成功、エラー、バリデーションエラーメッセージ */}
                    {success && <p className="text-green-600 text-center mt-4">{success}</p>}
                    {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                    {validationError && <p className="text-red-600 text-center mt-4">{validationError}</p>}
                </div>
            </div>
        </>
    );
}
