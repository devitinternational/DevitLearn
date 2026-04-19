import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { backendFetch } from "@/lib/backend";
import DashboardSidebar from "../../components/DashboardSidebar";
import Link from "next/link";
import { Download, Linkedin, Share2, CheckCircle, Lock } from "lucide-react";

interface CertData {
  verificationHash: string;
  issueDate: string;
  pdfUrl: string | null;
  userId: string;
  enrollmentId: string;
}

interface EnrollmentData {
  id: string;
  durationMonths: number;
  progress: number;
  passedTasks: number;
  totalTasks: number;
  completedAt: string | null;
  certificate: { verificationHash: string; issueDate: string } | null;
  domain: { id: string; title: string; slug: string };
}

async function getData() {
  try {
    const enrollRes = await backendFetch("/api/enrollments/active");
    const enrollJson = await enrollRes.json();
    if (!enrollJson.success || !enrollJson.data) {
      return { enrollment: null, certificate: null };
    }

    const enrollment = enrollJson.data as EnrollmentData;

    if (enrollment.certificate) {
      const certRes = await backendFetch(
        `/api/certificates/enrollment/${enrollment.id}`
      );
      const certJson = await certRes.json();
      return {
        enrollment,
        certificate: certJson.success ? (certJson.data as CertData) : null,
      };
    }

    return { enrollment, certificate: null };
  } catch {
    return { enrollment: null, certificate: null };
  }
}

