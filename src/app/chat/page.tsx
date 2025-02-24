"use client";

import React, { useState, useEffect } from 'react';
import ChatForm from '@/components/chat/ChatForm';
import ChatLog from '@/components/chat/ChatLog';
import { useChatLog } from '@/lib/hooks/useChatLog';
import { useAIResponse } from '@/lib/hooks/useAIResponse';
import { useTextToLipSync } from '@/lib/hooks/useTextToLipSync';
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import Link from 'next/link';

export default function Chat() {
  const { chats, createChat, getChats, clearChats } = useChatLog();
  const { generateResponse } = useAIResponse();

  const { speakAndLipSync, isLipSyncing } = useTextToLipSync();

  const auth = useRequireAuth();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

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

      // if (!isMobile && !isLipSyncing) {
      //   speakAndLipSync(aiResponse); 
      // }
    }

    await getChats();
  };

  const onClickCharacterMessage = async (characterMessage: string) => {
    if (!isLipSyncing) {
      speakAndLipSync(characterMessage);
    }
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div className="w-full max-w-[1000px] h-full flex flex-col justify-end items-center relative">
        <div className="absolute top-4 left-4">
          <Link
            href="/"
            className="w-14 h-14 flex items-center justify-center rounded-full 
                   bg-white/80 shadow-md text-[#008080] hover:bg-white hover:shadow-lg 
                   transition-all duration-300 pointer-events-auto mt-[80px]"
          >
            <span className="material-icons leading-none" style={{ fontSize: "38px" }}>reply</span>
          </Link>
        </div>
      </div>

      <div className="pointer-events-auto  bottom-0 chat-container flex flex-col w-full max-w-lg lg:max-w-[700px] p-4 rounded-lg">
        <ChatLog
          chats={chats}
          onClearChats={clearChats}
          onCharacterMessageClick={onClickCharacterMessage}
          isLipSyncing={isLipSyncing}
        />
        <ChatForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
