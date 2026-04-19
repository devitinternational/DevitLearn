"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import DevItLogo from "./DevItLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Internships", href: "/internships" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/#about" },
];

interface NavbarProps {
  variant?: "light" | "dark" | "yellow";
}

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bg =
    variant === "yellow"
      ? "bg-[#FFC107]"
      : variant === "dark"
      ? "bg-[#0A0A0A]"
      : "bg-white";

  const textColor = variant === "dark" ? "text-white" : "text-[#0A0A0A]";
  const borderColor = variant === "dark" ? "border-white/20" : "border-[#0A0A0A]";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${bg} border-b-2 ${borderColor} transition-all duration-200 ${scrolled ? "shadow-[0_4px_0px_rgba(0,0,0,0.15)]" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <DevItLogo size="sm" variant={variant === "dark" ? "white" : "default"} />

          <div className={`hidden md:flex items-center gap-8 ${textColor}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest hover:text-[#FFC107] transition-colors ${variant === "dark" ? "text-white" : "text-[#0A0A0A]"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-bold uppercase tracking-widest px-4 py-2 border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-bold uppercase tracking-widest px-5 py-2 bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all text-[#0A0A0A]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`text-sm font-bold uppercase tracking-widest px-4 py-2 border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all ${variant === "dark" ? "border-white text-white hover:bg-white hover:text-[#0A0A0A]" : ""}`}
                >
                  Login
                </Link>
                <Link
                  href="/internships"
                  className="text-sm font-bold uppercase tracking-widest px-5 py-2 bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all text-[#0A0A0A]"
                >
                  Get Started →
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 border-2 border-[#0A0A0A] ${variant === "dark" ? "border-white text-white" : ""}`}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className={`md:hidden ${bg} border-t-2 ${borderColor} px-6 py-6 flex flex-col gap-4`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base font-bold uppercase tracking-widest py-2 border-b border-[#0A0A0A]/20 ${textColor}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest px-4 py-3 border-2 border-[#0A0A0A] text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
                    className="text-sm font-bold uppercase tracking-widest px-4 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] text-center text-[#0A0A0A]"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest px-4 py-3 border-2 border-[#0A0A0A] text-center hover:bg-[#0A0A0A] hover:text-white transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/internships"
                    onClick={() => setOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest px-4 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] text-center text-[#0A0A0A]"
                  >
                    Get Started →
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-[72px]" />
    </>
  );
}