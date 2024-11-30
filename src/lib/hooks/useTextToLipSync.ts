'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useVoicevox } from './useVoicevox'; // 音声合成
import { useLipSyncHandler } from './useLipSyncHandler'; // リップシンク

export const useTextToLipSync = () => {
  const { loading, error, audioUrl, fetchAudio } = useVoicevox();
  const { startLipSync } = useLipSyncHandler();
  const [lipSyncError, setLipSyncError] = useState<string | null>(null);
  const isAudioPlayingRef = useRef<boolean>(false); // 音声再生状態を追跡

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
    if (audioUrl && !isAudioPlayingRef.current) {
      // audioUrlが新たに設定されたらリップシンクを開始
      isAudioPlayingRef.current = true; // 音声再生中
      startLipSync(audioUrl)
        .then(() => {
          // 音声再生成功時
          console.log('音声再生とリップシンクが開始されました');
        })
        .catch((err) => {
          setLipSyncError('リップシンクの開始に失敗しました');
          console.error('音声再生のエラー:', err);
        });
    }
  }, [audioUrl]); // audioUrlが更新された時のみリップシンクを開始

  return {
    loading,
    error,
    lipSyncError,
    generateAndSyncLipSync, // 音声生成とリップシンクを行う関数
  };
};
