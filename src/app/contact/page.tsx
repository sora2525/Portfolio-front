"use client";
import { useState } from "react";
import { useContact } from "@/lib/hooks/useContact";
import Link from "next/link";

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
            await createContact(formData);
            setStatus("お問い合わせを送信しました！");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("送信に失敗しました。");
        }
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center relative">
            <div className="w-full max-w-[1000px] h-full flex flex-col justify-center items-center relative">
                <div className="absolute top-4 left-4">
                    <Link
                        href="/about"
                        className="w-14 h-14 flex items-center justify-center rounded-full 
                   bg-white/80 shadow-md text-[#008080] hover:bg-white hover:shadow-lg 
                   transition-all duration-300 pointer-events-auto mt-[80px]"
                    >
                        <span className="material-icons leading-none" style={{ fontSize: "38px" }}>reply</span>
                    </Link>
                </div>

                {/* お問い合わせフォーム */}
                <div className="pointer-events-auto flex flex-col items-center justify-center w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">お問い合わせ</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        {/* 名前 */}
                        <input
                            type="text"
                            name="name"
                            placeholder="お名前"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />

                        {/* メールアドレス */}
                        <input
                            type="email"
                            name="email"
                            placeholder="メールアドレス"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />

                        {/* お問い合わせ内容 */}
                        <textarea
                            name="message"
                            placeholder="お問い合わせ内容"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />

                        {/* 送信ボタン */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            送信
                        </button>
                    </form>

                    {/* ステータスメッセージ */}
                    <p
                        className={`text-center mt-4 font-medium ${status.includes("失敗") ? "text-red-500" : "text-green-500"
                            }`}
                    >
                        {status}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default ContactForm;
