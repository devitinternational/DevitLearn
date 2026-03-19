import Navbar from "../components/Navbar";
import Link from "next/link";
import { Github } from "lucide-react";

const domains = [
  "Python Intern",
  "Java Intern",
  "C++ Intern",
  "Front-End Developer",
  "Back-End Developer",
  "Full Stack Developer",
  "Data Science",
];

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="border-2 border-[#0A0A0A] bg-white shadow-[6px_6px_0px_#0A0A0A] p-8">
            {/* Header */}
            <div className="border-b-2 border-[#0A0A0A] pb-6 mb-6">
              <div className="inline-block bg-[#FFC107] border-2 border-[#0A0A0A] px-3 py-1 text-xs font-black uppercase tracking-widest mb-4">
                Join DevIt
              </div>
              <h1 className="text-3xl font-black uppercase text-[#0A0A0A]">Create Account</h1>
              <p className="text-sm text-gray-500 mt-1">Start your internship journey today</p>
            </div>

            {/* GitHub Sign Up */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-[#0A0A0A] bg-[#0A0A0A] text-white font-bold text-sm uppercase tracking-widest shadow-[3px_3px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.3)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all mb-6"
            >
              <Github size={18} />
              Sign up with GitHub
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-[2px] bg-[#0A0A0A]/10" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">or</span>
              <div className="flex-1 h-[2px] bg-[#0A0A0A]/10" />
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Alex"
                    className="input-brutal"
                    id="firstName"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Rivera"
                    className="input-brutal"
                    id="lastName"
                  />
                </div>
              </div>

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
                <label className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  className="input-brutal"
                  id="password"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-2">
                  Interested Domain
                </label>
                <div className="relative">
                  <select className="select-brutal" id="domain">
                    <option value="">Select a domain...</option>
                    {domains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="checkbox-brutal mt-0.5" />
                <label htmlFor="terms" className="text-sm font-medium cursor-pointer leading-snug">
                  I agree to the{" "}
                  <Link href="#" className="font-black underline underline-offset-2">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="font-black underline underline-offset-2">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                Create Account →
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="font-black text-[#0A0A0A] underline underline-offset-2 hover:text-[#FFC107]">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
