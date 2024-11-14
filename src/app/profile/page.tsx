'use client';
import { useAuth } from "@/lib/hooks/useAuth";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/atom/authAtom";

export default function Profile() {
    const [auth, ] = useRecoilState(authState);
    const { passwordReset } = useAuth();

    const handleClick = () => {
        if (auth.user) {
            passwordReset(auth.user.email);
        }
    };

    return (
        <div className="pointer-events-auto">
            {auth.user ? (
                <>
                    <p>{auth.user.name}</p>
                    <p>{auth.user.email}</p>
                </>
            ) : (
                <p>ユーザー情報が見つかりません。</p>
            )}
            <div>
                <button onClick={handleClick}>パスワードリセット</button>
            </div>
        </div>
    );
}