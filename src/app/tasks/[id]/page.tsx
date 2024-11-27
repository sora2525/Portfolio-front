"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import { useRouter } from "next/navigation";
import { useTags } from "@/lib/hooks/useTags";
import TagItem from "@/components/tag/TagItem";

type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
    user_id: number;
    tags: Array<{ id: number; name: string; color: string }>;
};

export default function TaskDetailPage({ params }: { params: { id: string } }) {
    const { getTask, updateTask, destroyTask } = useTasks();
    const [task, setTask] = useState<Task | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: 1,
        reminder_time: ""
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const taskId = Number(params.id);
    const { getTags, tags } = useTags();
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    // タスクとタグを取得
    useEffect(() => {
        const fetchTask = async () => {
            const fetchedTask = await getTask(taskId);
            if (fetchedTask) {
                setTask(fetchedTask);
                setFormData({
                    title: fetchedTask.title,
                    description: fetchedTask.description,
                    due_date: fetchedTask.due_date,
                    priority: fetchedTask.priority,
                    reminder_time: fetchedTask.reminder_time
                });
                setSelectedTags(fetchedTask.tags.map((tag) => tag.id));
            } else {
                setError("タスクの取得に失敗しました");
            }
        };
        fetchTask();
        getTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (task && !isEditing) {
            setTask({ ...task, tags: tags.filter(tag => selectedTags.includes(tag.id)) });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async () => {
        if (task) {
            await updateTask(
                task.id,
                formData.title,
                formData.description,
                formData.due_date,
                Number(formData.priority),
                formData.reminder_time,
                selectedTags
            );
            setTask({
                ...task,
                title: formData.title,
                description: formData.description,
                due_date: formData.due_date,
                priority: formData.priority,
                reminder_time: formData.reminder_time,
                tags: tags.filter((tag) => selectedTags.includes(tag.id)),
            });
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        if (task) {
            const confirmed = confirm("本当にこのタスクを削除しますか？");
            if (confirmed) {
                await destroyTask(task.id);
                router.push("/tasks");
            }
        }
    };

    const handleTagClick = (tagId: number) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tagId) ? prevTags.filter((id) => id !== tagId) : [...prevTags, tagId]
        );
    };

    return (
        <>
            <div className="pointer-events-auto flex flex-col items-center  w-screen h-screen relative justify-end">
                <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[85%] p-4 rounded-lg shadow-lg flex flex-col justify-between mb-5">
                    {error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : !task ? (
                        <p>読み込み中...</p>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div>
                                <button onClick={() => router.back()}>
                                    <span className="material-icons text-[#008080]" style={{ fontSize: '42px' }}>
                                        reply
                                    </span>
                                </button>
                                <h1 className="font-bold text-5xl text-center">{formData.title || task.title}</h1>
                                <p className="text-3xl mt-5">{formData.description || task.description}</p>
                                <p className="text-red-500 text-3xl mt-5">期日: {formData.due_date || task.due_date}</p>
                                <p className="text-blue-500 text-3xl mt-5">優先度: {formData.priority || task.priority}</p>
                                <p className="text-3xl mt-5">リマインダー: {formData.reminder_time || task.reminder_time}</p>

                                {/* 登録タグ */}
                                <div className="mt-5">
                                    <h4 className="text-2xl">関連タグ:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {task.tags.map((tag) => (
                                            <TagItem key={tag.id} id={tag.id} name={tag.name} color={tag.color} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center space-y-5 mt-auto mb-10">
                                <button onClick={handleEditToggle} className="p-2 text-[#008080]  rounded text-3xl group">
                                    <div className="flex items-center">
                                        <span className="material-icons" style={{ fontSize: '42px' }}>
                                            edit
                                        </span>
                                        <p>編集</p>
                                    </div>
                                    <div className="w-[100%] h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />

                                </button>
                                <button onClick={handleDelete} className="p-2  text-red-500 rounded text-3xl group">
                                    <div className="flex items-center">
                                        <span className="material-icons" style={{ fontSize: '42px' }}>
                                            delete
                                        </span>
                                        <p>削除</p>
                                    </div>
                                    <div className="w-[100%] h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />

                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 編集フォームモーダル */}
                <div className={`fixed flex flex-col h-[80vh] sm:h-[80vh] bottom-0 left-0 right-0 bg-white p-5 shadow-lg rounded-t-lg transition-transform duration-300 z-50 ${isEditing ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">タスクを編集</h2>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-4 border border-gray-300 rounded"
                            placeholder="タイトル"
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-4 border border-gray-300 rounded"
                            placeholder="説明"
                        ></textarea>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-4 border border-gray-300 rounded"
                        />
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-4 border border-gray-300 rounded"
                        >
                            <option value={1}>低</option>
                            <option value={2}>中</option>
                            <option value={3}>高</option>
                        </select>
                        <input
                            type="datetime-local"
                            name="reminder_time"
                            value={formData.reminder_time}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-4 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mt-4">
                        <h3>タグを選択:</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <div key={tag.id} onClick={() => handleTagClick(tag.id)}>
                                    <TagItem id={tag.id} name={tag.name} color={tag.color} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <h4>選択したタグ:</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedTags.map((tagId) => {
                                    const tag = tags.find((t) => t.id === tagId);
                                    return tag ? <TagItem key={tag.id} id={tag.id} name={tag.name} color={tag.color} /> : null;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-auto mb-10 items-center justify-center space-y-5">
                        <button onClick={handleFormSubmit} className="p-2 text-green-500 rounded text-3xl group">
                            <div className="flex items-center">
                                <span className="material-icons" style={{ fontSize: '46px' }}>
                                    edit
                                </span>
                                <p>更新</p>
                            </div>
                            <div className="w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />

                        </button>
                        <button onClick={handleEditToggle} className="p-2 text-gray-500 rounded text-3xl group">
                            <div className="flex items-center">
                                <span className="material-icons" style={{ fontSize: '46px' }}>
                                    close
                                </span>
                                <p>キャンセル</p>
                            </div>
                            <div className="w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />

                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
