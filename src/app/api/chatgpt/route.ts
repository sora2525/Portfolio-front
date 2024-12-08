import { NextRequest, NextResponse } from 'next/server';
import { newMessageType, RoleType } from '@/components/chat/types';
import OpenAI from 'openai';
import GPT3Tokenizer from 'gpt3-tokenizer';

// OpenAI APIの設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// トークンカウントの最大値
const MAX_TOKEN_COUNT = 1500;

export async function POST(req: NextRequest) {
  try {
    // リクエストボディを取得
    const { question, messages, mode, affinity } = await req.json();

    // メッセージリストの作成
    const newMessages: newMessageType[] = [
      { role: 'user', content: question },
    ];

    // GPT3Tokenizerの設定
    const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

    // トークン用カウントの初期化
    let count = 0;

    if (messages.length) {
      // 新しいメッセージから履歴に追加
      for (const data of messages.slice().reverse()) {
        const role: RoleType = data.type === 'question' ? 'user' : 'assistant';

        // トークン数取得
        const encoded = tokenizer.encode(data.text);
        // カウント計算
        const newCount = count + encoded.bpe.length;

        if (newCount > MAX_TOKEN_COUNT) {
          break;
        }

        count = newCount;

        newMessages.push({ role, content: data.text });
      }
    }

    // メッセージを古い順に並び替え
    newMessages.reverse();

    // システムメッセージを設定（モードと好感度に応じて変更）
    const systemMessage =
      mode === 'chat'
        ? `あなたは美少女ひよりです。フレンドリーにタメ語で話し、雑談相手としてあなたは楽しい会話をして、返答は30文字以内で納めてください。あなたは話題を提供したり、逆に提供された話題を深掘りして質問や自分の好みなどを話して話を広げたりしてください。`
        : `あなたは美少女ひよりです。フレンドリーにタメ語で話し,タスク完了を褒めてください。`;

    newMessages.unshift({
      role: 'system',
      content: systemMessage,
    });

    // ChatGPTによる応答
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: newMessages,
      max_tokens: 256,
      temperature: 1.3,
    });

    const message = completion.choices[0].message?.content;

    return NextResponse.json({ response: message });
  } catch (error) {
    console.error('Error processing ChatGPT request:', error);
    return NextResponse.error();
  }
}
