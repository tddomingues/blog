import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

//lib
import db from "./lib/db";

//data
import { getUser } from "./data/getUser";

export const authConfig = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const data = {
          email: credentials.email,
          password: credentials.password,
        };

        const user = await db.user.findFirst({
          where: {
            email: data.email,
          },
        });

        if (!user) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUser(user.id as string);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUser(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.role = existingUser.role;
      token.email = existingUser.email;

      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
