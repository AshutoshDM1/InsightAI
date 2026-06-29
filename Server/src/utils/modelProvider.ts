import { createGateway } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { modelsVercelGateway, modelsGemini, modelsGroq } from "../config/models";

export function getModelInstance(selectedModel: string, env: any) {
  if (modelsVercelGateway.includes(selectedModel)) {
    const apiKey = env.VERCEL_AI_API_KEY || env.VERCELAI_API_KEY;
    if (!apiKey) {
      throw new Error("VERCEL_AI_API_KEY is required. Please check your .env or .dev.vars file.");
    }
    const gateway = createGateway({ apiKey });
    return gateway(selectedModel);
  }

  if (modelsGemini.includes(selectedModel)) {
    const apiKey = env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is required. Please check your .env or .dev.vars file.");
    }
    const google = createGoogle({ apiKey });
    const geminiModelId = selectedModel.replace(/^google\//, "");
    return google(geminiModelId);
  }

  if (modelsGroq.includes(selectedModel)) {
    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is required. Please check your .env or .dev.vars file.");
    }
    const groq = createGroq({ apiKey });
    return groq(selectedModel);
  }

  // Fallback to default model (first one from Vercel Gateway config)
  const defaultModel = "openai/gpt-4.1-mini";
  const apiKey = env.VERCEL_AI_API_KEY || env.VERCELAI_API_KEY;
  if (!apiKey) {
    throw new Error("VERCEL_AI_API_KEY fallback is required. Please check your .env or .dev.vars file.");
  }
  const gateway = createGateway({ apiKey });
  return gateway(defaultModel);
}
