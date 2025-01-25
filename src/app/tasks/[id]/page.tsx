'use client';
import { useEffect, useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import { useRouter } from "next/navigation";
import { useTags } from "@/lib/hooks/useTags";
import TagItem from "@/components/tag/TagItem";
import TaskForm from "@/components/task/TaskForm";
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';

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
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const taskId = Number(params.id);
  const { getTags, tags } = useTags();
  const auth = useRequireAuth();

  useEffect(() => {
    const fetchTask = async () => {
      const fetchedTask = await getTask(taskId);
      if (fetchedTask) {
        setTask(fetchedTask);
      } else {
        setError("タスクの取得に失敗しました");
      }
    };
    fetchTask();
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const handleDelete = async () => {
    if (task) {
      const confirmed = confirm("本当にこのタスクを削除しますか？");
      if (confirmed) {
        await destroyTask(task.id);
        router.back();
      }
    }
  };

  const handleFormSubmit = async (title: string, description: string, dueDate: string, priority: number, reminderTime: string, selectedTags: number[]) => {
    if (task) {
      await updateTask(task.id, title, description, dueDate, priority, reminderTime, selectedTags);
      setTask({
        ...task,
        title,
        description,
        due_date: dueDate,
        priority,
        reminder_time: reminderTime,
        tags: tags.filter((tag) => selectedTags.includes(tag.id)),
      });
      setIsEditing(false);
    }
  };

  if (!auth.isAuthenticated) {
    return null;
  }

  if (!task) {
    return <p>タスクを読み込み中...</p>;
  }

  return (
    <div className="pointer-events-auto flex flex-col items-center w-full h-screen relative justify-end">
      <div className="bg-[rgba(243,244,246,0.85)] w-[95%] h-[85%] p-4 rounded-lg shadow-lg flex flex-col justify-between mb-5 overflow-y-auto">
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="flex flex-col h-full">
            <div>
              <button onClick={() => router.back()}>
                <span className="material-icons text-[#008080]" style={{ fontSize: '42px' }}>
                  reply
                </span>
              </button>
              <h1 className="font-bold text-3xl text-center">{task.title}</h1>
              <div className="flex">
                <p className="text-red-500 text-xl mt-5 w-[200px]">期日: {task.due_date}</p>
                <p className="text-blue-500 text-xl mt-5">優先度: {task.priority}</p>
              </div>
              <div className="mt-5 flex">
                <h4 className="text-xl">関連タグ:</h4>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <TagItem key={tag.id} id={tag.id} name={tag.name} color={tag.color} />
                  ))}
                </div>
              </div>
              <p className="text-xl mt-5 break-words">{task.description}</p>
            </div>

            <div className="flex lg:flex-col justify-center items-center lg:space-y-5 mt-auto mb-10">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-[#008080] rounded text-3xl group cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="material-icons" style={{ fontSize: '42px' }}>
                    edit
                  </span>
                  <p>編集</p>
                </div>
                <div className="w-[100%] h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
              </button>
              <button onClick={handleDelete} className="p-2 text-red-500 rounded text-3xl group">
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

      {/* 編集フォームのモーダル表示 */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={() => setIsEditing(false)}
            tags={tags}
            initialTask={{
              title: task.title,
              description: task.description,
              due_date: task.due_date,
              priority: task.priority,
              reminder_time: task.reminder_time,
              tags: task.tags.map((tag) => tag.id),
            }}
          />
        </div>
      )}
    </div>
  );
}
