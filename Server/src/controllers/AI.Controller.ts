import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
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

    let summaries = processedMessages.filter((m: any) => m.isSummary);
    let nonSummaries = processedMessages.filter((m: any) => !m.isSummary);

    // Trigger 1: Summarize non-summaries if > 10
    if (nonSummaries.length > 10) {
      try {
        const toSummarize = nonSummaries.slice(0, 10);
        const summaryText = await summarizeMessages(toSummarize, modelInstance, false);
        const newSummaryMsg = {
          id: `summary-${Date.now()}`,
          role: "system" as const,
          content: `Summary of conversation turns:\n${summaryText}`,
          isSummary: true
        };
        summaries = [...summaries, newSummaryMsg];
        nonSummaries = nonSummaries.slice(10);
      } catch (err) {
        console.error("Failed to generate message summary:", err);
      }
    }

    // Trigger 2: Summarize summaries if > 5
    if (summaries.length > 5) {
      try {
        const summariesToSummarize = summaries.slice(0, 5);
        const superSummaryText = await summarizeMessages(summariesToSummarize, modelInstance, true);
        const superSummaryMsg = {
          id: `summary-${Date.now()}`,
          role: "system" as const,
          content: `Super-summary of earlier phases:\n${superSummaryText}`,
          isSummary: true
        };
        summaries = [superSummaryMsg, ...summaries.slice(5)];
      } catch (err) {
        console.error("Failed to generate super-summary:", err);
      }
    }

    const updatedBackendMessages = [...summaries, ...nonSummaries];

    // Combine all summary messages into a single system instruction
    let systemInstruction = "You are a helpful, professional AI assistant.";
    if (summaries.length > 0) {
      systemInstruction += "\n\n" + summaries.map((s: any) => s.content).join("\n\n");
    }

    // Only user/assistant messages go to streamText messages field
    const activeMessages = nonSummaries.map(({ role, content }: any) => ({ role, content }));

    const result = streamText({
      model: modelInstance,
      system: systemInstruction,
      messages: activeMessages,
    });

    const origin = c.req.header("Origin");
    if (origin) {
      c.header("Access-Control-Allow-Origin", origin);
      c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      c.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-updated-backend-messages");
      c.header("Access-Control-Expose-Headers", "x-updated-backend-messages");
      c.header("Access-Control-Allow-Credentials", "true");
    }

    c.header("Content-Type", "text/plain; charset=utf-8");
    c.header("Cache-Control", "no-cache");
    c.header("Connection", "keep-alive");
    c.header("Content-Encoding", "identity");

    c.header("x-updated-backend-messages", encodeURIComponent(JSON.stringify(updatedBackendMessages)));

    return honoStreamText(c, async (stream) => {
      try {
        for await (const chunk of result.textStream) {
          await stream.write(chunk);
        }
      } catch (err) {
        console.error("Stream execution error:", err);
      }
    });
  } catch (error: any) {
    console.log("error -2 ", error);
    let statusCode = 500;
    let errorMessage = "An error occurred while fetching AI data.";

    if (error && typeof error === "object") {
      if (error.statusCode) {
        statusCode = error.statusCode;
      } else if (error.status) {
        statusCode = error.status;
      }
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.cause && error.cause.message) {
        errorMessage = error.cause.message;
      }
    }

    const origin = c.req.header("Origin");
    if (origin) {
      c.header("Access-Control-Allow-Origin", origin);
      c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      c.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-conversation-summary, x-summary-last-message-id, x-updated-backend-messages");
      c.header("Access-Control-Expose-Headers", "x-conversation-summary, x-summary-last-message-id, x-updated-backend-messages");
      c.header("Access-Control-Allow-Credentials", "true");
    }

    return c.json({ error: errorMessage }, statusCode as ContentfulStatusCode);
  }
};

export const summarizeChat = async (c: Context) => {
  try {
    const { messages, model, isSummaries } = await c.req.json();
    if (!messages || !Array.isArray(messages)) {
      return c.json({ error: "messages list is required." }, 400);
    }

    const selectedModel = model || "openai/gpt-5.4-mini";
    let modelInstance;
    try {
      modelInstance = getModelInstance(selectedModel, c.env);
    } catch (err: any) {
      return c.json({ error: err.message || "Model provider setup failed." }, 400);
    }

    const summaryText = await summarizeMessages(messages, modelInstance, !!isSummaries);

    const origin = c.req.header("Origin");
    if (origin) {
      c.header("Access-Control-Allow-Origin", origin);
      c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      c.header("Access-Control-Allow-Credentials", "true");
    }

    return c.json({ summary: summaryText });
  } catch (error: any) {
    console.error("Error in summarizeChat:", error);
    let statusCode = 500;
    let errorMessage = "An error occurred while generating summary.";

    if (error && typeof error === "object") {
      if (error.statusCode) {
        statusCode = error.statusCode;
      } else if (error.status) {
        statusCode = error.status;
      }
      if (error.message) {
        errorMessage = error.message;
      }
    }

    const origin = c.req.header("Origin");
    if (origin) {
      c.header("Access-Control-Allow-Origin", origin);
      c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      c.header("Access-Control-Allow-Credentials", "true");
    }

    return c.json({ error: errorMessage }, statusCode as ContentfulStatusCode);
  }
};

export default fetchAIdata;
