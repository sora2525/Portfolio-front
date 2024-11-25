

type MessageProps = {
    completion_message: string;
};

export default function Message({ completion_message }: MessageProps) {


    if (!completion_message) return null; // メッセージがない場合は何も表示しない

    return (
        <div className="w-[80%] h-[36%] bg-[rgba(243,244,246,0.85)] p-4 overflow-y-auto rounded-lg">
            <p className="break-words text-2xl">{completion_message}</p>
        </div>
    );
}
