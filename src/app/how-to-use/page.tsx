import Image from "next/image";
import Link from "next/link";

export default function HowToUse() {
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
                    <div className="bg-[rgba(243,244,246,0.85)] pointer-events-auto w-[95%] h-[85%] shadow-xl rounded-2xl p-8 max-w-3xl overflow-auto space-y-12 mt-8">

                        <section className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-3xl font-bold text-center mb-6">使い方</h2>
                            <p>このアプリは、タスク管理をより楽しくするために開発されました。蓮実メロがタスクをサポートし、励ましながら進捗を管理できます。</p>
                        </section>

                        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-teal-600">
                                キャラクター紹介
                            </h1>

                            {/* 画像 */}
                            <div className="flex justify-center mb-6 sm:mb-8">
                                <Image
                                    src="/images/mero.jpeg"
                                    alt="蓮実 メロ"
                                    width={250}
                                    height={500}
                                    className="rounded-lg shadow-md"
                                />
                            </div>

                            {/* プロフィールセクション */}
                            <div className="text-gray-800 space-y-4 sm:space-y-6 leading-relaxed text-sm sm:text-lg">

                                {/* 基本情報 */}
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-semibold mb-2 text-teal-500">🔹 基本情報</h2>
                                    <ul className="list-disc list-inside pl-2 sm:pl-4">
                                        <li><strong>名前:</strong> 蓮実 メロ</li>
                                        <li><strong>年齢:</strong> 20歳</li>
                                        <li><strong>誕生日:</strong> 4月2日 (フェレットの日)</li>
                                    </ul>
                                </div>

                                {/* 性格・特徴 */}
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-semibold mb-2 text-teal-500">🔹 性格・特徴</h2>
                                    <ul className="list-disc list-inside pl-2 sm:pl-4">
                                        <li><strong>性格:</strong> 明るく元気で、誰にでも優しい。ちょっと照れ屋な一面もある。</li>
                                        <li><strong>特徴:</strong> フェレット人形を持ち歩いていて話しかけていることがある。</li>
                                    </ul>
                                </div>

                                {/* 趣味・好み */}
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-semibold mb-2 text-teal-500">🔹 趣味・好み</h2>
                                    <ul className="list-disc list-inside pl-2 sm:pl-4">
                                        <li><strong>趣味:</strong> タスク管理、ゲーム、読書、散歩、手作りアクセサリー作り</li>
                                        <li><strong>好きな食べ物:</strong> フルーツタルト、抹茶アイス、パンケーキ</li>
                                        <li><strong>好きな色:</strong> オレンジピンク</li>
                                    </ul>
                                </div>

                                {/* 制作クレジット */}
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-semibold mb-2 text-teal-500">🔹 制作クレジット</h2>
                                    <ul className="list-none pl-2 sm:pl-4 space-y-1">
                                        <li>
                                            <strong>キャラクターボイス:</strong> 森宮 千乃
                                        </li>
                                        <li>
                                            <strong>キャラクターデザイン:</strong>
                                            <a
                                                href="https://x.com/kuga_i_"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-teal-400 hover:text-teal-500 underline"
                                            > くが様</a>
                                        </li>
                                        <li>
                                            <strong>モデリング:</strong>
                                            <a
                                                href="https://x.com/TAMA091900"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-teal-400 hover:text-teal-500 underline"
                                            > たまねこ様</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>


                        <section className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-3xl font-bold text-center mb-6">LINE通知について</h2>
                            <div className="flex justify-center w-full">
                                <Image
                                    src="/images/311rhang.png"
                                    alt="サンプル画像"
                                    width={300}
                                    height={600}
                                />
                            </div>
                            <p>上記のQRコードから公式アカウントを追加し、アプリのLINE連携を行うことでリマインダー通知が直接あなたのLINEに届きます。これにより、大切な予定やタスクを見逃す心配がなく、スケジュール管理がよりスマートに！</p>
                        </section>

                        <section className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">PWAのインストール方法</h2>
                            <p className="text-gray-700 text-base">
                                当アプリはプログレッシブ・ウェブ・アプリ（PWA）としてもご利用いただけます。対応ブラウザ（Google Chrome、Microsoft Edge、Safariなど）を使用している場合、以下の手順でアプリをインストールすることができます。
                            </p>
                            <ul className="list-disc list-inside mt-4 text-gray-700 text-base">
                                <li>
                                    ブラウザのアドレスバー近くにある<strong className="font-bold">「インストール」</strong>または<strong className="font-bold">「ホーム画面に追加」</strong>のアイコンをタップします。
                                </li>
                                <li>
                                    表示されるダイアログで<strong className="font-bold">「追加」</strong>または<strong className="font-bold">「インストール」</strong>を選択します。
                                </li>
                                <li>
                                    インストール完了後、ホーム画面にアプリのアイコンが追加され、ネイティブアプリのように全画面表示でご利用いただけます。
                                </li>
                            </ul>
                            <p className="mt-4 text-gray-700 text-base">
                                ※ ブラウザやデバイスによっては、手順やボタンの名称が異なる場合がありますので、各ブラウザのヘルプをご参照ください。
                            </p>
                        </section>



                        {/* ホーム画面セクション */}
                        <section className="bg-white p-6 rounded-lg shadow">
                            <h1 className="text-3xl font-bold text-center mb-6">ホーム画面</h1>
                            <div className="flex justify-center mb-8">
                                <Image
                                    src="/images/スクリーンショット 2025-02-10 001447.png"
                                    alt="サンプル画像"
                                    width={300}
                                    height={600}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                            <div className="space-y-4">
                                {/* リロード */}
                                <div className="group flex flex-col  sm:flex-wrap items-center space-x-6 p-3 rounded-lg transition duration-300">
                                    <div className="flex flex-col items-center w-[100px]">
                                        <span className="material-icons text-4xl text-blue-500">
                                            cached
                                        </span>
                                        <p className="mt-2 font-bold whitespace-nowrap">リロード</p>
                                    </div>
                                    <p className="text-gray-700">
                                        画面を再読み込みします。<strong className="font-bold">モデルの不具合</strong>やリップシンクの調子が悪い場合に使用してください。
                                    </p>
                                </div>
                                {/* タスク管理 */}
                                <div className="group flex flex-col sm:flex-wrap items-center space-x-6 p-3 rounded-lg  transition duration-300">
                                    <div className="flex flex-col items-center w-[100px]">
                                        <span className="material-icons text-4xl text-[#008080]">
                                            task
                                        </span>
                                        <p className="mt-2 font-bold text-[#008080] whitespace-nowrap">タスク管理</p>
                                    </div>
                                    <p className="text-gray-700">
                                        タスク管理画面へ<span className="font-bold">遷移</span>します。
                                    </p>
                                </div>
                                {/* チャット */}
                                <div className="group flex flex-col sm:flex-wrap items-center space-x-6 p-3 rounded-lg  transition duration-300">
                                    <div className="flex flex-col items-center w-[100px]">
                                        <span className="material-icons text-4xl text-[#008080] whitespace-nowrap">
                                            chat
                                        </span>
                                        <p className="mt-2 font-bold text-[#008080] whitespace-nowrap">チャット</p>
                                    </div>
                                    <p className="text-gray-700">
                                        チャット画面へ<span className="font-bold">遷移</span>します。
                                    </p>
                                </div>
                                {/* 日記 */}
                                <div className="group flex flex-col sm:flex-wrap items-center space-x-6 p-3 rounded-lg  transition duration-300">
                                    <div className="flex flex-col items-center w-[100px]">
                                        <span className="material-icons text-4xl text-[#008080]">
                                            auto_stories
                                        </span>
                                        <p className="mt-2 font-bold text-[#008080] whitespace-nowrap">日記</p>
                                    </div>
                                    <p className="text-gray-700">
                                        日記機能へ<span className="font-bold">遷移</span>します。
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* タスク管理セクション */}
                        <section className="bg-white p-6 rounded-lg shadow">
                            <h1 className="text-3xl font-bold text-center mb-6 ">タスク管理</h1>
                            <div className="flex justify-center mb-8">
                                <Image
                                    src="/images/スクリーンショット 2025-02-10 001457.png"
                                    alt="サンプル画像"
                                    width={300}
                                    height={600}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                            <div className="space-y-4 text-gray-700 text-base">
                                <p>
                                    タスク管理機能は、ただタスクを管理するだけじゃなく、あなたの<span className="font-bold">頑張り</span>を毎回しっかりと見守り、
                                    完了したときに可愛いキャラクターが「<span className="font-bold">すごい！よくやったね！</span>」と熱烈に褒めてくれます！。
                                </p>
                                <p>
                                    <span className="font-bold">フィルタ・ソート：</span>上部のタブで「All / Incomplete / Completed」などでタスクを絞り込み、
                                    セレクトボックスで<span className="font-bold">作成日、期限、優先度</span>順に並び替えが可能です。
                                </p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-green-400 shadow">
                                        <span className="text-white text-xl font-bold">＋</span>
                                    </div>
                                    <p className="text-gray-700">
                                        タスクを<span className="font-bold">完了状態</span>にします。
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-green-500">
                                        <span className="material-icons" style={{ fontSize: "38px" }}>
                                            textsms
                                        </span>
                                    </div>
                                    <p className="text-gray-700">
                                        タスク完了状態なら<span className="font-bold">メッセージページ</span>に遷移します。
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <span
                                            className="material-icons text-[#008080]"
                                            style={{ fontSize: "38px" }}
                                        >
                                            note_add
                                        </span>
                                    </div>
                                    <p className="text-gray-700">
                                        新規作成のフォームを表示します。
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* チャットセクション */}
                        <section className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-3xl font-bold text-center mb-6 ">チャット</h2>
                            <div className="flex justify-center items-center mb-8">
                                <Image
                                    src="/images/スクリーンショット 2025-02-10 001509.png"
                                    alt="サンプル画像"
                                    width={300}
                                    height={600}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                            <div className="space-y-4 text-gray-700 text-base">
                                <p>
                                    チャット機能では、キャラクターと<span className="font-bold">リアルタイム</span>に会話することができます。タスクの休憩がてらお話を楽しみましょう！
                                </p>
                                <p>
                                    入力フォームからメッセージを送信すると、キャラクターがすぐに返答してくれます。
                                </p>
                                <p>
                                    また、キャラクターの返答はクリックで<span className="font-bold">音声再生</span>も可能。声に耳を傾けながら、ほっと一息つける時間をお楽しみいただけます！
                                </p>
                            </div>
                        </section>

                        {/* 日記セクション */}
                        <section className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-3xl font-bold text-center mb-6 ">日記</h2>
                            <div className="flex flex-col justify-center items-center mb-8">
                                <Image
                                    src="/images/スクリーンショット 2025-02-10 002103.png"
                                    alt="サンプル画像"
                                    width={300}
                                    height={600}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                            <div className="space-y-4 text-gray-700 text-base">
                                <p>
                                    日記機能は、絶対にリプライが来るSNSのような機能です。あなたの日々の思いを気軽に記録できます！
                                </p>
                                <p>
                                    日記は<span className="font-bold">非公開設定</span>と<span className="font-bold">公開設定</span>の両方があり、あなたの気持ちに合わせて使い分けることが可能です。
                                </p>
                                <p>
                                    投稿すると、必ずキャラクターから<span className="font-bold">温かいリプライ</span>が届き、あなたの毎日をそっと支えてくれます。
                                </p>
                            </div>
                        </section>


                    </div>

                </div>
            </div>
        </>
    );
}
