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
    const [tasks,setTasks] = useState<Task[]>([])
    const [error, setError] = useState<string | null>(null);

    const getTasks = async ()=>{
        try{
            const response = await axiosInstance.get("/tasks");
            setTasks(response.data);
        }catch(e:unknown){
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
        } catch (e) {
            if (axios.isAxiosError(e) && e.response?.data.errors) {
                setError(e.response.data.errors.join(", "));
            } else {
                setError("タスクの作成に失敗しました");
            }
        }
    };

    return { tasks, getTasks,getTask, createTask, error};
};
