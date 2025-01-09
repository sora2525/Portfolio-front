"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LineLinkSession() {
  const { lineLink } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSession = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user) {
          setError("セッション情報が取得できませんでした");
          router.push("/"); 
          return;
        }

        await lineLink(session.user.sub);
        setError(null);
        router.push("/");
      } catch (err) {
        console.error("連携にエラーが発生しました:", err);
        setError("連携にエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    handleSession();
  }, [lineLink, router]);

  if (loading) {
    return <p>連携処理中...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return null;
}
