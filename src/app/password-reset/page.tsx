'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

const PasswordReset = () => {
  const searchParams = useSearchParams();
  const { success, error, loading, resetPasswordConfirm } = useAuth(); 

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!searchParams.get("access-token") || !searchParams.get("client") || !searchParams.get("uid")) {
      setLocalError("無効なパスワードリセットリンクです。");
    }
  }, [searchParams]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLocalSuccess(null);

    if (newPassword !== confirmPassword) {
      setLocalError("パスワードが一致しません。");
      return;
    }

    await resetPasswordConfirm(newPassword, confirmPassword, searchParams.get("access-token") || "");

    if (success) {
      setLocalSuccess(success);
    }
    if (error) {
      setLocalError(error);
    }
  };

  return (
    <div className="pointer-events-auto">
      <h1>パスワードリセット</h1>
      {(localError || error) && <p style={{ color: "red" }}>{localError || error}</p>}
      {(localSuccess || success) && <p style={{ color: "green" }}>{localSuccess || success}</p>}
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