'use client';
import Message from "@/components/task/Message";
import { useTasks } from "@/lib/hooks/useTasks";
import { useEffect, useState, useRef } from "react";
import { useVoiceVoxLipSync } from "@/lib/hooks/useVoiceVoxLipSync";  // useVoiceVoxLipSyncフックを使う

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
    const { playVoiceAndLipSync } = useVoiceVoxLipSync();  // useVoiceVoxLipSyncフックを使う
    const [task, setTask] = useState<Task | null>(null); // タスクデータを保持するstate
    const hasPlayedRef = useRef(false); // 音声を再生したフラグ

    const taskId = Number(params.id); // URLパラメータのidを取得

    // タスクを取得してstateに保存する
    useEffect(() => {
        const fetchTask = async () => {
            if (taskId && !task) { // 既にtaskが取得されていない場合にのみ実行
                const taskData = await getTask(taskId); // タスクIDに基づいてタスクを取得
                setTask(taskData); // 取得したタスクデータをstateに保存

                // 音声再生がまだ行われていない場合のみ
                if (taskData.completion_message && !hasPlayedRef.current) {
                    playVoiceAndLipSync(taskData.completion_message, '58'); // VoiceVoxのspeaker IDを指定（例: '58'）
                    hasPlayedRef.current = true; // 音声再生フラグをtrueに設定
                }
            }
        };

        fetchTask();
    }, [taskId, task, playVoiceAndLipSync]); // taskがnullの場合にのみAPIを呼び出す

    if (!task) return <div>Loading...</div>; // タスクがまだ取得できていない場合はロード中メッセージを表示

    return (
        <>
            <div className="pointer-events-auto w-screen h-screen flex justify-center items-center flex-col">
                <Message completion_message={task.completion_message} />
                {/* タスクデータを表示 */}
                <div>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                </div>
            </div>
        </>
    );
}
