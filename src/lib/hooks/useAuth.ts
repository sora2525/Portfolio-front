import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atom/authAtom";
import { axiosInstance } from "../axiosInstance";
import { useRouter } from "next/navigation";
import { flashMessageState } from "@/lib/atom/flashMessageAtom";

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [, setAuth] = useRecoilState(authState);
    const [flashMessage, setFlashMessage] = useRecoilState(flashMessageState);
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
                localStorage.setItem("access-token", accessToken);
                localStorage.setItem("client", client);
                localStorage.setItem("uid", uid);
                setAuth({ isAuthenticated: true, user: response.data.data });
                setFlashMessage({
                    message: "ユーザー登録に成功しました！",
                    type: "success"
                });
                router.push("/");
            } else {
                setFlashMessage({
                    message: "トークン情報が取得できませんでした",
                    type: "error"
                });
            }
        } catch (err) {
            setFlashMessage({
                message: "登録に失敗しました",
                type: "error"
            });
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
                localStorage.setItem("access-token", accessToken);
                localStorage.setItem("client", client);
                localStorage.setItem("uid", uid);
                setAuth({ isAuthenticated: true, user: response.data.data });
                setFlashMessage({
                    message: "ログインに成功しました！",
                    type: "success"
                });

                router.push("/");
                return;
            } else {
                setFlashMessage({
                    message: "トークン情報が取得できませんでした",
                    type: "error"
                });
            }
        } catch {
            setFlashMessage({
                message: "ログインに失敗しました",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    // ログアウト
    const logout = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem("access-token");
            const client = localStorage.getItem("client");
            const uid = localStorage.getItem("uid");

            if (accessToken && client && uid) {
                await axiosInstance.delete("/auth/sign_out", {
                    headers: { "access-token": accessToken, client, uid }
                });
            }

            localStorage.removeItem("access-token");
            localStorage.removeItem("client");
            localStorage.removeItem("uid");
            setAuth({ isAuthenticated: false, user: null });
            setFlashMessage({
                message: "ログアウトしました",
                type: "success"
            });
            router.push("/")
        } catch {
            setFlashMessage({
                message: "ログアウトに失敗しました",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    // ログイン状態の確認
    const checkAuthStatus = useCallback(async () => {
        const accessToken = localStorage.getItem("access-token");
        const client = localStorage.getItem("client");
        const uid = localStorage.getItem("uid");

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
    }, [setAuth]);

    // パスワードリセット
    const passwordReset = async (email: string) => {
        setLoading(true);

        try {
            await axiosInstance.post("/auth/password", {
                email,
                redirect_url: process.env.NEXT_PUBLIC_REDIRECT_URL
            });
            setFlashMessage({
                message: "パスワードリセットメールが送信されました。メールを確認してください。",
                type: "success"
            });
        } catch (e) {
            setFlashMessage({
                message: "パスワードリセットのリクエストに失敗しました。",
                type: "error"
            });
        } finally {
            setLoading(false);
            router.push("/")
        }
    };

    // パスワードリセット確認
    const resetPasswordConfirm = async (
        password: string,
        password_confirmation: string,
        reset_password_token: string
    ) => {
        setLoading(true);

        try {
            const response = await axiosInstance.put("/auth/password", {
                password,
                password_confirmation,
                reset_password_token
            });

            if (response.status === 200) {
                setFlashMessage({
                    message: "パスワードが正常にリセットされました。新しいパスワードでログインしてください。",
                    type: "success"
                });
                router.push("/");
            } else {
                setFlashMessage({
                    message: "パスワードリセットに失敗しました。",
                    type: "error"
                });
            }
        } catch (error) {
            setFlashMessage({
                message: error.response?.data?.errors?.[0] || "パスワードリセットに失敗しました。",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    // グーグルログイン
    const loginWithGoogle = async (uid: string, provider: string, email: string, name: string, image: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/google_login", {
                uid,
                provider,
                email,
                name,
                image,
            });

            const { "access-token": accessToken, client, uid: userUid } = response.headers;

            if (accessToken && client && userUid) {
                localStorage.setItem("access-token", accessToken);
                localStorage.setItem("client", client);
                localStorage.setItem("uid", uid);

                setAuth({ isAuthenticated: true, user: response.data.user });

                setFlashMessage({ message: "Googleログインに成功しました！", type: "success" });
            } else {
                setFlashMessage({
                    message: "トークン情報が取得できませんでした",
                    type: "error"
                });
            }

            router.push("/");
        } catch (err: any) {
            const errorMessage = err.response?.data?.errors?.[0] || "Googleログインに失敗しました";
            setFlashMessage({
                message: `ログインに失敗しました: ${errorMessage}`,
                type: "error",
            });

            router.push("/");
        } finally {
            setLoading(false);
        }
    };


    const loginWithLine = async (uid: string, provider: string, email: string, name: string, image: string, line_sub: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/line_login", {
                uid,
                provider,
                email,
                name,
                image,
                line_sub
            });

            const { "access-token": accessToken, client, uid: userUid } = response.headers;

            if (accessToken && client && userUid) {
                localStorage.setItem("access-token", accessToken);
                localStorage.setItem("client", client);
                localStorage.setItem("uid", uid);

                setAuth({ isAuthenticated: true, user: response.data.user });

                setFlashMessage({ message: "LINEログインに成功しました！", type: "success" });
            } else {
                setFlashMessage({
                    message: "トークン情報が取得できませんでした",
                    type: "error"
                });
            }
        } catch (err: any) {
            setFlashMessage({
                message: `LINEログインに失敗しました: ${err.response?.data?.errors?.[0] || "不明なエラー"}`,
                type: "error",
            });
        } finally {
            setLoading(false);
            router.push("/");
        }
    };


    const lineLink = async (lineSub: string) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem("access-token");
            const client = localStorage.getItem("client");
            const uid = localStorage.getItem("uid");

            if (!accessToken || !client || !uid) {
                setFlashMessage({
                    message: "ログイン情報が不足しています。",
                    type: "error"
                });
                setLoading(false);
                return;
            }

            const response = await axiosInstance.post(
                "/auth/line_link",
                { line_sub: lineSub },
                {
                    headers: {
                        "access-token": accessToken,
                        client: client,
                        uid: uid,
                    },
                }
            );

            if (response.status === 200) {
                setAuth((prevState) => ({
                    ...prevState,
                    user: {
                        ...prevState.user,
                        line_sub: lineSub,
                    },
                }));

                setFlashMessage({ message: "LINEアカウントの連携に成功しました！", type: "success" });

                router.push("/");
            } else {
                setFlashMessage({
                    message: "LINEアカウントの連携に失敗しました。",
                    type: "error"
                });
            }
        } catch (err: any) {
            setFlashMessage({
                message: `連携に失敗しました: ${err.response?.data?.errors?.[0] || "不明なエラー"}`,
                type: "error",
            });

            router.push("/");
        } finally {
            setLoading(false);
        }
    };


    const updateProfile = async (name: string, avatar?: File) => {
        setLoading(true);

        const accessToken = localStorage.getItem("access-token");
        const client = localStorage.getItem("client");
        const uid = localStorage.getItem("uid");

        if (!accessToken || !client || !uid) {
            setFlashMessage({
                message: "ログイン情報が不足しています。",
                type: "error"
            });
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("user[name]", name);
            if (avatar) {
                formData.append("user[avatar]", avatar);
            }

            const response = await axiosInstance.put("/auth/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "access-token": accessToken,
                    client: client,
                    uid: uid,
                },
            });

            if (response.status === 200) {
                setAuth((prevState) => ({
                    ...prevState,
                    user: response.data.user,
                }));
                setFlashMessage({
                    message: "プロフィールが更新されました！",
                    type: "success"
                });
            } else {
                setFlashMessage({
                    message: "プロフィールの更新に失敗しました。",
                    type: "error"
                });
            }
        } catch (err: any) {
            setFlashMessage({
                message: err.response?.data?.errors?.[0] || "プロフィール更新中にエラーが発生しました。",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };


    return { loading, signUp, signIn, logout, checkAuthStatus, passwordReset, resetPasswordConfirm, loginWithGoogle, loginWithLine, lineLink, updateProfile };
};