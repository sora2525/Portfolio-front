import { useState } from 'react';
import { useTags } from '@/lib/hooks/useTags';

export default function TagForm() {
  const { createTag } = useTags(); 
  const [name, setName] = useState(''); 
  const [color, setColor] = useState('#FFFFFF'); 
  const [message, setMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTag = await createTag(name, color);

    if (newTag) {
      setMessage('タグが正常に作成されました');
      setName(''); 
      setColor('#FFFFFF');
    } else {
      setMessage('タグの作成に失敗しました');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">新規タグ作成</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
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
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          タグを作成
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center ${message.includes('正常') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
