'use client';
import Message from "@/components/task/Message";
import { useTasks } from "@/lib/hooks/useTasks";
import { useEffect, useState } from "react";
import { useVoiceVoxLipSync } from "@/lib/hooks/useVoiceVoxLipSync"; // useVoiceVoxLipSyncフックを使う
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
    const { getTask } = useTasks(); // タスクを取得するための関数
    const { playVoiceAndLipSync } = useVoiceVoxLipSync(); // useVoiceVoxLipSyncフックを使う
    const [task, setTask] = useState<Task | null>(null); // タスクデータを保持するstate

    const taskId = Number(params.id); // URLパラメータのidを取得

    // タスクを取得してstateに保存する
    useEffect(() => {
        const fetchTask = async () => {
            if (taskId && !task) { // 既にtaskが取得されていない場合にのみ実行
                const taskData = await getTask(taskId); // タスクIDに基づいてタスクを取得
                setTask(taskData); // 取得したタスクデータをstateに保存
            }
        };

        fetchTask();
    }, [taskId, task, getTask]); // タスクがnullの場合にのみAPIを呼び出す

    const handlePlayMessage = () => {
        if (task?.completion_message) {
            playVoiceAndLipSync(task.completion_message, '58'); // VoiceVoxのspeaker IDを指定（例: '58'）
        }
    };

    if (!task) return <div>Loading...</div>; // タスクがまだ取得できていない場合はロード中メッセージを表示

    return (
        <>
        <div className="pointer-events-auto w-screen h-screen flex justify-end items-center flex-col relative">
            {/* 左上に戻るボタンを配置 */}
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
