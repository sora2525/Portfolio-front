import "./globals.css";
import Script from "next/script";
import PageHeader from "@/components/header";
import FlashMessage from "@/components/FlashMessage";
import Live2dView from "@/components/live2d/live2dView";
import { Metadata } from "next";
import { RecoilProvider } from "@/lib/providers/RecoilProvider";
import { SessionProviderWrapper } from "@/lib/providers/SessionProviderWrapper"; // 🔥 Client Component を import
import { GoogleAnalytics } from '@next/third-parties/google';

export const generateMetadata = (): Metadata => {
  return {
    title: "タスクエールでがんばるもん！",
    description: "タスク管理をもっと楽しく！蓮実メロと一緒にタスクを整理しよう。",
    openGraph: {
      title: "タスクエールでがんばるもん！",
      description: "タスク管理をもっと楽しく！蓮実メロと一緒にタスクを整理しよう。",
      images: ["https://www.task-yell.jp/images/キービジュアルOGP2.png?v=2"],
      url: "https://www.task-yell.jp/",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "タスクエールでがんばるもん！",
      description: "タスク管理をもっと楽しく！蓮実メロと一緒にタスクを整理しよう。",
      images: ["https://www.task-yell.jp/images/キービジュアルOGP2.png?v=2"],
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/android-chrome-512x512.png" />
        <meta name="theme-color" content="#F472B6" />
        <link rel="icon" href="/favicon.ico" />
        <Script src="/live2d/live2dcubismcore.min.js" strategy="beforeInteractive" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
        <SessionProviderWrapper>
          <RecoilProvider>
            <div className="h-screen w-screen bg-[url('/images/stage16.png')] bg-cover bg-no-repeat bg-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full z-20">
                <PageHeader />
                <FlashMessage />
              </div>
              <div className="flex flex-row-reverse w-full">
                <div className="absolute z-10 pointer-events-none w-full text-black">
                  {children}
                </div>
                <div className="absolute inset-0 z-0">
                  <Live2dView />
                </div>
              </div>
            </div>
          </RecoilProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
