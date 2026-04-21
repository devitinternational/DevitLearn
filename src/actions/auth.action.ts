"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) return { success: false, error: "Email already in use" };

  const hashed = await bcrypt.hash(data.password, 12);
  await prisma.user.create({
    data: { name: data.name, email: data.email, password: hashed, role: "LEARNER" },
  });
  return { success: true };
}

export async function loginUser(
  form: { email: string; password: string },
  callbackUrl: string
) {
  try {
    await signIn("credentials", { email: form.email, password: form.password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.type === "CredentialsSignin" ? "Invalid email or password" : "Something went wrong" };
    }
    throw error;
  }
}

export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}