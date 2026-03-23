// app/(auth)/login/page.tsx
"use client";

export const dynamic = "force-dynamic";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  loginUser,
  signInWithGitHub,
  signInWithGoogle,
} from "@/actions/auth.action";
import Link from "next/link";
import { Github, Eye, EyeOff } from "lucide-react";
import Navbar from "@/app/components/Navbar";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCallback = searchParams.get("callbackUrl") ?? "/dashboard";
  const allowedPaths = ["/dashboard", "/curriculum", "/resources"];
  const callbackUrl = allowedPaths.some((p) => rawCallback.startsWith(p))
    ? rawCallback
    : "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="border-2 border-[#0A0A0A] bg-white shadow-[6px_6px_0px_#0A0A0A] p-8">
            {/* Header */}
            <div className="border-b-2 border-[#0A0A0A] pb-6 mb-6">
              <div className="inline-block bg-[#FFC107] border-2 border-[#0A0A0A] px-3 py-1 text-xs font-black uppercase tracking-widest mb-4">
                Welcome Back
              </div>
              <h1 className="text-3xl font-black uppercase text-[#0A0A0A]">
                Log In
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Access your DevIt dashboard
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 bg-red-50 border-2 border-red-500 text-red-600 px-3 py-2 text-sm font-semibold">
                {error}
              </div>
            )}

            {/* GitHub Sign In */}
            <button
              type="button"
              onClick={() => signInWithGitHub()}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-[#0A0A0A] bg-[#0A0A0A] text-white font-bold text-sm uppercase tracking-widest shadow-[3px_3px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.3)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all mb-3"
            >
              <Github size={18} />
              Continue with GitHub
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-[#0A0A0A] bg-white text-[#0A0A0A] font-bold text-sm uppercase tracking-widest shadow-[3px_3px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.3)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all mb-6"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-[2px] bg-[#0A0A0A]/10" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                or
              </span>
              <div className="flex-1 h-[2px] bg-[#0A0A0A]/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full border-2 border-[#0A0A0A] px-3 py-2.5 text-sm font-medium focus:outline-none focus:bg-[#FFC107]/10 transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A]"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-gray-500 hover:text-[#0A0A0A] underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, password: e.target.value }))
                    }
                    className="w-full border-2 border-[#0A0A0A] px-3 py-2.5 pr-12 text-sm font-medium focus:outline-none focus:bg-[#FFC107]/10 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A0A0A] transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_#0A0A0A] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                {loading ? "Signing in..." : "Log In →"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-black text-[#0A0A0A] underline underline-offset-2 hover:text-[#FFC107]"
              >
                Sign up free
              </Link>
            </p>
          </div>

          {/* Trust note */}
          <p className="text-center text-xs text-gray-400 mt-4 font-medium">
            🔒 Secured by SSL. We never share your data.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />
      <Suspense fallback={<div className="min-h-[calc(100vh-72px)]" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
