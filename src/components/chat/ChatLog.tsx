'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/lib/hooks/useChatLog';

type ChatLogProps = {
  chats: ChatMessage[];
};

export default function ChatLog({ chats }: ChatLogProps) {
  const [showAll, setShowAll] = useState(false); // 全履歴を表示するかどうかの状態

  const visibleChats = showAll ? chats : chats.slice(-2); // 表示するチャット履歴を切り替え

  return (
    <div className="chat-log-container">
      {/* トグルボタン */}
      <button
        onClick={() => setShowAll(!showAll)} // 状態をトグル
        className="toggle-button px-4 py-2 rounded-lg mb-4 bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {showAll ? '最新メッセージのみ表示' : '全履歴を表示'}
      </button>

      {/* チャット履歴表示部分 */}
      <div className="chat-log flex flex-col gap-4 p-4 bg-[rgba(243,244,246,0.85)] rounded-lg max-h-[500px] overflow-y-auto">
        {visibleChats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-message flex ${
              chat.message_type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                chat.message_type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
