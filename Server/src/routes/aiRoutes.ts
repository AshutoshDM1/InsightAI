import { Hono } from "hono";
import { getAIdata } from "../controllers/aiControllers";

const aiRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

aiRoutes.post("/", getAIdata);
// aiRoutes.post("/open", getAIdataByOpenAI);

export default aiRoutes;
