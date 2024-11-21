'use client';

import React, { useRef } from 'react';

type ChatFormProps = {
  onSendMessage: (message: string) => Promise<void>;
};

export default function ChatForm({ onSendMessage }: ChatFormProps) {
  const messageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = messageRef.current?.value;
    if (userMessage) {
      await onSendMessage(userMessage);
      messageRef.current!.value = ''; // 入力フォームをクリア
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit} className="flex items-center p-4  rounded-lg ">
        <input
          ref={messageRef}
          type="text"
          className="flex-grow px-4 py-2 mr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="メッセージを入力"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          送信
        </button>
      </form>
    </div>
  );
}
