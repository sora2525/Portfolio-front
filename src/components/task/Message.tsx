'use client';
import { useState } from "react";

type MessageProps = {
    completion_message: string | null;
    onPlayMessage: () => Promise<void>; // `Promise<void>` に変更
};

export default function Message({ completion_message, onPlayMessage }: MessageProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = async () => {
        if (isPlaying) return; 
        setIsPlaying(true); 
        await onPlayMessage(); 
        setIsPlaying(false); 
    };

    if (!completion_message) return null;

    return (
        <div className="w-[80%] h-[36%] pointer-events-auto mb-6">
            <div className="flex w-full items-end justify-end">
                <button
                    onClick={handleClick}
                    disabled={isPlaying}
                    className={`flex justify-end items-center rounded-t-md p-2 text-white text-sm transition-colors duration-300 ${
                        isPlaying ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500/85 hover:bg-blue-600"
                    }`}
                >
                    <span className="material-icons mr-1" style={{ fontSize: "16px" }}>
                        volume_up
                    </span>
                    <p>{isPlaying ? "再生中..." : "音声を生成"}</p>
                </button>
            </div>
            <div className="bg-[rgba(243,244,246,0.85)] p-4 overflow-y-auto rounded-b-md rounded-tl-md max-h-[95%] h-[90%]">
                <p className="break-words text-md sm:text-2xl">{completion_message}</p>
            </div>
        </div>
    );
}
