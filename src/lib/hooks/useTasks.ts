import { useState } from "react";
import { axiosInstance } from "../axiosInstance";
import axios from "axios";

type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
    user_id: number;
};


export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [error, setError] = useState<string | null>(null);

    const getTasks = async () => {
        setError(null);
        try {
            const response = await axiosInstance.get("/tasks");
            setTasks(response.data);
        } catch (e: unknown) {
            setError("タスクの取得に失敗しました");
        }
    }

    const getTask = async (id: number) => {
        setError(null);
        try {
            const response = await axiosInstance.get(`/tasks/${id}`);
            return response.data;
        } catch (e: unknown) {
            setError("タスクの取得に失敗しました");
            return null; // 取得失敗時はnullを返す
        }
    };

    const createTask = async (
        title: string,
        description: string,
        dueDate: string,
        priority: number,
        reminderTime: string
    ) => {
        setError(null);
        try {
            const response = await axiosInstance.post("/tasks", {
                task: { title, description, due_date: dueDate, priority, reminder_time: reminderTime }
            });
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data.errors) {
                setError(e.response.data.errors.join(", "));
            } else {
                setError("タスクの作成に失敗しました");
            }
        }
    };

    const updateTask = async (
        id: number,
        title: string,
        description: string,
        dueDate: string,
        priority: number,
        reminderTime: string
    ) => {
        setError(null);
        try {
            const response = await axiosInstance.put(`/tasks/${id}`, {
                task: { title, description, due_date: dueDate, priority, reminder_time: reminderTime }
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? response.data : task
                )
            );
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data.errors) {
                setError(e.response.data.errors.join(", "));
            } else {
                setError("タスクの更新に失敗しました");
            }
        }
    };

    const destroyTask = async (id: number) => {
        setError(null);
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data.errors) {
                setError(e.response.data.errors.join(", "));
            } else {
                setError("タスクの削除に失敗しました");
            }
        }
    };

    return { tasks, getTasks, getTask, createTask, updateTask, destroyTask, error };
};
