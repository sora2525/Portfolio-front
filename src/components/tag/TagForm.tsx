'use client';
import { useState } from 'react';

type TagFormProps = {
  onCreateTag: (name: string, color: string) => void;
};

export default function TagForm({ onCreateTag }: TagFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#0000ff');
  const [error, setError] = useState<string | null>(null); // エラーメッセージの状態

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // nameの文字数が10文字以上ならエラーメッセージを表示
    if (name.length > 10) {
      setError("タグ名は10文字以下で入力してください");
      return;
    }

    setError(null);
    onCreateTag(name, color); 
    setName('');
    setColor('#0000ff');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">タグ名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="タグ名を入力"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} 
        </div>
      <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">カラー</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 cursor-pointer border-none"
          />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        タグを作成
      </button>
    </form>
  );
}
