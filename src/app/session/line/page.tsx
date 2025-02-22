"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LineSession() {
  const { loginWithLine } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSession = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user) {
          setError("セッション情報が取得できませんでした");
          setLoading(false);
          router.push("/"); 
          return;
        }

        await loginWithLine(
          session.user.sub || "",
          "line",
          session.user.email || "",
          session.user.name || "",
          session.user.image || "",
          session.user.sub || ""
        );

        router.push("/");
      } catch (err) {
        console.error("ログイン処理中にエラーが発生しました:", err);
        setError("ログイン処理中にエラーが発生しました");
        setLoading(false);
        router.push("/"); 
      }
    };

    handleSession();
  }, [loginWithLine, router]);

  if (loading) {
    return <p>ログイン処理中...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return null;
}
