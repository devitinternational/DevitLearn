import Navbar from "../components/Navbar";
import Link from "next/link";
import { Github, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
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
              <h1 className="text-3xl font-black uppercase text-[#0A0A0A]">Log In</h1>
              <p className="text-sm text-gray-500 mt-1">Access your DevIt dashboard</p>
            </div>

            {/* GitHub Sign In */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-[#0A0A0A] bg-[#0A0A0A] text-white font-bold text-sm uppercase tracking-widest shadow-[3px_3px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.3)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all mb-6"
            >
              <Github size={18} />
              Continue with GitHub
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-[2px] bg-[#0A0A0A]/10" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">or</span>
              <div className="flex-1 h-[2px] bg-[#0A0A0A]/10" />
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input-brutal"
                  id="email"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A]">
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
                    type="password"
                    placeholder="••••••••"
                    className="input-brutal pr-12"
                    id="password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A0A0A]"
                    aria-label="Toggle password visibility"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="remember" className="checkbox-brutal" />
                <label htmlFor="remember" className="text-sm font-medium cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                Log In →
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-black text-[#0A0A0A] underline underline-offset-2 hover:text-[#FFC107]">
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
