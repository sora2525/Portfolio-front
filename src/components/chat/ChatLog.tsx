'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/lib/hooks/useChatLog';
import Link from 'next/link';

type ChatLogProps = {
    chats: ChatMessage[];
};

export default function ChatLog({ chats }: ChatLogProps) {
    const [showAll, setShowAll] = useState(false); // 全履歴を表示するかどうかの状態

    const visibleChats = showAll ? chats : chats.slice(-2); // 表示するチャット履歴を切り替え

    return (
        <div className="chat-log-container">
            {/* トグルボタン */}

            {/* チャット履歴表示部分 */}
            <div className=" flex flex-col gap-4 p-4 bg-[rgba(243,244,246,0.85)] rounded-lg  overflow-y-auto">
            <div className='flex items-center space-x-8'>
                <Link href="/"><span className="material-icons hover:text-[#008080]">
                    backspace
                </span></Link>
                <button
                    onClick={() => setShowAll(!showAll)} // 状態をトグル
                    className="toggle-button px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                    {showAll ? '最新メッセージのみ表示' : '全履歴を表示'}
                </button>
            </div>
            <div className='overflow-y-auto max-h-[400px] xxs:max-h-[550px] '>
                {visibleChats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`chat-message flex ${chat.message_type === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${chat.message_type === 'user'
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
        </div>
    );
}
