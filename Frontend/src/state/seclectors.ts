import { selector } from "recoil";

interface Query {
  uid: string;
  UserInput: string;
  AIData: string;
}

export const QuerySelector = selector({
  key: "QuerySelector",
  get: async () => {
    const data: Query[] = [
      {
        uid: "123123123123",
        UserInput: "Hi how are you  ",
        AIData: "Hello , I am InsightAI you can Ask Me anything ! ",
      },
      
    ];
    return data;
  },
});
