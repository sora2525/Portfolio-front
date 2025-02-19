import { useState } from "react";
import { axiosInstance } from "../axiosInstance";
import axios from "axios";
import { flashMessageState } from "@/lib/atom/flashMessageAtom";
import { useRecoilState } from "recoil";

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
    const [flashMessage, setFlashMessage] = useRecoilState(flashMessageState);


    const getTasks = async (
        sortBy: string,
        order: string,
        tagId: string,
        status: string
      ): Promise<Task[]> => {
        try {
          const response = await axiosInstance.get("/tasks", {
            params: {
              q: { s: `${sortBy} ${order}` },
              tag_id: tagId,
              status: status,
            },
          });
          setTasks(response.data);
          return response.data;
        } catch (e: unknown) {
          if (axios.isAxiosError(e) && e.response?.data.errors) {
          } else {
          }
          return []; 
        }
      };

    const getTask = async (id: number) => {
        try {
            const response = await axiosInstance.get(`/tasks/${id}`);
            return response.data;
        } catch (e: unknown) {
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
        
        if (tags.length > 5) {
            setFlashMessage({ message: "タグは最大5個まで設定できます", type: "error" });
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
            setFlashMessage({ message: "タスクが作成されました！", type: "success" }); 
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data?.errors) {
                const errorMessage = e.response.data.errors.join("、") || "タスクの作成に失敗しました";
                setFlashMessage({ message: `タスク作成エラー: ${errorMessage}`, type: "error" });
            } else {
                setFlashMessage({ message: "タスクの作成に失敗しました。ネットワークを確認してください。", type: "error" });
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
        try {
            const response = await axiosInstance.put(`/tasks/${id}`, {
                task: { title, description, due_date: dueDate, priority, reminder_time: reminderTime, tags }
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? response.data : task
                )
            );
            setFlashMessage({ message: "タスクが更新されました！", type: "success" });
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data?.errors) {
                const errorMessage = e.response.data.errors.join("、") || "タスクの更新に失敗しました";
                setFlashMessage({ message: `タスク更新エラー: ${errorMessage}`, type: "error" });
            } else {
                setFlashMessage({ message: "タスクの更新に失敗しました。ネットワークを確認してください。", type: "error" });
            }
        }
    };

    const destroyTask = async (id: number) => {
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            setFlashMessage({ message: "タスクが削除されました", type: "success" });
        } catch (e: unknown) {
            setFlashMessage({ message: "タスクの削除に失敗しました", type: "error" });
        }
    };

    const completeTask = async (id: number, currentCompletionDate?: string) => {
        try {
            // 未完了にする場合は completion_date を null に設定
            const completion_date = currentCompletionDate
                ? null // すでに完了状態の場合、未完了に設定
                : new Date().toISOString().split("T")[0]; // 未完了なら現在の日付を設定

            const response = await axiosInstance.put(`/tasks/${id}`, {
                task: { completion_date }
            });

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? response.data : task
                )
            );
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data.errors) {
            } else {
            }
        }
    };

    const addCompletionMessage = async (id: number, message: string) => {
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
            } else {
            }
        }
    };



    return { tasks, getTasks, getTask, createTask, updateTask, destroyTask, addCompletionMessage,  completeTask };
};
