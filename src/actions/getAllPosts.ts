import db from "../lib/db";

interface ActionPostProps {
  id_user: string;
  id_post: string;
}

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        likes: true,
        user: true,
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

// export const likePost = async ({ id_post, id_user }: ActionPostProps) => {
//   try {
//     await db.post.update({
//       where: {
//         id: id_post,
//       },
//       data: {
//         like: {
//           increment: 1,
//         },
//         id_user_like: {
//           push: id_user,
//         },
//       },
//     });

//     return null;
//   } catch (error) {
//     return null;
//   }
// };
