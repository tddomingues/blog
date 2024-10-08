import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

//actions
import { currentUser } from "@/src/actions/getCurrentUser";

//lib
import db from "@/src/lib/db";

interface ParamsProps {
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: ParamsProps }
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

  revalidatePath(`/`);

  return NextResponse.json({ message: "Post deletado com sucesso!" });
}
