import { useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { useRecoilState } from "recoil";
import { flashMessageState } from "@/lib/atom/flashMessageAtom";

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
    const [flashMessage, setFlashMessage] = useRecoilState(flashMessageState);

    const extractErrorMessage = (e: unknown): string => {
        if (e instanceof Error) {
            return e.message || "エラーが発生しました";
        }
        return "エラーが発生しました";
    };

    // 全ての日記を取得
    const getDiaries = async (): Promise<Diary[]> => {
        try {
            const response = await axiosInstance.get<Diary[]>("/diaries");
            setDiaries(response.data);
            return response.data;
        } catch (e) {
            setFlashMessage({
                message: extractErrorMessage(e),
                type: "error"
            });
            return [];
        }
    };

    // 公開されている日記を取得
    const getPublicDiaries = async (): Promise<Diary[]> => {
        try {
            const response = await axiosInstance.get<Diary[]>("/diaries/public_index");
            setDiaries(response.data);
            return response.data;
        } catch (e) {
            setFlashMessage({
                message: extractErrorMessage(e),
                type: "error"
            });
            return [];
        }
    };

    // 特定の日記を取得
    const getDiary = async (id: number): Promise<Diary | null> => {
        try {
            const response = await axiosInstance.get<Diary>(`/diaries/${id}`);
            return response.data;
        } catch (e) {
            setFlashMessage({
                message: `日記の取得に失敗しました (ID: ${id})`,
                type: "error"
            });
            return null;
        }
    };

    // 新しい日記を作成
    const createDiary = async (diaryData: DiaryInput): Promise<Diary | null> => {
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

            setFlashMessage({
                message: "日記を作成しました",
                type: "success"
            });

            return response.data;
        } catch (e) {
            setFlashMessage({
                message: extractErrorMessage(e),
                type: "error"
            });
            return null;
        }
    };

    // 日記を更新
    const updateDiary = async (id: number, updatedData: Partial<DiaryInput>): Promise<Diary | null> => {
        try {
            let formData;
            if (updatedData.images) {
                formData = new FormData();
                if (updatedData.title) formData.append("diary[title]", updatedData.title);
                if (updatedData.content) formData.append("diary[content]", updatedData.content);
                if (updatedData.is_public !== undefined) formData.append("diary[is_public]", String(updatedData.is_public));
                if (updatedData.character_comment) formData.append("diary[character_comment]", updatedData.character_comment);
                updatedData.images.forEach(image => {
                    formData.append('diary[images][]', image);
                });
            }

            const response = await axiosInstance.put<Diary>(
                `/diaries/${id}`, 
                formData || { diary: updatedData },
                formData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
            );

            setDiaries(prev => prev.map(diary => diary.id === id ? response.data : diary));

            setFlashMessage({
                message: "日記を更新しました",
                type: "success"
            });

            return response.data;
        } catch (e) {
            setFlashMessage({
                message: `日記の更新に失敗しました (ID: ${id})`,
                type: "error"
            });
            return null;
        }
    };

    // 日記を削除
    const destroyDiary = async (id: number): Promise<void> => {
        try {
            await axiosInstance.delete(`/diaries/${id}`);
            setDiaries(prev => prev.filter(diary => diary.id !== id));

            setFlashMessage({
                message: "日記を削除しました",
                type: "success"
            });
        } catch (e) {
            setFlashMessage({
                message: `日記の削除に失敗しました (ID: ${id})`,
                type: "error"
            });
        }
    };

    return {
        diaries,
        getDiaries,
        getPublicDiaries,
        getDiary,
        createDiary,
        updateDiary,
        destroyDiary
    };
}
