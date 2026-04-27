import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[var(--off-white)]">
      <Navbar />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="border-2 border-[var(--black)] bg-[var(--white)] shadow-[6px_6px_0px_var(--black)] p-8">
            {/* Icon */}
            <div className="w-14 h-14 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] shadow-[3px_3px_0px_var(--black)] flex items-center justify-center mb-6">
              <Mail size={24} className="text-[var(--black)]" />
            </div>

            <div className="border-b-2 border-[var(--black)] pb-6 mb-6">
              <h1 className="text-3xl font-black uppercase text-[var(--black)]">
                Reset Password
              </h1>
              <p className="text-sm text-[var(--gray-500)] mt-2 leading-relaxed">
                Enter your email and we&apos;ll send you a reset link. Check your inbox within 2 minutes.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[var(--black)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input-brutal"
                  id="resetEmail"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] text-[var(--black)] font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_var(--black)] hover:shadow-[6px_6px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                Send Reset Link →
              </button>
            </form>

            <div className="mt-6 pt-6 border-t-2 border-[rgba(var(--black-rgb),0.1)]">
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-bold text-[var(--gray-500)] hover:text-[var(--black)] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </div>

          {/* Additional help */}
          <div className="mt-4 border-2 border-[var(--black)] theme-fixed-yellow bg-[#FFC107] shadow-[4px_4px_0px_var(--black)] p-4">
            <p className="text-xs font-bold text-[var(--black)]">
              💡 <span className="font-black">Tip:</span> Check your spam folder. Reset emails come from <span className="font-mono">no-reply@devit.io</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
