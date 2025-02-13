import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center relative">
        <div className="w-full max-w-[1000px] h-full flex flex-col justify-center items-center relative">
          <div className="absolute top-4 left-4">
            <Link
              href="/"
              className="w-14 h-14 flex items-center justify-center rounded-full 
                   bg-white/80 shadow-md text-[#008080] hover:bg-white hover:shadow-lg 
                   transition-all duration-300 pointer-events-auto mt-[80px]"
            >
              <span className="material-icons leading-none" style={{ fontSize: "38px" }}>reply</span>
            </Link>
          </div>
          <div className="pointer-events-auto w-[90%] max-w-[1000px] h-auto mt-[20px] overflow-auto max-h-[75vh] bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-xl font-bold text-gray-800 text-center mb-4">アプリ情報</h1>

            {/* アプリ概要 */}
            <p className="text-gray-700 text-center mb-6">
              このアプリは、タスク管理をより楽しくするために開発されました。蓮実メロがタスクをサポートし、励ましながら進捗を管理できます。
            </p>

            {/* クレジット表記 */}
            <div className="mt-6 text-gray-700 text-center">
              <h2 className="text-xl font-semibold mb-2">クレジット</h2>
              <p>開発者: 瀬戸口蒼空</p>
              <p>
                X (Twitter):{" "}
                <a href="https://x.com/sora_mero2525" className="text-blue-500 hover:underline">
                  @sora_mero2525
                </a>
              </p>
              <p className="mt-2">Powered by Next.js & Rails</p>
              <p>Live2D Cubism SDK, にじボイス 使用</p>
              <p>キャラクターボイス: 森宮 千乃</p>
              <p>
                イラスト:{" "}
                <a href="https://x.com/kuga_i_" className="text-blue-500 hover:underline">
                  くが様
                </a>
              </p>
              <p>
                モデリング:{" "}
                <a href="https://x.com/TAMA091900" className="text-blue-500 hover:underline">
                  たまねこ様
                </a>
              </p>
              <p className="mt-4 text-gray-500 text-sm">© 2025 タスクエールでがんばるもん！ - All rights reserved.</p>
            </div>

            {/* 関連リンク */}
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
      </div>

    </>
  );
}
