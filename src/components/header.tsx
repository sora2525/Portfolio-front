import { useAuth } from "@/lib/hooks/useAuth";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/atom/authAtom";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; 

export default function PageHeader() {
    const { logout } = useAuth();
    const [auth, setAuth] = useRecoilState(authState);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
    
            await signOut({ redirect: false });
    
            setAuth({ isAuthenticated: false, user: null });
    
            router.push("/")
        } catch (err) {
            console.error("ログアウト中にエラーが発生しました:", err);
        }
    };

    return (
        <div className="bg-pink-400 flex h-[50px] items-center pointer-events-auto justify-between px-4">
            <div className="flex-shrink-0 whitespace-nowrap">
                <Link href="/" className="text-white font-bold lg:ml-6 whitespace-nowrap">
                    タスクエール
                </Link>
            </div>
            {auth.isAuthenticated && auth.user ? (
                <div className="flex justify-end items-center">
                    <Link href="/profile" className="text-white font-bold lg:ml-6 whitespace-nowrap mr-3">
                     プロフィール
                    </Link>
                    <button onClick={handleLogout} className="text-white font-bold flex">
                        <span className="material-icons">
                            logout
                        </span>
                        <p>ログアウト</p>
                    </button>
                </div>
            ) : (
                <div className="flex w-full justify-end ">
                    <Link href="/sign_in" className="text-white font-bold flex items-center">
                        <span className="material-icons">login</span>
                        <p className="ml-2">ログイン</p>
                    </Link>
                    <Link href="/sign_up" className="text-white font-bold ml-2 lg:ml-6">サインアップ</Link>
                </div>
            )}
        </div>
    );
}
