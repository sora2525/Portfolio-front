'use client'
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { RecoilRoot } from 'recoil';
import PageHeader from "@/components/header";
import { useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Live2dView from "@/components/live2d/live2dView";

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
    <html lang="en">
      <head>
        <Script
          src="/live2d/live2dcubismcore.min.js"
          strategy="beforeInteractive"
        />
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecoilRoot>
          <AuthLoader>
            <div className="h-screen w-screen bg-[url('/images/sample.jpg')] bg-cover bg-no-repeat bg-center relative overflow-hidden">
              <div className="absolute  top-0 left-0 w-full z-20">
                <PageHeader />
              </div>
              <div className="absolute  z-10 pointer-events-none">
                {children}
              </div>
              <div className="absolute inset-0 z-0">
                <Live2dView />
              </div>
            </div>
          </AuthLoader>
        </RecoilRoot>
      </body>
    </html>
  );
}
