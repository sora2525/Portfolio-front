import Link from "next/link";

export default function About() {
  return (
    <>
    <div className="pointer-events-auto flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
      <Link
        href="/"
        className="absolute top-[80px] left-4 text-3xl text-[#008080] pointer-events-auto"
      >
        <span className="material-icons" style={{ fontSize: '48px' }}>
          reply
        </span>
      </Link>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">アプリ情報</h1>

        {/* ✅ アプリ概要 */}
        <p className="text-gray-700 text-center mb-6">
          このアプリは、タスク管理をより楽しくするために開発されました。蓮実メロがタスクをサポートし、励ましながら進捗を管理できます。
        </p>

        {/* ✅ クレジット表記 */}
        <div className="mt-6 text-gray-700 text-center">
          <h2 className="text-xl font-semibold mb-2">クレジット</h2>
          <p>開発者: 瀬戸口蒼空</p>
          {/* <p>GitHub: <a href="https://github.com/your-github" className="text-blue-500 hover:underline">your-github</a></p> */}
          <p>X (Twitter): <a href="https://x.com/sora_mero2525" className="text-blue-500 hover:underline">@sora_mero2525</a></p>
          <p className="mt-2">Powered by Next.js & Rails</p>
          <p>Live2D Cubism SDK, にじボイス 使用</p>
          <p>キャラクターデザイン,イラスト: <a href="https://twitter.com/illustrator" className="text-blue-500 hover:underline">くが様</a></p>
          <p>モデリング: <a href="https://twitter.com/illustrator" className="text-blue-500 hover:underline">たまねこ様</a></p>

          <p className="mt-4 text-gray-500 text-sm">© 2025 タスクエールでがんばるもん！ - All rights reserved.</p>
        </div>

        {/* ✅ 関連リンク */}
        <div className="mt-6 flex flex-col space-y-2">
          <Link href="/privacy-policy" className="text-blue-500 hover:underline text-lg text-center">
            ▶ プライバシーポリシー
          </Link>
          <Link href="/terms-of-service" className="text-blue-500 hover:underline text-lg text-center">
            ▶ 利用規約
          </Link>
          <Link href="/contact" className="text-blue-500 hover:underline text-lg text-center">
            ▶ お問い合わせ
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
