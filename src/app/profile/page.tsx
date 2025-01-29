'use client';
import { useAuth } from "@/lib/hooks/useAuth";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/atom/authAtom";
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import Link from "next/link";
import LineLinkButton from "@/components/LineLink";

export default function Profile() {
    const [auth] = useRecoilState(authState);
    const login = useRequireAuth();
    const { passwordReset } = useAuth();

    const handleClick = () => {
        if (auth.user) {
            passwordReset(auth.user.email);
        }
    };

    if (!auth.isAuthenticated) {
        return null;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen p-4 pointer-events-auto mt-[50px]">
            <Link href="/" className="absolute top-[80px] left-4 text-3xl text-[#008080]">
                <span className="material-icons" style={{ fontSize: '48px' }}>
                    reply
                </span>
            </Link>

            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-semibold text-center text-teal-600">プロフィール</h2>

                {auth.user ? (
                    <div className="space-y-4">
                        {/* アバター画像の表示 */}
                        <div className="flex justify-center mb-4 mt-4 w-32 h-32 rounded-full overflow-hidden mx-auto border-2 border-teal-500">
                            <img
                                src={auth.user.avatar_url || '/images/download20250101150055.png'}
                                alt="プロフィール画像"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <p className="text-lg font-medium text-gray-700">名前: {auth.user.name}</p>
                        {auth.user.email ? (
                            <>
                                <p className="text-lg font-medium text-gray-700">メールアドレス: {auth.user.email}</p>
                                <button
                                    onClick={handleClick}
                                    className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    パスワードリセット
                                </button>
                            </>
                        ) : (
                            <div></div>
                        )}
                        <div className="text-center">
                            <div className="flex justify-center">
                                <Link
                                    href="/profile/edit"
                                    className="inline-block w-full px-6 py-3 text-white bg-teal-600 rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
                                >
                                    プロフィールを更新
                                </Link>
                            </div>
                            <div className="pt-3">
                                {!auth.user.line_sub && <LineLinkButton />}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-600 text-center">ユーザー情報が見つかりません。</p>
                )}
            </div>
        </div>
    );
}
