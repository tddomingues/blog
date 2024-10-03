import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import db from "../lib/db";
import UserProps from "../types/user";
import { AuthError } from "next-auth";

export const login = async (data: Pick<UserProps, "email" | "password">) => {
  const user = await db.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return { error: "Usuário não cadastrado" };
  }

  const isCorrectPassword = await bcrypt.compare(data.password, user.password);

  if (!isCorrectPassword) {
    return { error: "Senha incorreta" };
  }

  try {
    await signIn("credentials", {
      ...user,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas" };
        default:
          return { error: "Erro desconhecido" };
      }
    }
  }
};
