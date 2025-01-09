"use client";
import { signIn as authSignIn } from "next-auth/react";
import { useState } from "react";

export default function LoginButton() {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setError(null); 
    try {
      // Google認証を実行 (リダイレクト無効化)
      const result = await authSignIn("google", {
        redirect: true,
        callbackUrl: "/session/google",
        prompt: "select_account",
      });

      if (result?.error) {
        setError("Google認証に失敗しました");
        return;
      }

      console.log("Googleログイン成功");
    } catch (err) {
      console.error("ログイン処理中にエラーが発生しました:", err);
      setError("ログイン処理中にエラーが発生しました");
    }
  };

  return (
    <>
    <div className="w-full flex justify-center">
      <button
        onClick={handleGoogleLogin}
        className="
          px-6 py-3 text-white font-semibold rounded-lg shadow-md 
          bg-blue-500 hover:bg-blue-600 focus:outline-none 
          transition duration-300 ease-in-out transform hover:scale-105
        "
      >
        Googleでログイン
      </button>
      {/* エラー表示 */}
      {error && (
        <p className="mt-4 text-red-500 font-medium">{error}</p>
      )}
    </div>
    </>
  );
}
