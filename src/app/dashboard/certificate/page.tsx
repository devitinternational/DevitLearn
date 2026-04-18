import DashboardSidebar from "../../components/DashboardSidebar";
import Link from "next/link";
import { Download, Linkedin, Share2, CheckCircle } from "lucide-react";

export default function CertificatePage() {
  const isEarned = false; // flip to true to show certificate

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar userName="Alex" track="Back-End Developer" progress={68} />

      <main className="flex-1 p-8 overflow-auto">
        {isEarned ? (
          /* ── CERTIFICATE REVEAL ── */
          <div className="max-w-3xl mx-auto">
            {/* Congrats header */}
            <div className="bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] p-8 text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-black uppercase text-[#0A0A0A]">
                Hell Yeah, Alex!
              </h1>
              <p className="text-[#0A0A0A]/70 mt-2 font-medium max-w-sm mx-auto">
                You&apos;ve completed the Back-End Developer (3-Month Intensive) internship.
                Your certificate is ready.
              </p>
            </div>

            {/* Certificate */}
            <div className="border-4 border-[#0A0A0A] bg-white shadow-[8px_8px_0px_#0A0A0A] mb-6 overflow-hidden">
              {/* Top stripe */}
              <div className="bg-[#FFC107] border-b-4 border-[#0A0A0A] py-4 px-8 flex items-center justify-between">
                <div className="font-black text-xl uppercase tracking-widest">DevIt</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]/60">
                  L.H.M.M
                </div>
              </div>

              {/* Main cert body */}
              <div className="p-12 text-center">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#0A0A0A]/40 mb-6">
                  This certifies that
                </p>
                <h2 className="text-5xl font-black text-[#0A0A0A] mb-4">Alex Rivera</h2>
                <p className="text-sm font-bold text-[#0A0A0A]/60 uppercase tracking-widest mb-1">
                  has successfully completed the
                </p>
                <div className="inline-block bg-[#FFC107] border-2 border-[#0A0A0A] px-6 py-2 my-4">
                  <h3 className="text-xl font-black uppercase">Back-End Developer Internship</h3>
                </div>
                <p className="text-sm text-[#0A0A0A]/60 font-bold mb-2">3-Month Intensive Program</p>
                <p className="text-xs text-[#0A0A0A]/40 font-mono mb-8">
                  Completed all 8 project tasks · Passed all module quizzes · Score: 94%
                </p>

                <div className="flex items-center justify-between pt-6 border-t-2 border-[#0A0A0A]/10">
                  <div className="text-left">
                    <div className="w-24 h-px bg-[#0A0A0A] mb-1" />
                    <p className="text-xs font-black uppercase tracking-widest text-[#0A0A0A]/60">Director, DevIt</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-mono font-bold text-[#0A0A0A]/40">DEV-992-AXL</p>
                    <p className="text-xs font-mono text-[#0A0A0A]/30">Issued: March 2025</p>
                  </div>
                  <div className="text-right">
                    <div className="w-24 h-px bg-[#0A0A0A] mb-1 ml-auto" />
                    <p className="text-xs font-black uppercase tracking-widest text-[#0A0A0A]/60">Issued by DevIt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Download, label: "Download PDF", variant: "primary" as const },
                { icon: Linkedin, label: "Add to LinkedIn", variant: "dark" as const },
                { icon: Share2, label: "Share", variant: "secondary" as const },
              ].map(({ icon: Icon, label, variant }) => (
                <button
                  key={label}
                  className={`flex items-center justify-center gap-2 py-3 font-black uppercase tracking-widest text-sm border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all ${
                    variant === "primary"
                      ? "bg-[#FFC107] text-[#0A0A0A]"
                      : variant === "dark"
                      ? "bg-[#0A0A0A] text-white"
                      : "bg-white text-[#0A0A0A]"
                  }`}
                >
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── NOT YET EARNED ── */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border-2 border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] p-10 text-center mb-6">
              <div className="w-20 h-20 bg-[#F5F5F0] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] flex items-center justify-center text-4xl mx-auto mb-6">
                🏅
              </div>
              <h1 className="text-3xl font-black uppercase text-[#0A0A0A] mb-3">
                Certificate Locked
              </h1>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                Complete all tasks and pass all quizzes to unlock your DevIt internship certificate.
              </p>
            </div>

            {/* Progress to certificate */}
            <div className="border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_#0A0A0A] p-6">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-4">
                📋 Your Checklist
              </h2>
              <ul className="space-y-3">
                {[
                  { label: "Complete all 8 project tasks", done: false, detail: "4 / 8 done" },
                  { label: "Pass all module quizzes (≥ 70%)", done: false, detail: "3 / 10 passed" },
                  { label: "Submit final project via GitHub", done: false, detail: "Not yet" },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 border-2 border-[#0A0A0A] flex items-center justify-center shrink-0 ${item.done ? "bg-[#FFC107]" : "bg-white"}`}>
                      {item.done && <CheckCircle size={13} style={{ strokeWidth: 3 }} />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${item.done ? "line-through text-gray-400" : "text-[#0A0A0A]"}`}>
                        {item.label}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-400">{item.detail}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard/curriculum"
                className="mt-6 flex items-center justify-center w-full py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                Continue Tasks →
              </Link>
            </div>

            {/* Preview */}
            <div className="mt-6 border-2 border-dashed border-[#0A0A0A]/30 p-4 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                Certificate Preview
              </p>
              <div className="relative opacity-30 blur-[3px] border-4 border-[#0A0A0A] bg-white p-8">
                <div className="bg-[#FFC107] border-b-4 border-[#0A0A0A] py-2 px-4 mb-4 text-left">
                  <span className="font-black text-sm">DevIt</span>
                </div>
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">This certifies that</p>
                <p className="text-2xl font-black">[Your Name]</p>
                <div className="mt-2 inline-block bg-[#FFC107] border border-[#0A0A0A] px-4 py-1">
                  <p className="text-sm font-black uppercase">Back-End Developer Internship</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
