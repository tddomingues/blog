import db from "../lib/db";

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({});
    return posts;
  } catch (error) {
    return null;
  }
};

export const getFirstPost = async () => {
  try {
    const posts = await db.post.findMany({});
    return posts[0];
  } catch (error) {
    return null;
  }
};
