"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
import ThemeToggle from "./ThemeToggle";

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
  const searchParams = useSearchParams();
  const [fetchedEnrollmentId, setFetchedEnrollmentId] = useState<string | null>(null);

  const curriculumMatch = pathname.match(/\/dashboard\/curriculum\/([^/]+)/);
  const enrollmentId = curriculumMatch?.[1] ?? searchParams.get("enrollmentId") ?? fetchedEnrollmentId;

  // Extract enrollmentId from URL if we're already in a curriculum/quiz page,
  // otherwise fetch it once from the API.
  useEffect(() => {
    if (curriculumMatch?.[1] || searchParams.get("enrollmentId")) return;

    fetch("/api/enrollments/active")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.id) {
          setFetchedEnrollmentId(json.data.id);
        }
      })
      .catch(() => {});
  }, [curriculumMatch, searchParams]);

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
    <aside className="w-64 min-h-screen bg-[var(--black)] border-r-4 border-[#FFC107] flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b-2 border-[rgba(var(--white-rgb),0.1)]">
        <DevItLogo size="sm" variant="white" />
      </div>

      {/* User info */}
      <div className="p-5 border-b-2 border-[rgba(var(--white-rgb),0.1)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--white)] flex items-center justify-center font-black text-[var(--black)] text-sm">
            {(userName[0] ?? "?").toUpperCase()}
          </div>
          <div>
            <p className="text-[var(--white)] font-bold text-sm leading-tight">
              Welcome back,
            </p>
            <p className="text-[#FFC107] font-black text-sm">{userName}!</p>
          </div>
        </div>
        <div className="bg-[rgba(var(--white-rgb),0.05)] border border-[rgba(var(--white-rgb),0.1)] p-2 mb-3">
          <p className="text-[rgba(var(--white-rgb),0.6)] text-[10px] uppercase tracking-widest font-bold mb-1">
            Active Track
          </p>
          <p className="text-[var(--white)] text-xs font-bold truncate">{track}</p>
        </div>
        <ProgressBar value={progress} size="sm" variant="yellow" />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4">
        <p className="text-[rgba(var(--white-rgb),0.3)] text-[10px] uppercase tracking-[0.15em] font-bold mb-3 px-2">
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
                      ? "theme-fixed-yellow bg-[#FFC107] text-[var(--black)] shadow-[3px_3px_0px_rgba(var(--white-rgb),0.2)]"
                      : "text-[rgba(var(--white-rgb),0.7)] hover:text-[var(--white)] hover:bg-[rgba(var(--white-rgb),0.1)]"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-4 border-t border-[rgba(var(--white-rgb),0.1)]">
          <p className="text-[rgba(var(--white-rgb),0.3)] text-[10px] uppercase tracking-[0.15em] font-bold mb-3 px-2">
            Support
          </p>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-[rgba(var(--white-rgb),0.7)] hover:text-[var(--white)] hover:bg-[rgba(var(--white-rgb),0.1)] transition-all"
          >
            <MessageCircle size={16} />
            Live Chat
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-[rgba(var(--white-rgb),0.7)] hover:text-[var(--white)] hover:bg-[rgba(var(--white-rgb),0.1)] transition-all"
          >
            <Ticket size={16} />
            Submit Ticket
          </Link>
        </div>

        <div className="mt-6 px-2">
          <ThemeToggle compact inverted />
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t-2 border-[rgba(var(--white-rgb),0.1)]">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-[rgba(var(--white-rgb),0.05)] transition-all w-full"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
