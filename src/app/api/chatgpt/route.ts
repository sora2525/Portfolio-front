import { NextRequest, NextResponse } from 'next/server';
import { newMessageType, RoleType } from '@/components/chat/types';
import OpenAI from 'openai';
import GPT3Tokenizer from 'gpt3-tokenizer';

// OpenAI APIの設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// トークンカウントの最大値
const MAX_TOKEN_COUNT = 3000;

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
        ? `あなたはフレンドリーな美少女ひよりです。基本的にため口で話します。返答は40文字以内で納めてください。好感度は ${affinity} です。`
        : `あなたはタスク完了を褒める美少女です。好感度は ${affinity} です。`;

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
