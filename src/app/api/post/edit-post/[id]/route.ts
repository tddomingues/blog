import { currentUser } from "@/src/actions/getCurrentUser";
import db from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface ParamsProps {
  id?: string;
}

export async function PUT(
  request: Request,
  { params }: { params: ParamsProps }
) {
  const user = await currentUser();
  const body = await request.json();

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  if (user.role !== "admin") {
    return NextResponse.json(
      { error: "Você não tem permissão para editar um post" },
      { status: 403 }
    );
  }

  const { title, description, category, image } = body;

  let data = {};

  if (title) {
    data = {
      ...data,
      title,
    };
  }

  if (description) {
    data = {
      ...data,
      description,
    };
  }

  if (category) {
    data = {
      ...data,
      category,
    };
  }

  if (image) {
    data = {
      ...data,
      image,
    };
  }

  await db.post.update({
    where: {
      id: params.id,
    },
    data,
  });

  revalidatePath(`/`);

  return NextResponse.json({ message: "Postagem atualizada com sucesso" });
}
