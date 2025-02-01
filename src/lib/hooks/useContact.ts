import { axiosInstance } from "../axiosInstance";
import { flashMessageState } from "@/lib/atom/flashMessageAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

export const useContact = () => {
  const [flashMessage, setFlashMessage] = useRecoilState(flashMessageState);
  const router = useRouter();

  const createContact = async (contactData: { name: string; email: string; message: string }) => {
    try {
      const response = await axiosInstance.post("/contact", contactData);

      setFlashMessage({ type: "success", message: "お問い合わせを送信しました！" });

        router.push("/");

      return response.data;
    } catch (error) {
      console.error("お問い合わせの送信に失敗しました:", error);

      setFlashMessage({ type: "error", message: "お問い合わせの送信に失敗しました。" });

      throw error;
    }
  };

  return { createContact };
};
