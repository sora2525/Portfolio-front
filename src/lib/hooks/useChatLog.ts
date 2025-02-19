import { axiosInstance } from "../axiosInstance";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { flashMessageState } from "@/lib/atom/flashMessageAtom";

export type ChatMessage = {
  id: number;
  message_type: "user" | "character";
  message: string;
  created_at: string;
};

export const useChatLog = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [flashMessage, setFlashMessage] = useRecoilState(flashMessageState);

  // 共通のエラーメッセージ
  const extractErrorMessage = (err: unknown, defaultMessage: string): string => {
    if (err instanceof Error) {
      return err.message || defaultMessage;
    }
    return defaultMessage;
  };

  const getChats = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ChatMessage[]>("/chats");
      setChats(response.data);
    } catch (err: unknown) {
      setFlashMessage({
        message: extractErrorMessage(err, "チャット履歴の取得に失敗しました"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * 新しいチャットを作成する関数
   * @param message - メッセージ内容
   * @param messageType - メッセージの種類 ("user" | "character")
   */
  const createChat = async (message: string, messageType: "user" | "character") => {
    try {
      const response = await axiosInstance.post<ChatMessage>("/chats", {
        chat: {
          message,
          message_type: messageType,
        },
      });
      setChats((prevChats) => [...prevChats, response.data]);
    } catch (err: unknown) {
      setFlashMessage({
        message: extractErrorMessage(err, "メッセージの送信に失敗しました"),
        type: "error",
      });
    }
  };

  const clearChats = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete("/chats");
      setChats([]);
    } catch (err: unknown) {
      setFlashMessage({
        message: extractErrorMessage(err, "チャット履歴の削除に失敗しました"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // 初回レンダリング時
  useEffect(() => {
    getChats();
  }, []);

  return { getChats, createChat, clearChats, chats, loading };
};
