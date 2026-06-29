import { createGateway } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { modelsVercelGateway, modelsGemini, modelsGroq } from "../config/models";

const modelKeyMap: Record<string, string> = {
  // OpenAI (Vercel Gateway)
  "openai/gpt-4.1-mini": "gpt-4.1-mini",
  "openai/gpt-5.4-mini": "gpt-5.4-mini",

  // Google
  "google/gemini-3.1-flash-lite": "gemini-3.1-flash-lite",
  "google/gemini-2.5-flash": "gemini-2.5-flash",

  // Groq
  "groq/compound": "llama-3.3-70b-versatile",
  "groq/compound-mini": "llama-3.1-8b-instant",
  "llama-3.1-8b-instant": "llama-3.1-8b-instant",
  "openai/gpt-oss-20b": "openai/gpt-oss-20b",
  "qwen/qwen3-32b": "qwen/qwen3-32b",
};

export function getModelInstance(selectedModel: string, env: any) {
  if (modelsVercelGateway.includes(selectedModel)) {
    const apiKey = env.VERCEL_AI_API_KEY || env.VERCELAI_API_KEY;
    if (!apiKey) {
      throw new Error("VERCEL_AI_API_KEY is required. Please check your .env or .dev.vars file.");
    }
    const gateway = createGateway({ apiKey });
    const realModelId = modelKeyMap[selectedModel] || "gpt-4o-mini";
    return gateway(realModelId);
  }

  if (modelsGemini.includes(selectedModel)) {
    const apiKey = env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is required. Please check your .env or .dev.vars file.");
    }
    const google = createGoogle({ apiKey });
    const realModelId = modelKeyMap[selectedModel] || "gemini-1.5-flash";
    return google(realModelId);
  }

  if (modelsGroq.includes(selectedModel)) {
    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is required. Please check your .env or .dev.vars file.");
    }
    const groq = createGroq({ apiKey });
    const realModelId = modelKeyMap[selectedModel] || "llama-3.1-8b-instant";
    return groq(realModelId);
  }

  // Fallback to default model (first one from Vercel Gateway config)
  const defaultModel = "openai/gpt-4.1-mini";
  const apiKey = env.VERCEL_AI_API_KEY || env.VERCELAI_API_KEY;
  if (!apiKey) {
    throw new Error("VERCEL_AI_API_KEY fallback is required. Please check your .env or .dev.vars file.");
  }
  const gateway = createGateway({ apiKey });
  return gateway("gpt-4o-mini");
}
