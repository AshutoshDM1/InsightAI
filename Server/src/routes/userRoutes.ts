import { Hono } from "hono";
import { getUsers, signupUser } from "../controllers/userControllers";

const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

userRoutes.get("/", getUsers);
userRoutes.post("/signup", signupUser);

export default userRoutes;
