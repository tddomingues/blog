import { auth } from "@/auth";
import db from "../../lib/db";
import { Prisma } from "@prisma/client";

export const getSession = async () => {
  const session = await auth();

  return session;
};

export const currentUser = async () => {
  try {
    const session = await getSession().then((res) => {
      return res;
    });

    if (session === null) {
      return null;
    }

    const user = await db.user.findFirst({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      emailVerified: user.emailVerified,
    };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new Error(error.message);
    }
    throw error;
  }
};
