import { Context } from "hono";
import { streamText } from "ai";
import { streamText as honoStreamText } from "hono/streaming";
import { getModelInstance } from "../utils/modelProvider";
import { summarizeMessages } from "../utils/summarizer";

const fetchAIdata = async (c: Context) => {
  try {
    const { input, messages, model } = await c.req.json();
    
    // Parse conversation history
    let processedMessages = messages;
    if (!processedMessages || !Array.isArray(processedMessages)) {
      if (!input) {
        return c.json({ error: "Input or messages list is required." }, 400);
      }
      processedMessages = [{ role: "user", content: input }];
    }

    // Resolve model key
    const selectedModel = model || "openai/gpt-5.4-mini";

    let modelInstance;
    try {
      modelInstance = getModelInstance(selectedModel, c.env);
    } catch (err: any) {
      return c.json({ error: err.message || "Model provider setup failed." }, 400);
    }

    // Generate dynamic summary if messages length exceeds 5
    let finalMessages = processedMessages;
    if (processedMessages.length > 5) {
      const messagesToSummarize = processedMessages.slice(0, processedMessages.length - 5);
      const recentMessages = processedMessages.slice(processedMessages.length - 5);

      try {
        const summary = await summarizeMessages(messagesToSummarize, modelInstance);
        finalMessages = [
          {
            role: "system",
            content: `This is a summary of the earlier part of the conversation:\n${summary}`
          },
          ...recentMessages
        ];
      } catch (err) {
        console.error("Failed to generate summary, falling back to full history:", err);
      }
    }

    const result = streamText({
      model: modelInstance,
      messages: finalMessages,
    });

    const origin = c.req.header("Origin");
    if (origin) {
      c.header("Access-Control-Allow-Origin", origin);
      c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      c.header("Access-Control-Allow-Credentials", "true");
    }

    c.header("Content-Type", "text/plain; charset=utf-8");
    c.header("Cache-Control", "no-cache");
    c.header("Connection", "keep-alive");
    c.header("Content-Encoding", "identity");

    return honoStreamText(c, async (stream) => {
      try {
        for await (const chunk of result.textStream) {
          await stream.write(chunk);
        }
      } catch (err) {
        console.error("Stream execution error:", err);
      }
    });
  } catch (error) {
    console.log("error -2 ", error);
    return c.json({ error: "An error occurred while fetching AI data." }, 500);
  }
};

export default fetchAIdata;
