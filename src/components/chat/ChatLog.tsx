"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/lib/hooks/useChatLog';
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});


type ChatLogProps = {
  chats: ChatMessage[];
  onClearChats: () => void;
  onCharacterMessageClick: (message: string) => void;
  isLipSyncing: boolean;
};

export default function ChatLog({
  chats,
  onClearChats,
  onCharacterMessageClick,
  isLipSyncing,
}: ChatLogProps) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const visibleChats = showAll ? chats : chats.slice(-2);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleChats]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={onClearChats}
          className="px-4 py-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition text-sm md:text-lg shadow-md"
        >
          チャットを削除
        </button>
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition text-sm md:text-lg shadow-md"
        >
          {showAll ? '最新メッセージのみ表示' : '全履歴を表示'}
        </button>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-[rgba(255,255,255,0.8)] rounded-xl shadow-sm overflow-y-auto">
        <div
          className="overflow-y-auto max-h-[400px] xxs:max-h-[550px] lg:max-h-[650px]"
          ref={chatContainerRef}
        >
          {visibleChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-message flex items-center ${chat.message_type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              onClick={() => {
                if (chat.message_type === 'character' && !isLipSyncing) {
                  onCharacterMessageClick(chat.message);
                }
              }}
            >
              <div
                className={`
    flex items-center max-w-[70%] px-4 py-2 mt-2 rounded-lg sm:rounded-full text-sm sm:text-md lg:text-lg shadow-md ${notoSansJP.className}
    ${chat.message_type === 'user'
                    ? 'bg-purple-100 text-purple-900'
                    : 'bg-pink-100 text-pink-900'
                  }
    ${chat.message_type === 'character'
                    ? `cursor-pointer ${isLipSyncing ? 'opacity-60 cursor-not-allowed' : 'hover:bg-pink-200'
                    }`
                    : ''
                  }
  `}
              >
                <p>{chat.message}</p>
                {chat.message_type === 'character' && (
                  <span className="material-icons ml-2 text-xl text-pink-700">
                    volume_up
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
