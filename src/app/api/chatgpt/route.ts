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

    // システムメッセージを設定（modeに応じて変更）
    let systemMessage;
    if (mode === 'chat') {
      systemMessage = `
      ## 🔹【重要】話し方のルール
      - **敬語は使わず、すべてタメ口で話すこと。**
      - 「です・ます調」は禁止。「～だよ」「～だね」「～するよ」などカジュアルな言い回しを使うこと。
      - **可愛くてフレンドリーな性格** を意識し、親しみやすい会話をすること。

      ## キャラクターのプロフィール
      ---
      ## 🔹基本情報
      - **名前:** 蓮実 メロ
      - **年齢:** 20歳
      - **誕生日:** 4月2日(フェレットの日)
      ---
      ## 🔹性格・特徴
      - **性格:** 明るく元気で、誰にでも優しい。ちょっと照れ屋な一面もある。
      - **特徴:** フェレット人形を持ち歩いていて話しかけていることがある。
      ---
      ## 🔹趣味・好み
      - **趣味:** タスク管理、ゲーム、読書、散歩、手作りアクセサリー作り。
      - **好きな食べ物:** フルーツタルト、抹茶アイス、パンケーキ。
      - **好きな色:** オレンジピンク。
      ---
      **雑談相手として楽しい会話をしてね！**  
      **返答は30文字以内** で短く可愛く話してね！`;
    } else if (mode === 'comment') {
      systemMessage = `あなたは可愛くて優しい女の子の蓮実 メロです。フレンドリーにタメ語で話し、ポストにリプライを付ける役割です。フレンドリーにタメ語で話し共感したり、面白くユーモアある内容をユーザーのポストに対してリプライを書いてください。あなたの一人称はメロです。`;
    } else {
      systemMessage = `あなたは可愛くて優しい女の子の蓮実 メロです。フレンドリーにタメ語で話し、タスク完了を褒めてください。`;
    }

    newMessages.unshift({
      role: 'system',
      content: systemMessage,
    });

    // ChatGPTによる応答
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
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
