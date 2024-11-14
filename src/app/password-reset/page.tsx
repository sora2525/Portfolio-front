'use client';
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

interface PasswordResetProps {
    searchParams: {
        reset_password_token?: string;
        ["access-token"]?: string;
        client?: string;
        uid?: string;
    };
}

const PasswordReset = ({ searchParams }: PasswordResetProps) => {
    const { success, error, loading, resetPasswordConfirm } = useAuth();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (newPassword !== confirmPassword) {
            setLocalError("パスワードが一致しません。");
            return;
        }

        await resetPasswordConfirm(
            newPassword,
            confirmPassword,
            searchParams.reset_password_token || "",
            searchParams["access-token"] || "",
            searchParams.client || "",
            searchParams.uid || ""
        );
    };

    return (
        <div className="pointer-events-auto">
            <h1>パスワードリセット</h1>
            {(localError || error) && <p style={{ color: "red" }}>{localError || error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handlePasswordReset}>
                <div>
                    <label>新しいパスワード</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>パスワード確認</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "リセット中..." : "パスワードをリセット"}
                </button>
            </form>
        </div>
    );
};

export default PasswordReset;