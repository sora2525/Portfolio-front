"use client";
import { signIn as authSignIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function LineLinkButton() {
  const [error, setError] = useState<string | null>(null);

  const handleLineLogin = async () => {
    setError(null); 
    try {
      const result = await authSignIn("line", {
        redirect: true,
        callbackUrl: "/session/line_link",
      });

      if (result?.error) {
        const errorMessage = `LINE認証に失敗しました: ${result.error}`;
        console.error(errorMessage); 
        setError(errorMessage);
        return;
      }

      console.log("LINEログイン成功");
    } catch (err) {
      const errorMessage = `ログイン処理中にエラーが発生しました: ${err.message || err}`;
      console.error(errorMessage, err); 
      setError("ログイン処理中にエラーが発生しました");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={handleLineLogin}
        className="w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-green-500 hover:bg-green-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
      >
        LINE連携
      </button>

      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
}
