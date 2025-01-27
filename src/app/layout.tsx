'use client'
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { RecoilRoot } from 'recoil';
import PageHeader from "@/components/header";
import { useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Live2dView from "@/components/live2d/live2dView";
import '@/styles/globals.css';


import { SessionProvider } from 'next-auth/react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function AuthLoader({ children }: { children: React.ReactNode }) {
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus(); // 認証状態を確認
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon512_maskable.png"></link>
        <meta name="theme-color" content="#F472B6" />
        <Script
          src="/live2d/live2dcubismcore.min.js"
          strategy="beforeInteractive"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

        <meta property="og:title" content="タスクエールでがんばるもん！" />
        <meta property="og:description" content="タスク管理をもっと楽しく！可愛いキャラクターと一緒にタスクを整理しよう。" />
        <meta property="og:url" content="https://www.task-yell.jp" />
        <meta property="og:site_name" content="タスクエールでがんばるもん！" />
        <meta property="og:locale" content="ja_JP" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <RecoilRoot>
            <AuthLoader>
              <div className="h-screen w-screen bg-[url('/images/sample.jpg')] bg-cover bg-no-repeat bg-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full z-20">
                  <PageHeader />
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="absolute z-10 pointer-events-none w-full lg:w-[60%] text-brack">
                    {children}
                  </div>
                  <div className="absolute inset-0 z-0">
                    <Live2dView />
                  </div>
                </div>
              </div>
            </AuthLoader>
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
