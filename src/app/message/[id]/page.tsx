'use client';
import Message from "@/components/task/Message";
import { useTasks } from "@/lib/hooks/useTasks";
import { useEffect, useState } from "react";
import { useTextToLipSync } from "@/lib/hooks/useTextToLipSync";
import Link from "next/link";

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

export default function TaskPage({ params }: { params: { id: string } }) {
    const { getTask } = useTasks(); 
    const [task, setTask] = useState<Task | null>(null); 
    const { generateAndSyncLipSync } = useTextToLipSync();

    const taskId = Number(params.id); 

    
    useEffect(() => {
        const fetchTask = async () => {
            if (taskId && !task) { 
                const taskData = await getTask(taskId); 
                setTask(taskData); 
            }
        };

        fetchTask();
    }, [taskId, task, getTask]); 

    const handlePlayMessage = () => {
        if (task?.completion_message) {
            generateAndSyncLipSync(task.completion_message);
        }
    };

    if (!task) return <div>Loading...</div>; 

    return (
        <>
        <div className="pointer-events-auto w-screen h-screen flex justify-end items-center flex-col relative">
            <Link href="/tasks" className="absolute top-[80px] left-4 text-3xl text-[#008080]">
                <span className="material-icons" style={{ fontSize: '48px' }}>
                reply
                </span>
            </Link>

            <div className="space text-center">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
            </div>
            
            <Message completion_message={task.completion_message} />

            <button
                onClick={handlePlayMessage}
                className="mt-4 p-2 bg-blue-500 text-white flex space-x-3 mb-5"
            >
                <span className="material-icons">
                    volume_up
                </span>
                <p>音声を生成</p>
            </button>
        </div>
        </>
    );
}
