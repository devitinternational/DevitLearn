import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { backendFetch } from "@/lib/backend";

/**
 * /dashboard/quiz — redirects to the first QUIZ task that hasn't been passed yet.
 * Falls back to /dashboard if no quiz tasks exist.
 */
export default async function QuizRedirectPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  try {
    // 1. Get active enrollment
    const enrollRes = await backendFetch("/api/enrollments/active");
    const enrollJson = await enrollRes.json();
    if (!enrollJson.success || !enrollJson.data?.id) redirect("/internships");

    const enrollmentId = enrollJson.data.id;

    // 2. Get full curriculum (has tasks + submissions)
    const currRes = await backendFetch(
      `/api/enrollments/${enrollmentId}/curriculum`
    );
    const currJson = await currRes.json();
    if (!currJson.success || !currJson.data) redirect("/dashboard");

    const tasks: Array<{ id: string; taskType: string }> =
      currJson.data.domain.tasks ?? [];
    const submissions: Array<{ taskId: string; status: string }> =
      currJson.data.submissions ?? [];

    const passedTaskIds = new Set(
      submissions.filter((s) => s.status === "PASSED").map((s) => s.taskId)
    );

    // 3. Find first unpassed QUIZ task
    const firstQuiz = tasks.find(
      (t) => t.taskType === "QUIZ" && !passedTaskIds.has(t.id)
    );

    if (firstQuiz) {
      redirect(
        `/dashboard/quiz/${firstQuiz.id}?enrollmentId=${enrollmentId}`
      );
    }

    // All quizzes done — go back to curriculum
    redirect(`/dashboard/curriculum/${enrollmentId}`);
  } catch {
    redirect("/dashboard");
  }
}