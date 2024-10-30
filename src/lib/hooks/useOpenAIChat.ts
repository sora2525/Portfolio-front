import axios from 'axios';
import { useCallback, useState } from 'react';
import { MessageType } from '@/components/chat/types';

export function useOpenAIChat() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = useCallback(
    async (question: string, messages: MessageType[]): Promise<string | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post('/api/chatgpt', {
          question,
          messages,
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
}
