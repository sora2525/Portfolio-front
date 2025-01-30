"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { flashMessageState } from "@/lib/atom/flashMessageAtom";

export default function FlashMessage() {
  const [flashMessage, setFlashMessage] = useRecoilState(flashMessageState);

  useEffect(() => {
    if (flashMessage.message) {
      const timer = setTimeout(() => {
        setFlashMessage({ message: null, type: null });
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [flashMessage, setFlashMessage]);

  if (!flashMessage.message) return null;

  return (
    <div
      className={`fixed top-16 right-4 px-4 py-2 rounded-lg shadow-lg text-white text-sm z-50 ${
        flashMessage.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {flashMessage.message}
    </div>
  );
}
