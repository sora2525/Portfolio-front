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
    // 質問とメッセージリスト取得
    const { question, messages } = await req.json();

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

        // カウントがMAX_TOKEN_COUNTを超えたら履歴の追加をやめる
        if (newCount > MAX_TOKEN_COUNT) {
          break;
        }

        // カウントを更新
        count = newCount;

        // 履歴に追加
        newMessages.push({ role, content: data.text });
      }
    }

    // メッセージを古い順に並び替え
    newMessages.reverse();

    // システムメッセージを配列の先頭に追加
    newMessages.unshift({
      role: 'system',
      content: 'あなたは幼馴染的存在の美少女です。あなたの名前は「ひより」で17歳。前向きな性格で面倒見のいい大人しい女性です。好奇心旺盛で効いた話しを深掘りしたりしてお話相手になってください。口調はため口でフレンドリーに話します。',
    });

    // ChatGPTによる応答
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: newMessages,
      max_tokens: 256,
      temperature: 1.3,
    });

    // 応答メッセージを取得
    const message = completion.choices[0].message?.content;

    return NextResponse.json({ response: message });
  } catch (error) {
    console.error('Error processing ChatGPT request:', error);
    return NextResponse.error();
  }
}
