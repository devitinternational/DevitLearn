import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

/**
 * GET /api/quiz/[taskId]?enrollmentId=xxx
 *
 * Fetches a QUIZ task's questions from the backend via the curriculum endpoint,
 * then strips `isCorrect` from options so answers aren't exposed to the client.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const enrollmentId = req.nextUrl.searchParams.get("enrollmentId");
    if (!enrollmentId) {
      return NextResponse.json(
        { success: false, message: "enrollmentId is required" },
        { status: 400 }
      );
    }

    // Fetch full curriculum — contains all tasks with questions
    const res = await backendFetch(
      `/api/enrollments/${enrollmentId}/curriculum`
    );
    const data = await res.json();

    if (!data.success || !data.data) {
      return NextResponse.json(data, { status: res.status });
    }

    // Find the specific task
    const task = data.data.domain.tasks?.find(
      (t: { id: string; taskType: string }) =>
        t.id === params.taskId && t.taskType === "QUIZ"
    );

    if (!task) {
      return NextResponse.json(
        { success: false, message: "Quiz task not found" },
        { status: 404 }
      );
    }

    // ⚠️ STRIP isCorrect from every option before sending to browser
    const sanitized = {
      ...task,
      questions: task.questions.map(
        (q: {
          id: string;
          question: string;
          orderIndex: number;
          explanation: string | null;
          options: { id: string; text: string; orderIndex: number; isCorrect: boolean }[];
        }) => ({
          id: q.id,
          question: q.question,
          orderIndex: q.orderIndex,
          explanation: q.explanation,
          options: q.options.map(
            (o: { id: string; text: string; orderIndex: number }) => ({
              id: o.id,
              text: o.text,
              orderIndex: o.orderIndex,
              // isCorrect intentionally omitted
            })
          ),
        })
      ),
    };

    return NextResponse.json({ success: true, data: sanitized });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("No session token")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}