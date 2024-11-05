import { useState } from "react";
import { axiosInstance } from "../axiosInstance";

export const useTasks = () => {
    const [error, setError] = useState<string | null>(null);

    const createTask = async (title: string, description: string, dueDate: string, priority: number, reminderTime: string,userId: number) => {
        setError(null); 
        try {
            const response = await axiosInstance.post("/tasks", {
                task: { title, description, due_date: dueDate, priority, reminder_time: reminderTime,user_id: userId }
            });
            console.log("Task created:", response.data);
        } catch (e) {
            if (e.response && e.response.data.errors) {
                setError(e.response.data.errors.join(", "));
            } else {
                setError("タスクの作成に失敗しました");
            }
        }
    };

    return { createTask, error };
};
