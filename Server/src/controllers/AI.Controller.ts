import { Context } from "hono";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Type declarations for Cloudflare Workers globals
declare const ReadableStream: {
  new <T = any>(underlyingSource?: UnderlyingSource<T>): ReadableStream<T>;
};
declare const TextEncoder: {
  new (): {
    encode(input?: string): Uint8Array;
  };
};

const fetchAIdata = async (c: Context) => {
  try {
    const { input } = await c.req.json();
    
    if (!input) {
      return c.json({ error: "Input is required." }, 400);
    }

    const genAI = new GoogleGenerativeAI(c.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

    // Set up SSE headers
    c.header("Content-Type", "text/event-stream");
    c.header("Cache-Control", "no-cache");
    c.header("Connection", "keep-alive");

    // Create a readable stream for SSE
    const stream = new ReadableStream({
      async start(controller: any) {
        try {
          const encoder = new TextEncoder();

          // Stream the AI response
          const result = await model.generateContentStream([input]);
          
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(`${chunkText}`));
            }
          }
          controller.close();
          
        } catch (error) {
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "An error occurred while streaming AI data." })}\n\n`));
          controller.close();
        }
      },
    });

    return c.body(stream);
  } catch (error) {
    return c.json({ error: "An error occurred while fetching AI data." }, 500);
  }
};

export default fetchAIdata;