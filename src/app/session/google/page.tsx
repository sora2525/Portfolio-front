"use client";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function GoogleSession() {
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    const handleSession = async () => {
      const session = await getSession();
      if (!session?.user) return;

      try {
        await loginWithGoogle(
          session.user.email || "",
          "google",
          session.user.email || "",
          session.user.name || "",
          session.user.image || ""
        );
      } catch (err) {
        console.error("ログイン処理中にエラーが発生しました:", err);
      }
    };

    handleSession();
  }, [loginWithGoogle]);

  return <p>ログイン処理中...</p>;
}
