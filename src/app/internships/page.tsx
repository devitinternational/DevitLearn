"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

interface Track {
  id: string;
  title: string;
  desc: string;
  icon: string;
  level: string;
  popular: boolean;
  tasks: string[];
  pricing: { months: number; label: string; price: number; isFree: boolean }[];
  durationOptions: number[];
}

export default function InternshipsPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

    fetch(`${apiUrl}/domains/public`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          const mapped: Track[] = json.data.map((domain: {
            id: string;
            title: string;
            description?: string;
            iconUrl?: string;
            isFeatured?: boolean;
            isFree?: boolean;
            priceINR?: string | null;
            durationOptions?: number[];
            _count?: { tasks?: number; sections?: number };
          }) => {
            const basePrice = Number(domain.priceINR ?? 0);
            const durations = domain.durationOptions?.length
              ? domain.durationOptions
              : [1, 3];

            const pricing = durations.map((months) => ({
              months,
              label:
                months === 1
                  ? "1 Month"
                  : months === 3
                  ? "3 Months"
                  : `${months} Months`,
              price:
                domain.isFree
                  ? 0
                  : months === 1
                  ? basePrice
                  : Math.round(basePrice * 2.25),
              isFree: domain.isFree ?? false,
            }));

            const taskCount = Math.max(domain._count?.tasks ?? 5, 3);
            return {
              id: domain.id,
              title: domain.title,
              desc: domain.description ?? "Comprehensive internship track.",
              icon: domain.iconUrl ?? "💻",
              level: domain.isFree ? "Beginner Friendly" : "Professional",
              popular: domain.isFeatured ?? false,
              tasks: Array.from({ length: taskCount }, (_, i) => `Module ${i + 1} Assignment`),
              pricing,
              durationOptions: durations,
            };
          });
          setTracks(mapped);
        }
      })
      .catch((err) => console.error("Failed to fetch tracks", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--white)]">
      <Navbar />

      {/* Header */}
      <section className="theme-fixed-yellow bg-[#FFC107] border-b-4 border-[var(--black)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block bg-[var(--black)] text-[#FFC107] px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 border-2 border-[var(--black)]">
            All Tracks
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase text-[var(--black)] mb-4">
            Choose Your Domain
          </h1>
          <p className="text-[rgba(var(--black-rgb),0.7)] max-w-xl text-base font-medium">
            Select your track, choose 1-month or 3-month duration, and enroll
            instantly. Every track includes project tasks, quizzes, resources,
            and a certificate.
          </p>
        </div>
      </section>

      {/* Duration note */}
      <div className="bg-[var(--black)] border-b-2 border-[#FFC107] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-6">
          {[
            {
              label: "1 Month",
              detail: "5–6 tasks · 5 quizzes · Essential Certificate",
            },
            {
              label: "3 Months",
              detail:
                "7–8 tasks · 10 quizzes + exam · Intensive Certificate + Mentor sessions",
            },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-3">
              <span className="theme-fixed-yellow bg-[#FFC107] text-[var(--black)] text-xs font-black uppercase tracking-widest px-3 py-1 border-2 border-[#FFC107]">
                {d.label}
              </span>
              <span className="text-[rgba(var(--white-rgb),0.6)] text-xs font-medium">
                {d.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tracks grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={32} className="animate-spin text-[#FFC107]" />
            <p className="font-bold uppercase tracking-widest text-sm text-[var(--gray-500)]">
              Loading tracks…
            </p>
          </div>
        ) : tracks.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-black text-xl uppercase text-[var(--gray-400)]">
              No tracks available yet
            </p>
            <p className="text-[var(--gray-400)] text-sm mt-2">Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="relative bg-[var(--white)] border-2 border-[var(--black)] shadow-[4px_4px_0px_var(--black)] flex flex-col"
              >
                {track.popular && (
                  <div className="absolute -top-3 right-4 bg-[var(--black)] text-[#FFC107] text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 border-[var(--black)] z-10">
                    🔥 Popular
                  </div>
                )}

                {/* Card header */}
                <div className="p-6 border-b-2 border-[var(--black)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--black)] flex items-center justify-center text-xl shrink-0">
                      {track.icon}
                    </div>
                    <div>
                      <h2 className="font-black text-lg uppercase text-[var(--black)] leading-tight">
                        {track.title}
                      </h2>
                      <span className="text-xs font-bold text-[var(--gray-500)]">
                        {track.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[rgba(var(--black-rgb),0.7)] mt-3">{track.desc}</p>
                </div>

                {/* Tasks */}
                <div className="p-6 flex-1">
                  <p className="text-[10px] font-black uppercase text-[rgba(var(--black-rgb),0.5)] mb-3">
                    Track Modules
                  </p>
                  <ul className="space-y-1.5">
                    {track.tasks.slice(0, 6).map((task, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-[10px] font-mono w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <CheckCircle size={13} className="text-[#FFC107]" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="p-6 border-t-2 border-[var(--black)]">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {track.pricing.map((p, i) => (
                      <div
                        key={p.months}
                        className={`border-2 border-[var(--black)] p-3 text-center ${
                          i === 0
                            ? "bg-[var(--off-white)]"
                            : "bg-[var(--black)]"
                        }`}
                      >
                        <span
                          className={`text-xs ${i === 1 ? "text-[#FFC107]" : ""}`}
                        >
                          {p.label}
                        </span>
                        <p
                          className={`font-black text-lg ${
                            i === 1 ? "text-[var(--white)]" : ""
                          }`}
                        >
                          {p.isFree
                            ? "Free"
                            : `₹${p.price.toLocaleString("en-IN")}`}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Enroll Now — passes domainId, default to first duration */}
                  <Link
                    href={`/checkout?domainId=${track.id}&duration=${track.durationOptions[0]}`}
                    className="flex items-center justify-center gap-2 w-full py-3 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] font-black text-sm hover:shadow-[4px_4px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
                  >
                    Enroll Now <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}