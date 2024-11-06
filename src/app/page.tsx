import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="flex text-center ">
        <Link href="/tasks" className="text-lg font-medium hover:underline block">タスク管理</Link>
        <Link href="/chat" className="text-lg font-medium hover:underline block">チャット</Link>
        <Link href="/something" className="text-lg font-medium hover:underline block">なんか</Link>
      </div>
    </div>
  );
}

