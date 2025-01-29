"use client";

import { useEffect, useState } from "react";

export default function ReloadButton() {
    const [fontSize, setFontSize] = useState("28px"); // 初期値

    useEffect(() => {
        const updateFontSize = () => {
            if (window.innerWidth < 640) {
                setFontSize("32px"); // モバイル
            } else {
                setFontSize("48px"); // PC
            }
        };

        updateFontSize();
        window.addEventListener("resize", updateFontSize);
        return () => window.removeEventListener("resize", updateFontSize);
    }, []);

    const handleReload = () => {
        window.location.href = window.location.href; 
    };

    return (
        <button onClick={handleReload} className="flex flex-col items-center">
            <span className="material-icons" style={{ fontSize }}>
                cached
            </span>
            <p>リロード</p>
        </button>
    );
}
