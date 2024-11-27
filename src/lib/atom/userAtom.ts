import { atom } from "recoil";

export const useerState = atom({
    key: "userState",
    default: {
        id: null,
        name: null,
    } as { id: number | null; name: string | null }

})