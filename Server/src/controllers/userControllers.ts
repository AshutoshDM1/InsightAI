import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getUsers = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const users = await prisma.user.findMany();
    return c.json(users, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "An error occurred while fetching users." }, 500);
  }
};

export const signupUser = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  type UserData = {
    idToken: string;
    displayName: string;
    photoURL: string;
    uid: string;
    email: string;
  };

  try {
    const body: UserData = await c.req.json();
    const { idToken, displayName, photoURL, uid, email } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json(
        {
          message: "Welcome back! You have already signed up.",
          data: existingUser,
        },
        200
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: displayName,
        email: email,
        profileurl: photoURL,
      },
    });

    return c.json(
      {
        message: "User signed up successfully",
        data: newUser,
      },
      201
    );
  } catch (error) {
    return c.json(
      { error: "Invalid request body or failed to create user" },
      400
    );
  }
};
