import { Hono } from "hono";
import userRoutes from "./routes/userRoutes";
import { customCors } from "./middleware/customCors";
import aiRoutes from "./routes/aiRoutes";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

const allowedOrigins = [
  "http://localhost:5173",
  "https://insight-ai-beta.vercel.app",
];
app.use("*", customCors(allowedOrigins));

app.route("/api/v1/user", userRoutes);
app.route("/api/v1/ai", aiRoutes);

app.get("/", async (c) => {
  return c.json({ message: "Welcome !!! to Insight AI Server" });
});

export default app;
