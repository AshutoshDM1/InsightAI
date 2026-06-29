import { generateText } from "ai";

export async function summarizeMessages(messages: any[], modelInstance: any): Promise<string> {
  const conversationText = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const prompt = `You are a conversation summarizer. Summarize the following part of the conversation under 500 words. Keep all essential details, decisions, facts, and context. Do not include introductory text like "Here is a summary". Just output the summary directly.\n\nConversation:\n${conversationText}`;

  const { text } = await generateText({
    model: modelInstance,
    prompt: prompt,
  });

  return text;
}
