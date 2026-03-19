import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";

const tracks = [
  {
    icon: "🐍",
    title: "Python Programmer",
    desc: "Master Python fundamentals, data structures, OOP, file I/O, and build CLI tools to real-world automation scripts.",
    tasks: ["Environment Setup", "Data Structures", "OOP & Classes", "File I/O & Modules", "API Integration", "Final Project"],
    duration1: "₹1,999",
    duration3: "₹4,499",
    level: "Beginner–Intermediate",
    color: "bg-white",
  },
  {
    icon: "☕",
    title: "Java Programmer",
    desc: "Deep-dive into Java OOP, design patterns, Collections framework, JDBC, and build enterprise-grade applications.",
    tasks: ["Java Basics & JVM", "OOP & Inheritance", "Exception Handling", "Collections", "JDBC & Database", "Spring Boot Basics", "Final Project"],
    duration1: "₹1,999",
    duration3: "₹4,499",
    level: "Intermediate",
    color: "bg-white",
  },
  {
    icon: "⚙️",
    title: "C++ Programmer",
    desc: "Learn systems-level programming with C++: pointers, memory management, data structures, and performance optimization.",
    tasks: ["Syntax & Compilation", "Pointers & Memory", "OOP in C++", "STL & Templates", "File Systems", "Final Project"],
    duration1: "₹1,999",
    duration3: "₹4,499",
    level: "Intermediate–Advanced",
    color: "bg-white",
  },
  {
    icon: "🎨",
    title: "Front-End Developer",
    desc: "Build responsive, interactive UIs with HTML, CSS, JavaScript, React, and Next.js following modern best practices.",
    tasks: ["HTML & CSS", "JS Fundamentals", "React Basics", "State & Hooks", "Next.js & Routing", "REST API Integration", "Final Portfolio Build"],
    duration1: "₹1,999",
    duration3: "₹4,499",
    level: "Beginner–Intermediate",
    color: "bg-[#FFC107]",
    popular: true,
  },
  {
    icon: "🔧",
    title: "Back-End Developer",
    desc: "Build robust REST APIs, handle authentication, work with databases, and deploy Node.js/Express applications.",
    tasks: ["Node.js & Express", "REST API Design", "Auth & JWT", "Database Design (SQL/NoSQL)", "File Uploads & Middleware", "Testing & Docs", "Deployment"],
    duration1: "₹1,999",
    duration3: "₹4,499",
    level: "Intermediate",
    color: "bg-white",
    popular: true,
  },
  {
    icon: "📱",
    title: "Full Stack Developer",
    desc: "End-to-end development — from front-end UI to backend APIs and databases. The complete developer path.",
    tasks: ["React + Tailwind UI", "REST API + Express", "Database Integration", "Auth & Sessions", "Full App Deployment", "Real Project Build", "Performance & Security", "Final Product"],
    duration1: "₹2,499",
    duration3: "₹5,999",
    level: "Intermediate–Advanced",
    color: "bg-white",
  },
  {
    icon: "🗄️",
    title: "Database Intern",
    desc: "SQL fundamentals, query optimization, ER modeling, NoSQL with MongoDB, and working with live datasets.",
    tasks: ["SQL Basics", "Advanced Queries", "ER Diagrams", "Indexes & Optimization", "MongoDB & NoSQL", "Final Project"],
    duration1: "₹1,999",
    duration3: "₹4,499",
    level: "Beginner–Intermediate",
    color: "bg-white",
  },
];

export default function InternshipsPage() {
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
                  <div className="w-12 h-12 bg-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center text-xl shrink-0">
                    {track.icon}
                  </div>
                  <div>
                    <h2 className="font-black text-lg uppercase text-[#0A0A0A] leading-tight">
                      {track.title}
                    </h2>
                    <span className="text-xs font-bold text-gray-500">{track.level}</span>
                  </div>
                </div>
                <p className="text-sm text-[#0A0A0A]/70 mt-3 leading-relaxed">{track.desc}</p>
              </div>

              {/* Tasks list */}
              <div className="p-6 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#0A0A0A]/50 mb-3">
                  Track Modules
                </p>
                <ul className="space-y-1.5">
                  {track.tasks.map((task, i) => (
                    <li key={task} className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-[10px] font-mono font-bold text-gray-400 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <CheckCircle size={13} className="text-[#FFC107] shrink-0" style={{ strokeWidth: 3 }} />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing + CTA */}
              <div className="p-6 border-t-2 border-[#0A0A0A]">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#F5F5F0] border-2 border-[#0A0A0A] p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock size={12} className="text-gray-500" />
                      <span className="text-[10px] font-black uppercase text-gray-500">1 Month</span>
                    </div>
                    <p className="font-black text-lg text-[#0A0A0A]">{track.duration1}</p>
                  </div>
                  <div className="bg-[#0A0A0A] border-2 border-[#0A0A0A] p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock size={12} className="text-[#FFC107]" />
                      <span className="text-[10px] font-black uppercase text-[#FFC107]">3 Months</span>
                    </div>
                    <p className="font-black text-lg text-white">{track.duration3}</p>
                  </div>
                </div>
                <Link
                  href={`/checkout?track=${encodeURIComponent(track.title)}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
                >
                  Enroll Now <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
