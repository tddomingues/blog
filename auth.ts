import NextAuth from "next-auth";
import Adapter from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./src/lib/db";
import bcrypt from "bcryptjs";
import axios from "axios";

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
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

        console.log(credentials.email);

        const infoReq = await axios.post("http://localhost:4000/auth/login", {
          email: credentials.email,
          password: credentials.password,
        });

        console.log("infoReq", infoReq);

        // if (sendData.status === 201) {
        //   return {
        //     email: credentials.email,
        //   };
        // }
        return null;
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, user }) {
  //     session.user = { ...session.user, id: user.id };

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
