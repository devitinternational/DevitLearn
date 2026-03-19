import Navbar from "../components/Navbar";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="border-2 border-[#0A0A0A] bg-white shadow-[6px_6px_0px_#0A0A0A] p-8">
            {/* Icon */}
            <div className="w-14 h-14 bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] flex items-center justify-center mb-6">
              <Mail size={24} className="text-[#0A0A0A]" />
            </div>

            <div className="border-b-2 border-[#0A0A0A] pb-6 mb-6">
              <h1 className="text-3xl font-black uppercase text-[#0A0A0A]">
                Reset Password
              </h1>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Enter your email and we&apos;ll send you a reset link. Check your inbox within 2 minutes.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-2">
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
                className="w-full py-3.5 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                Send Reset Link →
              </button>
            </form>

            <div className="mt-6 pt-6 border-t-2 border-[#0A0A0A]/10">
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0A0A0A] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </div>

          {/* Additional help */}
          <div className="mt-4 border-2 border-[#0A0A0A] bg-[#FFC107] shadow-[4px_4px_0px_#0A0A0A] p-4">
            <p className="text-xs font-bold text-[#0A0A0A]">
              💡 <span className="font-black">Tip:</span> Check your spam folder. Reset emails come from <span className="font-mono">no-reply@devit.io</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
