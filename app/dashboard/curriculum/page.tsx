"use client";

import DashboardSidebar from "../../components/DashboardSidebar";
import { useState } from "react";
import { CheckCircle, Circle, Github, Send, ExternalLink, BookOpen, MessageCircle } from "lucide-react";

const modules = [
  { id: 1, label: "01 ENV SETUP", done: true },
  { id: 2, label: "02 REST API DESIGN", done: true },
  { id: 3, label: "03 AUTH & JWT", done: true },
  { id: 4, label: "04 DATABASE SCHEMA", active: true },
  { id: 5, label: "05 FILE UPLOADS" },
  { id: 6, label: "06 TESTING & DOCS" },
  { id: 7, label: "07 DEPLOYMENT" },
  { id: 8, label: "08 FINAL PROJECT" },
];

const requirements = [
  { id: 1, text: "Design a normalized PostgreSQL schema with at least 3 related tables", done: true },
  { id: 2, text: "Write migration scripts using Knex.js or Prisma", done: true },
  { id: 3, text: "Implement CRUD operations via REST endpoints", done: false },
  { id: 4, text: "Add foreign key constraints and indexes", done: false },
  { id: 5, text: "Document all tables with field descriptions in README", done: false },
];

const resources = [
  { label: "PostgreSQL Docs", type: "Doc" },
  { label: "Prisma Quickstart", type: "Tutorial" },
  { label: "SQL Schema Design Guide", type: "Article" },
  { label: "Knex.js Reference", type: "Doc" },
];

export default function CurriculumPage() {
  const [checklist, setChecklist] = useState(requirements.map((r) => r.done));
  const [githubUrl, setGithubUrl] = useState("");

  const toggleItem = (i: number) => {
    setChecklist((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const doneCount = checklist.filter(Boolean).length;

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar userName="Alex" track="Back-End Developer" progress={68} />

      <div className="flex flex-1 overflow-hidden">
        {/* Module sidebar */}
        <nav className="w-56 bg-white border-r-2 border-[#0A0A0A] flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
          <div className="p-4 border-b-2 border-[#0A0A0A]">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
              Level 3 — Full Stack
            </p>
            <p className="font-black text-sm text-[#0A0A0A] mt-0.5">Back-End Developer</p>
          </div>
          <ul className="flex-1 p-2">
            {modules.map((m) => (
              <li key={m.id}>
                <button
                  className={`w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all ${
                    m.active
                      ? "bg-[#FFC107] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]"
                      : m.done
                      ? "text-gray-400"
                      : "text-gray-600 hover:bg-[#F5F5F0]"
                  }`}
                >
                  {m.done ? (
                    <CheckCircle size={13} className="text-green-500 shrink-0" style={{ strokeWidth: 3 }} />
                  ) : m.active ? (
                    <div className="w-3 h-3 bg-[#0A0A0A] rounded-full shrink-0" />
                  ) : (
                    <Circle size={13} className="text-gray-300 shrink-0" />
                  )}
                  {m.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main workspace */}
        <main className="flex-1 overflow-auto p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FFC107] border-2 border-[#0A0A0A] px-3 py-1 text-xs font-black uppercase tracking-widest mb-2">
                Task 04 of 08
              </div>
              <h1 className="text-3xl font-black uppercase text-[#0A0A0A]">
                Database Schema Design
              </h1>
              <p className="text-gray-500 text-sm mt-1">Level 3 · Back-End Developer · 5 Requirements</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">Progress</p>
              <p className="text-2xl font-black text-[#0A0A0A]">{doneCount}/{requirements.length}</p>
            </div>
          </div>

          {/* Project brief */}
          <div className="bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-[#0A0A0A] mb-3">
              📋 Project Brief
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Design and implement a production-grade PostgreSQL database schema for a task management
              system. You will model user accounts, projects, tasks, and comments — ensuring proper
              normalization, referential integrity, and efficient indexing for anticipated query patterns.
              Your final submission must include migration scripts and complete documentation.
            </p>
          </div>

          {/* Requirements checklist */}
          <div className="bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0A0A0A]">
                ✅ Requirements
              </h2>
              <span className="text-xs font-black font-mono bg-[#FFC107] border-2 border-[#0A0A0A] px-2 py-0.5">
                {doneCount}/{requirements.length} done
              </span>
            </div>
            <ul className="space-y-3">
              {requirements.map((req, i) => (
                <li key={req.id} className="flex items-start gap-3">
                  <button
                    onClick={() => toggleItem(i)}
                    className={`mt-0.5 w-5 h-5 border-2 border-[#0A0A0A] shrink-0 flex items-center justify-center transition-colors ${
                      checklist[i] ? "bg-[#FFC107]" : "bg-white"
                    }`}
                    aria-label={`Toggle requirement ${i + 1}`}
                  >
                    {checklist[i] && <CheckCircle size={13} style={{ strokeWidth: 3 }} />}
                  </button>
                  <p className={`text-sm font-medium leading-snug ${checklist[i] ? "line-through text-gray-400" : "text-[#0A0A0A]"}`}>
                    {req.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission */}
          <div className="bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] p-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-[#0A0A0A] mb-4">
              🚀 Submit Assignment
            </h2>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Github size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  placeholder="https://github.com/your-username/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="input-brutal pl-10"
                  id="githubUrl"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-wider text-sm shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all whitespace-nowrap">
                <Send size={15} /> Ship Assignment
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              Make sure your repo is public and contains a README.
            </p>
          </div>
        </main>

        {/* Right panel — resources + mentor */}
        <aside className="w-56 bg-white border-l-2 border-[#0A0A0A] shrink-0 sticky top-0 h-screen overflow-y-auto">
          <div className="p-4 border-b-2 border-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <BookOpen size={14} />
              <h3 className="text-xs font-black uppercase tracking-widest">Learning Resources</h3>
            </div>
          </div>
          <div className="p-3 space-y-2">
            {resources.map((r) => (
              <a
                key={r.label}
                href="#"
                className="flex items-center justify-between p-3 border-2 border-[#0A0A0A] text-xs font-bold hover:bg-[#FFC107] transition-colors group"
              >
                <span className="leading-snug">{r.label}</span>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <span className="text-[9px] bg-[#F5F5F0] group-hover:bg-white px-1.5 py-0.5 font-black uppercase">{r.type}</span>
                  <ExternalLink size={10} />
                </div>
              </a>
            ))}
          </div>

          <div className="p-4 border-t-2 border-[#0A0A0A] mt-2">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={14} />
              <h3 className="text-xs font-black uppercase tracking-widest">Mentor Chat</h3>
            </div>
            <div className="bg-[#F5F5F0] border-2 border-[#0A0A0A] p-3 mb-2">
              <p className="text-[10px] font-bold text-gray-500">Mentor Rahul</p>
              <p className="text-xs text-[#0A0A0A] mt-1">
                &ldquo;Great work on Task 03! For the schema, think about query patterns first.&rdquo;
              </p>
            </div>
            <button className="w-full py-2 bg-[#0A0A0A] text-white text-xs font-black uppercase tracking-widest border-2 border-[#0A0A0A]">
              Open Chat
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
