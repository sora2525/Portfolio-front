// TaskItem.tsx
import React from "react";

type TaskItemProps = {
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
};

export default function TaskItem({
    title,
    description,
    due_date,
    priority,
    reminder_time,
}: TaskItemProps) {

    return (
        <>
        <div className="bg-gray-50 m-4">
        <li>
            <h2 className="text-xl font-bold">{title}</h2>
            <p>{description}</p>
            <p>期日: {due_date}</p>
            <p>優先度: {priority}</p>
            <p>リマインダー: {reminder_time}</p>
        </li>
        </div>
        </>
    );
}
