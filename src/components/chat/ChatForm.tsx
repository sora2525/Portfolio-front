'use client';

import React, { useRef, useState } from 'react';

type ChatFormProps = {
  onSendMessage: (message: string) => Promise<void>;
};

export default function ChatForm({ onSendMessage }: ChatFormProps) {
  const messageRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false); // ローディング状態を管理

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = messageRef.current?.value;

    if (userMessage) {
      setLoading(true); // リクエスト送信中にローディングを開始
      await onSendMessage(userMessage);
      messageRef.current!.value = ''; // 入力フォームをクリア
      setLoading(false); // リクエストが完了したらローディングを停止
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
    </div>
  );
}
