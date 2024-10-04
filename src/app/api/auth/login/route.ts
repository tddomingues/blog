// import { signIn } from "@/auth";
// import { redirect } from "next/navigation";
import db from "@/src/lib/db";
// import UserProps from "@/src/types/user";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não existente." },
      { status: 400 }
    );
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return NextResponse.json(
      { error: "As senhas não conferem" },
      { status: 400 }
    );
  }

  return NextResponse.json(user, { status: 201 });
}
