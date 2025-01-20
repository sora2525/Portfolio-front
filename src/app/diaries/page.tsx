"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDiaries } from "@/lib/hooks/useDiaries";
import { DiaryItem } from "@/components/diary/DiaryItem";

export default function Diary() {
  const { diaries, error, getDiaries, getPublicDiaries, destroyDiary } = useDiaries();
  const [mode, setMode] = useState<"mine" | "public">("mine");

  useEffect(() => {
    const fetchData = async () => {
      await getDiaries();
    };
    fetchData();
  }, []); 

  const handleShowMine = async () => {
    await getDiaries();
    setMode("mine");
  };

  const handleShowPublic = async () => {
    await getPublicDiaries();
    setMode("public");
  };

  return (
    <div className="container mx-auto p-4 pointer-events-auto">
      <h1 className="text-3xl font-bold mb-4">日記一覧</h1>

      <div className="mb-4 space-x-2">
        <button
          onClick={handleShowMine}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          自分の日記
        </button>
        <button
          onClick={handleShowPublic}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          公開日記
        </button>
        <Link
          href="/diaries/new"
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          新しい日記を作成
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="max-h-[80vh] overflow-y-auto">
        <ul className="space-y-4">
          {diaries.map((diary) => (
            <DiaryItem key={diary.id} diary={diary} onDelete={destroyDiary} />
          ))}
        </ul>
      </div>
    </div>
  );
}
