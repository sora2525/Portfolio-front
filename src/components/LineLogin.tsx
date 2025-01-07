"use client";
import { signIn as authSignIn } from "next-auth/react";
import { useState } from "react";

export default function LineLoginButton() {
  const [error, setError] = useState<string | null>(null);

  const handleLineLogin = async () => {
    setError(null); 
    try {
      // LINE認証を実行
      const result = await authSignIn("line", {
        redirect: false, // 認証後のリダイレクトを有効化
      });

      if (result?.error) {
        const errorMessage = `LINE認証に失敗しました: ${result.error}`;
        console.error(errorMessage); // エラーをコンソールに記録
        setError(errorMessage);
        return;
      }

      console.log("LINEログイン成功");
    } catch (err) {
      const errorMessage = `ログイン処理中にエラーが発生しました: ${err.message || err}`;
      console.error(errorMessage, err); // エラー詳細をコンソールに記録
      setError("ログイン処理中にエラーが発生しました");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <button
          onClick={handleLineLogin}
          className="
            px-6 py-3 text-white font-semibold rounded-lg shadow-md 
            bg-green-500 hover:bg-green-600 focus:outline-none 
            transition duration-300 ease-in-out transform hover:scale-105
          "
        >
          LINEでログイン
        </button>
        {/* エラー表示 */}
        {error && (
          <p className="mt-4 text-red-500 font-medium">{error}</p>
        )}
      </div>
    </>
  );
}
