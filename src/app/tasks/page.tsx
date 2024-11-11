"use client";
import { useEffect, useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import TaskItem from "@/components/task/TaskItem";
import { useTags } from "@/lib/hooks/useTags";
import TaskForm from "@/components/task/TaskForm";

export default function Task() {
    const { getTasks, createTask, tasks, error } = useTasks();
    const { getTags, tags } = useTags();
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        getTasks();
        getTags();
    }, []);

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
    };

    const handleFormSubmit = (title: string, description: string, dueDate: string, priority: number, reminderTime: string, selectedTags: number[]) => {
        if (title) { 
            createTask(title, description, dueDate, priority, reminderTime, selectedTags);
            getTasks();
        }
        setIsCreating(false);
    };

    return (
        <div className="pointer-events-auto flex flex-col items-center mt-[5%] w-screen h-screen">
            <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[85%] p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4 text-center">タスク一覧</h1>
                <div className="overflow-y-auto max-h-[85%] mt-4">
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
                                    tags={task.tags || []}
                                />
                            ))
                        ) : (
                            <p>タスクがありません。</p>
                        )}
                    </ul>
                </div>
                <div className="flex justify-center mt-5">
                    <button
                        onClick={handleCreateToggle}
                        className="bg-gray-500 text-white rounded text-3xl w-64"
                    >
                        新規作成
                    </button>
                </div>
            </div>
            <TaskForm onSubmit={handleFormSubmit} tags={tags} isVisible={isCreating}  />
        </div>
    );
}
