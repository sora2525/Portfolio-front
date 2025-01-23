'use client';
import { useState } from "react";

type Tag = {
  id: number;
  name: string;
  color: string;
};

type TaskFormProps = {
  onSubmit: (title: string, description: string, dueDate: string, priority: number, reminderTime: string, tags: number[]) => void;
  onCancel?: () => void; // キャンセルボタンが必要な場合
  tags: Tag[]; // タグ一覧
  initialTask?: { // 初期データ（編集時に渡す）
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
    tags: number[]; // 選択済みのタグのID
  };
};

export default function TaskForm({
  onSubmit,
  onCancel,
  tags,
  initialTask = {
    title: "",
    description: "",
    due_date: "",
    priority: 0,
    reminder_time: "",
    tags: [],
  },
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask.title);
  const [description, setDescription] = useState(initialTask.description);
  const [dueDate, setDueDate] = useState(initialTask.due_date);
  const [priority, setPriority] = useState(initialTask.priority);
  const [reminderTime, setReminderTime] = useState(initialTask.reminder_time);
  const [selectedTags, setSelectedTags] = useState<number[]>(initialTask.tags);
  const [tagError, setTagError] = useState<string | null>(null);

  const handleTagToggle = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId)); 
      setTagError(null); 
    } else {
      if (selectedTags.length >= 5) {
        setTagError("タグは最大5個まで選択できます"); 
      } else {
        setSelectedTags([...selectedTags, tagId]); 
        setTagError(null); 
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, dueDate, priority, reminderTime, selectedTags);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-lg mx-auto">
      {/* キャンセルボタン */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition"
        >
          ✕
        </button>
      )}

      <form onSubmit={handleSubmit} className="space-y-1 sm:space-y-6">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          {initialTask.title ? "タスクを編集" : "新しいタスクを追加"}
        </h2>

        {/* タイトル */}
        <div>
          <label htmlFor="title" className="block text-sm sm:text-lg font-medium text-gray-700">タイトル</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={30}
            className="w-full px-3 py-1 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="タスクのタイトルを入力"
            required
          />
        </div>

        {/* 説明 */}
        <div>
          <label htmlFor="description" className="block text-sm sm:text-lg font-medium text-gray-700 mb-1">説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            className="w-full px-3 py-1 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="タスクの説明を入力"
          />
        </div>

        {/* 期日 */}
        <div>
          <label htmlFor="due_date" className="block text-sm sm:text-lg font-medium text-gray-700 mb-1">期日</label>
          <input
            id="due_date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-1 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* 優先度 */}
        <div>
          <label htmlFor="priority" className="block text-sm sm:text-lg font-medium text-gray-700 mb-1">優先度</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="w-full px-3 py-1 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>

          </select>
        </div>

        {/* リマインダー */}
        <div>
          <label htmlFor="reminder_time" className="block text-sm sm:text-lg font-medium text-gray-700 mb-1">リマインダー</label>
          <input
            id="reminder_time"
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="w-full px-3 py-1 sm:px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* タグ */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">タグ</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagToggle(tag.id)}
                className={`px-4 py-1 rounded-full text-sm font-semibold ${selectedTags.includes(tag.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-400 hover:text-white transition`}
              >
                {tag.name}
              </button>
            ))}
          </div>
          {tagError && <p className="text-red-500 text-sm mt-1">{tagError}</p>}
        </div>

        {/* ボタン */}
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition w-full mt-3">
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
