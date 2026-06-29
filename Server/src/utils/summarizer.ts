import { generateText } from "ai";

export async function summarizeMessages(
  messages: any[],
  modelInstance: any,
  previousSummary?: string
): Promise<string> {
  const conversationText = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  let prompt = "";
  if (previousSummary) {
    prompt = `You are a conversation summarizer. We have a previous summary of the earlier part of the conversation:
"${previousSummary}"

Now, here are the new messages that have occurred since that summary:
${conversationText}

Combine the previous summary and the new part of the conversation into a single, cohesive, updated summary under 500 words. Keep all essential details, decisions, facts, and context. Do not include introductory text like "Here is a summary". Just output the combined summary directly.`;
  } else {
    prompt = `You are a conversation summarizer. Summarize the following part of the conversation under 500 words. Keep all essential details, decisions, facts, and context. Do not include introductory text like "Here is a summary". Just output the summary directly.\n\nConversation:\n${conversationText}`;
  }

  const { text } = await generateText({
    model: modelInstance,
    prompt: prompt,
  });

  return text;
}
