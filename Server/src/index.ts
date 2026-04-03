import { Hono } from 'hono'
import { customCors } from './middleware/customCors';
import AIRoutes from './routes/AI.route';

const app = new Hono()

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:8787",
  "https://insightai.pages.dev",
  "https://insight-ai-beta.vercel.app",
  "https://insight-ai.elitedev.space",
];

app.use("*", customCors(allowedOrigins));
app.route("/api/v1/ai", AIRoutes);
app.get("/", async (c) => {
  return c.json({ message: "Welcome !! to Insight AI Server" });
});

export default app
