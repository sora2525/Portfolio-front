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
    const { getTask, updateTask, destroyTask } = useTasks(); // タスク関連のAPI操作関数を取得
    const [task, setTask] = useState<Task | null>(null); // タスクの状態
    const [isEditing, setIsEditing] = useState(false); // 編集モードの状態
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: 1,
        reminder_time: ""
    }); // フォームの入力データを管理
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const taskId = Number(params.id);

    // タスクを取得
    useEffect(() => {
        const fetchTask = async () => {
            const fetchedTask = await getTask(taskId);
            if (fetchedTask) {
                setTask(fetchedTask);
                setFormData({
                    title: fetchedTask.title,
                    description: fetchedTask.description,
                    due_date: fetchedTask.due_date,
                    priority: fetchedTask.priority,
                    reminder_time: fetchedTask.reminder_time
                });
            } else {
                setError("タスクの取得に失敗しました");
            }
        };
        fetchTask();
    }, []);

    // 編集トグル
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // フォームの値が変わったとき更新
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // フォーム送信時にタスクを更新
    const handleFormSubmit = async () => {
        if (task) {
            await updateTask(
                task.id,
                formData.title,
                formData.description,
                formData.due_date,
                Number(formData.priority),
                formData.reminder_time
            );
            setIsEditing(false);
        }
    };

    // タスク削除処理
    const handleDelete = async () => {
        if (task) {
            const confirmed = confirm("本当にこのタスクを削除しますか？");
            if (confirmed) {
                await destroyTask(task.id);
                router.push("/tasks");
            }
        }
    };

    return (
        <>
            <div className="pointer-events-auto flex flex-col items-center mt-[5%] w-screen h-screen relative">
                <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[85%] p-4 rounded-lg shadow-lg flex flex-col justify-between">
                    {error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : !task ? (
                        <p>読み込み中...</p>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div>
                                <button onClick={() => router.back()}>戻る</button>
                                <h1 className="font-bold text-5xl text-center">{formData.title || task.title}</h1>
                                <p className="text-3xl mt-5">{formData.description || task.description}</p>
                                <p className="text-red-500 text-3xl mt-5">期日: {formData.due_date || task.due_date}</p>
                                <p className="text-blue-500 text-3xl mt-5">優先度: {formData.priority || task.priority}</p>
                                <p className="text-3xl mt-5">リマインダー: {formData.reminder_time || task.reminder_time}</p>
                            </div>

                            <div className="flex flex-col items-center space-y-5 mt-auto mb-10">
                                <button onClick={handleEditToggle} className="p-2 bg-blue-500 text-white rounded text-3xl w-64">編集</button>
                                <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded text-3xl w-64">削除</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 編集フォームモーダル */}
                <div className={`fixed flex flex-col h-[80vh] sm:h-[70vh] bottom-0 left-0 right-0 bg-white p-5 shadow-lg rounded-t-lg transition-transform duration-300 z-50 ${isEditing ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">タスクを編集</h2>
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
                        <button onClick={handleEditToggle} className="p-2 bg-gray-500 text-white rounded text-3xl w-64">キャンセル</button>
                        <button onClick={handleFormSubmit} className="p-2 bg-green-500 text-white rounded text-3xl w-64">更新</button>
                    </div>
                </div>
            </div>
        </>
    );
}
