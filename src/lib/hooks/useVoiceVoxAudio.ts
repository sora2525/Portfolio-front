import axios from 'axios';
import { useLipSyncHandler } from '@/lib/hooks/useLipSyncHandler';
import { useCallback } from 'react';

export function useVoiceVoxAudio() {
  const { startLipSync } = useLipSyncHandler();

  const generateAndPlayAudio = useCallback(async (text: string, speaker: string) => {
    try {
      // 音声取得
      const responseAudio = await axios.post('/api/audio', {
        text,
        speaker,
      });

      // Base64形式で取得
      const base64Audio = responseAudio?.data?.response;
      // Bufferに変換
      const byteArray = Buffer.from(base64Audio, 'base64');
      // Blobに変換
      const audioBlob = new Blob([byteArray], { type: 'audio/x-wav' });
      // URLに変換
      const audioUrl = URL.createObjectURL(audioBlob);

      // リップシンクを開始し、音声を再生
      startLipSync(audioUrl);
    } catch (e) {
      console.error('音声生成エラー:', e);
    }
  }, [startLipSync]);

  return { generateAndPlayAudio };
}
