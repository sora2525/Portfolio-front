import React, { useState, useEffect } from "react";
import Link from "next/link";
import TagItem from "../tag/TagItem";
import { useTasks } from "@/lib/hooks/useTasks";
import { useAIResponse } from "@/lib/hooks/useAIResponse";

type TaskItemProps = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
    tags: Tag[];
    completion_date?: string;
    completion_message?: string;
    onCompletionToggle: () => void;
};

type Tag = {
    id: number;
    name: string;
    color: string;
};

export default function TaskItem({
    id,
    title,
    description,
    due_date,
    priority,
    tags,
    completion_date,
    completion_message,
    onCompletionToggle,
}: TaskItemProps) {
    const { completeTask, addCompletionMessage } = useTasks();
    const [isLoading, setIsLoading] = useState(false);
    const { generateResponse } = useAIResponse();
    const [isCompleted, setIsCompleted] = useState(!!completion_date); // 初期状態を`completion_date`で設定

    // `completion_date`が変わった場合に状態を更新
    useEffect(() => {
        setIsCompleted(!!completion_date);
    }, [completion_date]);

    const handleCompleteToggle = async () => {
        setIsLoading(true);

        // タスクの完了/未完了を切り替え
        await completeTask(id, isCompleted ? completion_date : undefined);

        // 状態を切り替え
        setIsCompleted((prev) => !prev);
        setIsLoading(false);

        // タスク一覧を更新
        onCompletionToggle();

        // 完了時のみ褒めるメッセージを生成
        if (!isCompleted) {
            const res = await generateResponse(
                `${title},${description}`,
                [],
                "praise",
                50
            );
            addCompletionMessage(id, res); // 褒めるメッセージを保存
            onCompletionToggle();
        }
    };

    return (
        <div className="bg-white opacity-100 p-4 rounded-xl flex items-center">
            {/* 完了状態のアイコン */}
            {isLoading ? (
                <div className="w-10 h-10 flex items-center justify-center">
                    <span className="loader"></span> {/* ローディング用のスピナー */}
                </div>
            ) : (
                <div
                    onClick={handleCompleteToggle}
                    className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full ${isCompleted ? "bg-green-500" : "bg-blue-500"
                        }`}
                >
                    {isCompleted ? (
                        <span className="text-white text-xl font-bold text-center">✓</span>
                    ) : (
                        <span className="text-white text-xl font-bold">＋</span>
                    )}
                </div>
            )}

            {/* タスク詳細 */}
            <li className="ml-4 w-full">
                <Link href={`tasks/${id}`} className="flex flex-wrap">
                    <h2 className="text-xl font-bold w-1/2 p-2">{title}</h2>
                    <p className="w-1/2 p-2">優先度: {priority}</p>
                    <p className="w-1/2 p-2">{description}</p>
                    <p className="w-1/2 p-2 text-red-500">期日: {due_date}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                            <TagItem
                                key={tag.id}
                                id={tag.id}
                                name={tag.name}
                                color={tag.color}
                            />
                        ))}
                    </div>
                </Link>
            </li>

            {/* 完了メッセージ表示 */}
            {completion_date && (
                <div className="mt-2 text-green-700">
                    <Link href={`message/${id}`}> {/* リンク先のページURLを指定 */}
                        <span className="material-icons" style={{ fontSize: '42px' }}>
                            textsms
                        </span>
                    </Link>
                </div>
            )}
        </div>
    );
}

