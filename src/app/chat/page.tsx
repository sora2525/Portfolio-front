'use client'
import { useLipSyncHandler } from '@/lib/hooks/useLipSyncHandler';
import Main from '@/components/chat/main';

export default function Chat() {
    const { startLipSync } = useLipSyncHandler();
    const handlePlayAudio = () => {
        const audioFilePath = '/audio/sample.wav';
        startLipSync(audioFilePath);
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen relative">
                <div className="pointer-events-auto flex flex-col text-center  p-5 mt-[400px]">
                        <button onClick={handlePlayAudio}>音声とリップシンク開始</button>
                        <Main />
                </div>
            </div>
        </>
    );
}