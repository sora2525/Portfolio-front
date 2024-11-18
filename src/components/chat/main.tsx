'use client';

import { useRef, useState } from 'react';
import { MessageType } from './types';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useOpenAIChat } from '@/lib/hooks/useOpenAIChat';
import { useVoiceVoxLipSync } from '@/lib/hooks/useVoiceVoxLipSync';

export default function Main() {
  const character: string = '58';
  const [messages, setMessages] = useState<MessageType[]>([]);
  const questionRef = useRef<HTMLInputElement>(null);
  const { generateResponse, loading: chatLoading, error: chatError } = useOpenAIChat();
  const { playVoiceAndLipSync } = useVoiceVoxLipSync();
  const messageHandler = (message: MessageType) => {
    setMessages((messages) => [...messages, message]);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const question = questionRef.current?.value;
    if (!question) return;

    // 質問をメッセージリストに追加
    const messageQuestion = { type: 'question', text: question };
    messageHandler(messageQuestion);

    // ChatGPTで回答を生成
    const answer = await generateResponse(question, messages);
    if (answer) {
      const messageAnswer = { type: 'answer', text: answer };
      messageHandler(messageAnswer);

      // 音声生成とリップシンク開始
      playVoiceAndLipSync(answer, character);
    }

    // 質問フォームをクリア
    questionRef.current!.value = '';
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className="w-[400px]  border-b py-2 px-3 mb-5 rounded-lg focus:outline-none bg-transparent bg-white"
          placeholder="お話しよう！"
          ref={questionRef}
          disabled={chatLoading}
          id="question"
          required
        />
      </form>

      <div className="px-3 bg-white rounded-lg">
        {messages.map((data, index) => (
          <div key={index}>
            {data.type === 'question' ? (
              <div className="mb-4">
                <div className="leading-relaxed break-words whitespace-pre-wrap text-gray-600">
                  {data.text}
                </div>
              </div>
            ) : data.type === 'answer' ? (
              <div className="mb-4">
                <div className="leading-relaxed break-words whitespace-pre-wrap font-bold">
                  {data.text}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {chatLoading && (
        <div className="flex items-center justify-center my-2">
          <ArrowPathIcon className="h-6 w-6 animate-spin text-gray-600" />
        </div>
      )}

      {chatError && <div className="text-red-500">{chatError}</div>}
    </div>
  );
};


