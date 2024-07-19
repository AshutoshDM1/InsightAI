import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getAIdata = async (c: Context) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const Input: string = await c.req.json();
    console.log(Input);
    return c.json({message : "AI data"}, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "An error occurred while fetching users." }, 500);
  }
};
