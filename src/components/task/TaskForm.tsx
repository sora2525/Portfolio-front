'use client';

import { useState, useEffect } from "react";
import TagItem from "@/components/tag/TagItem";
import Link from "next/link";

type TaskFormProps = {
  onSubmit: (
    title: string,
    description: string,
    dueDate: string,
    priority: number,
    reminderTime: string,
    tags: number[]
  ) => void;
  tags: Array<{ id: number; name: string; color: string }>;
  isVisible: boolean;
  editMode: boolean;
  selectedTask?: {
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
    tags: number[]; // タグIDの配列
  };
};

export default function TaskForm({
  onSubmit,
  tags,
  isVisible,
  editMode,
  selectedTask,
}: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: 0,
    reminder_time: "",
  });

  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (editMode && selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        due_date: selectedTask.due_date,
        priority: selectedTask.priority,
        reminder_time: selectedTask.reminder_time,
      });
      setSelectedTags(selectedTask.tags);
    }
  }, [editMode, selectedTask]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagClick = (tagId: number) => {
    if (selectedTags.length >= 5 && !selectedTags.includes(tagId)) {
      setErrorMessage("タグは最大5個までしか追加できません");
      return;
    }

    setErrorMessage(""); // エラーメッセージをリセット

    setSelectedTags((prevTags) =>
      prevTags.includes(tagId)
        ? prevTags.filter((id) => id !== tagId)
        : [...prevTags, tagId]
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
      priority: 0,
      reminder_time: "",
    });
    setSelectedTags([]);
  };

  return (
    <div
      className={`fixed flex flex-col h-[85vh] sm:h-[80vh] bottom-0 left-0 right-0 bg-white p-5 shadow-lg rounded-t-lg transition-transform duration-300 z-50 ${isVisible ? "translate-y-0" : "translate-y-full"
        }`}
    >
      <div className="text-center flex flex-col justify-center items-center">
        <h2 className="text-lg sm:text-2xl font-bold">
          {editMode ? "タスクの編集" : "新しいタスクを作成"}
        </h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full max-w-[1000px] p-1 sm:p-2 mt-4 border border-gray-300 rounded"
          placeholder="タイトル"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full max-w-[1000px] p-1 sm:p-2 mt-4 border border-gray-300 rounded"
          placeholder="説明"
        ></textarea>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleInputChange}
          className="w-full max-w-[1000px] p-1 sm:p-2 mt-4 border border-gray-300 rounded"
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="w-full max-w-[1000px] p-1 sm:p-2 mt-4 border border-gray-300 rounded"
        >
          <option value={0}>なし</option>
          <option value={1}>低</option>
          <option value={2}>中</option>
          <option value={3}>高</option>
        </select>
        <input
          type="datetime-local"
          name="reminder_time"
          value={formData.reminder_time}
          onChange={handleInputChange}
          className="w-full max-w-[1000px] p-1 sm:p-2 mt-4 border border-gray-300 rounded"
        />
      </div>
      <div className="mt-4 max-w-[1000px]">
        <h3>タグを選択:</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag.id} onClick={() => handleTagClick(tag.id)}>
              <TagItem id={tag.id} name={tag.name} color={tag.color} />
            </div>
          ))}
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <div className="mt-5 mb-5">
          <Link href="/tags" className="bg-blue-500 text-white p-2 font-bold">
            タグの新規作成
          </Link>
        </div>

        <div className="mt-4">
          <h4>選択したタグ:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              return tag ? (
                <TagItem key={tag.id} id={tag.id} name={tag.name} color={tag.color} />
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="flex lg:flex-col text-xl lg:text-3xl mt-auto mb-10 items-center justify-center lg:space-y-5">
        <button onClick={handleFormSubmit} className="p-2 text-[#008080] group">
          <div className="flex items-center">
            <span className="material-icons" style={{ fontSize: "52px" }}>
              {editMode ? "edit" : "fiber_new"}
            </span>
            <p>{editMode ? "更新" : "作成"}</p>
          </div>
          <div className="w-[100%] h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
        </button>
        <button
          onClick={() => onSubmit("", "", "", 1, "", selectedTags)}
          className="p-2 text-gray-500 group"
        >
          <div className="flex items-center">
            <span className="material-icons" style={{ fontSize: "46px" }}>
              close
            </span>
            <p>キャンセル</p>
          </div>
          <div className="w-[100%] h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
        </button>
      </div>
    </div>
  );
}
