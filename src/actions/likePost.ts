"use server";

import { revalidatePath } from "next/cache";
import db from "../lib/db";

interface LikePostProps {
  id_post: string;
  id_user: string;
}

export default async function likePost(data: LikePostProps) {
  if (!data) {
    return null;
  }

  const post = await db.post.findFirst({
    where: {
      id: data.id_post,
    },
  });

  if (!post) {
    return null;
  }

  const likePost = await db.like.findFirst({
    where: {
      fk_post_id: data.id_post,
      fk_user_id: data.id_user,
    },
  });

  if (!likePost) {
    revalidatePath(`/post/${data.id_post}`);

    return await db.post.update({
      where: {
        id: data.id_post,
      },
      data: {
        likes: {
          create: {
            fk_user_id: data.id_user,
          },
        },
      },
    });
  }

  revalidatePath(`/post/${data.id_post}`);

  return await db.like.deleteMany({
    where: {
      fk_post_id: data.id_post,
      fk_user_id: data.id_user,
    },
  });
}
