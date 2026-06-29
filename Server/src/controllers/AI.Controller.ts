import { Context } from "hono";
import { streamText, createGateway } from "ai";
import { streamText as honoStreamText } from "hono/streaming";

const fetchAIdata = async (c: Context) => {
  try {
    const { input } = await c.req.json();
    
    if (!input) {
      return c.json({ error: "Input is required." }, 400);
    }

    const apiKey = c.env.VERCEL_AI_API_KEY || c.env.VERCELAI_API_KEY;
    if (!apiKey) {
      return c.json({ error: "VERCEL_AI_API_KEY is required. Please check your .env file." }, 400);
    }

    const gateway = createGateway({ apiKey });

    const result = streamText({
      model: gateway("openai/gpt-4o-mini"),
      prompt: input,
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
