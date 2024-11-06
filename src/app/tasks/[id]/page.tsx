// app/tasks/[id]/page.tsx
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
        <div>
            <button onClick={() => router.back()}>戻る</button>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>期日: {task.due_date}</p>
            <p>優先度: {task.priority}</p>
            <p>リマインダー: {task.reminder_time}</p>
        </div>
    );
}
