import db from "../lib/db";

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({});
    return posts;
  } catch (error) {
    return null;
  }
};
