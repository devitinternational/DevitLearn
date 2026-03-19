"use client";

import Navbar from "../components/Navbar";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, CreditCard, Lock } from "lucide-react";
import Link from "next/link";

const plans = [
  { label: "1 Month — Essential", price: 1999, tasks: 6, quizzes: 5 },
  { label: "3 Months — Intensive", price: 4499, tasks: 8, quizzes: 10 },
];

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/internships"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#0A0A0A] mb-8"
        >
          <ArrowLeft size={16} /> Back to Tracks
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase text-[#0A0A0A]">
            Enrollment & Checkout
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Complete your enrollment in{" "}
            <strong>Front-End Developer Intern</strong> track.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left — payment form */}
          <div className="space-y-6">
            {/* Plan selector */}
            <div className="border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_#0A0A0A] p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0A0A0A] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#FFC107] border-2 border-[#0A0A0A] flex items-center justify-center text-xs font-black">1</span>
                Choose Duration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plans.map((plan, i) => (
                  <button
                    key={plan.label}
                    type="button"
                    onClick={() => setSelectedPlan(i)}
                    className={`border-2 border-[#0A0A0A] p-4 text-left transition-all ${
                      selectedPlan === i
                        ? "bg-[#FFC107] shadow-[4px_4px_0px_#0A0A0A]"
                        : "bg-[#F5F5F0] hover:bg-[#FFF9E6]"
                    }`}
                  >
                    <div className="font-black text-sm uppercase">{plan.label}</div>
                    <div className="text-2xl font-black mt-1">₹{plan.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {plan.tasks} tasks · {plan.quizzes} quizzes
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_#0A0A0A] p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0A0A0A] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#FFC107] border-2 border-[#0A0A0A] flex items-center justify-center text-xs font-black">2</span>
                Payment Details
              </h2>

              <form className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">
                    Cardholder Name
                  </label>
                  <input type="text" placeholder="Alex Rivera" className="input-brutal" id="cardName" />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="0000  0000  0000  0000"
                      maxLength={19}
                      className="input-brutal pr-12 font-mono"
                      id="cardNumber"
                    />
                    <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      Expiry (MM/YY)
                    </label>
                    <input type="text" placeholder="MM/YY" maxLength={5} className="input-brutal font-mono" id="expiry" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">
                      CVV
                    </label>
                    <input type="text" placeholder="•••" maxLength={4} className="input-brutal font-mono" id="cvv" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[5px_5px_0px_#0A0A0A] hover:shadow-[7px_7px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all flex items-center justify-center gap-3"
                >
                  <Lock size={16} />
                  Pay & Join the Team
                </button>
              </form>

              <div className="flex items-center justify-center gap-2 mt-4">
                <ShieldCheck size={14} className="text-gray-400" />
                <p className="text-xs text-gray-400 font-medium">
                  256-bit SSL encrypted. Your card data is never stored.
                </p>
              </div>
            </div>
          </div>

          {/* Right — order summary */}
          <div className="space-y-4">
            <div className="border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_#0A0A0A] p-6 sticky top-24">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0A0A0A] mb-4 border-b-2 border-[#0A0A0A] pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Track</span>
                  <span className="font-bold">Front-End Developer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold">{plans[selectedPlan].label.split("—")[0].trim()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tasks</span>
                  <span className="font-bold">{plans[selectedPlan].tasks} Projects</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quizzes</span>
                  <span className="font-bold">{plans[selectedPlan].quizzes} Modules</span>
                </div>
              </div>

              <div className="border-t-2 border-[#0A0A0A] mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-black uppercase text-sm">Total</span>
                  <span className="text-2xl font-black">
                    ₹{plans[selectedPlan].price.toLocaleString()}
                  </span>
                </div>
                <div className="mt-3 bg-[#FFC107] border-2 border-[#0A0A0A] p-3">
                  <p className="text-xs font-bold text-[#0A0A0A]">
                    ✓ Certificate included · ✓ Lifetime resource access · ✓ 30-day refund policy
                  </p>
                </div>
              </div>

              {/* What you get */}
              <div className="mt-6 pt-4 border-t-2 border-[#0A0A0A]">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                  What&apos;s Included
                </p>
                <ul className="space-y-2">
                  {[
                    "Project-based task curriculum",
                    "Domain resource library",
                    "Module quizzes",
                    "Verifiable certificate PDF",
                    "LinkedIn certificate addition",
                    plans[selectedPlan].label.includes("3") ? "Weekly mentor sessions" : "Community support",
                  ].map((item) => (
                    <li key={item} className="text-xs font-semibold flex items-center gap-2">
                      <span className="text-[#FFC107]">◆</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
