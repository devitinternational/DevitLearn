"use client";

import DashboardSidebar from "../../components/DashboardSidebar";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Which HTTP method is most appropriate for creating a new resource via a REST API?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correct: 1,
  },
  {
    id: 2,
    question: "What does JWT stand for?",
    options: ["JavaScript Web Token", "JSON Web Token", "Java Web Toolkit", "JSON Wide Token"],
    correct: 1,
  },
  {
    id: 3,
    question: "Which SQL clause is used to filter records after grouping?",
    options: ["WHERE", "FILTER", "HAVING", "GROUP BY"],
    correct: 2,
  },
  {
    id: 4,
    question: "What is the typical HTTP status code for a successful POST request that creates a resource?",
    options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
    correct: 1,
  },
  {
    id: 5,
    question: "In Express.js, middleware functions receive how many arguments by default?",
    options: ["1", "2", "3", "4"],
    correct: 2,
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const allAnswered = answers.every((a) => a !== null);
  const score = answers.reduce<number>((acc, a, i) => (a === questions[i].correct ? acc + 1 : acc), 0);

  const handleSelect = (i: number) => {
    if (submitted) return;
    setSelected(i);
    const updated = [...answers];
    updated[current] = i;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(answers[current + 1]);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1]);
    }
  };

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <div className="flex min-h-screen bg-[#F5F5F0]">
        <DashboardSidebar userName="Alex" track="Back-End Developer" progress={68} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full border-2 border-[#0A0A0A] bg-white shadow-[8px_8px_0px_#0A0A0A] p-8 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 border-2 border-[#0A0A0A] flex items-center justify-center text-4xl ${passed ? "bg-[#FFC107]" : "bg-[#F5F5F0]"}`}>
              {passed ? "🏆" : "📚"}
            </div>
            <h2 className="text-3xl font-black uppercase text-[#0A0A0A] mb-2">
              {passed ? "Quiz Passed!" : "Not Quite Yet"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {passed
                ? "Great work! You've passed Module 3 quiz."
                : "You need 70% to pass. Review the material and try again."}
            </p>
            <div className="bg-[#F5F5F0] border-2 border-[#0A0A0A] p-4 mb-6">
              <div className="text-6xl font-black text-[#0A0A0A]">{pct}%</div>
              <p className="text-sm text-gray-500 mt-1 font-bold">
                {score} / {questions.length} Correct
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setSubmitted(false); setCurrent(0); setAnswers(new Array(questions.length).fill(null)); setSelected(null); }}
                className="flex-1 py-3 border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm hover:bg-[#F5F5F0]"
              >
                Retake
              </button>
              <a
                href="/dashboard"
                className="flex-1 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[3px_3px_0px_#0A0A0A] flex items-center justify-center"
              >
                Dashboard
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar userName="Alex" track="Back-End Developer" progress={68} />

      <main className="flex-1 flex flex-col p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FFC107] px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-[#0A0A0A]">
              Module 3 · REST APIs & Auth
            </div>
            <span className="text-sm font-black font-mono text-gray-500">
              {current + 1} of {questions.length}
            </span>
          </div>

          {/* Progress bar — question-by-question */}
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 border-2 border-[#0A0A0A] ${
                  i < current
                    ? "bg-[#FFC107]"
                    : i === current
                    ? "bg-[#FFC107]/50"
                    : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
          <div className="bg-white border-2 border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] p-8 mb-6">
            <div className="text-xs font-black uppercase tracking-widest text-[#FFC107] mb-3">
              Question {current + 1}
            </div>
            <h2 className="text-xl font-black text-[#0A0A0A] leading-snug">{q.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left flex items-center gap-4 p-4 border-2 border-[#0A0A0A] font-bold text-sm transition-all ${
                    isSelected
                      ? "bg-[#FFC107] shadow-[4px_4px_0px_#0A0A0A] -translate-x-[1px] -translate-y-[1px]"
                      : "bg-white hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#0A0A0A] hover:shadow-[4px_4px_0px_#0A0A0A]"
                  }`}
                >
                  <span className={`w-7 h-7 border-2 border-[#0A0A0A] flex items-center justify-center text-xs font-black shrink-0 ${isSelected ? "bg-[#0A0A0A] text-[#FFC107]" : "bg-[#F5F5F0]"}`}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="flex items-center gap-2 px-5 py-3 border-2 border-[#0A0A0A] text-sm font-black uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F5F5F0] transition-colors"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <div className="flex-1" />

            {isLast ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="flex items-center gap-2 px-8 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz 🏁
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
