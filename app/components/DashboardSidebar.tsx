"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import DevItLogo from "./DevItLogo";
import ProgressBar from "./ui/ProgressBar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Curriculum", href: "/dashboard/curriculum" },
  { icon: HelpCircle, label: "Quizzes", href: "/dashboard/quiz" },
  { icon: Library, label: "Resources", href: "/resources" },
  { icon: Award, label: "Certificate", href: "/dashboard/certificate" },
];

interface DashboardSidebarProps {
  userName?: string;
  track?: string;
  progress?: number;
}

export default function DashboardSidebar({
  userName = "Alex",
  track = "Front-End Developer",
  progress = 68,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#0A0A0A] border-r-4 border-[#FFC107] flex flex-col shrink-0">
      {/* Logo area */}
      <div className="p-6 border-b-2 border-white/10">
        <DevItLogo size="sm" variant="white" />
      </div>

      {/* User info */}
      <div className="p-5 border-b-2 border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#FFC107] border-2 border-white flex items-center justify-center font-black text-[#0A0A0A] text-sm">
            {userName[0]}
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
          <p className="text-white text-xs font-bold">{track}</p>
        </div>
        <ProgressBar value={progress} size="sm" variant="yellow" />
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-4">
        <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-bold mb-3 px-2">
          Navigation
        </p>
        <ul className="space-y-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href;
            return (
              <li key={href}>
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
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-white/5 transition-all w-full"
        >
          <LogOut size={16} />
          Log Out
        </Link>
      </div>
    </aside>
  );
}
