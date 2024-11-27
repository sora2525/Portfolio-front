"use client";
import React, { useState, useEffect } from "react";
import { useTextToLipSync } from "@/lib/hooks/useTextToLipSync";

export default function LipSyncPage() {
  const [text, setText] = useState<string>("");
  const { loading, error, lipSyncError, generateAndSyncLipSync } = useTextToLipSync();
  const [previousText, setPreviousText] = useState<string>('');

  useEffect(() => {
    // テキストが変更された場合、再生されないようにリセット
    if (text !== previousText) {
      setPreviousText(text);
    }
  }, [text, previousText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim() === "") {
      alert("テキストを入力してください！");
      return;
    }

    // 新しいテキストが入力されたら音声合成を開始
    await generateAndSyncLipSync(text);
  };

  return (
    <div className="pointer-events-auto flex flex-col items-center justify-center w-full h-screen p-6">
      <h1 className="text-2xl mb-4">リップシンク付き音声合成</h1>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="読み上げるテキスト"
          className="p-2 border border-gray-300 rounded mb-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {loading ? "音声合成中..." : "合成開始"}
        </button>
      </form>

      {/* エラーメッセージ */}
      {lipSyncError && <p className="text-red-500">{lipSyncError}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* 成功時 */}
      {!loading && !error && !lipSyncError && text && (
        <p className="text-green-500 mt-4">音声生成とリップシンクが開始されました。</p>
      )}
    </div>
  );
}
