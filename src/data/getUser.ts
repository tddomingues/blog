import db from "../lib/db";

export const getUser = async (identifier: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: identifier,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
