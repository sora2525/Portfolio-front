'use client';

import React, { useRef, useState } from 'react';

type ChatFormProps = {
  onSendMessage: (message: string) => Promise<void>;
  onPlayAudio: () => void; // 音声再生を開始する関数を受け取る
};

export default function ChatForm({ onSendMessage, onPlayAudio }: ChatFormProps) {
  const messageRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false); // ローディング状態を管理
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // 音声URLを管理

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = messageRef.current?.value;

    if (userMessage) {
      setLoading(true); // リクエスト送信中にローディングを開始
      await onSendMessage(userMessage);
      messageRef.current!.value = ''; // 入力フォームをクリア
      setLoading(false); // リクエストが完了したらローディングを停止

      // ユーザーのアクション後に音声再生を開始
      onPlayAudio(); // 音声再生関数を呼び出す
    }
  };

  // 音声を再生する関数
  const handlePlayMessage = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => console.error('音声再生エラー:', err));
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit} className="flex items-center m-4 rounded-lg ">
        <input
          ref={messageRef}
          type="text"
          className="flex-grow px-4 py-2 mr-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="メッセージを入力"
          required
          disabled={loading} // リクエスト中は入力できないようにする
        />
        <button
          type="submit"
          className="focus:outline-none focus:ring-blue-400 focus:ring-opacity-75 hover:text-blue-700"
          disabled={loading} // リクエスト中はボタンを無効にする
        >
          <span className="material-icons text-black" style={{ fontSize: '52px' }}>
            play_circle_filled
          </span>
        </button>
      </form>

      {/* 音声再生ボタン */}
      {audioUrl && (
        <button
          onClick={handlePlayMessage}
          className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          音声再生
        </button>
      )}
    </div>
  );
}
