// app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth.action";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await registerUser(form);
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

  const fields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { id: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
  ] as const;

  return (
    <main className="min-h-screen bg-[#F5E642] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8">
        <h1 className="text-4xl font-black mb-1">DevIt.</h1>
        <p className="text-gray-500 mb-8 font-medium">
          Create your account to get started.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="bg-red-50 border-2 border-red-500 text-red-600 px-3 py-2 text-sm font-semibold">
              {error}
            </p>
          )}
          {fields.map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label className="block text-xs font-black uppercase tracking-widest mb-1">
                {label}
              </label>
              <input
                type={type}
                required
                value={form[id]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [id]: e.target.value }))
                }
                placeholder={placeholder}
                className="w-full border-4 border-black px-3 py-2 font-medium
                           focus:outline-none focus:bg-[#F5E642] transition-colors"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5E642] text-black font-black py-3 border-4 border-black
                       shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]
                       hover:shadow-none transition-all disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-black underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}