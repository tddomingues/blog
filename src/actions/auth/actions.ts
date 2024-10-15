"use server";

import db from "@/src/lib/db";

import bcrypt from "bcryptjs";

interface LoginProps {
  email: string;
  password: string;
}

interface Register {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function login(data: LoginProps) {
  try {
    const user = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return { error: "Usuário não encontrado" };
    }

    const comparePassword = await bcrypt.compare(data.password, user.password!);

    if (!comparePassword) {
      return { error: "Senha inválida" };
    }

    const filterUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return filterUser;
  } catch (error) {
    return { error: "Erro no servidor." };
  }
}

export async function authRegister(data: Register) {
  const { name, email, password, confirmPassword } = data;

  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return { error: "Usuário já cadastrado" };
    }

    if (password !== confirmPassword) {
      return { error: "As senhas não conferem" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { message: "Registro feito com sucesso!" };
  } catch (error) {
    return { error: "Erro no servidor." };
  }
}
