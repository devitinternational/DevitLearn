"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Search, Filter, ExternalLink } from "lucide-react";

const categories = ["All", "Python", "Java", "C++", "Front-End", "Back-End", "Database", "Security", "General"];

const resources = [
  { id: 1, title: "Mastering React Hooks", desc: "A comprehensive guide to useState, useEffect, and custom hooks.", category: "Front-End", type: "Tutorial", tag: "Advanced" },
  { id: 2, title: "Node.js Security Best Practices", desc: "How to secure your Express applications against common web vulnerabilities.", category: "Back-End", type: "Guide", tag: "Essential" },
  { id: 3, title: "PostgreSQL Cheat Sheet", desc: "Quick reference for common SQL queries, joins, and aggregations.", category: "Database", type: "Cheat Sheet", tag: "Reference" },
  { id: 4, title: "Python OOP Examples", desc: "Real-world examples of classes, inheritance, and polymorphism in Python.", category: "Python", type: "Code Samples", tag: "Intermediate" },
  { id: 5, title: "Understanding the JVM", desc: "Deep dive into how the Java Virtual Machine manages memory and executes code.", category: "Java", type: "Article", tag: "Advanced" },
  { id: 6, title: "CSS Grid vs Flexbox", desc: "When to use which layout system with interactive examples.", category: "Front-End", type: "Interactive", tag: "Beginner" },
  { id: 7, title: "C++ Memory Management", desc: "Understanding pointers, references, heap, stack, and RAII.", category: "C++", type: "Guide", tag: "Advanced" },
  { id: 8, title: "REST API Design Guidelines", desc: "Industry standards for designing intuitive and scalable RESTful APIs.", category: "Back-End", type: "Reference", tag: "Essential" },
];

export default function ResourcesPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = resources.filter(
    (r) =>
      (activeCat === "All" || r.category === activeCat) &&
      (r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-[#0A0A0A] border-b-4 border-[#FFC107] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-[#FFC107] border-2 border-[#0A0A0A] px-3 py-1 text-xs font-black uppercase tracking-widest mb-6">
            Developer Library
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-6">
            5,000+ Developer<br />Resources
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            Curated guides, tutorials, cheat sheets, and code samples to help you complete
            your tasks and grow as an engineer.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mt-10 relative">
            <input
              type="text"
              placeholder="Search guides, tutorials, cheat sheets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-4 border-[#FFC107] text-[#0A0A0A] font-bold py-4 pl-12 pr-4 outline-none placeholder:text-gray-400 focus:shadow-[0_0_0_4px_rgba(255,193,7,0.3)] transition-shadow text-lg"
            />
            <Search size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0A0A0A]" />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="flex-1 py-12 max-w-7xl mx-auto px-6 w-full">
        {/* Categories */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex items-center gap-2 shrink-0 md:pt-2">
            <Filter size={16} className="text-[#0A0A0A]" />
            <span className="text-xs font-black uppercase tracking-widest">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 border-2 border-[#0A0A0A] text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCat === c
                    ? "bg-[#FFC107] shadow-[2px_2px_0px_#0A0A0A]"
                    : "bg-white hover:bg-[#F5F5F0]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6 flex flex-col hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] bg-[#0A0A0A] text-white px-2 py-1 font-black uppercase tracking-widest border border-[#0A0A0A]">
                  {res.category}
                </span>
                <span className={`text-[10px] px-2 py-1 font-black uppercase tracking-widest border-2 border-[#0A0A0A] ${
                  res.tag === "Essential" ? "bg-[#FFC107] text-[#0A0A0A]" : "bg-white text-gray-500"
                }`}>
                  {res.tag}
                </span>
              </div>

              <h3 className="text-xl font-black uppercase text-[#0A0A0A] mb-2 leading-tight group-hover:underline underline-offset-4 decoration-2 decoration-[#FFC107]">
                {res.title}
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-2">
                {res.desc}
              </p>

              <div className="mt-auto pt-4 border-t-2 border-[#0A0A0A]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                  <BookOpen size={14} /> {res.type}
                </span>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0A0A0A] hover:text-[#FFC107] transition-colors"
                >
                  Open <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-[#0A0A0A]/20">
            <p className="text-xl font-black uppercase text-[#0A0A0A] mb-2">No resources found</p>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button
              onClick={() => { setSearch(""); setActiveCat("All"); }}
              className="mt-4 px-6 py-2 bg-[#FFC107] border-2 border-[#0A0A0A] text-sm font-black uppercase tracking-widest"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

// Temporary icon to avoid undefined error
const BookOpen = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
