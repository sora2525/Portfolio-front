'use client';
import ReloadButton from "@/components/ReloadButton";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-end h-screen w-full relative">
        {/* ReloadButtonを右上に配置 */}
        <div className="pointer-events-auto absolute top-[100px] right-4 z-50 flex flex-col justify-center items-center font-extrabold space-y-4 text-gray-300/90 text-sm" >
          <ReloadButton />
          <Link href="" className="flex flex-col justify-center items-center">
            <span className="material-icons" style={{ fontSize: '28px' }}>
              mail
            </span>
            <p className="mt-1">お知らせ</p>
          </Link>
          <Link href="" className="flex flex-col justify-center items-center">
            <span className="material-icons" style={{ fontSize: '28px' }}>
              help
            </span>
            <p className="mt-1">使い方</p>
          </Link>
        </div>

        <div className="
        pointer-events-auto text-[#008080] w-full flex justify-around text-center p-5 
        bg-[rgba(243,244,246,0.85)] lg:bg-inherit
        fixed bottom-0
        lg:relative lg:bottom-auto
        ">
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

          <Link href="/diaries" className="text-lg font-medium group lg:rounded-full lg:w-[200px] lg:h-[200px] lg:bg-[#8fbc8f] lg:text-white flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-lg">
              <span className="material-icons" style={{ fontSize: '48px' }}>
                auto_stories
              </span>
              <p>日記</p>
              <div className="lg:hidden w-full h-1 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-2" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
