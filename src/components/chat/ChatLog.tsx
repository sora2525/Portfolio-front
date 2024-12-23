'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/lib/hooks/useChatLog';
import Link from 'next/link';

type ChatLogProps = {
    chats: ChatMessage[];
    onClearChats: () => void; // チャット削除関数をプロパティとして受け取る
    onCharacterMessageClick: (message: string) => void; // キャラクターのメッセージに対するクリックイベント
};

export default function ChatLog({ chats, onClearChats, onCharacterMessageClick }: ChatLogProps) {
    const [showAll, setShowAll] = useState<boolean>(false); // 全履歴を表示するかどうかの状態
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const visibleChats = showAll ? chats : chats.slice(-2); // 表示するチャット履歴を切り替え

    // チャット履歴が更新されたときにスクロールを最下部にする
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [visibleChats]);

    return (
        <div className="w-full">
            {/* チャット削除ボタン */}
            <div className="flex justify-between items-center mb-2">
                <button
                    onClick={onClearChats} // チャット削除を実行
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-sm md:text-lg"
                >
                    チャットを削除
                </button>
                <button
                    onClick={() => setShowAll(!showAll)} // 状態をトグル 
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition text-sm md:text-lg"
                >
                    {showAll ? '最新メッセージのみ表示' : '全履歴を表示'}
                </button>
            </div>

            {/* チャット履歴表示部分 */}
            <div className="flex flex-col gap-4 p-4 bg-[rgba(243,244,246,0.85)] rounded-lg overflow-y-auto">
                <div
                    className="overflow-y-auto max-h-[400px] xxs:max-h-[550px] lg:max-h-[650px]"
                    ref={chatContainerRef} // チャットコンテナに参照を設定
                >
                    {visibleChats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`chat-message flex items-center ${chat.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
                            onClick={() => {
                                if (chat.message_type === 'character') {
                                    onCharacterMessageClick(chat.message); // キャラクターのメッセージをクりｋｋ
                                }
                            }}
                        >
                            <div
                                className={`flex items-center max-w-[70%] px-4 py-2 mt-2 rounded-lg text-sm ${chat.message_type === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'} 
                                    ${chat.message_type === 'character' ? 'cursor-pointer hover:bg-blue-200' : ''}`}
                            >
                                <p>
                                    {chat.message}
                                </p>
                                {/* キャラクターのメッセージにだけアイコンを表示 */}
                                {chat.message_type === 'character' && (
                                    <span
                                        className="material-icons ml-2 text-xl text-gray-600"
                                    >
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
