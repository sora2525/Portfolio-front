import { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atom/authAtom";
import { axiosInstance } from "../axiosInstance";
import Cookies from "js-cookie";
import axios from "axios";

export const useAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setAuth] = useRecoilState(authState);

    //新規登録
    const signUp = async (name: string, email: string, password: string, passwordConfirmation: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth", {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            })

            console.log(response);

            const { "access-token": accessToken, client, uid } = response.headers;
            if (accessToken && client && uid) {
                Cookies.set("access-token", accessToken, { expires: 7 });
                Cookies.set("client", client, { expires: 7 });
                Cookies.set("uid", uid, { expires: 7 });

                setAuth({ isAuthenticated: true, user: response.data.data });
                setSuccess("ユーザー登録に成功しました！");
                setError(null);
            } else {
                console.log("トークン情報なし");
            }

        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data?.errors?.[0] || "登録に失敗しました");
            } else {
                setError("登録に失敗しました")
            }
            setSuccess(null);
        } finally {
            setLoading(false)
        }
    }

    //ログイン
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/sign_in", {
                email,
                password
            });
            const { "access-token": accessToken, client, uid } = response.headers;
            if (accessToken && client && uid) {
                Cookies.set("access-token", accessToken, { expires: 7 });
                Cookies.set("client", client, { expires: 7 });
                Cookies.set("uid", uid, { expires: 7 });

                setAuth({ isAuthenticated: true, user: response.data.data });
                setSuccess("ログインに成功しました！");
                setError(null);
            } else {
                console.log("トークン情報なし");
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data?.errors?.[0] || "ログインに失敗しました");
            } else {
                setError("ログインに失敗しました");
            }
            setSuccess(null);
        } finally {
            setLoading(false)
        }
    }

    //ログアウト
    const logout = async () => {
    setLoading(true);
    try {
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        if (accessToken && client && uid) {
            await axiosInstance.delete("/auth/sign_out", {
                headers: {
                    "access-token": accessToken,
                    client: client,
                    uid: uid,
                },
            });
        }

        Cookies.remove("access-token");
        Cookies.remove("client");
        Cookies.remove("uid");
        setAuth({ isAuthenticated: false, user: null });
        setSuccess("ログアウトしました");
        setError(null);
    } catch (error) {
        setError("ログアウトに失敗しました");
    } finally {
        setLoading(false);
    }
};

    //ログイン状態の確認
    const checkAuthStatus = async () => {
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        if (accessToken && client && uid) {
            try {
                const response = await axiosInstance.get("/auth/validate_token", {
                    headers: {
                        "access-token": accessToken,
                        client: client,
                        uid: uid
                    }
                })
                if (response.status === 200) {
                    setAuth({ isAuthenticated: true, user: response.data.data });
                }
            } catch (e) {
                setAuth({ isAuthenticated: false, user: null });
            }
        }
    }

    return { success, error, loading, signUp, signIn, logout,checkAuthStatus }
}