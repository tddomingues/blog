import { currentUser } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { NextResponse } from "next/server";

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

  const { title, description, favorite, image, reading_time, category } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 }
      );
    }
  });

  // const createPost = await db.post.create({
  //   data: {
  //     title,
  //     description,
  //     favorite,
  //     image,
  //     reading_time,
  //     category,
  //     fk_user_id: user.id,
  //   },
  // });

  // return NextResponse.json(createPost);
  return NextResponse.json({ message: "Postagem criada com sucesso" });
}
