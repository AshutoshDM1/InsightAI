import { Hono } from "hono";
import fetchAIdata from "../controllers/AI.Controller";

const AIRoutes = new Hono();

AIRoutes.post("/", fetchAIdata);

export default AIRoutes;