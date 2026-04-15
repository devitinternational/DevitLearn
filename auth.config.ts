// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub,
    Google,
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
} satisfies NextAuthConfig;
