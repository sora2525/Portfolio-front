'use client';
import { useAuth } from "@/lib/hooks/useAuth";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/atom/authAtom";
import Link from "next/link";

export default function Profile() {
    const [auth, ] = useRecoilState(authState);
    const { passwordReset } = useAuth();

    const handleClick = () => {
        if (auth.user) {
            passwordReset(auth.user.email);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen p-6 pointer-events-auto">
            <Link href="/" className="absolute top-[80px] left-4 text-3xl text-[#008080]">
                <span className="material-icons" style={{ fontSize: '48px' }}>
                reply
                </span>
            </Link>

            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-semibold text-center text-teal-600">プロフィール</h2>

                {auth.user ? (
                    <div className="space-y-4">
                        <p className="text-lg font-medium text-gray-700">名前: {auth.user.name}</p>
                        <p className="text-lg font-medium text-gray-700">メールアドレス: {auth.user.email}</p>
                    </div>
                ) : (
                    <p className="text-red-600 text-center">ユーザー情報が見つかりません。</p>
                )}

                <div className="text-center">
                    <button
                        onClick={handleClick}
                        className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-6"
                    >
                        パスワードリセット
                    </button>
                </div>
            </div>
        </div>
    );
}
