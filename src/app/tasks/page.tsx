'use client';
import React, { useEffect, useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import TaskItem from "@/components/task/TaskItem";
import { useTags } from "@/lib/hooks/useTags";
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import TaskForm from "@/components/task/TaskForm";
import Link from "next/link";

export default function Task() {
    const { getTasks, createTask, tasks } = useTasks();
    const { getTags, tags } = useTags();
    const [sortBy, setSortBy] = useState<string>("created_at");
    const [order, setOrder] = useState<string>("desc");
    const [selectedTag, setSelectedTag] = useState<string>("");
    const [status, setStatus] = useState<string>("all");
    const [isCreating, setIsCreating] = useState<boolean>(false); 
    const auth = useRequireAuth();

    useEffect(() => {
        getTasks(sortBy, order, selectedTag, status);
        getTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy, order, selectedTag, status]);

    if (!auth.isAuthenticated) {
        return null;
    }

    const handleFormSubmit = async (title: string, description: string, dueDate: string, priority: number, reminderTime: string, tags: number[]) => {
        await createTask(title, description, dueDate, priority, reminderTime, tags);
        setIsCreating(false); 
        getTasks(sortBy, order, selectedTag, status); 
    };

    return (
        <div className="pointer-events-auto flex flex-col items-center justify-end w-full h-screen">
            <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[90%]  p-3 rounded-lg shadow-lg mb-2">
                <div className="flex w-full justify-between items-center">
                    <Link href="/"><span className="material-icons text-[#008080]" style={{ fontSize: '36px' }}>
                        reply
                    </span></Link>
                    <h1 className=" sm:text-2xl text-xl font-semibold sm:mb-4 mb-2 text-center mx-auto">タスク一覧</h1>
                    <Link href="/calendar"><span className="mr-[10px] material-icons text-[#008080]">
                        calendar_month
                    </span></Link>
                </div>

                {/* 状態の選択タブ */}
                <div className="flex w-full font-semibold lg:text-lg space-x-6">
                    <div
                        onClick={() => setStatus("all")}
                        className={`w-1/3 text-center ${status === "all" ? "border-b-4 border-red-500" : ""} cursor-pointer`}
                    >
                        <p>All</p>
                    </div>
                    <div
                        onClick={() => setStatus("incomplete")}
                        className={`w-1/3 text-center ${status === "incomplete" ? "border-b-4 border-red-500" : ""} cursor-pointer`}
                    >
                        <p>Incomplete</p>
                    </div>
                    <div
                        onClick={() => setStatus("completed")}
                        className={`w-1/3 text-center ${status === "completed" ? "border-b-4 border-red-500" : ""} cursor-pointer`}
                    >
                        <p>Completed</p>
                    </div>
                </div>

                {/* ソートセレクトボックス */}
                <div className="flex gap-2 mt-4">
                    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="h-[5%]">
                        <option value="created_at">作成日順</option>
                        <option value="due_date">期限順</option>
                        <option value="priority">優先度順</option>
                    </select>

                    <select onChange={(e) => setOrder(e.target.value)} value={order} className="h-[5%]">
                        <option value="asc">昇順</option>
                        <option value="desc">降順</option>
                    </select>
                    <select onChange={(e) => setSelectedTag(e.target.value)} value={selectedTag} className="h-[5%]">
                        <option value="">すべてのタグ</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-y-auto max-h-[60vh] xxs:max-h-[65vh] mt-4">
                    <ul className="space-y-2 lg:space-y-4">
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
                                    completion_message={task.completion_message}
                                    tags={task.tags || []}
                                    onCompletionToggle={() => getTasks(sortBy, order, selectedTag, status)}
                                />
                            ))
                        ) : (
                            <p>タスクがありません。</p>
                        )}
                    </ul>
                </div>

                {/* 新規作成ボタン */}
                <div className="flex justify-center xxs:mt-5 mt-2 sm:text-2xl">
                    <button
                        onClick={() => setIsCreating(true)}
                        className="text-[#008080] justify-center items-center rounded text-2xl flex flex-col group cursor-pointer"
                    >
                        <div className="flex items-center">
                            <span className="material-icons" style={{ fontSize: '38px' }}>
                                note_add
                            </span>
                            <p>新規作成</p>
                        </div>
                        <div className="w-[100%] h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
                    </button>
                </div>
            </div>

            {/* 新規作成フォームのモーダル表示 */}
            {isCreating && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <TaskForm
                        onSubmit={handleFormSubmit}
                        onCancel={() => setIsCreating(false)} 
                        tags={tags}
                    />
                </div>
            )}
        </div>
    );
}
