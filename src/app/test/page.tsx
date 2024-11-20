'use client';

import React from 'react';
import ChatForm from '@/components/chat/ChatForm';
import ChatLog from '@/components/chat/ChatLog';
import { useChatLog } from '@/lib/hooks/useChatLog';
import { useAIResponse } from '@/lib/hooks/useAIResponse';
import { useVoiceVoxLipSync } from '@/lib/hooks/useVoiceVoxLipSync';
import { log } from 'console';

export default function Chat() {
  const { chats, createChat, getChats } = useChatLog(); // getChatsを使う
  const { generateResponse } = useAIResponse();
  const { playVoiceAndLipSync } = useVoiceVoxLipSync();
  console.log("チャット履歴",chats);
  

  const handleSendMessage = async (userMessage: string) => {
    // ユーザーのメッセージを保存
    await createChat(userMessage, 'user');
  
    // AIの応答を生成
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
      // キャラクターのメッセージを保存
      await createChat(aiResponse, 'character');
  
      // 音声再生とリップシンク
      playVoiceAndLipSync(aiResponse, '58');
    }

    // チャットリストを更新してリアルタイム反映
    await getChats(); // サーバーから最新のチャットを取得
  };

  return (
    <div className="chat-container pointer-events-auto">
      <ChatLog chats={chats} />
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
}
