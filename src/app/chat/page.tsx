'use client';

import React from 'react';
import { useRef } from 'react';
import ChatForm from '@/components/chat/ChatForm';
import ChatLog from '@/components/chat/ChatLog';
import { useChatLog } from '@/lib/hooks/useChatLog';
import { useAIResponse } from '@/lib/hooks/useAIResponse';
import { useTextToLipSync } from '@/lib/hooks/useTextToLipSync';
import Link from 'next/link';

export default function Chat() {
  // pullTest の変更を反映
  const { chats, createChat, getChats, clearChats } = useChatLog();
  const { generateResponse } = useAIResponse();
  const { generateAndSyncLipSync } = useTextToLipSync();

  const audioRef = useRef<HTMLAudioElement | null>(null); // 音声の参照

  // 音声再生関数
  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error('音声再生に失敗しました:', err);
      });
    }
  };

  const handleSendMessage = async (userMessage: string) => {
    await createChat(userMessage, 'user');

    const aiResponse = await generateResponse(
      userMessage,
      chats.map((chat) => ({
        text: chat.message,
        type: chat.message_type === 'user' ? 'question' : 'answer',
      })),
      'chat',
      50
    );

    if (aiResponse) {
      await createChat(aiResponse, 'character');
      generateAndSyncLipSync(aiResponse);
    }

    await getChats();
  };

  return (
    <div className="w-full h-screen flex flex-col justify-end items-center">
      <Link href="/" className="absolute top-[80px] left-4 text-3xl text-[#008080] pointer-events-auto">
        <span className="material-icons" style={{ fontSize: '48px' }}>
          reply
        </span>
      </Link>
      <div className="pointer-events-auto sticky bottom-0 chat-container flex flex-col w-full max-w-lg p-4 rounded-lg ">
        <ChatLog chats={chats} onClearChats={clearChats} />

        {/* onPlayAudio プロパティを ChatForm に渡す */}
        <ChatForm onSendMessage={handleSendMessage} onPlayAudio={handlePlayAudio} />
      </div>
    </div>
  );
}
