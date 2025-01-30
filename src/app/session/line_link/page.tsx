"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LineLinkSession() {
  const { lineLink } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSession = async () => {
      const session = await getSession();
      if (!session?.user) {
        router.push("/");
        return;
      }

      await lineLink(session.user.sub, router);
      setLoading(false);
    };

    handleSession();
  }, [lineLink, router]);

  return loading ? <p>連携処理中...</p> : null;
}
