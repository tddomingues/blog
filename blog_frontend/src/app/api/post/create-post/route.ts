import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

//actions
import { currentUser } from "@/src/actions/getCurrentUser";

//lib
import db from "@/src/lib/db";

export async function POST(request: Request) {
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
      { error: "Você não tem permissão para criar um post" },
      { status: 403 }
    );
  }

  const { title, description, image, reading_time, category } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 }
      );
    }
  });

  await db.post.create({
    data: {
      title,
      description,
      image,
      reading_time,
      category,
      fk_user_id: user.id,
    },
  });

  revalidatePath("/");

  return NextResponse.json({ message: "Postagem criada com sucesso" });
}
