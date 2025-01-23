"use client";
import React, { useEffect, useState } from "react";
import { useDiaries } from "@/lib/hooks/useDiaries";
import { DiaryItem } from "@/components/diary/DiaryItem";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import Link from "next/link";
import DiaryForm from "@/components/diary/DiaryForm";

export default function Diary() {
  const { diaries, error, getDiaries, getPublicDiaries, destroyDiary } =
    useDiaries();
  const [mode, setMode] = useState<"mine" | "public">("mine");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const auth = useRequireAuth();

  // データ取得
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

  const handleFormSubmit = async () => {
    await getDiaries(); // 投稿後にデータを再取得してリストを更新
    setIsFormVisible(false); // フォームを非表示にする
  };

  return (
    <div className="container mx-auto p-4 pointer-events-auto relative">
      <h1 className="text-3xl font-bold mb-4 text-center">日記一覧</h1>

      <div className="mb-4 flex items-center max-w-[900px]">
        {/* 戻るリンク */}
        <Link
          href="/"
          className="flex items-center text-[#008080] hover:text-[#006666] transition-colors"
        >
          <span className="material-icons" style={{ fontSize: "36px" }}>
            reply
          </span>
        </Link>

        {/* 自分の日記ボタン */}
        <button
          onClick={handleShowMine}
          className={`px-4 py-2 flex-1 text-center relative ${
            mode === "mine" ? "text-blue-600 font-bold" : "text-gray-600"
          }`}
        >
          自分の日記
          {mode === "mine" && (
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-600"></div>
          )}
        </button>

        {/* 公開日記ボタン */}
        <button
          onClick={handleShowPublic}
          className={`px-4 py-2 flex-1 text-center relative ${
            mode === "public" ? "text-green-600 font-bold" : "text-gray-600"
          }`}
        >
          公開日記
          {mode === "public" && (
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-green-600"></div>
          )}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="max-h-[80vh] overflow-y-auto">
        <ul className="space-y-4">
          {diaries.length > 0 ? (
            diaries.map((diary) => (
              <DiaryItem key={diary.id} diary={diary} onDelete={destroyDiary} />
            ))
          ) : (
            <p className="text-gray-500 text-center">投稿がありません。</p>
          )}
        </ul>
      </div>

      {/* 右下の丸い要素 */}
      <div className="fixed bottom-[10%] sm:bottom-[15%] right-[15%] lg:right-[10%] xl:right-[20%]">
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-14 sm:w-[70px] h-14 sm:h-[70px] bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
        >
          <span className="material-icons" style={{ fontSize: "24px" }}>
            add
          </span>
        </button>
      </div>

      {/* DiaryFormをモーダルのように表示 */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DiaryForm
            onCancel={() => setIsFormVisible(false)}
            onSubmit={handleFormSubmit} 
          />
        </div>
      )}
    </div>
  );
}
