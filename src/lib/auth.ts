import { auth } from "@/auth";
import db from "./db";

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

  console.log("session", session);

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
