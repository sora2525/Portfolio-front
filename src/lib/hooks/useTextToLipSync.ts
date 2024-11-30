"use client";
import React, { useState, useEffect, useRef } from "react";
import { useVoicevox } from "@/lib/hooks/useVoicevox"; // 音声合成用フック
import { useLipSyncHandler } from "@/lib/hooks/useLipSyncHandler"; // リップシンク用フック

export const useTextToLipSync = () => {
  const { loading, error, audioUrl, fetchAudio } = useVoicevox(); // 音声合成用フック
  const { startLipSync } = useLipSyncHandler(); // リップシンク用フック
  const [lipSyncError, setLipSyncError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null); // AudioContextのインスタンスを保持
  const audioBufferRef = useRef<AudioBuffer | null>(null); // AudioBufferに音声データを保持
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);

  // 音声の再生とリップシンクの開始
  const generateAndSyncLipSync = async (text: string, speakerId: number = 58) => {
    if (!text) {
      setLipSyncError('テキストが空です');
      return;
    }

    setLipSyncError(null); // エラーリセット

    // 音声を生成
    await fetchAudio(text, speakerId);
  };

  // Web Audio APIで音声を処理して再生する関数
  const playAudioWithLipSync = async (audioUrl: string) => {
    try {
      // 音声再生用のAudioContextを作成
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const audioContext = audioContextRef.current;

      // 音声ファイルをfetchしてAudioBufferに変換
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // AudioBufferをMediaElementAudioSourceNodeで再生
      const audio = new Audio(audioUrl); // 新たにAudioオブジェクトを作成
      audioBufferRef.current = audioBuffer;

      // 音声の再生とリップシンクの開始
      setAudioSource(audioContext.createMediaElementSource(audio));
      audio.play();

      // リップシンクの開始
      startLipSync(audioUrl).then(() => {
        console.log("音声とリップシンクが開始されました");
      }).catch((err) => {
        setLipSyncError('リップシンクの開始に失敗しました');
        console.error("リップシンクエラー:", err);
      });
    } catch (error) {
      setLipSyncError("音声再生に失敗しました");
      console.error("音声再生エラー:", error);
    }
  };

  // audioUrlが変更されたときに処理を実行
  useEffect(() => {
    if (audioUrl) {
      playAudioWithLipSync(audioUrl); // 音声を再生してリップシンクを開始
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]); // audioUrlが変更されるたびに実行

  return {
    loading,
    error,
    lipSyncError,
    generateAndSyncLipSync, // 音声生成とリップシンクを行う関数
  };
};
