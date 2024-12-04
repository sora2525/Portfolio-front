"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "@/lib/axiosInstance";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [completionStatus, setCompletionStatus] = useState("all");  // 完了状態のフィルタ
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    // タスクを取得
    const getTasks = async () => {
      try {
        const response = await axiosInstance.get(`/tasks`, {
          params: {
            q: {
              sort_by: sortBy,
              order: order,
            },
            completion_status: completionStatus,  // フィルタリング条件
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("タスクの取得に失敗しました", error);
      }
    };

    getTasks();
  }, [completionStatus, sortBy, order]);  // フィルタリングやソートが変更されるたびに再取得

  const handleCompletionFilterChange = (status) => {
    setCompletionStatus(status);  // フィルタの変更
  };

  return (
    <div>
      <div>
        <button onClick={() => handleCompletionFilterChange("all")}>
          すべてのタスク
        </button>
        <button onClick={() => handleCompletionFilterChange("incomplete")}>
          未完了のタスク
        </button>
        <button onClick={() => handleCompletionFilterChange("completed")}>
          完了済みのタスク
        </button>
      </div>

      <div>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="created_at">作成日順</option>
          <option value="due_date">期限順</option>
          <option value="priority">優先度順</option>
        </select>

        <select onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="asc">昇順</option>
          <option value="desc">降順</option>
        </select>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completion_date ? "完了" : "未完了"}
          </li>
        ))}
      </ul>
    </div>
  );
}
