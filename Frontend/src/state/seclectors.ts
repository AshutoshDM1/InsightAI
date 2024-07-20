import { selector } from "recoil";

interface Query {
  uid : string;
  UserInput: string;
  AIData: string;
}

export const QuerySelector = selector({
  key: "QuerySelector",
  get: async () => {
    const data: Query[] = [
      {
        uid: "123123123123",
        UserInput: "Hi it me ",
        AIData: "Oh I am your name",
      },
    ];
    return data;
  },
});
