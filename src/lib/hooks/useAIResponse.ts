import axios from 'axios';
import { useCallback, useState } from 'react';
import { MessageType } from '@/components/chat/types';

export const useAIResponse = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = useCallback(
    async (
      question: string,
      messages: MessageType[],
      mode: 'chat' | 'praise', // モード: チャット or 褒める
      affinity: number // 好感度
    ): Promise<string | null> => {
      setLoading(true);
      setError(null);

      try {
        // APIリクエストのペイロードに mode と affinity を追加
        const response = await axios.post('/api/chatgpt', {
          question,
          messages,
          mode,
          affinity,
        });

        return response.data?.response || null;
      } catch (err) {
        console.error('OpenAIのAPI呼び出しでエラーが発生しました:', err);
        setError('エラーが発生しました');
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { generateResponse, loading, error };
};
