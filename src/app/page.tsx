'use client';
import ReloadButton from "@/components/ReloadButton";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-end h-screen w-full relative">
        <div className="pointer-events-auto absolute top-[100px] right-4 z-50 flex flex-col justify-center items-center font-extrabold space-y-4 text-white/95 text-sm lg:text-xl lg:mr-[150px] " style={{
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" 
        }}>
          <ReloadButton />
          <Link href="/how-to-use" className="flex flex-col justify-center items-center group">
            <span className="material-icons transform transition-transform duration-200 group-hover:scale-110" style={{ fontSize: '28px' }}>
              help
            </span>
            <p className="mt-1">使い方</p>
          </Link>
          <Link href="/about" className="flex flex-col justify-center items-center group">
            <span className="material-icons transform transition-transform duration-200 group-hover:scale-110" style={{ fontSize: '28px' }}>
              info
            </span>
            <p className="mt-1">アプリ情報</p>
          </Link>
        </div>

        <div className="pointer-events-auto text-[#008080] w-full max-w-[1200px] flex flex-wrap justify-around text-center p-5 lg:p-8 lg:mb-3 bg-[rgba(243,244,246,0.85)] lg:rounded-full fixed bottom-0">
          {[{
            href: "/tasks",
            icon: "task",
            label: "タスク管理"
          }, {
            href: "/chat",
            icon: "chat",
            label: "チャット"
          }, {
            href: "/diaries",
            icon: "auto_stories",
            label: "日記"
          }].map(({ href, icon, label }) => (
            <Link key={href} href={href} className="text-lg font-medium group flex flex-col items-center justify-center">
              <span className="material-icons transform transition-transform duration-200 group-hover:scale-110" style={{ fontSize: '48px' }}>
                {icon}
              </span>
              <p>{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
