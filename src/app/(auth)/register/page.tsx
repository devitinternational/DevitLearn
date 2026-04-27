// app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth.action";
import Link from "next/link";
import { Github, Eye, EyeOff } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import { signInWithGitHub, signInWithGoogle } from "@/actions/auth.action";

const domains = [
  "Python Intern",
  "Java Intern",
  "C++ Intern",
  "Front-End Developer",
  "Back-End Developer",
  "Full Stack Developer",
  "Data Science",
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    domain: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.terms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await registerUser({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        password: form.password,
      });
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error ?? "Registration failed");
      }
    } catch {
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--off-white)]">
      <Navbar />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="border-2 border-[var(--black)] bg-[var(--white)] shadow-[6px_6px_0px_var(--black)] p-8">

            {/* Header */}
            <div className="border-b-2 border-[var(--black)] pb-6 mb-6">
              <div className="inline-block theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] px-3 py-1 text-xs font-black uppercase tracking-widest mb-4">
                Join DevIt
              </div>
              <h1 className="text-3xl font-black uppercase text-[var(--black)]">Create Account</h1>
              <p className="text-sm text-[var(--gray-500)] mt-1">Start your internship journey today</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 bg-red-50 border-2 border-red-500 text-red-600 px-3 py-2 text-sm font-semibold">
                {error}
              </div>
            )}

            {/* GitHub */}
            <button
              type="button"
              onClick={() => signInWithGitHub()}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-[var(--black)] bg-[var(--black)] text-[var(--white)] font-bold text-sm uppercase tracking-widest shadow-[3px_3px_0px_rgba(var(--black-rgb),0.3)] hover:shadow-[5px_5px_0px_rgba(var(--black-rgb),0.3)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all mb-3"
            >
              <Github size={18} />
              Sign up with GitHub
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-[var(--black)] bg-[var(--white)] text-[var(--black)] font-bold text-sm uppercase tracking-widest shadow-[3px_3px_0px_rgba(var(--black-rgb),0.3)] hover:shadow-[5px_5px_0px_rgba(var(--black-rgb),0.3)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all mb-6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-[2px] bg-[rgba(var(--black-rgb),0.1)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--gray-400)]">or</span>
              <div className="flex-1 h-[2px] bg-[rgba(var(--black-rgb),0.1)]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* First + Last name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-black uppercase tracking-widest text-[var(--black)] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    placeholder="Alex"
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="w-full border-2 border-[var(--black)] px-3 py-2.5 text-sm font-medium focus:outline-none focus:bg-[#FFC107]/10 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-black uppercase tracking-widest text-[var(--black)] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    placeholder="Rivera"
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="w-full border-2 border-[var(--black)] px-3 py-2.5 text-sm font-medium focus:outline-none focus:bg-[#FFC107]/10 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-[var(--black)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border-2 border-[var(--black)] px-3 py-2.5 text-sm font-medium focus:outline-none focus:bg-[#FFC107]/10 transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-black uppercase tracking-widest text-[var(--black)] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    className="w-full border-2 border-[var(--black)] px-3 py-2.5 pr-12 text-sm font-medium focus:outline-none focus:bg-[#FFC107]/10 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)] hover:text-[var(--black)] transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Domain */}
              <div>
                <label htmlFor="domain" className="block text-xs font-black uppercase tracking-widest text-[var(--black)] mb-2">
                  Interested Domain
                </label>
                <div className="relative">
                  <select
                    id="domain"
                    value={form.domain}
                    onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
                    className="w-full appearance-none border-2 border-[var(--black)] px-3 py-2.5 text-sm font-medium bg-[var(--white)] focus:outline-none focus:bg-[#FFC107]/10 transition-colors cursor-pointer"
                  >
                    <option value="">Select a domain...</option>
                    {domains.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--gray-400)] text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={form.terms}
                  onChange={(e) => setForm((f) => ({ ...f, terms: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 border-2 border-[var(--black)] accent-[#FFC107] cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm font-medium cursor-pointer leading-snug">
                  I agree to the{" "}
                  <Link href="#" className="font-black underline underline-offset-2 hover:text-[#FFC107]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="font-black underline underline-offset-2 hover:text-[#FFC107]">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] text-[var(--black)] font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_var(--black)] hover:shadow-[6px_6px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_var(--black)] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            </form>

            <p className="text-center text-sm text-[var(--gray-500)] mt-6">
              Already have an account?{" "}
              <Link href="/login" className="font-black text-[var(--black)] underline underline-offset-2 hover:text-[#FFC107]">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
