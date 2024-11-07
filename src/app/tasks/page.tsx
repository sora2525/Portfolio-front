"use client";
import { useEffect, useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import TaskItem from "@/components/task/TaskItem";
import Link from "next/link";

export default function Task() {
    const { getTasks, createTask, tasks, error } = useTasks();
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: 1,
        reminder_time: ""
    });

    useEffect(() => {
        getTasks();
    }, []);

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
        setFormData({
            title: "",
            description: "",
            due_date: "",
            priority: 1,
            reminder_time: ""
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async () => {
        await createTask(
            formData.title,
            formData.description,
            formData.due_date,
            Number(formData.priority),
            formData.reminder_time
        );
        setFormData({
            title: "",
            description: "",
            due_date: "",
            priority: 1,
            reminder_time: ""
        });
        setIsCreating(false);
        getTasks(); 
    };

    return (
        <div className="pointer-events-auto flex flex-col items-center mt-[5%] w-screen h-screen">
            <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[85%] p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4 text-center">タスク一覧</h1>

                {/* スクロールコンテナ */}
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

            {/* 新規作成フォームモーダル */}
            <div className={`fixed flex flex-col h-[80vh] sm:h-[70vh] bottom-0 left-0 right-0 bg-white p-5 shadow-lg rounded-t-lg transition-transform duration-300 z-50 ${isCreating ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold ">新しいタスクを作成</h2>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-4 border border-gray-300 rounded"
                        placeholder="タイトル"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-4 border border-gray-300 rounded"
                        placeholder="説明"
                    ></textarea>
                    <input
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-4 border border-gray-300 rounded"
                    />
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-4 border border-gray-300 rounded"
                    >
                        <option value={1}>低</option>
                        <option value={2}>中</option>
                        <option value={3}>高</option>
                    </select>
                    <input
                        type="datetime-local"
                        name="reminder_time"
                        value={formData.reminder_time}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-4 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col mt-auto mb-10  items-center justify-center space-y-5">
                    <button onClick={handleFormSubmit} className="p-2 bg-green-500 text-white rounded text-3xl w-64">作成</button>
                    <button onClick={handleCreateToggle} className="p-2 bg-gray-500 text-white rounded text-3xl w-64">キャンセル</button>
                </div>
            </div>
        </div>
    );
}
