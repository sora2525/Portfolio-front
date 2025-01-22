"use client";
import React, { useState } from "react";
import { useDiaries } from "@/lib/hooks/useDiaries";
import { useRouter } from "next/navigation";
import { useAIResponse } from "@/lib/hooks/useAIResponse";

export default function DiaryForm() {
  const { createDiary, error } = useDiaries();
  const router = useRouter(); 
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [characterComment, setCharacterComment] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const {generateResponse} = useAIResponse();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const character_comment = await generateResponse(
        `${content}`,
        [],
        "comment",
        50
    );
      await createDiary({
        title,
        content,
        is_public: isPublic,
        character_comment: character_comment,
        images
      });
      setTitle("");
      setContent("");
      setIsPublic(false);
      setCharacterComment("");
      setImages([]);
      router.push("/diaries");
    } catch (err) {
      console.error("投稿に失敗しました", err);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-6 mt-20 space-y-4 bg-white shadow rounded pointer-events-auto"
    >
      <h2 className="text-2xl font-bold mb-4">新しい日記を作成</h2>

      <div>
        <label className="block mb-1 font-semibold">内容:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 h-32 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label className="font-semibold">公開:</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="h-5 w-5 text-blue-600"
        />
      </div>


      <div>
        <label className="block mb-1 font-semibold">画像:</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full"
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <button 
        type="submit" 
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
      >
        日記を作成
      </button>
    </form>
  );
}
