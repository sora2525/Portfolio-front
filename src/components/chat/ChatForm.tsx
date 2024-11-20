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
    <form onSubmit={handleSubmit} className="chat-form">
      <input
        ref={messageRef}
        type="text"
        className="chat-input"
        placeholder="メッセージを入力"
        required
      />
      <button type="submit" className="chat-submit-button">
        送信
      </button>
    </form>
  );
}
