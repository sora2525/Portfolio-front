type MessageProps = {
    completion_message: string;
    onPlayMessage: () => void;
};

export default function Message({ completion_message, onPlayMessage }: MessageProps) {

    if (!completion_message) return null;

    return (
        <>
            <div className="w-[80%] h-[36%] pointer-events-auto mb-6">
                <div className="flex w-full items-end justify-end">
                    {/* <div className="font-medium py-3 px-6 bg-blue-500/85 text-white rounded-t-md text-sm sm:text-xl ">
                        蓮実メロ
                    </div> */}
                    <button onClick={onPlayMessage} className="bg-blue-500/85 flex justify-end items-center rounded-t-md p-2 text-white text-sm">
                    <span className="material-icons mr-1" style={{ fontSize: "16px" }}>
                            volume_up
                        </span>
                        <p>音声を生成</p>
                    </button>
                </div>
                <div className="bg-[rgba(243,244,246,0.85)] p-4 overflow-y-auto rounded-b-md rounded-tl-md max-h-[95%] h-[90%]">
                    <p className="break-words text-md sm:text-2xl">{completion_message}</p>
                </div>
            </div>
        </>
    );
}
