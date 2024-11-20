'use client';

import React from 'react';
import { ChatMessage } from '@/lib/hooks/useChatLog';

type ChatLogProps = {
  chats: ChatMessage[];
};

export default function ChatLog({ chats }: ChatLogProps) {
  return (
    <div className="chat-log flex flex-col gap-4 p-4 bg-gray-100 rounded-lg max-h-[500px] overflow-y-auto">
      {chats.map((chat) => (
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
  );
}
