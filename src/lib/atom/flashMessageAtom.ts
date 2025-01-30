import { atom } from "recoil";

export const flashMessageState = atom<{
  message: string | null;
  type: "success" | "error" | null;
}>({
  key: "flashMessageState",
  default: { message: null, type: null },
});
