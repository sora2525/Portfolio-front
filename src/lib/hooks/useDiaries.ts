import { useState } from "react";
import { axiosInstance } from "../axiosInstance";

interface Diary {
    id: number;
    title: string;
    content: string;
    is_public: boolean;
    character_comment: string;
    images: string[]; 
    created_at: string;
    updated_at: string;
}

interface DiaryInput {
    title: string;
    content: string;
    is_public: boolean;
    character_comment: string;
    images: File[];
}

export function useDiaries() {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [error, setError] = useState<string | null>(null);

    // 全ての日記を取得
    const getDiaries = async (): Promise<Diary[]> => {
        setError(null);
        try {
            const response = await axiosInstance.get<Diary[]>("/diaries");
            console.log(response);
            
            setDiaries(response.data);
            return response.data;
        } catch (e: unknown) {
            console.error("Error fetching diaries:", e);
            setError("日記の取得に失敗しました");
            return [];
        }
    };

    const getPublicDiaries = async (): Promise<Diary[]> => {
        setError(null);
        try {
            const response = await axiosInstance.get<Diary[]>("/diaries/public_index");
            console.log(response);
            
            setDiaries(response.data);
            return response.data;
        } catch (e: unknown) {
            console.error("Error fetching diaries:", e);
            setError("日記の取得に失敗しました");
            return [];
        }
    };

    // 特定の日記を取得
    const getDiary = async (id: number): Promise<Diary | null> => {
        setError(null);
        try {
            const response = await axiosInstance.get<Diary>(`/diaries/${id}`);
            return response.data;
        } catch (e: unknown) {
            console.error(`Error fetching diary with id ${id}:`, e);
            setError("日記の取得に失敗しました");
            return null;
        }
    };

    // 新しい日記を作成
    const createDiary = async (diaryData: DiaryInput): Promise<Diary | null> => {
        setError(null);
        try {
            const formData = new FormData();
            formData.append('diary[title]', diaryData.title);
            formData.append('diary[content]', diaryData.content);
            formData.append('diary[is_public]', String(diaryData.is_public));
            formData.append('diary[character_comment]', diaryData.character_comment);
            diaryData.images.forEach(image => {
                formData.append('diary[images][]', image);
            });

            const response = await axiosInstance.post<Diary>("/diaries", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setDiaries(prev => [...prev, response.data]);
            return response.data;
        } catch (e: unknown) {
            console.error("Error creating diary:", e);
            setError("日記の作成に失敗しました");
            return null;
        }
    };

    // 日記を更新
    const updateDiary = async (id: number, updatedData: Partial<DiaryInput>): Promise<Diary | null> => {
        setError(null);
        try {
            const response = await axiosInstance.put<Diary>(`/diaries/${id}`, { diary: updatedData });
            setDiaries(prev => prev.map(diary => diary.id === id ? response.data : diary));
            return response.data;
        } catch (e: unknown) {
            console.error(`Error updating diary with id ${id}:`, e);
            setError("日記の更新に失敗しました");
            return null;
        }
    };

    // 日記を削除
    const destroyDiary = async (id: number): Promise<void> => {
        setError(null);
        try {
            await axiosInstance.delete(`/diaries/${id}`);
            setDiaries(prev => prev.filter(diary => diary.id !== id));
        } catch (e: unknown) {
            console.error(`Error deleting diary with id ${id}:`, e);
            setError("日記の削除に失敗しました");
        }
    };

    return {
        diaries,
        error,
        getDiaries,
        getPublicDiaries,
        getDiary,
        createDiary,
        updateDiary,
        destroyDiary
    };
}
