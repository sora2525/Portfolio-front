"use client"
import { useEffect } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import TaskItem from "@/components/task/TaskItem";

export default function Task() {
    const { getTasks, tasks, error } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            <h1>タスク一覧</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskItem
                        key={task.id}
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
    );
}
