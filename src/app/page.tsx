import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen relative">
      <div className="pointer-events-auto bg-pink-500 w-[80%] flex justify-around text-center text-white p-5 rounded-3xl mt-[400px]">
        <Link href="/tasks" className="text-lg font-medium hover:underline text-2xl">タスク管理</Link>
        <Link href="/chat" className="text-lg font-medium hover:underline text-2xl">チャット</Link>
        <Link href="/something" className="text-lg font-medium hover:underline text-2xl">なんか</Link>
      </div>
    </div>
  );
}
