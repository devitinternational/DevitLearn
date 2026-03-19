// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser, signInWithGitHub, signInWithGoogle } from "@/actions/auth.action";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await loginUser(form, callbackUrl);
      if (result?.success === false) setError(result.error ?? "Login failed");
    } catch {
      router.push(callbackUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5E642] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8">
        <h1 className="text-4xl font-black mb-1">DevIt.</h1>
        <p className="text-gray-500 mb-8 font-medium">
          Sign in to continue your internship.
        </p>

        {/* OAuth */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => signInWithGitHub()}
            className="w-full bg-black text-white font-bold py-3 border-4 border-black
                       shadow-[4px_4px_0px_0px_#555] hover:translate-x-[2px] hover:translate-y-[2px]
                       hover:shadow-none transition-all"
          >
            Continue with GitHub
          </button>
          <button
            onClick={() => signInWithGoogle()}
            className="w-full bg-white text-black font-bold py-3 border-4 border-black
                       shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                       hover:shadow-none transition-all"
          >
            Continue with Google
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-[2px] bg-black" />
          <span className="text-sm font-bold text-gray-400">OR</span>
          <div className="flex-1 h-[2px] bg-black" />
        </div>

        {/* Credentials */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="bg-red-50 border-2 border-red-500 text-red-600 px-3 py-2 text-sm font-semibold">
              {error}
            </p>
          )}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full border-4 border-black px-3 py-2 font-medium
                         focus:outline-none focus:bg-[#F5E642] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              placeholder="••••••••"
              className="w-full border-4 border-black px-3 py-2 font-medium
                         focus:outline-none focus:bg-[#F5E642] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5E642] text-black font-black py-3 border-4 border-black
                       shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                       hover:shadow-none transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          No account?{" "}
          <Link href="/register" className="font-black underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}