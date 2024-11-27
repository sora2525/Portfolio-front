import { useEffect, useRef } from 'react';
import { LAppDelegate } from '@/lib/live2d/demo/lappdelegate';
import { LAppWavFileHandler } from '@/lib/live2d/demo/lappwavfilehandler';
import { LAppLive2DManager } from '@/lib/live2d/demo/lapplive2dmanager';
import * as LAppDefine from '@/lib/live2d/demo/lappdefine';

export function useLipSyncHandler() {
  const wavFileHandlerRef = useRef<LAppWavFileHandler | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLipSyncingRef = useRef<boolean>(false); // リップシンク中かどうかを管理

  useEffect(() => {
    wavFileHandlerRef.current = new LAppWavFileHandler();

    // リソースのクリーンアップ
    return () => {
      if (wavFileHandlerRef.current) {
        wavFileHandlerRef.current.releasePcmData();
      }
      wavFileHandlerRef.current = null;
    };
  }, []);

  // 音声ファイルのURLを受け取ってリップシンクを開始
  const startLipSync = async (wavFilePath: string): Promise<void> => {
    console.log("startLipSync called");

    if (!wavFileHandlerRef.current) {
      console.error("wavFileHandlerRef is not initialized.");
      return;
    }

    const success = await wavFileHandlerRef.current.loadWavFile(wavFilePath);
    if (success) {
      console.log("WAV file loaded successfully");

      const audio = new Audio(wavFilePath);
      audioRef.current = audio;
      isLipSyncingRef.current = true; // リップシンクを開始
      audio.play(); // 音声を再生

      wavFileHandlerRef.current.start(wavFilePath); // リップシンク用のWAVファイル処理を開始

      // モーションの再生とリップシンクの更新を開始
      forcePlayMotion();
      updateLipSync();
    } else {
      console.error("Failed to load WAV file for lip-syncing.");
    }
  };

  const forcePlayMotion = () => {
    const live2DManager = LAppLive2DManager.getInstance();
    const model = live2DManager.getModel(0); // 1番目のモデルを取得

    if (model) {
      // モーションが終了したときにコールバックを設定
      const onMotionFinished = () => {
        if (audioRef.current && !audioRef.current.paused) {
          // まだ音声が再生中であればもう一度モーション1を再生
          model.startMotion("Idle", 0, LAppDefine.PriorityForce, onMotionFinished);
        } else {
          // 音声が停止していればリップシンクを終了
          isLipSyncingRef.current = false;
        }
      };

      // 強制的に `Hiyori_m01.motion3.json` を再生し、終了時にコールバックを呼び出す
      model.startMotion("Idle", 0, LAppDefine.PriorityForce, onMotionFinished);
    }
  };

  const updateLipSync = () => {
    const updateInterval = 16; // 60FPSでリップシンクを更新

    const update = () => {
      if (!isLipSyncingRef.current) return; // リップシンクが終了していれば更新を停止

      const live2DManager = LAppLive2DManager.getInstance();
      const model = live2DManager.getModel(0); // 1番目のモデルを取得

      if (wavFileHandlerRef.current && model) {
        const updated = wavFileHandlerRef.current.update(updateInterval / 1000);

        if (!updated) {
          console.log("WAV file playback finished");
          clearInterval(intervalId); // WAVファイルが終了した場合、リップシンクを停止
          isLipSyncingRef.current = false;
          return;
        }

        const rms = wavFileHandlerRef.current.getRms();
        const scaledRms = Math.min(rms * 10, 1); // RMS値を調整

        // ここで LAppModel のリップシンク用変数を更新
        model.setLipSyncValue(scaledRms);
        console.log("Setting LipSync value:", scaledRms);
      }
    };

    const intervalId = setInterval(update, updateInterval);
  };

  return {
    startLipSync,
  };
}
