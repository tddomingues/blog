import { currentUser } from "@/src/actions/getCurrentUser";
import db from "@/src/lib/db";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const user = await currentUser();
  const body = await request.json();

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  const postId = params.id;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  const userLiked = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (userLiked?.id_user_like.includes(user.id)) {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        like: {
          decrement: 1,
        },
        id_user_like: {
          set: userLiked.id_user_like.filter((id) => id !== user.id),
        },
      },
    });
    return NextResponse.json({ message: "Você descurtiu!" });
  }

  await db.post.update({
    where: {
      id: postId,
    },
    data: {
      like: {
        increment: 1,
      },
      id_user_like: {
        push: user.id,
      },
    },
  });

  return NextResponse.json({ message: "Você curtiu!" });
}
