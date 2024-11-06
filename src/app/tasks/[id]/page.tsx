"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import { useRouter } from "next/navigation";

type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
    user_id: number;
};

export default function TaskDetailPage({ params }: { params: { id: string } }) {
    const { getTask } = useTasks();
    const [task, setTask] = useState<Task | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const taskId = Number(params.id);

    useEffect(() => {
        const fetchTask = async () => {
            const fetchedTask = await getTask(taskId);
            if (fetchedTask) {
                setTask(fetchedTask);
            } else {
                setError("タスクの取得に失敗しました");
            }
        };

        fetchTask();
    }, [taskId, getTask]);

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    if (!task) return <p>読み込み中...</p>;

    return (
        <div className="pointer-events-auto flex flex-col items-center mt-[5%] w-screen h-screen">
            <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[85%] p-4 rounded-lg shadow-lg overflow-y-auto">
                <button onClick={() => router.back()}>戻る</button>
                <h1 className="font-bold text-5xl text-center">{task.title}</h1>
                <p className="text-3xl mt-5 h-[50%]">{task.description}</p>
                <p className="text-red-500 text-3xl mt-5">期日: {task.due_date}</p>
                <p className="text-blue-500 text-3xl mt-5">優先度: {task.priority}</p>
                <p className="text-3xl mt-5">リマインダー: {task.reminder_time}</p>
            </div>
        </div>
    );
}
