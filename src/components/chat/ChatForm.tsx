'use client';

import React, { useRef, useState } from 'react';

type ChatFormProps = {
  onSendMessage: (message: string) => Promise<void>;
};

export default function ChatForm({ onSendMessage }: ChatFormProps) {
  const messageRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = messageRef.current?.value;

    if (userMessage) {
      setLoading(true);
      await onSendMessage(userMessage);
      messageRef.current!.value = '';
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center m-4 p-4border border-pink-200 rounded-xl shadow-sm"
      >
        <input
          ref={messageRef}
          type="text"
          className="flex-grow px-4 py-2 mr-2 text-gray-700 bg-pink-50 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="メッセージを入力"
          maxLength={100}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="flex items-center justify-center p-1 rounded-full bg-blue-200 hover:bg-blue-300 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
        >
          <span className="material-icons text-blue-700" style={{ fontSize: '48px' }}>
            play_circle_filled
          </span>
        </button>
      </form>
    </div>
  );
}
