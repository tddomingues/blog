"use server";

import db from "@/src/lib/db";
import { sendEmail } from "@/src/lib/email";
import { Prisma } from "@prisma/client";

import bcrypt from "bcryptjs";

import { signIn } from "@/src/auth";

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

  try {
    const res = await signIn("credentials", {
      ...data,
    });
    console.log("res", res);
  } catch (error) {
    throw error;
  }

  // if (res?.error === "CredentialsSignin") {
  //   toast({
  //     variant: "destructive",
  //     title: "Ocorreu um erro",
  //     description: "E-mail ou senha incorretos",
  //   });
  // }

  // const filterUser = {
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   role: user.role,
  //   emailVerified: user.emailVerified,
  // };

  // return filterUser;
}

/*
  
  catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
    throw error;
  }*/

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

    // verificar token

    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await db.verificationToken.findFirst({
      where: {
        identifier: email,
      },
    });

    if (existingToken) {
      await db.verificationToken.deleteMany({
        where: {
          identifier: existingToken.identifier,
        },
      });
    }

    const verificationToken = await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    //enviar email

    await sendEmail({
      to: verificationToken.identifier,
      token: verificationToken.token,
    });

    return { message: "E-mail de confirmação enviado!" };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
    throw error;
  }
}

export async function newVerification(token: string) {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      return { error: "Token não existe!" };
    }

    const hasExpired = new Date(verificationToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token expirado!" };
    }

    const existingUser = await db.user.findFirst({
      where: {
        email: verificationToken.identifier,
      },
    });

    if (!existingUser) {
      return { error: "Usuário não existe!" };
    }

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: verificationToken.identifier,
      },
    });

    await db.verificationToken.deleteMany({
      where: {
        identifier: verificationToken.identifier,
      },
    });

    return {
      message: "E-mail confirmado!",
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
