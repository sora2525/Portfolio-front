"use client"
import { useEffect } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import TaskItem from "@/components/task/TaskItem";
import Link from "next/link";

export default function Task() {
    const { getTasks, tasks, error } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="pointer-events-auto flex flex-col items-center mt-[5%] w-screen h-screen">
            <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[85%] p-4 rounded-lg shadow-lg overflow-y-auto">
                <Link href="/tasks/new" className="text-blue-600 hover:underline">新規作成</Link>
                <h1 className="text-2xl font-semibold mb-4">タスク一覧</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <ul className="space-y-4">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                due_date={task.due_date}
                                priority={task.priority}
                                reminder_time={task.reminder_time}
                            />
                        ))
                    ) : (
                        <p>タスクがありません。</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
