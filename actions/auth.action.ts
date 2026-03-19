// actions/auth.actions.ts
"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ActionResult = {
  success: boolean;
  error?: string;
};

// ─── Register ─────────────────────────────────────────────
export async function registerUser(
  data: z.infer<typeof registerSchema>
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "An account with this email already exists." };
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashed },
  });

  // Sign in immediately after registering
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch {
    // If auto sign-in fails, send them to login
    return { success: false, error: "Account created. Please sign in." };
  }

  return { success: true };
}

// ─── Login ────────────────────────────────────────────────
export async function loginUser(
  data: { email: string; password: string },
  callbackUrl?: string
): Promise<ActionResult> {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: callbackUrl ?? "/dashboard",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid email or password." };
        default:
          return { success: false, error: "Something went wrong. Try again." };
      }
    }
    // signIn throws a redirect — let Next.js handle it
    throw error;
  }
}

// ─── OAuth ────────────────────────────────────────────────
export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

// ─── Logout ───────────────────────────────────────────────
export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}