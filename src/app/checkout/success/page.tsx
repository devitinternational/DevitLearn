"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { CheckCircle, ArrowRight, Download } from "lucide-react";

export default function CheckoutSuccessPage() {
  const params = useSearchParams();
  const enrollmentId = params.get("enrollmentId");
  const invoiceNo = params.get("invoice");
  const isFree = params.get("free") === "true";

  return (
    <div className="min-h-screen bg-[var(--off-white)]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        {/* Icon */}
        <div className="w-20 h-20 theme-fixed-yellow bg-[#FFC107] border-4 border-[var(--black)] shadow-[6px_6px_0px_var(--black)] flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-[var(--black)]" />
        </div>

        <div className="inline-block bg-[var(--black)] text-[#FFC107] px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">
          {isFree ? "Access Granted" : "Payment Confirmed"}
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase text-[var(--black)] mb-4">
          You&apos;re In!
        </h1>

        <p className="text-[var(--gray-600)] text-base mb-2">
          {isFree
            ? "Your free access has been activated."
            : "Your payment was successful and your enrollment is confirmed."}
        </p>

        {!isFree && (
          <p className="text-[var(--gray-500)] text-sm mb-8">
            An invoice has been sent to your email address.
          </p>
        )}

        <div className="border-2 border-[var(--black)] bg-[var(--white)] shadow-[4px_4px_0px_var(--black)] p-6 text-left mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--gray-400)] mb-4">
            Enrollment Details
          </p>
          <div className="space-y-2 text-sm">
            {enrollmentId && (
              <div className="flex justify-between">
                <span className="text-[var(--gray-500)]">Enrollment ID</span>
                <span className="font-mono font-bold text-xs">{enrollmentId.slice(0, 16)}…</span>
              </div>
            )}
            {invoiceNo && (
              <div className="flex justify-between">
                <span className="text-[var(--gray-500)]">Invoice</span>
                <span className="font-bold">{invoiceNo}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[var(--gray-500)]">Status</span>
              <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 border border-green-300 text-xs">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] text-[var(--black)] font-black uppercase tracking-widest text-sm shadow-[5px_5px_0px_var(--black)] hover:shadow-[7px_7px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
          >
            Go to Dashboard <ArrowRight size={16} />
          </Link>

          {enrollmentId && !isFree && (
            <Link
              href={`/api/invoice/${enrollmentId}`}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--white)] border-2 border-[var(--black)] text-[var(--black)] font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_var(--black)] hover:shadow-[6px_6px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
            >
              <Download size={16} /> Download Invoice
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}