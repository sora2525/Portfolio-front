import { useState, useEffect } from 'react';
import { useVoicevox } from './useVoicevox'; // 音声合成
import { useLipSyncHandler } from './useLipSyncHandler'; // リップシンク

export const useTextToLipSync = () => {
  const { loading, error, audioUrl, fetchAudio } = useVoicevox();
  const { startLipSync } = useLipSyncHandler();
  const [lipSyncError, setLipSyncError] = useState<string | null>(null);

  // テキストを受け取って音声合成とリップシンクを実行する関数
  const generateAndSyncLipSync = async (text: string, speakerId: number = 58) => {
    if (!text) {
      setLipSyncError('テキストが空です');
      return;
    }

    setLipSyncError(null); // エラーリセット

    // 音声を生成
    await fetchAudio(text, speakerId);
  };

  // audioUrlが更新されたタイミングでリップシンクを開始
  useEffect(() => {
    if (audioUrl) {
      // 音声URLが設定されたらリップシンクを開始
      startLipSync(audioUrl).catch((err) => {
        setLipSyncError('リップシンクの開始に失敗しました');
      });
    }
  }, [audioUrl, startLipSync]);

  return {
    loading,
    error,
    lipSyncError,
    generateAndSyncLipSync, // 音声生成とリップシンクを行う関数
  };
};