'use client'
import React, { useEffect, useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import TaskItem from "@/components/task/TaskItem";
import { useTags } from "@/lib/hooks/useTags";
import TaskForm from "@/components/task/TaskForm";
import Link from "next/link";

export default function Task() {
    const { getTasks, createTask, tasks, error } = useTasks();
    const { getTags, tags } = useTags();
    const [isCreating, setIsCreating] = useState(false);
    const [sortBy, setSortBy] = useState("created_at");
    const [order, setOrder] = useState("desc");
    const [selectedTag, setSelectedTag] = useState("");

    useEffect(() => {
        getTasks(sortBy, order, selectedTag);
        getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy, order, selectedTag]);

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
    };

    const handleFormSubmit = (title, description, dueDate, priority, reminderTime, selectedTags) => {
        if (title) {
            createTask(title, description, dueDate, priority, reminderTime, selectedTags).then(() => {
                getTasks(sortBy, order, selectedTag);
            });
        }
        setIsCreating(false);
    };

    return (
        <div className="pointer-events-auto flex flex-col items-center mt-[4%] w-screen h-screen">
            <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[85%] p-4 rounded-lg shadow-lg">
                <Link href="/">トップページに戻る</Link>
                <h1 className="text-2xl font-semibold mb-4 text-center">タスク一覧</h1>

                {/* ソートセレクトボックス */}
                <div className="flex gap-2">
                    <label>並び替え:</label>
                    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                        <option value="created_at">作成日順</option>
                        <option value="due_date">期限順</option>
                        <option value="priority">優先度順</option>
                        <option value="completion_date">完了状態順</option>
                    </select>

                    <select onChange={(e) => setOrder(e.target.value)} value={order}>
                        <option value="asc">昇順</option>
                        <option value="desc">降順</option>
                    </select>
                    <select onChange={(e) => setSelectedTag(e.target.value)} value={selectedTag}>
                        <option value="">すべてのタグ</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-y-auto max-h-[80%] mt-4">
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
                                    completion_date={task.completion_date}
                                    tags={task.tags || []}
                                    onCompletionToggle={() => getTasks(sortBy, order, selectedTag)}
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
            <TaskForm onSubmit={handleFormSubmit} tags={tags} isVisible={isCreating} />
        </div>
    );
}
