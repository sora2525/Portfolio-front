import { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atom/authAtom";
import { axiosInstance } from "../axiosInstance";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setAuth] = useRecoilState(authState);
    const router = useRouter();

    // 新規登録
    const signUp = async (name: string, email: string, password: string, passwordConfirmation: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });

            const { "access-token": accessToken, client, uid } = response.headers;
            if (accessToken && client && uid) {
                Cookies.set("access-token", accessToken, { expires: 7 });
                Cookies.set("client", client, { expires: 7 });
                Cookies.set("uid", uid, { expires: 7 });
                setAuth({ isAuthenticated: true, user: response.data.data });
                setSuccess("ユーザー登録に成功しました！");
                setError(null);
                router.push("/");
            } else {
                setError("トークン情報が取得できませんでした");
            }

        } catch (err) {
            setError("登録に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    // ログイン
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/sign_in", { email, password });
            const { "access-token": accessToken, client, uid } = response.headers;
            if (accessToken && client && uid) {
                Cookies.set("access-token", accessToken, { expires: 7 });
                Cookies.set("client", client, { expires: 7 });
                Cookies.set("uid", uid, { expires: 7 });
                setAuth({ isAuthenticated: true, user: response.data.data });
                setSuccess("ログインに成功しました！");
                setError(null);
                router.push("/");
            } else {
                setError("トークン情報が取得できませんでした");
            }
        } catch {
            setError("ログインに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    // ログアウト
    const logout = async () => {
        setLoading(true);
        try {
            const accessToken = Cookies.get("access-token");
            const client = Cookies.get("client");
            const uid = Cookies.get("uid");

            if (accessToken && client && uid) {
                await axiosInstance.delete("/auth/sign_out", {
                    headers: { "access-token": accessToken, client, uid }
                });
            }

            Cookies.remove("access-token");
            Cookies.remove("client");
            Cookies.remove("uid");
            setAuth({ isAuthenticated: false, user: null });
            setSuccess("ログアウトしました");
            setError(null);
        } catch {
            setError("ログアウトに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    // ログイン状態の確認
    const checkAuthStatus = async () => {
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        if (accessToken && client && uid) {
            try {
                const response = await axiosInstance.get("/auth/validate_token", {
                    headers: { "access-token": accessToken, client, uid }
                });
                if (response.status === 200) {
                    setAuth({ isAuthenticated: true, user: response.data.data });
                }
            } catch {
                setAuth({ isAuthenticated: false, user: null });
            }
        }
    };

    // パスワードリセット
    const passwordReset = async (email: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axiosInstance.post("/auth/password", { email });
            setSuccess("パスワードリセットメールが送信されました。メールを確認してください。");
        } catch (e) {
            setError("パスワードリセットのリクエストに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    // パスワードリセット確認
    const resetPasswordConfirm = async (
        password: string,
        password_confirmation: string,
        reset_password_token: string,
        accessToken: string,
        client: string,
        uid: string
    ) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axiosInstance.put("/auth/password", {
                password,
                password_confirmation,
                reset_password_token
            }, {
                headers: {
                    "access-token": accessToken,
                    client: client,
                    uid: uid,
                },
            });

            if (response.status === 200) {
                setSuccess("パスワードが正常にリセットされました。新しいパスワードでログインしてください。");
                setError(null);
            } else {
                setError("パスワードリセットに失敗しました。");
            }
        } catch {
            setError("パスワードリセットに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return { success, error, loading, signUp, signIn, logout, checkAuthStatus, passwordReset, resetPasswordConfirm };
};