"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Domain {
  id: string;
  title: string;
  description: string | null;
  iconUrl: string | null;
  priceINR: string | null;
  isFree: boolean;
  durationOptions: number[];
  _count: { tasks: number; sections: number };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// ─── Razorpay window type ────────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function getPriceForDuration(
  basePrice: number,
  months: number,
  durationOptions: number[]
): number {
  if (durationOptions.length < 2) return basePrice;
  // 1-month = base price, 3-month = 2.25× (matching internships page)
  if (months === 1) return basePrice;
  if (months === 3) return Math.round(basePrice * 2.25);
  return basePrice * months;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();

  const domainId = params.get("domainId");
  const preselectedDuration = Number(params.get("duration") ?? "1");

  const [domain, setDomain] = useState<Domain | null>(null);
  const [domainLoading, setDomainLoading] = useState(true);
  const [domainError, setDomainError] = useState<string | null>(null);

  const [selectedDuration, setSelectedDuration] = useState(
    preselectedDuration || 1
  );
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  // ── Redirect unauthenticated users ──
  useEffect(() => {
    if (authStatus === "unauthenticated") {
      const callbackUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.replace(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [authStatus, router]);

  // ── Fetch domain ──
  useEffect(() => {
    if (!domainId) {
      setDomainError("No track selected. Please go back and choose a track.");
      setDomainLoading(false);
      return;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

    fetch(`${apiUrl}/domains/public/${domainId}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          setDomain(json.data);
          // default to first available duration option
          if (json.data.durationOptions?.length > 0) {
            setSelectedDuration(
              preselectedDuration && json.data.durationOptions.includes(preselectedDuration)
                ? preselectedDuration
                : json.data.durationOptions[0]
            );
          }
        } else {
          setDomainError("Track not found.");
        }
      })
      .catch(() => setDomainError("Failed to load track details."))
      .finally(() => setDomainLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainId]);

  // ── Payment handler ──
  const handlePay = useCallback(async () => {
    if (!domain || !session?.user) return;
    setPayError(null);
    setPaying(true);

    try {
      // 1. Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setPayError("Failed to load payment gateway. Please refresh and try again.");
        setPaying(false);
        return;
      }

      // 2. Create order on backend
      const orderRes = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainId: domain.id, durationMonths: selectedDuration }),
      });

      const orderJson = await orderRes.json();

      if (!orderJson.success) {
        setPayError(orderJson.message || "Failed to initiate payment.");
        setPaying(false);
        return;
      }

      const { orderId, amount, currency, enrollmentId, keyId } = orderJson.data;

      // 3. If free — skip Razorpay, go straight to success
      if (amount === 0) {
        router.push(`/checkout/success?enrollmentId=${enrollmentId}&free=true`);
        return;
      }

      // 4. Open Razorpay modal
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "DevIt International",
        description: `${domain.title} — ${selectedDuration} Month${selectedDuration > 1 ? "s" : ""}`,
        image: "/logo.png",
        prefill: {
          name: session.user.name ?? "",
          email: session.user.email ?? "",
        },
        theme: { color: "#FFC107" },
        modal: {
          ondismiss: () => {
            setPaying(false);
            setPayError("Payment cancelled. You can try again whenever you're ready.");
          },
        },
        handler: async (response: RazorpayResponse) => {
          // 5. Verify payment on backend
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                enrollmentId,
              }),
            });

            const verifyJson = await verifyRes.json();

            if (verifyJson.success) {
              router.push(
                `/checkout/success?enrollmentId=${enrollmentId}&invoice=${verifyJson.data.invoiceNo}`
              );
            } else {
              setPayError(
                verifyJson.message ||
                  "Payment verification failed. Please contact support with your payment ID: " +
                    response.razorpay_payment_id
              );
              setPaying(false);
            }
          } catch {
            setPayError(
              "Payment was processed but verification failed. Please contact support with payment ID: " +
                response.razorpay_payment_id
            );
            setPaying(false);
          }
        },
      });

      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setPayError("Something went wrong. Please try again.");
      setPaying(false);
    }
  }, [domain, session, selectedDuration, router]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Loading state
  if (authStatus === "loading" || domainLoading) {
    return (
      <div className="min-h-screen bg-[var(--off-white)]">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-[#FFC107]" size={32} />
            <p className="font-bold uppercase tracking-widest text-sm text-[var(--gray-500)]">
              Loading…
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (domainError || !domain) {
    return (
      <div className="min-h-screen bg-[var(--off-white)]">
        <Navbar />
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-black uppercase mb-2">
            {domainError ?? "Track not found"}
          </h2>
          <Link
            href="/internships"
            className="inline-flex items-center gap-2 mt-4 text-sm font-bold uppercase tracking-widest underline underline-offset-4"
          >
            <ArrowLeft size={15} /> Back to Tracks
          </Link>
        </div>
      </div>
    );
  }

  const basePrice = Number(domain.priceINR ?? 0);
  const price = domain.isFree
    ? 0
    : getPriceForDuration(basePrice, selectedDuration, domain.durationOptions);

  const gstAmount = domain.isFree ? 0 : Math.round(price * 0.18);
  const total = price + gstAmount;

  const durationLabels: Record<number, string> = {
    1: "1 Month — Essential",
    3: "3 Months — Intensive",
  };

  return (
    <div className="min-h-screen bg-[var(--off-white)]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/internships"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--gray-500)] hover:text-[var(--black)] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Tracks
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-block bg-[var(--black)] text-[#FFC107] px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
            Enrollment & Checkout
          </div>
          <h1 className="text-4xl font-black uppercase text-[var(--black)]">
            {domain.title}
          </h1>
          {domain.description && (
            <p className="text-[var(--gray-500)] text-sm mt-2 max-w-xl">
              {domain.description}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* ── Left: duration + pay button ───────────────────────────── */}
          <div className="space-y-6">

            {/* Duration selector */}
            <div className="border-2 border-[var(--black)] bg-[var(--white)] shadow-[4px_4px_0px_var(--black)] p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-[var(--black)] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] flex items-center justify-center text-xs font-black">
                  1
                </span>
                Choose Duration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {domain.durationOptions.map((months) => {
                  const p = domain.isFree
                    ? 0
                    : getPriceForDuration(basePrice, months, domain.durationOptions);
                  const isSelected = selectedDuration === months;
                  return (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setSelectedDuration(months)}
                      className={`border-2 border-[var(--black)] p-5 text-left transition-all ${
                        isSelected
                          ? "theme-fixed-yellow bg-[#FFC107] shadow-[4px_4px_0px_var(--black)] -translate-x-[1px] -translate-y-[1px]"
                          : "bg-[var(--off-white)] hover:bg-[#FFF9E6]"
                      }`}
                    >
                      <div className="font-black text-sm uppercase">
                        {durationLabels[months] ?? `${months} Month${months > 1 ? "s" : ""}`}
                      </div>
                      <div className="text-2xl font-black mt-2">
                        {domain.isFree ? "Free" : `₹${p.toLocaleString("en-IN")}`}
                      </div>
                      {!domain.isFree && (
                        <div className="text-xs text-[var(--gray-600)] mt-1 font-medium">
                          + 18% GST = ₹{(p + Math.round(p * 0.18)).toLocaleString("en-IN")} total
                        </div>
                      )}
                      <div className="text-xs text-[var(--gray-500)] mt-2">
                        {months === 1
                          ? "5–6 tasks · 5 quizzes · Essential Certificate"
                          : "7–8 tasks · 10 quizzes + exam · Intensive Certificate + Mentor sessions"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* What you get */}
            <div className="border-2 border-[var(--black)] bg-[var(--white)] shadow-[4px_4px_0px_var(--black)] p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-[var(--black)] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] flex items-center justify-center text-xs font-black">
                  2
                </span>
                What&apos;s Included
              </h2>
              <ul className="space-y-3">
                {[
                  `${domain._count.sections} learning sections with full curriculum`,
                  `${domain._count.tasks} project tasks + quizzes`,
                  "Verifiable certificate PDF",
                  "LinkedIn-ready certificate",
                  "Domain resource library access",
                  selectedDuration >= 3
                    ? "Weekly mentor sessions (3-month)"
                    : "Community Discord support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle
                      size={16}
                      className="text-[#FFC107] shrink-0 mt-0.5"
                    />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment action */}
            <div className="border-2 border-[var(--black)] bg-[var(--white)] shadow-[4px_4px_0px_var(--black)] p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-[var(--black)] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] flex items-center justify-center text-xs font-black">
                  3
                </span>
                {domain.isFree ? "Claim Free Access" : "Secure Payment via Razorpay"}
              </h2>

              {payError && (
                <div className="mb-4 border-2 border-red-500 bg-red-50 p-4 flex items-start gap-3">
                  <AlertCircle
                    size={16}
                    className="text-red-500 shrink-0 mt-0.5"
                  />
                  <p className="text-sm font-medium text-red-700">{payError}</p>
                </div>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                className="w-full py-4 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] text-[var(--black)] font-black uppercase tracking-widest text-sm shadow-[5px_5px_0px_var(--black)] hover:shadow-[7px_7px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-[5px_5px_0px_var(--black)] disabled:translate-x-0 disabled:translate-y-0"
              >
                {paying ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    {domain.isFree
                      ? "Enroll for Free"
                      : `Pay ₹${total.toLocaleString("en-IN")} & Enroll`}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4">
                <ShieldCheck size={14} className="text-[var(--gray-400)]" />
                <p className="text-xs text-[var(--gray-400)] font-medium">
                  Secured by Razorpay. We never store card data. 30-day refund policy.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Order summary ───────────────────────────────────── */}
          <div>
            <div className="border-2 border-[var(--black)] bg-[var(--white)] shadow-[4px_4px_0px_var(--black)] p-6 sticky top-24">
              <h2 className="text-sm font-black uppercase tracking-widest text-[var(--black)] mb-4 border-b-2 border-[var(--black)] pb-3">
                Order Summary
              </h2>

              {/* Track pill */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-[var(--off-white)] border-2 border-[var(--black)]">
                <div className="w-10 h-10 bg-[var(--black)] border-2 border-[var(--black)] flex items-center justify-center text-lg shrink-0">
                  {domain.iconUrl ?? "💻"}
                </div>
                <div>
                  <p className="font-black text-sm uppercase">{domain.title}</p>
                  <p className="text-xs text-[var(--gray-500)]">
                    {domain._count.sections} sections · {domain._count.tasks} tasks
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--gray-500)]">Duration</span>
                  <span className="font-bold">
                    {selectedDuration} Month{selectedDuration > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray-500)]">Base price</span>
                  <span className="font-bold">
                    {domain.isFree ? "Free" : `₹${price.toLocaleString("en-IN")}`}
                  </span>
                </div>
                {!domain.isFree && (
                  <div className="flex justify-between text-[var(--gray-500)]">
                    <span>GST (18%)</span>
                    <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-[var(--black)] mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-black uppercase text-sm">Total</span>
                  <span className="text-2xl font-black">
                    {domain.isFree
                      ? "Free"
                      : `₹${total.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <div className="mt-4 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] p-3">
                <p className="text-xs font-bold text-[var(--black)]">
                  ✓ Certificate included · ✓ Lifetime resource access · ✓ 30-day refund policy
                </p>
              </div>

              {/* Logged in as */}
              {session?.user && (
                <div className="mt-4 pt-4 border-t border-[var(--gray-200)]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--gray-400)] mb-1">
                    Enrolling as
                  </p>
                  <p className="text-sm font-bold truncate">{session.user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}