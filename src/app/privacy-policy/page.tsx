import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="pointer-events-auto max-w-[80%] max-h-[80%] mx-auto px-6 py-12 bg-white shadow-lg rounded-lg h-[80vh] overflow-y-auto mt-[100px]">
            <Link
                href="/about"
                className="absolute top-[80px] left-4 text-3xl text-[#008080] pointer-events-auto"
            >
                <span className="material-icons" style={{ fontSize: '48px' }}>
                    reply
                </span>
            </Link>
            <h1 className="text-3xl font-bold text-center mb-6">プライバシーポリシー</h1>
            <p className="text-gray-700 leading-relaxed mb-6">
                <span className="font-semibold">タスクエールでがんばるもん！</span>（以下，「本サービス」といいます。）は、本サービスにおけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
            </p>

            {/* 第1条 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第1条（個人情報）</h2>
                <p className="text-gray-700 leading-relaxed">
                    「個人情報」とは、個人情報保護法にいう「個人情報」を指し、生存する個人に関する情報であって、本サービスを通じて収集される
                    <span className="font-semibold"> メールアドレス、ユーザー名、タスク情報、IPアドレス </span>
                    等により特定の個人を識別できる情報をいいます。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第2条（個人情報の収集方法）</h2>
                <p className="text-gray-700 leading-relaxed">
                    本サービスは、ユーザーが利用登録をする際に
                    <span className="font-semibold"> メールアドレス、ユーザー名 </span>
                    を取得します。また、サービス利用時に、
                    <span className="font-semibold"> タスク情報（タスクのタイトル・優先度・期限）、キャラクターとのやり取りの履歴、IPアドレス等のログ情報 </span>
                    を収集することがあります。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    本サービスは、外部サービス（<span className="font-semibold"> Google認証、LINE認証、OpenAI API </span>）と連携する場合があり、連携に必要な情報を取得することがあります。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第3条（個人情報を収集・利用する目的）</h2>
                <p className="text-gray-700 leading-relaxed">本サービスが個人情報を収集・利用する目的は、以下のとおりです。</p>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                    <li>本サービス（タスク管理およびキャラクターによる応援機能）の提供・運営のため</li>
                    <li>ユーザーからのお問い合わせに対応するため（必要に応じて本人確認を行う場合があります）</li>
                    <li>ユーザーが利用中のサービスの新機能、アップデート情報、お知らせを通知するため</li>
                    <li>システムメンテナンス、重要なお知らせなどを通知するため</li>
                    <li>利用規約や法令に違反する行為があった場合の対応、不正利用の防止のため</li>
                    <li>ユーザーに自身の登録情報の閲覧・変更・削除を行っていただくため</li>
                    <li>キャラクターの応答を最適化し、ユーザー体験を向上させるため</li>
                    <li>上記の利用目的に付随する目的</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第4条（利用目的の変更）</h2>
                <p className="text-gray-700 leading-relaxed">
                    本サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更することがあります。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    利用目的の変更を行った場合には、変更後の目的について、本サービス内の通知または本サービスの公式ウェブサイト上で公表します。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第5条（個人情報の第三者提供）</h2>
                <p className="text-gray-700 leading-relaxed">
                    本サービスは、以下の場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令に基づく場合を除きます。
                </p>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                    <li>法令に基づく場合</li>
                    <li>人の生命、身体または財産の保護のために必要がある場合で、本人の同意を得ることが困難であるとき</li>
                    <li>サービス運営上、外部サービス（Google認証、OpenAI API、VOICEVOX等）との連携が必要な場合で、当該サービスの提供に必要な範囲で個人情報を提供する場合</li>
                    <li>ユーザーが同意した上で、提携サービスとデータを共有する場合</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第6条（個人情報の開示）</h2>
                <p className="text-gray-700 leading-relaxed">
                    本サービスは、ユーザー本人から自身の個人情報の開示を求められた場合、遅滞なくこれを開示します。ただし、以下のいずれかに該当する場合は、開示の全部または一部をお断りすることがあります。その場合は、理由を付して速やかに通知します。
                </p>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                    <li>本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合</li>
                    <li>本サービスの運営に著しい支障を及ぼすおそれがある場合</li>
                    <li>その他法令に違反することとなる場合</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-2">
                    なお、タスク履歴やキャラクターとのやり取り履歴など、個人情報に該当しない情報については、原則として開示いたしません。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第7条（個人情報の訂正および削除）</h2>
                <p className="text-gray-700 leading-relaxed">
                    ユーザーは、本サービスが保有する自身の個人情報が誤っている場合、本サービスが定める方法により、個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    本サービスは、ユーザーからの訂正等の請求を受け、その請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行います。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    また、訂正等を行った場合、または訂正等を行わない旨の決定をしたときは、速やかにユーザーに通知します。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第8条（個人情報の利用停止等）</h2>
                <p className="text-gray-700 leading-relaxed">
                    ユーザーは、自身の個人情報が利用目的の範囲を超えて取り扱われている、または不正な手段で取得されたと考える場合、本サービスに対し、個人情報の利用停止または削除（以下、「利用停止等」といいます。）を求めることができます。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    本サービスは、ユーザーから利用停止等の請求を受けた場合、遅滞なく必要な調査を行い、対応の必要性を判断します。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    その結果、請求に応じる必要があると判断した場合には、速やかに該当する個人情報の利用停止等を行います。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    また、利用停止等を行った場合、または利用停止等を行わない決定をした場合には、その旨をユーザーに通知します。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    ただし、利用停止等に過度な費用が発生する場合、または技術的に困難な場合には、ユーザーの権利利益を保護するための代替策を講じるものとします。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第9条（プライバシーポリシーの変更）</h2>
                <p className="text-gray-700 leading-relaxed">
                    本サービスは、法令その他本ポリシーに別段の定めがある場合を除き、ユーザーに通知することなく、本ポリシーの内容を変更することができます。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    ただし、重要な変更がある場合には、本サービス内の通知または公式ウェブサイトを通じて事前に告知します。
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    変更後のプライバシーポリシーは、本サービスの公式ウェブサイトに掲載された時点で効力を生じるものとします。
                </p>
            </section>

        </div>
    );
}
