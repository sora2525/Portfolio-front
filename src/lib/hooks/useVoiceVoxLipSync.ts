import { useState, useRef, useEffect } from 'react';
import { LAppDelegate } from '@/lib/live2d/demo/lappdelegate';
import { LAppWavFileHandler } from '@/lib/live2d/demo/lappwavfilehandler';
import { LAppLive2DManager } from '@/lib/live2d/demo/lapplive2dmanager';
import * as LAppDefine from '@/lib/live2d/demo/lappdefine';

type VoiceVoxResponse = {
  success: boolean;
  wavDownloadUrl?: string;
  audioStatusUrl?: string;
};

export const useVoiceVoxLipSync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wavFileHandlerRef = useRef<LAppWavFileHandler | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLipSyncingRef = useRef<boolean>(false);

  useEffect(() => {
    wavFileHandlerRef.current = new LAppWavFileHandler();

    return () => {
      if (wavFileHandlerRef.current) {
        wavFileHandlerRef.current.releasePcmData();
      }
      wavFileHandlerRef.current = null;
    };
  }, []);

  const playVoiceAndLipSync = async (text: string, speaker: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(
          text
        )}&speaker=${speaker}`
      );

      if (!response.ok) {
        throw new Error('音声合成リクエストに失敗しました');
      }

      const data: VoiceVoxResponse = await response.json();

      if (data.success && data.wavDownloadUrl && data.audioStatusUrl) {
        console.log('音声合成成功: WAV URL', data.wavDownloadUrl);

        // WAVファイルのリップシンクを開始
        await startLipSync(data.wavDownloadUrl, data.audioStatusUrl);
      } else {
        throw new Error('音声合成に失敗しました');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('不明なエラーが発生しました');
      }
    } finally {
      setLoading(false);
    }
  };

  const startLipSync = async (wavFilePath: string, audioStatusUrl: string) => {
    console.log('startLipSync called with:', wavFilePath);

    if (!wavFileHandlerRef.current) {
      console.error('wavFileHandlerRef is not initialized.');
      return;
    }

    // 音声ファイルの準備が完了するまで待機
    const isAudioReady = await waitForAudioReady(audioStatusUrl);
    if (!isAudioReady) {
      console.error('Audio is not ready. Cannot proceed with lip-sync.');
      return;
    }

    // WAVファイルをロード
    const success = await wavFileHandlerRef.current.loadWavFile(wavFilePath);
    if (success) {
      console.log('WAV file loaded successfully');

      const audio = new Audio(wavFilePath);
      audioRef.current = audio;
      isLipSyncingRef.current = true; // リップシンクを開始
      audio.play(); // 音声を再生

      wavFileHandlerRef.current.start(wavFilePath); // リップシンク用のWAVファイル処理を開始

      // モーションの再生とリップシンクの更新を開始
      forcePlayMotion();
      updateLipSync();
    } else {
      console.error('Failed to load WAV file for lip-syncing.');
    }
  };

  const waitForAudioReady = async (statusUrl: string): Promise<boolean> => {
    while (true) {
      try {
        const response = await fetch(statusUrl);
        const data = await response.json();

        if (data.success && data.isAudioReady) {
          console.log('Audio is ready!');
          return true;
        } else {
          console.log('Audio not ready yet, retrying in 1 second...');
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒待機
        }
      } catch (error) {
        console.error('Failed to check audio status:', error);
        return false;
      }
    }
  };

  const forcePlayMotion = () => {
    const live2DManager = LAppLive2DManager.getInstance();
    const model = live2DManager.getModel(0);

    if (model) {
      const onMotionFinished = () => {
        if (audioRef.current && !audioRef.current.paused) {
          model.startMotion('Idle', 0, LAppDefine.PriorityForce, onMotionFinished);
        } else {
          isLipSyncingRef.current = false;
        }
      };

      model.startMotion('Idle', 0, LAppDefine.PriorityForce, onMotionFinished);
    }
  };

  const updateLipSync = () => {
    const updateInterval = 16;

    const update = () => {
      if (!isLipSyncingRef.current) return;

      const live2DManager = LAppLive2DManager.getInstance();
      const model = live2DManager.getModel(0);

      if (wavFileHandlerRef.current && model) {
        const updated = wavFileHandlerRef.current.update(updateInterval / 1000);

        if (!updated) {
          clearInterval(intervalId);
          isLipSyncingRef.current = false;
          return;
        }

        const rms = wavFileHandlerRef.current.getRms();
        const scaledRms = Math.min(rms * 10, 1);

        model.setLipSyncValue(scaledRms);
      }
    };

    const intervalId = setInterval(update, updateInterval);
  };

  return { playVoiceAndLipSync, loading, error };
};
