import { NextResponse } from "next/server";

//lib
import db from "@/src/lib/db";

//critography
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password, confirmPassword } = body;

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json(
      { error: "Usuário já cadastrado" },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "As senhas não conferem" },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password, 10);

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    { message: "Registro feito com sucesso!" },
    { status: 201 }
  );
}
