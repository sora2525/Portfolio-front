"use client";
import { signIn as authSignIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function LineLoginButton() {
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession(); // useSessionでセッション情報を取得

  const handleLineLogin = async () => {
    setError(null); 
    try {
      // LINE認証を実行
      const result = await authSignIn("line", {
        redirect: false, // リダイレクトを無効化
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
    <div className="w-full flex flex-col items-center">
      {/* ログインボタン */}
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
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

      {/* セッション情報表示 */}
      {status === "loading" && <p className="mt-4">セッションを確認中...</p>}
      {status === "authenticated" && session && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="font-bold text-lg mb-2">ログイン成功！</h2>
          <p><strong>ユーザー名:</strong> {session.user?.name}</p>
          <p><strong>メールアドレス:</strong> {session.user?.email}</p>
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="ユーザー画像"
              className="mt-2 w-16 h-16 rounded-full"
            />
          )}
        </div>
      )}
      {status === "unauthenticated" && (
        <p className="mt-4 text-gray-500">ログインしていません。</p>
      )}
    </div>
  );
}
