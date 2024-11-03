"use server";

import db from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "../user/getCurrentUser";
import { Prisma } from "@prisma/client";
import PostProps from "@/src/types/post";

interface LikePostProps {
  id_post: string;
  id_user: string;
}

interface CreateMessageProps {
  id_post: string;
  id_user: string;
  content: string;
}

interface EditMessageProps {
  id_message: string;
  content: string;
  id_post: string;
}

export async function likePost(data: LikePostProps) {
  try {
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

      await db.post.update({
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

      return;
    }

    revalidatePath(`/post/${data.id_post}`);

    await db.like.deleteMany({
      where: {
        fk_post_id: data.id_post,
        fk_user_id: data.id_user,
      },
    });

    return;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error(error.message);
    }
    throw error;
  }
}

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
            image: true,
          },
        },
      },
      orderBy: {
        create_at: "desc",
      },
    });
    return posts;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
      include: {
        likes: true,
        messages: {
          include: {
            user: {
              select: {
                name: true,
                id: true,
                role: true,
                image: true,
                email: true,
              },
            },
          },
          orderBy: {
            create_at: "desc",
          },
        },
        user: {
          select: {
            name: true,
            id: true,
            role: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return post;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientValidationError ||
      error instanceof Prisma.PrismaClientInitializationError
    ) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const getSeachPost = async (search: string) => {
  try {
    const post = await db.post.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        user: true,
        likes: true,
      },
    });

    return post;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const createPost = async (data: any) => {
  const user = await currentUser();

  try {
    if (!user) return { error: "Usuário não encontrado" };

    if (user.role !== "ADMIN")
      return { error: "Você não tem permissão para criar um post" };

    // Object.keys(data).forEach((value: any) => {
    //   if (!data[value]) {
    //     return { error: "Preencha todos os campos" };
    //   }
    // });

    await db.post.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        category: data.category,
        fk_user_id: data.fk_user_id,
      },
    });

    return { status: true };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Usuário não encontrado" };
    }

    if (user.role === "USER") {
      return { error: "Usuário não autorizado" };
    }

    await db.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");

    return { message: "Post deletado com sucesso!" };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const editPost = async (
  data: Pick<PostProps, "title" | "description" | "image" | "category" | "id">
) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Usuário não encontrado" };
    }

    if (user.role !== "ADMIN") {
      return { error: "Você não tem permissão para editar um post" };
    }

    const post = await db.post.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!post) {
      return { error: "Postagem não encontrada" };
    }

    const { id, title, description, category, image } = data;

    let info = {};

    if (title) {
      info = {
        ...info,
        title,
      };
    }

    if (description) {
      info = {
        ...info,
        description,
      };
    }

    if (category) {
      info = {
        ...info,
        category,
      };
    }

    if (image) {
      info = {
        ...info,
        image,
      };
    }

    await db.post.update({
      where: {
        id,
      },
      data: info,
    });

    return { status: true };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const createMessage = async ({
  content,
  id_post,
  id_user,
}: CreateMessageProps) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: id_post,
      },
    });

    if (!post) return { error: "Postagem não encontrada." };

    await db.post.update({
      where: {
        id: id_post,
      },
      data: {
        messages: {
          create: {
            content,
            fk_user_id: id_user,
          },
        },
      },
    });

    revalidatePath(`/post/${id_post}`);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const editMessage = async ({
  content,
  id_post,
  id_message,
}: EditMessageProps) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: id_post,
      },
      include: {
        messages: {
          where: {
            id: id_message,
          },
        },
      },
    });

    if (!post) return { error: "Postagem ou comentário não encontrada." };

    await db.post.update({
      where: {
        id: id_post,
      },
      data: {
        messages: {
          update: {
            where: {
              id: id_message,
            },
            data: {
              content,
            },
          },
        },
      },
    });

    revalidatePath(`/post/${id_post}`);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const deleteComment = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Usuário não encontrado" };
    }

    const comment = await db.message.findFirst({
      where: {
        id,
      },
    });

    if (!comment) {
      return { error: "Comentário não encontrado" };
    }

    if (comment.fk_user_id !== user.id) {
      return { error: "Usuário não autorizado" };
    }

    await db.message.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/post/${comment.fk_post_id}`);

    return { message: "Post deletado com sucesso!" };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
    throw error;
  }
};