export default async function CertificatePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { enrollment, certificate } = await getData();

  const firstName = session.user.name?.split(" ")[0] ?? "there";
  const isEarned = !!certificate;

  const issueDate = certificate
    ? new Date(certificate.issueDate).toLocaleDateString("en-IN", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://devit.com";

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar
        userName={firstName}
        track={enrollment?.domain?.title ?? "No Active Track"}
        progress={enrollment?.progress ?? 0}
      />

      <main className="flex-1 p-8 overflow-auto">
        {isEarned && certificate ? (
          <div className="max-w-3xl mx-auto">
            {/* Congrats banner */}
            <div className="bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] p-8 text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-black uppercase text-[#0A0A0A]">
                Hell Yeah, {firstName}!
              </h1>
              <p className="text-[#0A0A0A]/70 mt-2 font-medium max-w-sm mx-auto">
                You&apos;ve completed the {enrollment?.domain?.title} internship.
                Your certificate is ready.
              </p>
            </div>

            {/* Certificate display */}
            <div className="border-4 border-[#0A0A0A] bg-white shadow-[8px_8px_0px_#0A0A0A] mb-6 overflow-hidden">
              <div className="bg-[#FFC107] border-b-4 border-[#0A0A0A] py-4 px-8 flex items-center justify-between">
                <span className="font-black text-xl uppercase tracking-widest">
                  DevIt
                </span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]/60">
                  Build Real. Grow Fast.
                </span>
              </div>

              <div className="p-12 text-center">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400 mb-6">
                  This certifies that
                </p>
                <h2 className="text-5xl font-black text-[#0A0A0A] mb-4">
                  {session.user.name}
                </h2>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                  has successfully completed the
                </p>
                <div className="inline-block bg-[#FFC107] border-2 border-[#0A0A0A] px-6 py-2 my-4">
                  <h3 className="text-xl font-black uppercase">
                    {enrollment?.domain?.title} Internship
                  </h3>
                </div>
                <p className="text-sm text-gray-500 font-bold mb-2">
                  {enrollment?.durationMonths}-Month Program
                </p>

                <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100 mt-8">
                  <div className="text-left">
                    <div className="w-24 h-0.5 bg-[#0A0A0A] mb-1" />
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                      Director, DevIt
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-mono text-gray-400">
                      {certificate.verificationHash.slice(0, 20).toUpperCase()}
                    </p>
                    <p className="text-xs font-mono text-gray-300">
                      Issued: {issueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="w-24 h-0.5 bg-[#0A0A0A] mb-1 ml-auto" />
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                      Issued by DevIt
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A0A0A] py-3 px-8 flex items-center justify-between">
                <span className="text-xs font-black text-[#FFC107] tracking-widest">
                  devit.com
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  devit.com/certificate/{certificate.verificationHash}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-4">
              <a
                href={
                  enrollment?.id
                    ? `/api/certificates/${enrollment.id}/download`
                    : "#"
                }
                className="flex items-center justify-center gap-2 py-3 font-black uppercase tracking-widest text-sm border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all bg-[#FFC107] text-[#0A0A0A]"
              >
                <Download size={16} /> Download PDF
              </a>

              <a
                href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
                  (enrollment?.domain?.title ?? "") + " Internship - DevIt"
                )}&organizationName=DevIt&issueYear=${new Date(
                  certificate.issueDate
                ).getFullYear()}&issueMonth=${
                  new Date(certificate.issueDate).getMonth() + 1
                }&certUrl=${encodeURIComponent(
                  `${appUrl}/certificate/${certificate.verificationHash}`
                )}&certId=${certificate.verificationHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 font-black uppercase tracking-widest text-sm border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all bg-[#0A0A0A] text-white"
              >
                <Linkedin size={16} /> Add to LinkedIn
              </a>

              <a
                href={`${appUrl}/certificate/${certificate.verificationHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 font-black uppercase tracking-widest text-sm border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all bg-white text-[#0A0A0A]"
              >
                <Share2 size={16} /> Share
              </a>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Locked state */}
            <div className="bg-white border-2 border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] p-10 text-center mb-6">
              <div className="w-20 h-20 bg-[#F5F5F0] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] flex items-center justify-center text-4xl mx-auto mb-6">
                🏅
              </div>
              <h1 className="text-3xl font-black uppercase text-[#0A0A0A] mb-3">
                Certificate Locked
              </h1>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                Complete all required tasks and pass all quizzes to unlock your
                DevIt internship certificate.
              </p>
            </div>

            {/* Progress checklist */}
            {enrollment && (
              <div className="border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_#0A0A0A] p-6 mb-6">
                <h2 className="text-xs font-black uppercase tracking-widest text-[#0A0A0A] mb-4">
                  📋 Your Progress
                </h2>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-[#0A0A0A]">
                    Tasks Passed
                  </span>
                  <span className="text-sm font-black font-mono">
                    {enrollment.passedTasks} / {enrollment.totalTasks}
                  </span>
                </div>
                <div className="w-full bg-gray-100 border-2 border-[#0A0A0A] h-4 mb-4">
                  <div
                    className="h-full bg-[#FFC107] transition-all"
                    style={{ width: `${enrollment.progress}%` }}
                  />
                </div>
                {enrollment.progress === 100 ? (
                  <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                    <CheckCircle size={16} />
                    All tasks complete — certificate generating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                    <Lock size={16} />
                    {enrollment.totalTasks - enrollment.passedTasks} task
                    {enrollment.totalTasks - enrollment.passedTasks !== 1
                      ? "s"
                      : ""}{" "}
                    remaining
                  </div>
                )}
                <Link
                  href={`/dashboard/curriculum/${enrollment.id}`}
                  className="mt-6 flex items-center justify-center w-full py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
                >
                  Continue Tasks →
                </Link>
              </div>
            )}

            {/* Blurred preview */}
            <div className="border-2 border-dashed border-[#0A0A0A]/30 p-4 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                Certificate Preview
              </p>
              <div className="relative opacity-30 blur-sm border-4 border-[#0A0A0A] bg-white p-8 pointer-events-none select-none">
                <div className="bg-[#FFC107] border-b-4 border-[#0A0A0A] py-2 px-4 mb-4 text-left">
                  <span className="font-black text-sm">DevIt</span>
                </div>
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">
                  This certifies that
                </p>
                <p className="text-2xl font-black">{session.user.name}</p>
                <div className="mt-2 inline-block bg-[#FFC107] border border-[#0A0A0A] px-4 py-1">
                  <p className="text-sm font-black uppercase">
                    {enrollment?.domain?.title ?? "Developer"} Internship
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}