import { selector } from "recoil";

interface Query {
  UserInput: string;
  AIData: string;
}

export const QuerySelector = selector({
  key: "QuerySelector",
  get: async () => {
    const data: Query[] = [
      {
        UserInput: "Hi it me ",
        AIData: "Oh I am your name",
      },
    ];
    return data;
  },
});
