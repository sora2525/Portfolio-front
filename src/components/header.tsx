"use client"
import { useAuth } from "@/lib/hooks/useAuth";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/atom/authAtom";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
                <Link href="/" className="flex justify-center items-center font-caveat text-white font-bold lg:ml-6 whitespace-nowrap">
                    <p>t a s k   y e l l </p>
                    <Image
                        src="/images/Y33KZGG1dDcUVJT1738491973_1738492001.png" 
                        alt="サンプル画像"
                        width={35}              
                        height={30}             
                    />
                </Link>
            </div>
            {auth.isAuthenticated && auth.user ? (
                <div className="flex justify-end items-center">
                    <Link href="/profile" className="text-white font-bold flex mr-6">
                        <span className="material-icons" style={{ fontSize: "36px" }}>
                            person
                        </span>
                    </Link>
                    <button onClick={handleLogout} className="text-white font-bold flex">
                        <span className="material-icons" style={{ fontSize: "36px" }}>
                            logout
                        </span>
                    </button>
                </div>
            ) : (
                <div className="flex w-full justify-end ">
                    <Link href="/sign_in" className="text-white font-bold flex items-center">
                        <span className="material-icons" style={{ fontSize: "36px" }}>login</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
