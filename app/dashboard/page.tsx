import DashboardSidebar from "../components/DashboardSidebar";
import ProgressBar from "../components/ui/ProgressBar";
import Link from "next/link";
import { BookOpen, HelpCircle, Award, Library, Clock, TrendingUp, MessageCircle, Ticket, ChevronRight } from "lucide-react";

const quickActions = [
  { icon: BookOpen, label: "Continue Tasks", sub: "Task 04 of 08 in progress", href: "/dashboard/curriculum", color: "bg-white" },
  { icon: HelpCircle, label: "Take Quiz", sub: "Module 3 quiz available", href: "/dashboard/quiz", color: "bg-[#FFC107]" },
  { icon: Library, label: "Resources", sub: "5,000+ dev resources", href: "/resources", color: "bg-white" },
  { icon: Award, label: "Certificate", sub: "32% complete — keep going", href: "/dashboard/certificate", color: "bg-white" },
];

const recentActivity = [
  { action: "Submitted Task 03", detail: "REST API Design — Graded ✓", time: "2h ago" },
  { action: "Passed Quiz", detail: "Module 2: Node.js Basics — 90%", time: "1d ago" },
  { action: "Enrolled", detail: "Back-End Developer — 3 Month Plan", time: "3d ago" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar userName="Alex" track="Back-End Developer" progress={68} />

      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b-2 border-[#0A0A0A] px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500">Dashboard</p>
            <h1 className="text-xl font-black text-[#0A0A0A]">Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
              <Clock size={14} />
              <span>Session: 1h 24m</span>
            </div>
            <div className="w-9 h-9 bg-[#FFC107] border-2 border-[#0A0A0A] flex items-center justify-center font-black text-[#0A0A0A]">
              A
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Welcome + progress */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main progress card */}
            <div className="lg:col-span-2 bg-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[5px_5px_0px_#FFC107] p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[#FFC107] text-xs font-black uppercase tracking-widest mb-1">
                    ◆ Active Track
                  </p>
                  <h2 className="text-white text-2xl font-black uppercase">Back-End Developer</h2>
                  <p className="text-white/50 text-sm mt-1">3-Month Intensive · Enrolled Mar 2025</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-[#FFC107]">68%</div>
                  <div className="text-white/50 text-xs font-bold uppercase">Complete</div>
                </div>
              </div>
              <ProgressBar value={68} size="lg" variant="yellow" />
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10">
                {[
                  { label: "Tasks Done", value: "4 / 8" },
                  { label: "Quizzes", value: "3 / 10" },
                  { label: "Days Left", value: "62" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-white font-black text-xl">{s.value}</p>
                    <p className="text-white/40 text-xs font-bold uppercase mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-4 flex items-center gap-2">
                <TrendingUp size={14} />
                Recent Activity
              </h3>
              <ul className="space-y-3">
                {recentActivity.map((act) => (
                  <li key={act.action} className="border-b border-[#0A0A0A]/10 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-bold text-[#0A0A0A]">{act.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{act.detail}</p>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">{act.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-4">
              ◆ Quick Actions
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map(({ icon: Icon, label, sub, href, color }) => (
                <Link
                  key={label}
                  href={href}
                  className={`${color} border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-5 flex flex-col gap-3 hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all group`}
                >
                  <div className={`w-10 h-10 ${color === "bg-[#FFC107]" ? "bg-[#0A0A0A]" : "bg-[#FFC107]"} border-2 border-[#0A0A0A] flex items-center justify-center`}>
                    <Icon size={18} className={color === "bg-[#FFC107]" ? "text-[#FFC107]" : "text-[#0A0A0A]"} />
                  </div>
                  <div>
                    <p className="font-black uppercase text-sm text-[#0A0A0A]">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  </div>
                  <ChevronRight size={14} className="text-[#0A0A0A]/40 mt-auto group-hover:text-[#0A0A0A] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-black uppercase text-[#0A0A0A] text-lg">Need Help?</h3>
              <p className="text-[#0A0A0A]/70 text-sm mt-1">
                Our team is available during your internship for support.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                <MessageCircle size={15} /> Live Chat
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0px_#0A0A0A]">
                <Ticket size={15} /> Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
