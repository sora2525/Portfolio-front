import { useAuth } from "@/lib/hooks/useAuth";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/atom/authAtom";
import Link from "next/link";

export default function PageHeader() {
    const { logout } = useAuth();
    const [auth, setAuth] = useRecoilState(authState);

    const handleLogout = () => {
        logout();
        setAuth({ isAuthenticated: false, user: null });
    };

    return (
        <div className="bg-pink-400 flex h-[70px] items-center pointer-events-auto">
            {auth.isAuthenticated && auth.user ? (
                <>
                    <div className="flex justify-between items-center w-full px-4">
                        <div className="user-info">
                            <Link href="/" className="text-white font-bold ml-6">{auth.user.name}</Link>
                        </div>
                        <div className="">
                            <button onClick={handleLogout} className="text-white font-bold">ログアウト</button>
                            <Link href="/profile" className="text-white font-bold ml-6">プロフィール</Link>
                        </div>
                    </div>

                </>
            ) : (
                <Link href="/sign_in" className="text-white font-bold ml-6">ログイン</Link>

            )}
        </div>
    );
}
