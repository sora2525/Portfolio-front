import Link from "next/link";
export default function TermsOfService() {
    return (

        <>
            <Link
                href="/about"
                className="absolute top-[80px] left-4 text-3xl text-[#008080] pointer-events-auto"
            >
                <span className="material-icons" style={{ fontSize: '48px' }}>
                    reply
                </span>
            </Link>
            <div className="pointer-events-auto max-w-3xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg h-[80vh] overflow-y-auto pr-2 border border-gray-300 mt-[100px]">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">利用規約</h1>
                <p className="text-gray-700 leading-relaxed mb-6">
                    この利用規約（以下，「本規約」といいます。）は、
                    <span className="font-semibold">タスクエールでがんばるもん！</span>（以下，「本サービス」といいます。）の利用条件を定めるものです。
                    本サービスをご利用になる全ての方（以下，「ユーザー」といいます。）には、本規約に従って本サービスをご利用いただきます。
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第1条（適用）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本規約は、ユーザーと本サービスとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスは、利用に関するルールやガイドライン（以下、「個別規定」といいます。）を定めることがあります。
                        これら個別規定は、その名称に関わらず本規約の一部を構成するものとします。
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-2">
                        本規約の内容と個別規定の内容が異なる場合、特別な定めがない限り、**個別規定の内容が優先される** ものとします。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第2条（利用登録）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本サービスを利用するためには、ユーザーは本規約に同意の上、
                        <span className="font-semibold"> 本サービスが定める方法 </span>
                        に従い、利用登録を行うものとします。利用登録が完了した時点で、ユーザーは本規約に同意したものとみなされます。
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスは、以下のいずれかに該当すると判断した場合、利用登録を拒否または制限することがあります。
                        また、その理由については開示義務を負いません。
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                        <li>利用登録の際に虚偽の情報を提供した場合</li>
                        <li>過去に本規約に違反したことがある場合</li>
                        <li>その他、本サービスが利用登録を適当でないと判断した場合</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第3条（ユーザーIDおよびパスワードの管理）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        ユーザーは、自己の責任において、本サービスの
                        <span className="font-semibold"> ユーザーIDおよびパスワード </span>
                        を適切に管理するものとします。
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡・貸与、または共用することはできません。
                        本サービスは、システムがユーザーIDとパスワードの組み合わせを認証した場合、
                        <span className="font-semibold"> 当該ユーザー自身による利用 </span>
                        とみなします。
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        ユーザーIDおよびパスワードが第三者によって不正に使用されたことにより生じた損害について、
                        <span className="font-semibold"> 本サービスに故意または重大な過失がある場合を除き、責任を負いません。 </span>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第4条（禁止事項）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                        <li>法令または公序良俗に違反する行為</li>
                        <li>犯罪行為に関連する行為</li>
                        <li>本サービスのコンテンツや、本サービスに含まれる著作権、商標権、その他の知的財産権を侵害する行為</li>
                        <li>本サービス、他のユーザー、または第三者のサーバーやネットワークの機能を破壊、妨害する行為</li>
                        <li>本サービスで得た情報を、許可なく商業的に利用する行為</li>
                        <li>本サービスの運営を妨害する、またはそのおそれのある行為</li>
                        <li>不正アクセスを試みる行為</li>
                        <li>他のユーザーに関する個人情報を収集または蓄積する行為</li>
                        <li>不正な目的で本サービスを利用する行為</li>
                        <li>他のユーザーまたは第三者に、不利益、損害、不快感を与える行為</li>
                        <li>他のユーザーになりすます行為</li>
                        <li>本サービスが許可していない広告、宣伝、勧誘、営業活動を行う行為</li>
                        <li>面識のない異性との出会いを目的とした行為</li>
                        <li>本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                        <li>その他、本サービスが不適切と判断する行為</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第5条（本サービスの提供の停止等）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本サービスは、以下のいずれかの事由があると判断した場合、ユーザーに事前の通知を行うことなく、
                        <span className="font-semibold"> 本サービスの全部または一部の提供を停止または中断 </span> することができます。
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                        <li>本サービスに関するシステムの保守、点検、または更新を行う場合</li>
                        <li>地震、落雷、火災、停電、その他の災害により、本サービスの提供が困難となった場合</li>
                        <li>コンピュータまたは通信回線等の障害により、本サービスの運用が停止した場合</li>
                        <li>その他、本サービスの提供が困難と判断した場合</li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスの提供の停止または中断により、ユーザーまたは第三者が被った不利益や損害について、
                        <span className="font-semibold"> 本サービスは一切の責任を負いません。 </span>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第6条（利用制限および登録抹消）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本サービスは、ユーザーが以下のいずれかに該当すると判断した場合、
                        <span className="font-semibold"> 事前の通知なく </span> ユーザーの本サービスの利用を制限、または登録を抹消することができます。
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                        <li>本規約のいずれかの条項に違反した場合</li>
                        <li>登録情報に虚偽の内容があることが判明した場合</li>
                        <li>本サービスからの連絡に対し、一定期間返答がない場合</li>
                        <li>本サービスの最終利用から長期間利用がない場合</li>
                        <li>その他、本サービスの利用が適当でないと判断した場合</li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスは、本条に基づく対応によりユーザーが被った損害について、
                        <span className="font-semibold"> 一切の責任を負いません。 </span>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第7条（退会）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        ユーザーは、
                        <span className="font-semibold"> 本サービスの指定する方法 </span>
                        により、いつでも本サービスを退会することができます。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第8条（保証の否認および免責事項）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本サービスは、事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを
                        <span className="font-semibold"> 明示的にも黙示的にも保証しません。 </span>
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスに起因してユーザーに発生した損害について、
                        <span className="font-semibold"> 本サービスの故意または重大な過失による場合を除き、一切の責任を負いません。 </span>
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        ただし、本サービスに関する契約が消費者契約法に定める消費者契約に該当する場合は、この免責規定の一部が適用されないことがあります。
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        前項ただし書の適用がある場合でも、本サービスは以下の責任を負いません。
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                        <li>本サービスの過失（重大な過失を除く）による債務不履行または不法行為に起因する、特別な事情から生じた損害（予見可能であった場合を含む）</li>
                        <li>本サービスの過失（重大な過失を除く）による損害賠償の範囲は、ユーザーが損害発生月に支払った利用料金（該当する場合）を上限とします。</li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスは、ユーザー間またはユーザーと第三者との間で発生した取引、連絡、紛争などに関して
                        <span className="font-semibold"> 一切の責任を負いません。 </span>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第9条（サービス内容の変更等）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本サービスは、<span className="font-semibold"> 事前に通知の上 </span>、本サービスの内容を変更、追加、または廃止することがあります。
                        ユーザーは、これに対し異議を述べないものとします。
                    </p>
                </section>


                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第10条（利用規約の変更）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本サービスは、以下のいずれかに該当する場合、
                        <span className="font-semibold"> ユーザーの個別の同意を得ることなく </span>
                        本規約を変更できるものとします。
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2 space-y-2">
                        <li>本規約の変更が、ユーザーの一般の利益に適合するとき</li>
                        <li>本規約の変更が、本サービス利用契約の目的に反せず、かつ変更の必要性や内容の相当性などを考慮して合理的であるとき</li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスは、本規約の変更にあたり、
                        <span className="font-semibold"> 事前に、変更の内容および効力発生時期を通知 </span> します。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第11条（個人情報の取扱い）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本サービスは、ユーザーの個人情報を
                        <span className="font-semibold"> 「プライバシーポリシー」 </span>
                        に基づき、適切に取り扱います。
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-2">
                        詳細は、
                        <a href="/privacy-policy" className="text-blue-500 underline hover:text-blue-700">
                            プライバシーポリシー
                        </a>
                        をご参照ください。
                    </p>
                </section>




                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第12条（通知または連絡）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        ユーザーと本サービスとの間の通知または連絡は、
                        <span className="font-semibold"> 本サービスが定める方法 </span>
                        により行うものとします。
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスは、ユーザーから
                        <span className="font-semibold"> 指定された連絡先 </span>
                        に通知を行うものとし、ユーザーが変更手続きを行わない限り、
                        <span className="font-semibold"> 現在登録されている連絡先が有効 </span>
                        であるものとみなします。
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスからの通知は、発信時にユーザーへ到達したものとみなします。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第13条（権利義務の譲渡の禁止）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        ユーザーは、
                        <span className="font-semibold"> 本サービスの事前の書面による承諾なく </span>
                        利用契約上の地位または本規約に基づく権利・義務を第三者に譲渡し、または担保に供することはできません。
                    </p>
                </section>


                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 border-b-2 pb-2 border-gray-300">第14条（準拠法・裁判管轄）</h2>
                    <p className="text-gray-700 leading-relaxed">
                        本規約の解釈には、
                        <span className="font-semibold"> 日本法 </span>
                        を準拠法とします。
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        本サービスに関連して紛争が生じた場合は、
                        <span className="font-semibold"> 本サービスの運営拠点所在地を管轄する裁判所 </span>
                        を専属的合意管轄とします。
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-6 text-right">以上</p>
                </section>



            </div>
        </>
    );
}
