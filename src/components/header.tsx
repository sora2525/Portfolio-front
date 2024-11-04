import { useAuth } from "@/lib/hooks/useAuth";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/atom/authAtom";

export default function PageHeader() {
    const { logout } = useAuth();
    const [auth, setAuth] = useRecoilState(authState);

    const handleLogout = () => {
        logout();
        setAuth({ isAuthenticated: false, user: null });
    };

    if (!auth.isAuthenticated || !auth.user) {
        return <p>ログインしていません</p>;
    }

    return (
        <>
            <div>
                <button onClick={handleLogout} className="bg-gray-50">ログアウト</button>
            </div>

            <div className="user-info">
                <h2>ユーザー情報</h2>
                <p><strong>ID:</strong> {auth.user.id}</p>
                <p><strong>名前:</strong> {auth.user.name}</p>
                <p><strong>メール:</strong> {auth.user.email}</p>
            </div>
        </>
    );
}
