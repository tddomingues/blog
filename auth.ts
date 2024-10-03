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
        });

        if (user) {
          return {
            email: credentials.email,
          };
        }

        return null;
      },
    }),
  ],
  // callbacks: {
  //   authorized({ request: { nextUrl }, auth }) {
  //     const isLoggedIn = !!auth?.user;

  //     console.log("isLoggedIn", isLoggedIn);

  //     const { pathname } = nextUrl;

  //     if (pathname.startsWith("/auth/login") && isLoggedIn) {
  //       return Response.redirect(new URL("/", nextUrl));
  //     }

  //     return !!auth;
  //   },
  // },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
    newUser: "/auth/new-user",
  },
  secret: process.env.AUTH_SECRET,
});
