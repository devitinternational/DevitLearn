"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import DashboardSidebar from "../../../components/DashboardSidebar";
import { ChevronRight, ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface QuizOption {
  id: string;
  text: string;
  orderIndex: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  orderIndex: number;
  explanation: string | null;
  options: QuizOption[];
}

interface QuizTask {
  id: string;
  title: string;
  description: string | null;
  passingScore: number | null;
  questions: QuizQuestion[];
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function QuizPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const enrollmentId = searchParams.get("enrollmentId") ?? "";

  const [task, setTask] = useState<QuizTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // { questionId: optionId }
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    correct: number;
    total: number;
    passed: boolean;
    passingScore: number;
  } | null>(null);

  // ── Fetch quiz task ──
  const fetchQuiz = useCallback(async () => {
    try {
      const res = await fetch(`/api/quiz/${taskId}?enrollmentId=${enrollmentId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setTask(json.data);
      } else {
        setError(json.message ?? "Quiz not found");
      }
    } catch {
      setError("Failed to load quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [taskId, enrollmentId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  // ── Submit quiz ──
  const handleSubmit = async () => {
    if (!task) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/submissions/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, taskId, answers }),
      });
      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      } else {
        setError(json.message ?? "Submission failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F5F5F0]">
        <DashboardSidebar userName={session?.user?.name?.split(" ")[0]} />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#FFC107]" />
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="flex min-h-screen bg-[#F5F5F0]">
        <DashboardSidebar userName={session?.user?.name?.split(" ")[0]} />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-black uppercase mb-2">{error ?? "Quiz not found"}</h2>
            <button
              onClick={() => router.back()}
              className="mt-4 px-6 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] font-black uppercase text-sm"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const questions = task.questions;
  const q = questions[current];
  const isLast = current === questions.length - 1;
  const allAnswered = questions.every((q) => answers[q.id]);
  const passingScore = task.passingScore ?? 70;

  // ── Results screen ──
  if (result) {
    const passed = result.passed;
    return (
      <div className="flex min-h-screen bg-[#F5F5F0]">
        <DashboardSidebar userName={session?.user?.name?.split(" ")[0]} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full border-2 border-[#0A0A0A] bg-white shadow-[8px_8px_0px_#0A0A0A] p-8 text-center">
            <div
              className={`w-20 h-20 mx-auto mb-6 border-2 border-[#0A0A0A] flex items-center justify-center text-4xl ${
                passed ? "bg-[#FFC107]" : "bg-[#F5F5F0]"
              }`}
            >
              {passed ? "🏆" : "📚"}
            </div>
            <h2 className="text-3xl font-black uppercase text-[#0A0A0A] mb-2">
              {passed ? "Quiz Passed!" : "Not Quite Yet"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {passed
                ? `Great work! You've passed the "${task.title}" quiz.`
                : `You need ${passingScore}% to pass. Review the material and try again.`}
            </p>
            <div className="bg-[#F5F5F0] border-2 border-[#0A0A0A] p-4 mb-6">
              <div className="text-6xl font-black text-[#0A0A0A]">
                {result.score}%
              </div>
              <p className="text-sm text-gray-500 mt-1 font-bold">
                {result.correct} / {result.total} Correct
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Passing score: {passingScore}%
              </p>
            </div>

            {/* Show correct answers */}
            <div className="text-left mb-6 space-y-3">
              {questions.map((question, i) => {
                const selectedId = answers[question.id];
                const selectedOption = question.options.find(
                  (o) => o.id === selectedId
                );
                // Note: we don't show isCorrect here since we don't expose it from backend
                return (
                  <div
                    key={question.id}
                    className="border border-gray-200 p-3 text-xs"
                  >
                    <p className="font-bold text-[#0A0A0A] mb-1">
                      Q{i + 1}: {question.question}
                    </p>
                    <p className="text-gray-500">
                      Your answer:{" "}
                      <span className="font-bold">
                        {selectedOption?.text ?? "—"}
                      </span>
                    </p>
                    {question.explanation && (
                      <p className="text-gray-400 mt-1 italic">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              {!passed && (
                <button
                  onClick={() => {
                    setResult(null);
                    setCurrent(0);
                    setAnswers({});
                  }}
                  className="flex-1 py-3 border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm hover:bg-[#F5F5F0]"
                >
                  Retake
                </button>
              )}
              <button
                onClick={() =>
                  router.push(`/dashboard/curriculum/${enrollmentId}`)
                }
                className="flex-1 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black uppercase tracking-widest text-sm shadow-[3px_3px_0px_#0A0A0A] flex items-center justify-center"
              >
                Back to Curriculum
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── Quiz question screen ──
  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar userName={session?.user?.name?.split(" ")[0]} />

      <main className="flex-1 flex flex-col p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FFC107] px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-[#0A0A0A]">
              {task.title}
            </div>
            <span className="text-sm font-black font-mono text-gray-500">
              {current + 1} of {questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 border-2 border-[#0A0A0A] transition-colors ${
                  answers[questions[i].id]
                    ? "bg-[#FFC107]"
                    : i === current
                    ? "bg-[#FFC107]/40"
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
            <h2 className="text-xl font-black text-[#0A0A0A] leading-snug">
              {q.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {q.options.map((opt, i) => {
              const isSelected = answers[q.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))
                  }
                  className={`w-full text-left flex items-center gap-4 p-4 border-2 border-[#0A0A0A] font-bold text-sm transition-all ${
                    isSelected
                      ? "bg-[#FFC107] shadow-[4px_4px_0px_#0A0A0A] -translate-x-[1px] -translate-y-[1px]"
                      : "bg-white hover:bg-[#FFF9E6] shadow-[2px_2px_0px_#0A0A0A] hover:shadow-[4px_4px_0px_#0A0A0A]"
                  }`}
                >
                  <span
                    className={`w-7 h-7 border-2 border-[#0A0A0A] flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected ? "bg-[#0A0A0A] text-[#FFC107]" : "bg-[#F5F5F0]"
                    }`}
                  >
                    {["A", "B", "C", "D", "E"][i]}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (current > 0) setCurrent(current - 1);
              }}
              disabled={current === 0}
              className="flex items-center gap-2 px-5 py-3 border-2 border-[#0A0A0A] text-sm font-black uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F5F5F0] transition-colors"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <div className="flex-1" />

            {isLast ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered || submitting}
                className="flex items-center gap-2 px-8 py-3 bg-[#FFC107] border-2 border-[#0A0A0A] text-[#0A0A0A] text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Submit Quiz 🏁"
                )}
              </button>
            ) : (
              <button
                onClick={() => setCurrent(current + 1)}
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