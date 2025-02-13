'use client';
import Message from "@/components/task/Message";
import { useTasks } from "@/lib/hooks/useTasks";
import { useEffect, useState } from "react";
import { useTextToLipSync } from "@/lib/hooks/useTextToLipSync";
import Link from "next/link";
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';


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
    const auth = useRequireAuth();


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

    const handlePlayMessage = async () => {
        if (task?.completion_message) {
            await speakAndLipSync(task.completion_message);
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center relative">
            <div className="w-full max-w-[1000px] h-full flex flex-col justify-end items-center relative">
                <div className="absolute top-4 left-4">
                    <Link
                        href="/tasks"
                        className="w-14 h-14 flex items-center justify-center rounded-full 
                   bg-white/80 shadow-md text-[#008080] hover:bg-white hover:shadow-lg 
                   transition-all duration-300 pointer-events-auto mt-[80px]"
                    >
                        <span className="material-icons leading-none" style={{ fontSize: "38px" }}>reply</span>
                    </Link>
                </div>

                {/* メッセージコンポーネント */}
                <Message completion_message={task.completion_message} onPlayMessage={handlePlayMessage} />
            </div>
        </div>

    );
}
