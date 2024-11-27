import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-end h-screen w-screen relative">
      <div className="pointer-events-auto text-[#008080] w-full flex justify-around text-center p-5  mt-[400px] bg-[rgba(243,244,246,0.85)]">
        <Link href="/tasks" className="text-lg font-medium group">
          <div className="flex flex-col text-lg">
            <span className="material-icons" style={{ fontSize: '48px' }}>
              task
            </span>
            <p>タスク管理</p>
            <div className="w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
          </div>
        </Link>

        <Link href="/chat" className="text-lg font-medium group">
          <div className="flex flex-col text-lg">
            <span className="material-icons" style={{ fontSize: '48px' }}>
              chat
            </span>
            <p>チャット</p>
            <div className="w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
          </div>
        </Link>

        <Link href="/profile" className="text-lg font-medium group">
          <div className="flex flex-col text-lg">
            <span className="material-icons" style={{ fontSize: '48px' }}>
              person
            </span>
            <p>プロフィール</p>
            <div className="w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
          </div>
        </Link>
      </div>
    </div>
  );
}
