import { generateText } from "ai";

export async function summarizeMessages(
  messages: any[],
  modelInstance: any,
  isSummaries: boolean
): Promise<string> {
  let conversationText = "";
  if (isSummaries) {
    conversationText = messages.map((m) => m.content).join("\n\n");
  } else {
    conversationText = messages
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");
  }

  let systemPrompt = "";
  let userPrompt = "";

  if (isSummaries) {
    systemPrompt = `You are a conversation summarizer. Consolidate the provided previous summaries of a conversation into a single, cohesive, consolidated list of bullet points.
Each bullet point must represent a unique topic or question the User previously raised.

Format each bullet point exactly like this:
- **[Topic/Keyword]**: User asked [very short summary of the user's question/topic].

Do NOT include any introductory or concluding text. Just output the consolidated bullet points directly.`;
    userPrompt = `Previous summaries:\n${conversationText}`;
  } else {
    systemPrompt = `You are a conversation summarizer. You will be given a sequence of messages between a User and an Assistant.
You MUST generate exactly one bullet point for each message in the sequence, maintaining the exact chronological order of the messages.
For example, if you are given 10 messages (consisting of 5 User messages and 5 Assistant responses), you MUST output exactly 10 bullet points in total (5 User bullet points and 5 Assistant bullet points, alternating).

Format each bullet point exactly like this:
- **[User/Assistant]**: [Concise summary of the message's content under 25 words]

Do NOT combine messages. Do NOT skip any message. Do NOT include any introductory or concluding text. Just output the bullet points directly.`;
    userPrompt = `Conversation exchanges:\n${conversationText}`;
  }

  const { text } = await generateText({
    model: modelInstance,
    system: systemPrompt,
    prompt: userPrompt,
  });

  return text;
}
