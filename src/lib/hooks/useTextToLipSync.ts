"use client";
import React, { useEffect, useState,useRef } from "react";
import { useVoicevox } from "@/lib/hooks/useVoicevox";
import { useLipSyncHandler } from "@/lib/hooks/useLipSyncHandler"; // リップシンク用のフック

export const useTextToLipSync = () => {
  const { loading, error, audioUrl, fetchAudio } = useVoicevox();
  const { startLipSync } = useLipSyncHandler();
  const [lipSyncError, setLipSyncError] = useState<string | null>(null);
  const [previousAudioUrl, setPreviousAudioUrl] = useState<string | null>(null); // 前回のaudioUrlを管理
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
    if (audioUrl && audioUrl !== previousAudioUrl) {
      // audioUrlが新たに更新された場合のみリップシンクを開始
      setPreviousAudioUrl(audioUrl); // 新しいaudioUrlを保存
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
  }, [audioUrl, previousAudioUrl]); // audioUrlとpreviousAudioUrlが変更された場合のみ処理を実行

  return {
    loading,
    error,
    lipSyncError,
    generateAndSyncLipSync, // 音声生成とリップシンクを行う関数
  };
};
