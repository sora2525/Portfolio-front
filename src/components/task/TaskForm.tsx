
"use client";
import { useState, useEffect } from "react";
import TagItem from "@/components/tag/TagItem";

type TaskFormProps = {
    onSubmit: (title: string, description: string, dueDate: string, priority: number, reminderTime: string, tags: number[]) => void;
    tags: Array<{ id: number; name: string; color: string }>;
    isVisible: boolean;
};

export default function TaskForm({ onSubmit, tags, isVisible }: TaskFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: 1,
        reminder_time: ""
    });

    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagClick = (tagId: number) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tagId) ? prevTags.filter((id) => id !== tagId) : [...prevTags, tagId]
        );
    };

    const handleFormSubmit = () => {
        onSubmit(
            formData.title,
            formData.description,
            formData.due_date,
            Number(formData.priority),
            formData.reminder_time,
            selectedTags
        );
        setFormData({
            title: "",
            description: "",
            due_date: "",
            priority: 1,
            reminder_time: ""
        });
        setSelectedTags([]);
    };

    return (
        <div
            className={`fixed flex flex-col h-[90vh] sm:h-[80vh] bottom-0 left-0 right-0 bg-white p-5 shadow-lg rounded-t-lg transition-transform duration-300 z-50 ${
                isVisible ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold ">新しいタスクを作成</h2>
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
                <button onClick={handleFormSubmit} className="p-2 bg-green-500 text-white rounded text-3xl w-64">作成</button>
                <button onClick={() => onSubmit("", "", "", 1, "", [])} className="p-2 bg-gray-500 text-white rounded text-3xl w-64">キャンセル</button>
            </div>
        </div>
    );
}
