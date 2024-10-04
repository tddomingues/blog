import { auth } from "@/auth";
import db from "../lib/db";

export const getSession = async () => {
  const session = await auth();

  return session;
};

export const currentUser = async () => {
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

  return user;
};
