'use client';
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center  items-end  h-screen w-full  relative ">
      <div className="pointer-events-auto text-[#008080] w-full  flex justify-around text-center p-5 mt-[400px] bg-[rgba(243,244,246,0.85)] lg:bg-inherit ">
        <Link href="/tasks" className="text-lg font-medium group lg:rounded-full lg:w-[200px] lg:h-[200px] lg:bg-[#dc143c] lg:text-white flex items-center justify-center ">
          <div className="flex flex-col text-lg items-center justify-center">
            <span className="material-icons" style={{ fontSize: '48px' }}>
              task
            </span>
            <p>タスク管理</p>
            <div className="lg:hidden w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
          </div>
        </Link>

        <Link href="/chat" className="text-lg font-medium group lg:rounded-full lg:w-[200px] lg:h-[200px] lg:bg-[#87ceeb] lg:text-white flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-lg">
            <span className="material-icons" style={{ fontSize: '48px' }}>
              chat
            </span>
            <p>チャット</p>
            <div className="lg:hidden w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
          </div>
        </Link>

        <Link href="/profile" className="text-lg font-medium group lg:rounded-full lg:w-[200px] lg:h-[200px] lg:bg-[#8fbc8f] lg:text-white flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-lg">
            <span className="material-icons" style={{ fontSize: '48px' }}>
              person
            </span>
            <p>プロフィール</p>
            <div className="lg:hidden w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
          </div>
        </Link>

      </div>
    </div>
  );
}
