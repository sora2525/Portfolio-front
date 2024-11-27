import React from "react";
import Link from "next/link";

type TagItemProps = {
    id: number;
    name: string;
    color: string;
};

export default function TagItem({ id, name, color }: TagItemProps) {
    return (
            <div
                className="p-1 rounded-sm text-white text-sm font-semibold text-center cursor-pointer hover:opacity-90"
                style={{ backgroundColor: color }}
            >
                {name}
            </div>
    );
}
