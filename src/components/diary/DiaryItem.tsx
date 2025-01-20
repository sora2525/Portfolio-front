"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useDiaries } from "@/lib/hooks/useDiaries";

interface Diary {
  id: number;
  title: string;
  content: string;
  is_public: boolean;
  character_comment: string;
  images: string[];
  created_at: string;
  updated_at: string;
  user?: {
    name: string;
    iconUrl: string;
  };
}

interface DiaryItemProps {
  diary: Diary;
  onDelete: (id: number) => Promise<void>;
}

export function DiaryItem({ diary, onDelete }: DiaryItemProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <li className="p-4 bg-white rounded shadow mt-2 max-w-[900px]">
        {/* ユーザー情報の表示 */}
        <div className="flex items-center mb-2">
          {diary.user?.iconUrl && (
            <img
              src={diary.user.iconUrl}
              alt={diary.user.name}
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <span className="font-semibold">
            {diary.user?.name || "Unknown"}
          </span>
          <div className="ml-auto">
            {new Date(diary.created_at).toLocaleDateString()}
          </div>
          {/* 削除ボタンの追加 */}
          <button
            onClick={() => onDelete(diary.id)}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            削除
          </button>
        </div>

        <p className="mb-4">{diary.content}</p>

        {/* 画像が存在する場合に表示 */}
        {diary.images && diary.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {diary.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`日記${diary.id}の画像${index + 1}`}
                className="max-w-[100px] h-auto object-cover rounded cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedImage(imageUrl);
                }}
              />
            ))}
          </div>
        )}
        <div>{diary.character_comment}</div>
      </li>

      {/* モーダル表示部分 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="拡大画像"
            className="max-w-[80%] max-h-full object-contain rounded"
          />
        </div>
      )}
    </>
  );
}
