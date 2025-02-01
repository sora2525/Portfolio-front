import { axiosInstance } from "../axiosInstance";

export const useContact = () => {
  const createContact = async (contactData: { name: string; email: string; message: string }) => {
    try {
      const response = await axiosInstance.post("/contact", contactData); 
      return response.data;
    } catch (error) {
      console.error("お問い合わせの送信に失敗しました:", error);
      throw error;
    }
  };

  return { createContact };
};
