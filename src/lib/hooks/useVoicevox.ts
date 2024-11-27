import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://deprecatedapis.tts.quest/v2/voicevox/audio/';

export const useVoicevox = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const fetchAudio = async (text: string, speakerId: number = 0) => {
    setLoading(true);
    setError(null);
    setAudioUrl(null);

    const apiKey = process.env.NEXT_PUBLIC_VOICEVOX_API_KEY;
    if (!apiKey) {
      setError('APIキーが設定されていません');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: apiKey,
          speaker: speakerId,
          text,
        },
        responseType: 'blob', // 音声データとしてBlobを取得
      });

      // 音声データ（WAV）のURLを作成
      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudioUrl(audioUrl); // 成功時に音声データのURLをセット
    } catch (err) {
      setError('音声合成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    audioUrl,
    fetchAudio,
  };
};
