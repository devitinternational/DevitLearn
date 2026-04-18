import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { backendFetch } from "@/lib/backend";
import DashboardSidebar from "../components/DashboardSidebar";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  Award,
  Library,
  Clock,
  MessageCircle,
  Ticket,
  ChevronRight,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface ActiveEnrollment {
  id: string;
  domainId: string;
  durationMonths: number;
  startDate: string;
  endDate: string | null;
  progress: number;
  passedTasks: number;
  totalTasks: number;
  domain: {
    id: string;
    title: string;
    slug: string;
    iconUrl: string | null;
    description: string | null;
  };
  invoice: { invoiceNo: string; pdfUrl: string | null } | null;
}

// ─── Data fetcher ────────────────────────────────────────────────────────────
async function getActiveEnrollment(): Promise<ActiveEnrollment | null> {
  try {
    const res = await backendFetch("/api/enrollments/active");
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = session.user;
  const firstName = user.name?.split(" ")[0] ?? "there";
  const initials = (user.name ?? user.email ?? "?")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const enrollment = await getActiveEnrollment();

  const quickActions = [
    {
      icon: BookOpen,
      label: "Continue Tasks",
      sub: "View your curriculum",
      href: enrollment
        ? `/dashboard/curriculum/${enrollment.id}`
        : "/internships",
      color: "bg-white",
    },
    {
      icon: HelpCircle,
      label: "Take Quiz",
      sub: "Module quizzes",
      href: "/dashboard/quiz",
      color: "bg-[#FFC107]",
    },
    {
      icon: Library,
      label: "Resources",
      sub: "5,000+ dev resources",
      href: "/resources",
      color: "bg-white",
    },
    {
      icon: Award,
      label: "Certificate",
      sub: "Complete tasks to unlock",
      href: "/dashboard/certificate",
      color: "bg-white",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar
        userName={firstName}
        track={enrollment?.domain?.title ?? "No Active Track"}
        progress={enrollment?.progress ?? 0}
      />

      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b-2 border-[#0A0A0A] px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500">
              Dashboard
            </p>
            <h1 className="text-xl font-black text-[#0A0A0A]">Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
              <Clock size={14} />
              <span>Welcome back</span>
            </div>
            <div className="w-9 h-9 bg-[#FFC107] border-2 border-[#0A0A0A] flex items-center justify-center font-black text-[#0A0A0A] text-sm">
              {initials}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {enrollment ? (
            /* ── Enrolled state ── */
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Active track card */}
              <div className="lg:col-span-2 bg-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[5px_5px_0px_#FFC107] p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[#FFC107] text-xs font-black uppercase tracking-widest mb-1">
                      ◆ Active Track
                    </p>
                    <h2 className="text-white text-2xl font-black uppercase">
                      {enrollment.domain.title}
                    </h2>
                    <p className="text-white/50 text-sm mt-1">
                      {enrollment.durationMonths} Month
                      {enrollment.durationMonths > 1 ? "s" : ""} · Ends{" "}
                      {enrollment.endDate
                        ? new Date(enrollment.endDate).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )
                        : "—"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-[#FFC107]">
                      {enrollment.progress}%
                    </div>
                    <div className="text-white/50 text-xs font-bold uppercase">
                      Complete
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/10 border border-white/20">
                  <div
                    className="h-full bg-[#FFC107] transition-all duration-700"
                    style={{ width: `${enrollment.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-white/40 font-bold">
                  <span>{enrollment.passedTasks} tasks passed</span>
                  <span>{enrollment.totalTasks} total</span>
                </div>

                <Link
                  href={`/dashboard/curriculum/${enrollment.id}`}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFC107] border-2 border-[#FFC107] text-[#0A0A0A] font-black uppercase tracking-widest text-xs hover:bg-yellow-300 transition-colors"
                >
                  Continue Learning <ArrowRight size={14} />
                </Link>
              </div>

              {/* Stats sidebar */}
              <div className="space-y-4">
                <div className="bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-5">
                  <div className="flex items-center gap-3 mb-1">
                    <TrendingUp size={16} className="text-[#FFC107]" />
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                      Progress
                    </p>
                  </div>
                  <p className="text-3xl font-black">{enrollment.progress}%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {enrollment.passedTasks}/{enrollment.totalTasks} tasks
                    completed
                  </p>
                </div>

                {enrollment.invoice && (
                  <Link
                    href={`/api/invoice/${enrollment.id}`}
                    target="_blank"
                    className="block bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-5 hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
                  >
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">
                      Invoice
                    </p>
                    <p className="font-bold text-sm">
                      {enrollment.invoice.invoiceNo}
                    </p>
                    <p className="text-xs text-[#FFC107] font-bold mt-1">
                      Download PDF →
                    </p>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* ── Not enrolled state ── */
            <div className="bg-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[5px_5px_0px_#FFC107] p-8">
              <p className="text-[#FFC107] text-xs font-black uppercase tracking-widest mb-2">
                ◆ Get Started
              </p>
              <h2 className="text-white text-2xl font-black uppercase mb-2">
                Welcome, {firstName}
              </h2>
              <p className="text-white/50 text-sm mb-6">
                You haven&apos;t enrolled in a track yet. Browse internships and
                pick your domain.
              </p>
              <Link
                href="/internships"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFC107] border-2 border-[#FFC107] text-[#0A0A0A] font-black uppercase tracking-widest text-sm hover:-translate-y-[1px] transition-all"
              >
                Browse Internships <ArrowRight size={16} />
              </Link>
            </div>
          )}

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
                  <div
                    className={`w-10 h-10 ${
                      color === "bg-[#FFC107]" ? "bg-[#0A0A0A]" : "bg-[#FFC107]"
                    } border-2 border-[#0A0A0A] flex items-center justify-center`}
                  >
                    <Icon
                      size={18}
                      className={
                        color === "bg-[#FFC107]"
                          ? "text-[#FFC107]"
                          : "text-[#0A0A0A]"
                      }
                    />
                  </div>
                  <div>
                    <p className="font-black uppercase text-sm text-[#0A0A0A]">
                      {label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  </div>
                  <ChevronRight
                    size={14}
                    className="text-[#0A0A0A]/40 mt-auto group-hover:text-[#0A0A0A] transition-colors"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-black uppercase text-[#0A0A0A] text-lg">
                Need Help?
              </h3>
              <p className="text-[#0A0A0A]/70 text-sm mt-1">
                Our team is available during your internship.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] text-sm font-bold uppercase tracking-wide">
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