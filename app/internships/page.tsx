"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";

export default function InternshipsPage() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const res = await fetch(`${apiUrl}/domains/public`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const mappedTracks = json.data.map((domain: any) => ({
             title: domain.title,
             desc: domain.description || "Comprehensive internship track.",
             icon: domain.iconUrl || "💻",
             level: domain.isFree ? "Beginner Friendly" : "Professional",
             popular: domain.isFeatured,
             color: "bg-white",
             tasks: Array.from({ length: Math.max(domain._count?.tasks || 5, 3) }, (_, i) => `Module ${i + 1} Assignment`),
             duration1: domain.isFree ? "Free" : (domain.priceINR ? `₹${domain.priceINR}` : "Paid"),
             duration3: domain.isFree ? "Free" : (domain.priceINR ? `₹${Math.round(domain.priceINR * 2.25)}` : "Paid"),
          }));
          setTracks(mappedTracks);
        }
      } catch (err) {
        console.error("Failed to fetch tracks", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-[#FFC107] border-b-4 border-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block bg-[#0A0A0A] text-[#FFC107] px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 border-2 border-[#0A0A0A]">
            All Tracks
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase text-[#0A0A0A] mb-4">
            Choose Your Domain
          </h1>
          <p className="text-[#0A0A0A]/70 max-w-xl text-base font-medium">
            Select your track, choose 1-month or 3-month duration, and enroll instantly. Every track includes project tasks, quizzes, resources, and a certificate.
          </p>
        </div>
      </section>

      {/* Duration note */}
      <div className="bg-[#0A0A0A] border-b-2 border-[#FFC107] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-6">
          {[
            { label: "1 Month", detail: "5–6 tasks · 5 quizzes · Essential Certificate" },
            { label: "3 Months", detail: "7–8 tasks · 10 quizzes + exam · Intensive Certificate + Mentor sessions" },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-3">
              <span className="bg-[#FFC107] text-[#0A0A0A] text-xs font-black uppercase tracking-widest px-3 py-1 border-2 border-[#FFC107]">
                {d.label}
              </span>
              <span className="text-white/60 text-xs font-medium">{d.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tracks grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center font-bold">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.title}
                className={`relative ${track.color} border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] flex flex-col`}
              >
                {track.popular && (
                  <div className="absolute -top-3 right-4 bg-[#0A0A0A] text-[#FFC107] text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 border-[#0A0A0A] z-10">
                    🔥 Popular
                  </div>
                )}

                {/* Card header */}
                <div className="p-6 border-b-2 border-[#0A0A0A]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0A0A0A] flex items-center justify-center text-xl shrink-0">
                      {track.icon}
                    </div>
                    <div>
                      <h2 className="font-black text-lg uppercase text-[#0A0A0A] leading-tight">
                        {track.title}
                      </h2>
                      <span className="text-xs font-bold text-gray-500">
                        {track.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#0A0A0A]/70 mt-3">
                    {track.desc}
                  </p>
                </div>

                {/* Tasks */}
                <div className="p-6 flex-1">
                  <p className="text-[10px] font-black uppercase text-[#0A0A0A]/50 mb-3">
                    Track Modules
                  </p>
                  <ul className="space-y-1.5">
                    {track.tasks?.map((task: string, i: number) => (
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
                <div className="p-6 border-t-2 border-[#0A0A0A]">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#F5F5F0] border-2 border-[#0A0A0A] p-3 text-center">
                      <span className="text-xs">1 Month</span>
                      <p className="font-black text-lg">{track.duration1}</p>
                    </div>
                    <div className="bg-[#0A0A0A] border-2 border-[#0A0A0A] p-3 text-center">
                      <span className="text-xs text-[#FFC107]">3 Months</span>
                      <p className="font-black text-lg text-white">
                        {track.duration3}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/checkout?track=${encodeURIComponent(track.title)}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#FFC107] border-2 border-[#0A0A0A] font-black text-sm"
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