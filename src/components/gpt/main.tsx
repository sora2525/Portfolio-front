'use client'

import { useRef, useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { MessageType } from './types';

import axios from 'axios'

// メインコンポーネント
const Main = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageType[]>([])
  const questionRef = useRef<HTMLInputElement>(null)

  

  const messageHandler = (message: MessageType) => {
    setMessages((messages) => [...messages, message])
  }
  


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // ローディング開始
  setLoading(true)

  try {
    // 質問取得
    const question = questionRef.current?.value

    // 質問チェック
    if (!question) {
      setLoading(false)
      return
    }

    // メッセージリストに追加
    const messageQuestion = { type: 'question', text: question }
    messageHandler(messageQuestion)

    // ChatGPTに質問を投げて回答を取得
    const responseChatGPT = await axios.post('/api/chatgpt', {
      question,
      messages,
    })

    // 回答取得
    const answer = responseChatGPT?.data?.response

    // メッセージリストに追加
    const messageAnswer = { type: 'answer', text: answer }
    messageHandler(messageAnswer)

    // 質問フォームをクリア
    questionRef.current!.value = ''

    // ローディング終了
    setLoading(false)

   
  } catch (e) {
    console.error(e)
  } finally {
    // ローディング終了
    setLoading(false)
  }
}

return (
    <>
     <div>
      
      <form onSubmit={onSubmit}>
        {/* 入力フォーム */}
        <input
          className="w-full border-b py-2 px-3 mb-5 rounded-lg focus:outline-none bg-transparent bg-white"
          placeholder="お話しよう！"
          ref={questionRef}
          disabled={loading}
          id="question"
          required
        />
      </form>
      
      <div className="px-3 bg-white rounded-lg">
        {/* メッセージ */}
        {messages.map((data, index) => (
          <div key={index} >
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
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>

      <div>
        {/* ローディング */}
        {loading && (
          <div className="flex items-center justify-center my-2">
            <ArrowPathIcon className="h-6 w-6 animate-spin text-gray-600" />
          </div>
        )}
      </div>

    </div>
    </>
  );
}

export default Main