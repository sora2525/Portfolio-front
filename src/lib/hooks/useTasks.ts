import { useState } from "react";
import { axiosInstance } from "../axiosInstance";
import axios from "axios";

type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    completion_date: string | null;
    reminder_time: string;
    completion_message: string | null;
    user_id: number;
    tags: Array<{ id: number; name: string; color: string }>;
};

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [error, setError] = useState<string | null>(null);

    const getTasks = async (
        sortBy: string,
        order: string,
        tagId: string,
        status: string
      ): Promise<Task[]> => {
        setError(null);
        try {
          const response = await axiosInstance.get("/tasks", {
            params: {
              q: { s: `${sortBy} ${order}` },
              tag_id: tagId,
              status: status,
            },
          });
          setTasks(response.data);
          return response.data; // データを返す
        } catch (e: unknown) {
          if (axios.isAxiosError(e) && e.response?.data.errors) {
            setError(e.response.data.errors.join(", "));
          } else {
            setError("タスクの取得に失敗しました");
          }
          return []; // エラー時は空の配列を返す
        }
      };

    const getTask = async (id: number) => {
        setError(null);
        try {
            const response = await axiosInstance.get(`/tasks/${id}`);
            return response.data;
        } catch (e: unknown) {
            setError("タスクの取得に失敗しました");
            return null;
        }
    };

    const createTask = async (
        title: string,
        description: string,
        dueDate: string,
        priority: number,
        reminderTime: string,
        tags: number[]
    ) => {
        setError(null);

        if (tags.length > 5) {
            setError("タグは最大5個までです");
            return;
        }
        try {
            const response = await axiosInstance.post("/tasks", {
                task: {
                    title,
                    description,
                    due_date: dueDate,
                    priority,
                    reminder_time: reminderTime,
                    tags: tags.map(Number) 
                }
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
        reminderTime: string,
        tags: number[]
    ) => {
        setError(null);
        try {
            const response = await axiosInstance.put(`/tasks/${id}`, {
                task: { title, description, due_date: dueDate, priority, reminder_time: reminderTime, tags }
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

    const completeTask = async (id: number, currentCompletionDate?: string) => {
        setError(null);
        try {
            // 未完了にする場合は completion_date を null に設定
            const completion_date = currentCompletionDate
                ? null // すでに完了状態の場合、未完了に設定
                : new Date().toISOString().split("T")[0]; // 未完了なら現在の日付を設定

            const response = await axiosInstance.put(`/tasks/${id}`, {
                task: { completion_date }
            });

            // タスク一覧を更新
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? response.data : task
                )
            );
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data.errors) {
                setError(e.response.data.errors.join(", "));
            } else {
                setError("タスクの完了/未完了操作に失敗しました");
            }
        }
    };

    const addCompletionMessage = async (id: number, message: string) => {
        setError(null);
        try {
            const response = await axiosInstance.put(`/tasks/${id}`, {
                task: { completion_message: message },
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
                setError("完了メッセージの追加に失敗しました");
            }
        }
    };



    return { tasks, getTasks, getTask, createTask, updateTask, destroyTask, addCompletionMessage, error, completeTask };
};
