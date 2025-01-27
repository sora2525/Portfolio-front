"use client";
import React, { useState } from "react";
import { useTextToLipSync } from "@/lib/hooks/useTextToLipSync";

export default function DemoPage() {
  const [inputText, setInputText] = useState("");
  const { speakAndLipSync, isGenerating, error, isLipSyncing } = useTextToLipSync();

  const handleClick = () => {
    speakAndLipSync(inputText);
  };

  return (
    <div className="pointer-events-auto mt-[199px]">
      <h1>Live2Dリップシンク x にじボイス</h1>
      <textarea
        rows={3}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ここに読み上げたいテキストを入力"
      />
      <br />
      <button onClick={handleClick} disabled={isGenerating || isLipSyncing}>
        音声生成＆リップシンク開始
      </button>
      {isGenerating && <p>音声生成中…</p>}
      {isLipSyncing && <p>リップシンク中…</p>}
      {error && <p style={{ color: "red" }}>エラー: {error}</p>}
    </div>
  );
}
