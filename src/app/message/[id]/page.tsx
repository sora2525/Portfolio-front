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
    const { speakAndLipSync } = useTextToLipSync();

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
            speakAndLipSync(task.completion_message);
        }
    };

    if (!task) return <div>Loading...</div>; 

    return (
        <div className="w-full h-screen flex justify-end items-center flex-col relative">
            <Link href="/tasks" className="pointer-events-auto absolute top-[80px] left-4 text-3xl text-[#008080]">
                <span className="material-icons" style={{ fontSize: '48px' }}>
                    reply
                </span>
            </Link>

            {/* メッセージコンポーネント */}
            <Message completion_message={task.completion_message} onPlayMessage={handlePlayMessage} />
        </div>
    );
}
