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
      className={`fixed top-16 right-4 px-2 py-1 sm:px-6 sm:py-3 rounded-full shadow-lg text-white text-[12px] sm:text-sm z-50 flex items-center space-x-2
        ${flashMessage.type === "success" ? "bg-pink-400 shadow-pink-300" : "bg-yellow-300 text-gray-800 shadow-yellow-300"} 
        animate-bounce transition-opacity duration-500 ease-in-out opacity-100`}
    >
      <span className="text-lg">
        {flashMessage.type === "success" ? "🎉" : "⚠️"}
      </span>
      <span>{flashMessage.message}</span>
    </div>
  );
}
