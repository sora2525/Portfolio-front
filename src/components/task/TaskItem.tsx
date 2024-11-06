import React from "react";
import Link from "next/link";

type TaskItemProps = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    reminder_time: string;
};

export default function TaskItem({
    id,
    title,
    description,
    due_date,
    priority,
}: TaskItemProps) {

    return (
        <>
            <div className="bg-white opacity-100 p-4 rounded-xl flex">
                <button className="w-10 h-10 bg-blue-500 rounded-full"></button>
                <li className="ml-4 w-full">
                    <Link href={`tasks/${id}`} className="flex flex-wrap" >
                        <h2 className="text-xl font-bold w-1/2 p-2">{title}</h2>
                        <p className="w-1/2 p-2">優先度: {priority}</p>
                        <p className="w-1/2 p-2">{description}</p>
                        <p className="w-1/2 p-2 text-red-500">期日: {due_date}</p>
                    </Link>
                </li>
            </div>
        </>
    );
}
