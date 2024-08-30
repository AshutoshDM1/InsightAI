import { atom } from "recoil";
import { QuerySelector } from "./seclectors";

interface Query {
  uid : string;
  UserInput: string;
  AIData: string;
}

export const loadingState = atom<boolean> ({
  key: "loadingState",
  default: true,
});
export const queryState = atom<Query[]>({
  key: "queryState",
  default: QuerySelector,
});

export const inputState = atom<string>({
  key: "inputState",
  default: "",
});
