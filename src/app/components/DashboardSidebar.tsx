"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Award,
  Library,
  LogOut,
  MessageCircle,
  Ticket,
} from "lucide-react";
import { signOut } from "next-auth/react";
import DevItLogo from "./DevItLogo";
import ProgressBar from "./ui/ProgressBar";

interface DashboardSidebarProps {
  userName?: string;
  track?: string;
  progress?: number;
}

export default function DashboardSidebar({
  userName = "there",
  track = "No Active Track",
  progress = 0,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);

  // Extract enrollmentId from URL if we're already in a curriculum/quiz page,
  // otherwise fetch it once from the API.
  useEffect(() => {
    // Try to extract from current URL first (avoids extra fetch)
    const curriculumMatch = pathname.match(/\/dashboard\/curriculum\/([^/]+)/);
    const quizMatch = pathname.match(/\/dashboard\/quiz\/([^/]+)/);
    // searchParams aren't available in server components, so read from window
    const urlParams = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
    const fromSearch = urlParams?.get("enrollmentId");

    if (curriculumMatch?.[1]) {
      setEnrollmentId(curriculumMatch[1]);
    } else if (fromSearch) {
      setEnrollmentId(fromSearch);
    } else {
      // Fetch active enrollment to get the ID for the curriculum link
      fetch("/api/enrollments/active")
        .then((r) => r.json())
        .then((json) => {
          if (json.success && json.data?.id) {
            setEnrollmentId(json.data.id);
          }
        })
        .catch(() => {});
    }
  }, [pathname]);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: BookOpen,
      label: "Curriculum",
      href: enrollmentId
        ? `/dashboard/curriculum/${enrollmentId}`
        : "/dashboard/curriculum",
    },
    {
      icon: HelpCircle,
      label: "Quizzes",
      href: "/dashboard/quiz",
    },
    { icon: Library, label: "Resources", href: "/resources" },
    { icon: Award, label: "Certificate", href: "/dashboard/certificate" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0A0A0A] border-r-4 border-[#FFC107] flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b-2 border-white/10">
        <DevItLogo size="sm" variant="white" />
      </div>

      {/* User info */}
      <div className="p-5 border-b-2 border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#FFC107] border-2 border-white flex items-center justify-center font-black text-[#0A0A0A] text-sm">
            {(userName[0] ?? "?").toUpperCase()}
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              Welcome back,
            </p>
            <p className="text-[#FFC107] font-black text-sm">{userName}!</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-2 mb-3">
          <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold mb-1">
            Active Track
          </p>
          <p className="text-white text-xs font-bold truncate">{track}</p>
        </div>
        <ProgressBar value={progress} size="sm" variant="yellow" />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4">
        <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-bold mb-3 px-2">
          Navigation
        </p>
        <ul className="space-y-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider transition-all ${
                    active
                      ? "bg-[#FFC107] text-[#0A0A0A] shadow-[3px_3px_0px_rgba(255,255,255,0.2)]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-bold mb-3 px-2">
            Support
          </p>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <MessageCircle size={16} />
            Live Chat
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Ticket size={16} />
            Submit Ticket
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t-2 border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-white/5 transition-all w-full"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}