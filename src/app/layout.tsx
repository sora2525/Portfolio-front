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
import { Caveat } from 'next/font/google';
import { Noto_Sans_JP } from "next/font/google";


import { SessionProvider } from 'next-auth/react';
import FlashMessage from "@/components/FlashMessage";

// GoogleAnalytics コンポーネントのインポート（Next.js v14以降用）
import { GoogleAnalytics } from '@next/third-parties/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: '400',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
        <link rel="apple-touch-icon" href="/android-chrome-512x512.png" />
        <meta name="theme-color" content="#F472B6" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          src="/live2d/live2dcubismcore.min.js"
          strategy="beforeInteractive"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <meta property="og:title" content="タスクエールでがんばるもん！" />
        <meta
          property="og:description"
          content="タスク管理をもっと楽しく！蓮実メロと一緒にタスクを整理しよう。"
        />
        <meta property="og:image" content="https://www.task-yell.jp/images/キービジュアルOGP2.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://www.task-yell.jp/" />
        <meta property="og:locale" content="ja_JP" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="タスクエールでがんばるもん！" />
        <meta name="twitter:description" content="タスク管理をもっと楽しく！蓮実メロと一緒にタスクを整理しよう。" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <RecoilRoot>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
            <AuthLoader>
              <div className="h-screen w-screen bg-[url('/images/stage16.png')] bg-cover bg-no-repeat bg-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full z-20">
                  <PageHeader />
                  <FlashMessage />
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="absolute z-10 pointer-events-none w-full text-brack">
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
