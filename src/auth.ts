import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import type { Role } from "@devitinternational/db";
import { getAuthSecret } from "@/lib/auth-secret";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});



export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
  session: { strategy: "jwt" },
  trustHost: true,

  // Same HS256 override as dashboard — backend can verify tokens from both apps
  jwt: {
    async encode({ token }): Promise<string> {
      return new SignJWT(token as Record<string, unknown>)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(getAuthSecret());
    },
    async decode({ token }) {
      if (!token) return null;
      const { payload } = await jwtVerify(token, getAuthSecret(), {
        algorithms: ["HS256"],
      });
      // Cast to JWT — our token shape matches because we put id/role in the jwt callback
      return payload as import("next-auth/jwt").JWT;
    },
  },

  providers: [
    GitHub,
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(
          parsed.data.password,
          user.password,
        );
        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role?: Role }).role ?? "LEARNER";
      }
      if (account) {
        token.provider = account.provider;
      }
      // Refresh role from DB on every request — picks up role changes immediately
      if (typeof token.id === "string") {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { role: true, name: true, email: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.email = dbUser.email;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
});
