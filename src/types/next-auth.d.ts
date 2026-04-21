// types/next-auth.d.ts
import { DefaultSession, DefaultJWT } from "next-auth";

import type { DefaultSession, DefaultJWT } from "next-auth";

import type { Role } from "../lib/prisma-generated";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    provider?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "INTERN" | "ADMIN";
      provider: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "INTERN" | "ADMIN";
    provider: string;
  }
}