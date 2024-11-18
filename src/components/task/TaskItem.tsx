import React, { useState } from "react";
import Link from "next/link";
import TagItem from "../tag/TagItem";
import { useTasks } from "@/lib/hooks/useTasks";

type TaskItemProps = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
    tags: Tag[];
    completion_date?: string;
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
    onCompletionToggle,
}: TaskItemProps) {
    const { completeTask } = useTasks();
    const [isLoading, setIsLoading] = useState(false);

    const handleCompleteToggle = async () => {
        setIsLoading(true);
        await completeTask(id, completion_date); // タスクの完了/未完了を切り替え
        setIsLoading(false);
        onCompletionToggle(); // 状態変更後にタスク一覧を更新
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
                    className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full ${
                        completion_date ? "bg-green-500" : "bg-blue-500"
                    }`}
                >
                    {completion_date ? (
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
                    {completion_date && (
                        <p className="w-1/2 p-2 text-green-500">
                            完了日: {completion_date}
                        </p>
                    )}
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
        </div>
    );
}
