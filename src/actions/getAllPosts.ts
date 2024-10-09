import db from "../lib/db";

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        likes: true,
        user: {
          select: {
            name: true,
            email: true,
            id: true,
            role: true,
          },
        },
      },
      orderBy: {
        create_at: "desc",
      },
    });
    return posts;
  } catch (error) {
    return [];
  }
};
