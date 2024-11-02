import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
});
