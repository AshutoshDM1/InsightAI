import { Hono } from "hono";
import fetchAIdata, { summarizeChat } from "../controllers/AI.Controller";

const AIRoutes = new Hono();

AIRoutes.post("/", fetchAIdata);
AIRoutes.post("/summarize", summarizeChat);

export default AIRoutes;