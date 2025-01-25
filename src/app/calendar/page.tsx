'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { useTasks } from '@/lib/hooks/useTasks';
import TaskForm from '@/components/task/TaskForm';

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
  const { getTasks, createTask, updateTask, getTask, error } = useTasks();
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean | 'newTask'>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const router = useRouter();

  const updateEvents = (tasks: Task[]) => {
  setEvents(
    tasks.map((task) => ({
      id: task.id,
      title: task.completion_date ? `✓ ${task.title}` : `　 ${task.title}`,
      start: task.due_date,
      backgroundColor:'#3B82F6',
      textColor: '#FFFFFF',
      priority: task.priority, 
      description: task.description, 
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

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    setSelectedDate(clickedDate);

    const filteredTasks = events.filter(
      (event) => event.start === clickedDate
    ) as Task[];
    setSelectedTasks(filteredTasks);
    setIsModalVisible(true);
  };

  const handleEventClick = (info) => {
    const clickedDate = info.event.startStr;
    setSelectedDate(clickedDate);

    const filteredTasks = events.filter(
      (event) => event.start === clickedDate
    ) as Task[];
    setSelectedTasks(filteredTasks);
    setIsModalVisible(true);
  };

  const handleEventDrop = async (info) => {
    const newDueDate = info.event.start
      .toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })
      .replaceAll('/', '-');

    try {
      const task = await getTask(Number(info.event.id)); 
      if (!task) {
        console.error('タスクが見つかりません');
        return;
      }

      const currentTags = task.tags.map((tag) => tag.id);

      await updateTask(
        task.id,
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
      console.error('タスクの更新に失敗しました:', error);
    }
  };

  const handleFormSubmit = async (
    title: string,
    description: string,
    dueDate: string,
    priority: number,
    reminderTime: string,
    tags: number[]
  ) => {
    await createTask(title, description, dueDate, priority, reminderTime, tags);
    const updatedTasks = await getTasks('due_date', 'asc', '', '');
    updateEvents(updatedTasks);
    setIsModalVisible(false);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="flex items-center">
        <span
          className="rounded-full"
          style={{ backgroundColor: eventInfo.backgroundColor }}
        ></span>
        <p className="text-[10px] sm:text-sm font-semibold">{eventInfo.event.title}</p>
      </div>
    );
  };

  return (
    <div className="pointer-events-auto min-h-screen flex flex-col items-center justify-center p-3 sm:p-6">

      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="bg-white w-full max-w-4xl p-4 text-[12px] sm:text-[16px] sm:p-6 rounded-lg shadow-lg flex items-center justify-center">
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
          customButtons={{
            customTask: {
              text: '',
              click: () => router.push('/tasks'),
            },
          }}
          headerToolbar={{
            start: 'customTask prev,next today',
            center: 'title',
            end: '',
          }}
          buttonText={{
            today: '今日',
            month: '月',
            week: '週',
            day: '日',
          }}
          dayMaxEventRows={2}
          eventContent={renderEventContent}
        />
      </div>

      {isModalVisible && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">{selectedDate} のイベント一覧</h2>
            {selectedTasks.length > 0 ? (
              <ul className="space-y-3 max-h-[50vh] overflow-y-auto border-t border-gray-200 pt-4">
                {selectedTasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push(`/tasks/${task.id}`)}
                  >
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500">優先度: {task.priority}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>この日にタスクはありません。</p>
            )}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalVisible(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                閉じる
              </button>
              <button
                onClick={() => setIsModalVisible('newTask')}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                新規作成
              </button>
            </div>
          </div>
        </div>
      )}


      {isModalVisible === 'newTask' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={() => setIsModalVisible(false)}
            tags={[]}
            initialTask={{
              title: '',
              description: '',
              due_date: selectedDate || '',
              priority: 0,
              reminder_time: '',
              tags: [],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
