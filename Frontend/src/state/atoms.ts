import { atom } from "recoil";
import { QuerySelector } from "./seclectors";

interface Query {
  UserInput: string;
  AIData: string;
}

export const loadingState = atom({
  key: "loadingState",
  default: 0,
});
export const queryState = atom<Query[]>({
  key: "queryState",
  default: QuerySelector,
});

export const inputState = atom<string>({
  key: "inputState",
  default: "",
});
