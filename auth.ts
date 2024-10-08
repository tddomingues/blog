import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./src/lib/db";

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  debug: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
          select: {
            name: true,
            email: true,
            role: true,
          },
        });

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Apenas inclua a role no token JWT se o usuário existir
  //     if (user) {
  //       token.role = user.role; // Inclua a role no token
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Inclua a role também na sessão
  //     if (token) {
  //       session.user.role = token.role;
  //     }
  //     return session;
  //   },
  // },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
    newUser: "/auth/new-user",
  },
});
