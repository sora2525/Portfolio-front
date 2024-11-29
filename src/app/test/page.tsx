"use client"
import React, { useState, useRef, useEffect } from "react";
import { useVoicevox } from "@/lib/hooks/useVoicevox";
import { useLipSyncHandler } from "@/lib/hooks/useLipSyncHandler"; // リップシンク用のフック

const TextToSpeech = () => {
  const [text, setText] = useState(""); // 入力されたテキストを管理
  const { loading, error, audioUrl, fetchAudio } = useVoicevox(); // 音声合成用のフック
  const { startLipSync } = useLipSyncHandler(); // リップシンク用のフック
  const audioRef = useRef<HTMLAudioElement | null>(null); // 再生中の音声を追跡

  // 音声URLが更新された時にリップシンクを開始
  useEffect(() => {
    if (audioUrl) {
      // 再生中の音声があれば停止
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // 再生位置をリセット
      }

      // 新しい音声でリップシンクを開始
      startLipSync(audioUrl);

      // 新しい音声を再生
      const audio = new Audio(audioUrl);
      audioRef.current = audio; // 再生中の音声を保存
      audio.play();
    }
  }, [audioUrl]); // audioUrlが更新されるたびに処理を実行

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      fetchAudio(text); // テキストが空でなければ音声を生成
    }
  };

  return (
    <div className="text-center pointer-events-auto">
      <h2 className="text-2xl font-semibold mb-4">テキストを音声で再生</h2>

      {/* テキスト入力フォーム */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="テキストを入力"
          className="p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {loading ? "生成中..." : "音声を再生"}
        </button>
      </form>

      {/* エラーメッセージ */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* 音声の再生 */}
      {audioUrl && (
        <div className="mt-4">
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            あなたのブラウザは音声タグをサポートしていません。
          </audio>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
