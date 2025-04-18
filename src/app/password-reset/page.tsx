// PasswordReset.tsx
'use client';
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

const PasswordResetForm = () => {
    const { loading, resetPasswordConfirm } = useAuth();
    const searchParams = useSearchParams();
    const resetToken = searchParams.get("reset_password_token") || "";

    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [localError, setLocalError] = useState<string | null>(null);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (newPassword !== confirmPassword) {
            setLocalError("パスワードが一致しません。");
            return;
        }

        if (!resetToken) {
            setLocalError("パスワードリセットトークンが無効です。");
            return;
        }

        await resetPasswordConfirm(newPassword, confirmPassword, resetToken);
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-full p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg pointer-events-auto">
                <h1 className="text-2xl font-semibold text-center text-teal-600 mb-6">パスワードリセット</h1>

                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">新しいパスワード</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">パスワード確認</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        {loading ? "リセット中..." : "パスワードをリセット"}
                    </button>
                </form>
            </div>
        </div>
    );
};

// SuspenseでPasswordResetFormをラップ
const PasswordReset = () => {
    return (
        <Suspense fallback={<div className="text-center mt-8">読み込み中...</div>}>
            <PasswordResetForm />
        </Suspense>
    );
};

export default PasswordReset;
