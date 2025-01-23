"use client";
import React, { useState } from "react";
import { useDiaries } from "@/lib/hooks/useDiaries";
import { useAIResponse } from "@/lib/hooks/useAIResponse";

type DiaryFormProps = {
  onCancel: () => void; 
  onSubmit: () => void; 
};

export default function DiaryForm({ onCancel, onSubmit }: DiaryFormProps) {
  const { createDiary, error } = useDiaries();
  const [content, setContent] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const { generateResponse } = useAIResponse();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; 
    setIsSubmitting(true); 

    try {
      const characterComment = await generateResponse(
        `${content}`,
        [],
        "comment",
        50
      );
      await createDiary({
        title: "",
        content,
        is_public: isPublic,
        character_comment: characterComment,
        images,
      });
      setContent("");
      setIsPublic(false);
      setImages([]);
      onSubmit();
    } catch (err) {
      console.error("投稿に失敗しました", err);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[95%] max-w-[500px]  mx-auto p-6 space-y-4 bg-white shadow rounded pointer-events-auto relative"
    >
      <button
        onClick={onCancel}
        type="button"
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        <span className="material-icons">close</span>
      </button>

      <h2 className="text-xl font-bold mb-4">日記を作成</h2>

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
        disabled={isSubmitting} 
        className={`w-full py-2 px-4 font-semibold rounded transition-colors ${
          isSubmitting
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isSubmitting ? "送信中..." : "日記を作成"}
      </button>
    </form>
  );
}
