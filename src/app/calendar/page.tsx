'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import jaLocale from '@fullcalendar/core/locales/ja';
import { useTasks } from '@/lib/hooks/useTasks'; 

type Task = {
  id: number;
  title: string;
  description: string;
  due_date: string;
  priority: number;
  completion_date: string | null;
  reminder_time: string | null;
  tags: { id: number; name: string; color: string }[];
};

const CalendarPage = () => {
  const { getTasks,getTask, createTask, updateTask, error } = useTasks(); 
  const [events, setEvents] = useState([]); 
  const router = useRouter();

  const updateEvents = (tasks: Task[]) => {
    setEvents(
      tasks.map((task) => ({
        id: task.id,
        title: task.completion_date ? `✓ ${task.title}` : task.title, // 完了済みならチェックマークを追加
        start: task.due_date,
        end: task.due_date,
        backgroundColor: task.priority === 1 ? 'red' : 'blue',
      }))
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks('due_date', 'asc', '', ''); 
      updateEvents(data); 
    };
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateClick = async (info) => {
    const title = prompt('新しいタスクのタイトルを入力してください:');
    if (title) {
      await createTask(title, '', info.dateStr, 0, '', []); 
      alert('タスクが追加されました！');
      const updatedTasks = await getTasks('due_date', 'asc', '', ''); 
      updateEvents(updatedTasks); 
    }
  };

  const handleEventDrop = async (info) => {
    const newDueDate = new Date(info.event.start).toLocaleDateString('ja-JP', {
        timeZone: 'Asia/Tokyo',
    });

    try {
      const task = await getTask(Number(info.event.id));
      
      if (!task) {
        return;
      }
  
      const currentTags = task.tags.map((tag) => tag.id); 
  
      await updateTask(
        Number(info.event.id),
        task.title, 
        task.description,
        newDueDate, 
        task.priority,
        task.reminder_time,
        currentTags
      );
  
      const updatedTasks = await getTasks('due_date', 'asc', '', '');
      updateEvents(updatedTasks); 
    } catch (error) {
      console.error('タスク更新エラー:', error);
    }
};


  const handleEventClick = (info) => {
    const taskId = Number(info.event.id); 
    router.push(`/tasks/${taskId}`); 
  };

  return (
    <div className="pointer-events-auto p-5">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>タスク管理カレンダー</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        locale={jaLocale}
        events={events} 
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventClick={handleEventClick} 
        editable={true}
      />
    </div>
  );
};

export default CalendarPage;
