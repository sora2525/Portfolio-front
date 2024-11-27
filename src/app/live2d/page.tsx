'use client'
import Live2dView from '@/components/live2d/live2dView';
import { useLipSyncHandler } from '@/lib/hooks/useLipSyncHandler';
import Main from '@/components/chat/main';

export default function Live2D() {
  const { startLipSync } = useLipSyncHandler();
  const handlePlayAudio = () => {
    const audioFilePath = '/audio/sample.wav';
    startLipSync(audioFilePath); 
  };
  
  return (
    <>
      <button onClick={handlePlayAudio}>音声とリップシンク開始</button>
        <Live2dView />
        <Main/>
    </>
  );
}