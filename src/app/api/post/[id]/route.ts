import { currentUser } from "@/src/actions/getCurrentUser";
import db from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
interface IParams {
  id?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const user = await currentUser();
  const postId = params.id;

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  if (user.role === "user") {
    return NextResponse.json(
      { error: "Usuário não autorizado" },
      { status: 401 }
    );
  }

  await db.post.delete({
    where: {
      id: postId,
    },
  });

  return NextResponse.json({ message: "Post deletado com sucesso!" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const user = await currentUser();
  const body = await request.body;
  const path = request.nextUrl.searchParams.get("path") || "/post";

  console.log(path);

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
    // revalidatePath(`/post/[id]`);
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

  // revalidatePath(`/post/[id]`);

  return NextResponse.json({ message: "Você curtiu!" });
}
