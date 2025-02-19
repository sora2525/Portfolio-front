"use client";
import { useEffect, useRef } from 'react';
import { LAppWavFileHandler } from '@/lib/live2d/demo/lappwavfilehandler';
import { LAppLive2DManager } from '@/lib/live2d/demo/lapplive2dmanager';
import * as LAppDefine from '@/lib/live2d/demo/lappdefine';

export function useLipSyncHandler() {
  const wavFileHandlerRef = useRef<LAppWavFileHandler | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLipSyncingRef = useRef<boolean>(false);

  useEffect(() => {
    wavFileHandlerRef.current = new LAppWavFileHandler();
  
    return () => {
      if (wavFileHandlerRef.current) {
        wavFileHandlerRef.current.releasePcmData();
        wavFileHandlerRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  


  const startLipSync = async (wavFilePath: string): Promise<void> => {
    console.log("リップシンクスタート");

    if (!wavFileHandlerRef.current) {
      console.error("リップシンク用のオブジェクトが初期化されていません");
      return;
    }

   
    const success = await wavFileHandlerRef.current.loadWavFile(wavFilePath);
    if (success) {
      console.log("WAVファイルのロードに成功");

      const audio = new Audio(wavFilePath);
      audioRef.current = audio;
      isLipSyncingRef.current = true;

      audio.play(); 

      wavFileHandlerRef.current.start(wavFilePath);

      forcePlayMotion();
      updateLipSync();
    } else {
      console.error("WAVファイルのロードに失敗しました");
    }
  };

  const forcePlayMotion = () => {
    const live2DManager = LAppLive2DManager.getInstance();
    const model = live2DManager.getModel(0);

    if (model) {
      const onMotionFinished = () => {
        if (audioRef.current && !audioRef.current.paused) {
          model.startMotion("LipSync", 0, LAppDefine.PriorityForce, onMotionFinished);
        } else {
          isLipSyncingRef.current = false;
        }
      };

      model.startMotion("LipSync", 0, LAppDefine.PriorityForce, onMotionFinished);
    }
  };

  const updateLipSync = () => {
    const updateInterval = 50; // 20FPS

    const update = () => {
      if (!isLipSyncingRef.current) return;

      const live2DManager = LAppLive2DManager.getInstance();
      const model = live2DManager.getModel(0);

      if (wavFileHandlerRef.current && model) {
        const updated = wavFileHandlerRef.current.update(updateInterval / 1000);
        if (!updated) {
          console.log("再生終了");
          clearInterval(intervalId);
          isLipSyncingRef.current = false;
          return;
        }

        const rms = wavFileHandlerRef.current.getRms();
        const scaledRms = Math.min(rms * 5, 1);
        model.setLipSyncValue(scaledRms);
      }
    };

    const intervalId = setInterval(update, updateInterval);
  };

  return {
    startLipSync,
  };
}
