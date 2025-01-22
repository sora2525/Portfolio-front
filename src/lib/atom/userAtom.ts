import { atom } from "recoil";

export const userState = atom({
    key: "userState",
    default: {
      id: null,
      name: null,
      avatarUrl: null,  // 新たに追加
    } as { id: number | null; name: string | null; avatarUrl: string | null }
  });
  