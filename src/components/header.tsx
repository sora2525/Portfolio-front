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
                    <div className="user-info">
                        <p className="text-white font-bold">{auth.user.name}</p>
                    </div>
                    <div>
                        <button onClick={handleLogout} className="text-white font-bold">ログアウト</button>
                    </div>
                </>
            ) : (
                <Link href="/sign_in" className="text-white font-bold ml-6">ログイン</Link>
            )}
        </div>
    );
}
