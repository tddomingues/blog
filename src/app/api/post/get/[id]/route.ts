import { currentUser } from "@/src/actions/getCurrentUser";
import db from "@/src/lib/db";
import { NextResponse } from "next/server";
interface IParams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const user = await currentUser();
  const postId = params.id;

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
  });

  return NextResponse.json(post);
}
