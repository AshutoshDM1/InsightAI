import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAIdata = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { input, uid } = await c.req.json();
    const genAI = new GoogleGenerativeAI(c.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([input]);

    return c.json(
      {
        message: "AI Data Fetched Successfully!",
        data: result.response.text(),
        uid: uid,
      },
      200
    );
  } catch (error) {
    return c.json({ error: "An error occurred while fetching AI data." }, 500);
  }
};
