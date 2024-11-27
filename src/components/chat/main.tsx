'use client';

import { useRef, useState } from 'react';
import { MessageType } from './types';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useAIResponse } from '@/lib/hooks/useAIResponse';
import { useVoiceVoxLipSync } from '@/lib/hooks/useVoiceVoxLipSync';

export default function Main() {
  const character: string = '58'; // VOICEVOXのキャラクター番号
  const [messages, setMessages] = useState<MessageType[]>([]); // メッセージの状態
  const questionRef = useRef<HTMLInputElement>(null); // 入力フォームの参照
  const { generateResponse, loading: chatLoading, error: chatError } = useAIResponse(); // AI応答のカスタムフック
  const { playVoiceAndLipSync } = useVoiceVoxLipSync(); // リップシンクのカスタムフック

  const messageHandler = (message: MessageType) => {
    setMessages((messages) => [...messages, message]);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const question = questionRef.current?.value;
    if (!question) return;

    // ユーザーからの質問を追加
    const messageQuestion = { type: 'question', text: question };
    messageHandler(messageQuestion);

    try {
      // ChatGPTで応答を生成
      const answer = await generateResponse(question, messages, 'chat', 100); // 好感度50でチャットモードを使用

      if (answer) {
        // AIの応答を追加
        const messageAnswer = { type: 'answer', text: answer };
        messageHandler(messageAnswer);

        // 音声生成とリップシンク開始
        playVoiceAndLipSync(answer, character);
      }
    } catch (error) {
      console.error('応答生成中にエラーが発生:', error);
    }

    // 入力フォームをリセット
    if (questionRef.current) questionRef.current.value = '';
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className="w-[400px] border-b py-2 px-3 mb-5 rounded-lg focus:outline-none bg-transparent bg-white"
          placeholder="お話しよう！"
          ref={questionRef}
          disabled={chatLoading} // ロード中は入力を無効化
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
}
