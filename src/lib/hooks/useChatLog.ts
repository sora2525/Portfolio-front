import { axiosInstance } from "../axiosInstance";
import { useEffect, useState } from "react";

export type ChatMessage = {
  id: number;
  message_type: "user" | "character";
  message: string;
  created_at: string;
};

export const useChatLog = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * チャット履歴を取得する関数
   */
  const getChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<ChatMessage[]>("/chats"); // 型を明示
      setChats(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Failed to fetch chats:", err);
        setError(err.message || "チャット履歴の取得に失敗しました");
      } else {
        setError("未知のエラーが発生しました");
      }
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
    setError(null);
    try {
      const response = await axiosInstance.post<ChatMessage>("/chats", {
        chat: {
          message,
          message_type: messageType,
        },
      });
      // 新しいチャットを追加
      setChats((prevChats) => [...prevChats, response.data]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Failed to send message:", err);
        setError(err.message || "メッセージの送信に失敗しました");
      } else {
        setError("未知のエラーが発生しました");
      }
    }
  };

  const clearChats = async () => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete("/chats"); // チャットを削除するAPIを呼び出し
      setChats([]); // 状態のチャット履歴を空にする
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Failed to clear chats:", err);
        setError(err.message || "チャット履歴の削除に失敗しました");
      } else {
        setError("未知のエラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * 初回レンダリング時にチャット履歴を取得
   */
  useEffect(() => {
    getChats();
  }, []);

  return { getChats, createChat, clearChats, chats, loading, error };
};
