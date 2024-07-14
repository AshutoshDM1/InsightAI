import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const users = await prisma.user.findMany();
    return c.json(users);
  } catch (error) {
    console.error(error);
    return c.json({ error: "An error occurred while fetching users." }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

app.get("/ex" , async (c) => {
  return c.json({ hello: "world!" })
})

export default app;
