import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface CertificateData {
  verificationHash: string;
  issueDate: string;
  pdfUrl: string | null;
  userName: string;
  domainTitle: string;
  durationMonths: number;
}

async function getPublicCertificate(hash: string): Promise<CertificateData | null> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/certificates/verify/${hash}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (!data.success) return null;
    return data.data;
  } catch {
    return null;
  }
}

export default async function PublicCertificatePage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;
  const cert = await getPublicCertificate(hash);
  if (!cert) notFound();

  const issueDate = new Date(cert.issueDate).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-center p-8">
      {/* Verification badge */}
      <div className="flex items-center gap-2 bg-green-50 border-2 border-green-500 px-4 py-2 mb-8">
        <CheckCircle size={16} className="text-green-600" />
        <span className="text-sm font-black text-green-700 uppercase tracking-widest">
          Verified Certificate
        </span>
      </div>

      {/* Certificate */}
      <div className="w-full max-w-3xl border-4 border-[#0A0A0A] bg-white shadow-[8px_8px_0px_#0A0A0A] overflow-hidden">
        <div className="bg-[#FFC107] border-b-4 border-[#0A0A0A] py-5 px-8 flex items-center justify-between">
          <span className="font-black text-2xl uppercase tracking-widest text-[#0A0A0A]">
            DevIt
          </span>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]/60">
            Build Real. Grow Fast.
          </span>
        </div>

        <div className="p-16 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400 mb-8">
            This certifies that
          </p>
          <h1 className="text-5xl font-black text-[#0A0A0A] mb-6">
            {cert.userName}
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
            has successfully completed the
          </p>
          <div className="inline-block bg-[#FFC107] border-2 border-[#0A0A0A] px-8 py-3 mb-4">
            <h2 className="text-xl font-black uppercase text-[#0A0A0A]">
              {cert.domainTitle} Internship
            </h2>
          </div>
          <p className="text-sm text-gray-500 font-bold mb-12">
            {cert.durationMonths}-Month{" "}
            {cert.durationMonths >= 3 ? "Intensive" : "Essential"} Program
          </p>

          <div className="flex items-center justify-between pt-8 border-t-2 border-gray-100">
            <div className="text-left">
              <div className="w-24 h-0.5 bg-[#0A0A0A] mb-2" />
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                Director, DevIt
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-mono text-gray-400 mb-1">
                {cert.verificationHash.slice(0, 24).toUpperCase()}
              </p>
              <p className="text-xs font-mono text-gray-300">
                Issued: {issueDate}
              </p>
            </div>
            <div className="text-right">
              <div className="w-24 h-0.5 bg-[#0A0A0A] mb-2 ml-auto" />
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
            devit.com/certificate/{cert.verificationHash}
          </span>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400 font-medium">
        This certificate was issued by DevIt and can be verified at this URL.
      </p>

      <Link
        href="/"
        className="mt-4 text-sm font-black uppercase tracking-widest text-[#0A0A0A] underline underline-offset-4 hover:text-[#FFC107] transition-colors"
      >
        Learn more about DevIt →
      </Link>
    </div>
  );
}