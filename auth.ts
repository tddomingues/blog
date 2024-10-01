import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
        if (!credentials.email) {
          return null;
        }

        console.log(credentials.email);

        return {
          email: credentials.email,
        };
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
