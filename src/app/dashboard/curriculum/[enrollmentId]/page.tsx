"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardSidebar from "../../../components/DashboardSidebar";
import {
  CheckCircle,
  Circle,
  Github,
  Send,
  ExternalLink,
  BookOpen,
  Loader2,
  AlertCircle,
  ChevronRight,
  PlayCircle,
  FileText,
  Lock,
} from "lucide-react";
import { useSession } from "next-auth/react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Lesson {
  id: string;
  title: string;
  contentType: "VIDEO_UPLOAD" | "EXTERNAL_VIDEO" | "ARTICLE";
  isFree: boolean;
  videoDurationSeconds: number | null;
  externalUrl: string | null;
}

interface Section {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
  lessons: Lesson[];
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  taskType: "PROJECT" | "QUIZ";
  orderIndex: number;
  isRequired: boolean;
  passingScore: number | null;
  questions: { id: string }[];
}

interface Submission {
  id: string;
  taskId: string;
  status: "PENDING" | "PASSED" | "FAILED" | "NEEDS_REVISION";
  repoUrl: string | null;
  quizScore: number | null;
  reviewNotes: string | null;
}

interface Enrollment {
  id: string;
  durationMonths: number;
  progress: number;
  passedTasks: number;
  totalTasks: number;
  completedLessonIds: string[]; // backend must return this
  domain: {
    id: string;
    title: string;
    slug: string;
    iconUrl: string | null;
    sections: Section[];
    tasks: Task[];
  };
  submissions: Submission[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function lessonIcon(type: Lesson["contentType"]) {
  if (type === "ARTICLE") return <FileText size={12} className="shrink-0" />;
  return <PlayCircle size={12} className="shrink-0" />;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function statusBadge(status: Submission["status"]) {
  const map = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-300",
    PASSED: "bg-green-50 text-green-700 border-green-300",
    FAILED: "bg-red-50 text-red-700 border-red-300",
    NEEDS_REVISION: "bg-orange-50 text-orange-700 border-orange-300",
  };
  const label = {
    PENDING: "Under Review",
    PASSED: "Passed ✓",
    FAILED: "Failed",
    NEEDS_REVISION: "Needs Revision",
  };
  return (
    <span
      className={`text-[10px] font-black uppercase px-2 py-0.5 border ${map[status]}`}
    >
      {label[status]}
    </span>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CurriculumPage() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const router = useRouter();
  const { data: session } = useSession();

  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // lesson completion
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(
    new Set(),
  );
  const [completingLessonId, setCompletingLessonId] = useState<string | null>(
    null,
  );

  // submission state
  const [repoUrl, setRepoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // ── Fetch enrollment + curriculum ──
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/curriculum/${enrollmentId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setEnrollment(json.data);
        // Seed completed lessons from backend response
        if (Array.isArray(json.data.completedLessonIds)) {
          setCompletedLessonIds(new Set(json.data.completedLessonIds));
        }
        if (json.data.domain.tasks?.length > 0 && !activeTaskId) {
          setActiveTaskId(json.data.domain.tasks[0].id);
        }
        if (json.data.domain.sections?.length > 0 && !activeSection) {
          setActiveSection(json.data.domain.sections[0].id);
        }
      } else {
        setError(json.message ?? "Failed to load curriculum");
      }
    } catch {
      setError("Failed to load curriculum. Please try again.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrollmentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Mark lesson complete ──
  const handleLessonClick = async (lessonId: string) => {
    if (completedLessonIds.has(lessonId)) return; // already done, no-op
    setCompletingLessonId(lessonId);
    try {
      const res = await fetch(
        `/api/lessons/${enrollmentId}/${lessonId}/complete`,
        { method: "POST" },
      );
      const json = await res.json();
      if (json.success) {
        setCompletedLessonIds((prev) => new Set([...prev, lessonId]));
      }
    } catch {
      // silent — tick just won't appear; user can retry
    } finally {
      setCompletingLessonId(null);
    }
  };

  // ── Submit project ──
  const handleSubmitProject = async (taskId: string) => {
    if (!repoUrl.trim()) return;
    setSubmitting(true);
    setSubmitMsg(null);
    try {
      const res = await fetch("/api/submissions/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, taskId, repoUrl }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitMsg({
          type: "success",
          text: "Assignment submitted! We'll review it shortly.",
        });
        setRepoUrl("");
        fetchData();
      } else {
        setSubmitMsg({
          type: "error",
          text: json.message ?? "Submission failed.",
        });
      }
    } catch {
      setSubmitMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen bg-[var(--off-white)]">
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="animate-spin text-[#FFC107]" />
            <p className="font-bold uppercase tracking-widest text-sm text-[var(--gray-500)]">
              Loading curriculum…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !enrollment) {
    return (
      <div className="flex min-h-screen bg-[var(--off-white)]">
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-black uppercase mb-2">
              {error ?? "Curriculum not found"}
            </h2>
            <button
              onClick={() => router.push("/internships")}
              className="mt-4 px-6 py-3 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] font-black uppercase text-sm"
            >
              Browse Tracks
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { domain, submissions } = enrollment;
  const submissionMap = Object.fromEntries(
    submissions.map((s) => [s.taskId, s]),
  );
  const activeTask = domain.tasks.find((t) => t.id === activeTaskId) ?? null;
  const activeSubmission = activeTask ? submissionMap[activeTask.id] : null;
  const passedCount = submissions.filter((s) => s.status === "PASSED").length;

  return (
    <div className="flex min-h-screen bg-[var(--off-white)]">
      <DashboardSidebar
        userName={session?.user?.name?.split(" ")[0] ?? "there"}
        track={domain.title}
        progress={enrollment.progress}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left nav ─────────────────────────────────────────────────── */}
        <nav className="w-60 bg-[var(--white)] border-r-2 border-[var(--black)] flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
          <div className="p-4 border-b-2 border-[var(--black)]">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--gray-400)]">
              {enrollment.durationMonths} Month Track
            </p>
            <p className="font-black text-sm text-[var(--black)] mt-0.5 leading-tight">
              {domain.title}
            </p>
            <div className="mt-2 text-xs text-[var(--gray-500)] font-bold">
              {passedCount}/{domain.tasks.length} tasks passed
            </div>
          </div>

          {/* Sections */}
          {domain.sections.length > 0 && (
            <div className="border-b-2 border-[var(--black)]">
              <button
                onClick={() =>
                  setActiveSection(activeSection ? null : domain.sections[0].id)
                }
                className="w-full p-3 text-left flex items-center justify-between"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--gray-400)]">
                  Lessons
                </span>
                <BookOpen size={12} className="text-[var(--gray-400)]" />
              </button>
              {domain.sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() =>
                      setActiveSection(
                        activeSection === section.id ? null : section.id,
                      )
                    }
                    className="w-full text-left px-3 py-2 text-xs font-black uppercase tracking-wide flex items-center justify-between hover:bg-[var(--off-white)] transition-colors"
                  >
                    <span className="truncate pr-2">{section.title}</span>
                    <ChevronRight
                      size={12}
                      className={`shrink-0 transition-transform ${
                        activeSection === section.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {activeSection === section.id && (
                    <ul className="pb-1">
                      {section.lessons.map((lesson) => {
                        const done = completedLessonIds.has(lesson.id);
                        const completing = completingLessonId === lesson.id;
                        return (
                          <li key={lesson.id}>
                            <button
                              onClick={() => handleLessonClick(lesson.id)}
                              className={`w-full flex items-center gap-2 px-4 py-2 text-xs text-left transition-colors ${
                                done
                                  ? "bg-green-50 text-green-700"
                                  : "text-[var(--gray-600)] hover:bg-[#FFF9E6]"
                              }`}
                            >
                              <span className="shrink-0">
                                {completing ? (
                                  <Loader2
                                    size={12}
                                    className="animate-spin text-[var(--gray-400)]"
                                  />
                                ) : done ? (
                                  <CheckCircle
                                    size={12}
                                    className="text-green-500"
                                    style={{ strokeWidth: 3 }}
                                  />
                                ) : (
                                  lessonIcon(lesson.contentType)
                                )}
                              </span>
                              <span className="flex-1 truncate">
                                {lesson.title}
                              </span>
                              {lesson.videoDurationSeconds && (
                                <span className="text-[10px] text-[var(--gray-400)] font-mono shrink-0">
                                  {formatDuration(lesson.videoDurationSeconds)}
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tasks */}
          <div className="p-2 flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--gray-400)] px-2 py-2">
              Tasks
            </p>
            <ul className="space-y-1">
              {domain.tasks.map((task, i) => {
                const sub = submissionMap[task.id];
                const isActive = activeTaskId === task.id;
                return (
                  <li key={task.id}>
                    <button
                      onClick={() => setActiveTaskId(task.id)}
                      className={`w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all ${
                        isActive
                          ? "theme-fixed-yellow bg-[#FFC107] text-[var(--black)] border-2 border-[var(--black)] shadow-[2px_2px_0px_var(--black)]"
                          : "text-[var(--gray-600)] hover:bg-[var(--off-white)]"
                      }`}
                    >
                      {sub?.status === "PASSED" ? (
                        <CheckCircle
                          size={13}
                          className="text-green-500 shrink-0"
                          style={{ strokeWidth: 3 }}
                        />
                      ) : sub ? (
                        <div className="w-3 h-3 bg-yellow-400 rounded-full shrink-0" />
                      ) : (
                        <Circle size={13} className="text-[var(--gray-300)] shrink-0" />
                      )}
                      <span className="truncate">
                        {String(i + 1).padStart(2, "0")} {task.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* ── Main workspace ─────────────────────────────────────────────── */}
        <main className="flex-1 overflow-auto p-8 space-y-6">
          {activeTask ? (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] px-3 py-1 text-xs font-black uppercase tracking-widest mb-2">
                    {activeTask.taskType === "QUIZ" ? "Quiz" : "Project Task"} ·{" "}
                    {String(
                      domain.tasks.findIndex((t) => t.id === activeTask.id) + 1,
                    ).padStart(2, "0")}{" "}
                    of {String(domain.tasks.length).padStart(2, "0")}
                  </div>
                  <h1 className="text-3xl font-black uppercase text-[var(--black)]">
                    {activeTask.title}
                  </h1>
                  {activeSubmission && (
                    <div className="mt-2">
                      {statusBadge(activeSubmission.status)}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-xs font-black uppercase tracking-widest text-[var(--gray-400)]">
                    Progress
                  </p>
                  <p className="text-2xl font-black text-[var(--black)]">
                    {passedCount}/{domain.tasks.length}
                  </p>
                </div>
              </div>

              {activeTask.description && (
                <div className="bg-[var(--white)] border-2 border-[var(--black)] shadow-[4px_4px_0px_var(--black)] p-6">
                  <h2 className="text-sm font-black uppercase tracking-widest text-[var(--black)] mb-3">
                    📋 Task Brief
                  </h2>
                  <p className="text-sm text-[var(--gray-600)] leading-relaxed whitespace-pre-line">
                    {activeTask.description}
                  </p>
                </div>
              )}

              {activeTask.taskType === "QUIZ" && (
                <div className="bg-[var(--white)] border-2 border-[var(--black)] shadow-[4px_4px_0px_var(--black)] p-6">
                  <h2 className="text-sm font-black uppercase tracking-widest text-[var(--black)] mb-3">
                    🧠 Quiz
                  </h2>
                  <p className="text-sm text-[var(--gray-600)] mb-4">
                    This task has {activeTask.questions.length} question
                    {activeTask.questions.length !== 1 ? "s" : ""}. You need{" "}
                    {activeTask.passingScore ?? 70}% to pass.
                  </p>
                  {activeSubmission?.status === "PASSED" ? (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-300">
                      <CheckCircle size={20} className="text-green-600" />
                      <div>
                        <p className="font-black text-sm text-green-700">
                          Quiz Passed — {activeSubmission.quizScore}%
                        </p>
                        <p className="text-xs text-green-600">
                          Well done! Move on to the next task.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/quiz/${activeTask.id}?enrollmentId=${enrollmentId}`,
                        )
                      }
                      className="flex items-center gap-2 px-6 py-3 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] text-[var(--black)] font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_var(--black)] hover:shadow-[6px_6px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
                    >
                      {activeSubmission?.status === "FAILED"
                        ? "Retake Quiz"
                        : "Start Quiz"}{" "}
                      <ChevronRight size={15} />
                    </button>
                  )}
                  {activeSubmission?.status === "FAILED" && (
                    <p className="mt-3 text-sm text-red-600 font-medium">
                      Last attempt: {activeSubmission.quizScore}% — need{" "}
                      {activeTask.passingScore ?? 70}% to pass
                    </p>
                  )}
                </div>
              )}

              {activeTask.taskType === "PROJECT" && (
                <div className="bg-[var(--white)] border-2 border-[var(--black)] shadow-[4px_4px_0px_var(--black)] p-6">
                  <h2 className="text-sm font-black uppercase tracking-widest text-[var(--black)] mb-4">
                    🚀 Submit Assignment
                  </h2>
                  {activeSubmission?.reviewNotes && (
                    <div className="mb-4 p-4 bg-orange-50 border-2 border-orange-300">
                      <p className="text-xs font-black uppercase text-orange-700 mb-1">
                        Reviewer Feedback
                      </p>
                      <p className="text-sm text-orange-800">
                        {activeSubmission.reviewNotes}
                      </p>
                    </div>
                  )}
                  {activeSubmission?.repoUrl && (
                    <div className="mb-4 flex items-center gap-2 text-sm">
                      <span className="text-[var(--gray-500)] font-medium">
                        Last submission:
                      </span>
                      <a
                        href={activeSubmission.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[var(--black)] underline underline-offset-2 flex items-center gap-1"
                      >
                        {activeSubmission.repoUrl.replace(
                          "https://github.com/",
                          "",
                        )}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                  {submitMsg && (
                    <div
                      className={`mb-4 p-4 border-2 flex items-start gap-2 ${
                        submitMsg.type === "success"
                          ? "bg-green-50 border-green-300 text-green-700"
                          : "bg-red-50 border-red-300 text-red-700"
                      }`}
                    >
                      {submitMsg.type === "success" ? (
                        <CheckCircle size={16} className="shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm font-medium">{submitMsg.text}</p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Github
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]"
                      />
                      <input
                        type="url"
                        placeholder="https://github.com/your-username/repo"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-[var(--black)] bg-[var(--white)] font-medium text-sm focus:outline-none focus:bg-[#FFF9E6]"
                      />
                    </div>
                    <button
                      onClick={() => handleSubmitProject(activeTask.id)}
                      disabled={submitting || !repoUrl.trim()}
                      className="flex items-center gap-2 px-6 py-3 theme-fixed-yellow bg-[#FFC107] border-2 border-[var(--black)] text-[var(--black)] font-black uppercase tracking-wider text-sm shadow-[3px_3px_0px_var(--black)] hover:shadow-[5px_5px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <Send size={15} />
                      )}
                      Ship It
                    </button>
                  </div>
                  <p className="text-xs text-[var(--gray-400)] mt-2 font-medium">
                    Make sure your repo is public and contains a README.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <BookOpen size={40} className="text-[var(--gray-300)] mb-4" />
              <p className="font-black uppercase text-[var(--gray-400)]">
                Select a task from the sidebar to get started
              </p>
            </div>
          )}
        </main>

        {/* ── Right: lessons aside ──────────────────────────────────────── */}
        <aside className="w-56 bg-[var(--white)] border-l-2 border-[var(--black)] shrink-0 sticky top-0 h-screen overflow-y-auto">
          <div className="p-4 border-b-2 border-[var(--black)]">
            <div className="flex items-center gap-2">
              <BookOpen size={14} />
              <h3 className="text-xs font-black uppercase tracking-widest">
                All Lessons
              </h3>
            </div>
          </div>
          <div className="p-3 space-y-1">
            {domain.sections.flatMap((s) =>
              s.lessons.map((lesson) => {
                const done = completedLessonIds.has(lesson.id);
                const completing = completingLessonId === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson.id)}
                    className={`w-full flex items-start gap-2 p-3 border-2 border-[var(--black)] text-xs font-bold text-left transition-colors ${
                      done
                        ? "bg-green-50 border-green-300"
                        : "hover:bg-[#FFF9E6]"
                    }`}
                  >
                    <span className="text-[var(--gray-400)] mt-0.5 shrink-0">
                      {completing ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : done ? (
                        <CheckCircle
                          size={12}
                          className="text-green-500"
                          style={{ strokeWidth: 3 }}
                        />
                      ) : (
                        lessonIcon(lesson.contentType)
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="leading-snug truncate">{lesson.title}</p>
                      {lesson.videoDurationSeconds && (
                        <p className="text-[10px] text-[var(--gray-400)] font-mono mt-0.5">
                          {formatDuration(lesson.videoDurationSeconds)}
                        </p>
                      )}
                    </div>
                    {!done && (
                      <Lock size={10} className="text-[var(--gray-300)] shrink-0 mt-1" />
                    )}
                  </button>
                );
              }),
            )}
            {domain.sections.flatMap((s) => s.lessons).length === 0 && (
              <p className="text-xs text-[var(--gray-400)] font-medium p-2">
                No lessons added yet.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
