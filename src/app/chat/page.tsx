'use client';

import React from 'react';
import ChatForm from '@/components/chat/ChatForm';
import ChatLog from '@/components/chat/ChatLog';
import { useChatLog } from '@/lib/hooks/useChatLog';
import { useAIResponse } from '@/lib/hooks/useAIResponse';
import { useVoiceVoxLipSync } from '@/lib/hooks/useVoiceVoxLipSync';

export default function Chat() {
    const { chats, createChat, getChats } = useChatLog();
    const { generateResponse } = useAIResponse();
    const { playVoiceAndLipSync } = useVoiceVoxLipSync();

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
            playVoiceAndLipSync(aiResponse, '58');
        }

        await getChats();
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-end items-center">
            <div className="pointer-events-auto sticky bottom-0 chat-container flex flex-col w-full max-w-lg p-4 rounded-lg shadow- ">
                <ChatLog chats={chats} />
                <ChatForm onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}
