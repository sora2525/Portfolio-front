"use client";
import { useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import { authState } from "@/lib/atom/authAtom";
import { useRecoilState } from "recoil";

export default function TaskCreate() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [priority, setPriority] = useState<number>(0);
    const [reminderTime, setReminderTime] = useState<string>("");
    const { createTask, error } = useTasks();
    const [auth,] = useRecoilState(authState);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        
        createTask(title, description, dueDate, priority, reminderTime);

        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority(0);
        setReminderTime("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="タイトル"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="詳細"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="期日"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                >
                    <option value={0}>なし</option>
                    <option value={1}>低</option>
                    <option value={2}>中</option>
                    <option value={3}>高</option>
                </select>
                <input
                    type="datetime-local"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    placeholder="リマインダー時間"
                />
                <button type="submit">タスクを追加</button>
            </form>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
