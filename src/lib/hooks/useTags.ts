import { useState } from "react";
import { axiosInstance } from "../axiosInstance"

export function useTags() {
    const [tags, setTags] = useState([]);

    const getTags = async () => {
        try {
            const response = await axiosInstance.get("/tags");
            setTags(response.data)

            if (response.status === 201) {
                console.log("タグが作成されました:", response.data);
                return response.data;
            } else {
                console.error("タグの作成に失敗しました:", response.statusText);
                return null;
            }
        } catch (e: unknown) {
            console.error("タグの作成中にエラーが発生しました:");
            return null;
        }
    }

    const createTag = async (name: string, color: string) => {
        try {
            const response = await axiosInstance.post("/tags", {
                tags: { name, color },
            });

            if (response.status === 201) {
                console.log("タグが作成されました:", response.data);
                return response.data;
            } else {
                console.error("タグの作成に失敗しました:", response.statusText);
                return null;
            }
        } catch (error) {
            console.error("タグの作成中にエラーが発生しました:", error);
            return null;
        }
    };

    const deleteTag = async (id: number) => {
        try{
            await axiosInstance.delete(`/tags/${id}`);
            setTags((prevTags) => prevTags.filter((tag) => tag.id !== id))
        }catch(e:unknown){
            console.error("タグの作成中にエラーが発生しました:");
            return null;
        }
    }

    return { createTag, getTags, deleteTag, tags }
}