'use client';
import { useState } from "react";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});

type MessageProps = {
    completion_message: string | null;
    onPlayMessage: () => Promise<void>;
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
                    className={`flex justify-center items-center space-x-2 px-4 py-2 rounded-full border-2 text-sm lg:text-lg
      ${isPlaying
                            ? "bg-pink-300 border-pink-400 text-white cursor-not-allowed opacity-70"
                            : "bg-gradient-to-r from-pink-400 to-pink-500 border-pink-500 text-white hover:from-pink-500 hover:to-pink-600"
                        } 
      shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-100`}
                >
                    <span className="material-icons" style={{ fontSize: "18px" }}>
                        volume_up
                    </span>
                    <p className="font-semibold text-md">
                        {isPlaying ? "再生中..." : "音声を生成"}
                    </p>
                </button>
            </div>

            <div className={`bg-pink-100/80 p-4 overflow-y-auto rounded-3xl max-h-[95%] h-[90%] 
                border-2 border-pink-400/80 shadow-md ${notoSansJP.className}`}>
                <p className="break-words text-md sm:text-2xl text-gray-800">{completion_message}</p>
            </div>

        </div>
    );
}
