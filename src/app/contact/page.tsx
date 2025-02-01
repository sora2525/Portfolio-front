"use client"
import { useState } from "react";
import { useContact } from "@/lib/hooks/useContact";

const ContactForm = () => {
  const { createContact } = useContact();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("送信中...");

    try {
      await createContact(formData); // ❶ APIを呼び出す
      setStatus("お問い合わせを送信しました！");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("送信に失敗しました。");
    }
  };

  return (
    <div className="pointer-events-auto flex flex-col justify-center items-center mt-[100px]">
      <h2>お問い合わせ</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="お名前" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="メールアドレス" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="お問い合わせ内容" value={formData.message} onChange={handleChange} required />
        <button type="submit">送信</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default ContactForm;
