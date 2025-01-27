"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/atom/authAtom";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function ProfileEdit() {
    const [auth] = useRecoilState(authState);
    const { updateProfile, success, error, loading } = useAuth();
    const router = useRouter(); 

    const [name, setName] = useState(auth.user?.name || "");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(auth.user?.avatar_url || null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (auth.user) {
            setName(auth.user.name || "");
            setAvatarPreview(auth.user.avatar_url || null);
        }
    }, [auth.user]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await updateProfile(name, avatar || undefined);
            router.push("/profile");
        }catch(err){
            console.error("プロフィールの更新中にエラーが発生しました:", err);
        }
    };

    if (!auth.user) {
        return <p>ユーザー情報を読み込んでいます...</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen pointer-events-auto">
            <Link href="/profile" className="absolute top-[80px] left-4 text-3xl text-[#008080]">
                <span className="material-icons" style={{ fontSize: '48px' }}>
                    reply
                </span>
            </Link>

            <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-md">
                <h1 className="text-2xl font-bold text-teal-600 text-center mb-6">プロフィール編集</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            名前
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-1 py-3 rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="名前を入力してください"
                        />
                    </div>

                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                            アバター画像
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 file:text-teal-600 hover:file:bg-teal-50"
                        />
                        {avatarPreview && (
                            <div className="mt-4 w-32 h-32 rounded-full overflow-hidden mx-auto border-2 border-teal-500">
                                <img
                                    src={avatarPreview}
                                    alt="アバタープレビュー"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 text-white font-medium rounded-md shadow focus:outline-none ${loading
                                ? "bg-teal-300 cursor-not-allowed"
                                : "bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500"
                            }`}
                    >
                        {loading ? "更新中..." : "更新する"}
                    </button>
                </form>

                {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
                {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            </div>
        </div>
    );
}
