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
            await axiosInstance.post("/auth/password", {
                email,
                redirect_url: process.env.NEXT_PUBLIC_REDIRECT_URL
            });
            setSuccess("パスワードリセットメールが送信されました。メールを確認してください。");
        } catch (e) {
            setError("パスワードリセットのリクエストに失敗しました。");
        } finally {
            setLoading(false);
        }
    };

    // パスワードリセット確認
    const resetPasswordConfirm = async (
        password: string,
        password_confirmation: string,
        reset_password_token: string
    ) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axiosInstance.put("/auth/password", {
                password,
                password_confirmation,
                reset_password_token
            });

            if (response.status === 200) {
                setSuccess("パスワードが正常にリセットされました。新しいパスワードでログインしてください。");
            } else {
                setError("パスワードリセットに失敗しました。");
            }
        } catch (error) {
            setError(
                error.response?.data?.errors?.[0] ||
                "パスワードリセットに失敗しました。"
            );
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
                Cookies.set("access-token", accessToken, { expires: 7 });
                Cookies.set("client", client, { expires: 7 });
                Cookies.set("uid", userUid, { expires: 7 });
                setAuth({ isAuthenticated: true, user: response.data.user });
                setSuccess("Googleログインに成功しました！");
                setError(null);
            } else {
                setError("トークン情報が取得できませんでした");
            }
        } catch (err) {
            setError("Googleログインに失敗しました");
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
                Cookies.set("access-token", accessToken, { expires: 7 });
                Cookies.set("client", client, { expires: 7 });
                Cookies.set("uid", userUid, { expires: 7 });
                setAuth({ isAuthenticated: true, user: response.data.user });
                setSuccess("Lineログインに成功しました！");
                setError(null);
            } else {
                setError("トークン情報が取得できませんでした");
            }
        } catch (err) {
            setError("Lineログインに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    const lineLink = async (lineSub) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/line_link", {
                line_sub: lineSub,
              }, {
                headers: {
                  "access-token": Cookies.get("access-token"),
                  client: Cookies.get("client"),
                  uid: Cookies.get("uid"),
                },
              });
            if (response.status === 200) {
                setSuccess("LINEアカウントの連携に成功しました！");
                setAuth((prevState) => ({
                    ...prevState,
                    user: {
                        ...prevState.user,
                        line_sub: lineSub,
                    },
                }));
            } else {
                setError("LINEアカウントの連携に失敗しました。");
            }
        } catch (err) {
            setError(err.response?.data?.errors?.[0] || "LINEアカウントの連携中にエラーが発生しました。");
        } finally {
            setLoading(false);
        }
    }

    const updateProfile = async (name: string, avatar?: File) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
    
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");
    
        if (!accessToken || !client || !uid) {
            setError("ログイン情報が不足しています。");
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
                setSuccess("プロフィールが更新されました！");
            } else {
                setError("プロフィールの更新に失敗しました。");
            }
        } catch (err: any) {
            setError(err.response?.data?.errors?.[0] || "プロフィール更新中にエラーが発生しました。");
        } finally {
            setLoading(false);
        }
    };

    return { success, error, loading, signUp, signIn, logout, checkAuthStatus, passwordReset, resetPasswordConfirm, loginWithGoogle, loginWithLine,lineLink,updateProfile };
};