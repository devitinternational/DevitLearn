import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ enrollmentId: string; lessonId: string }> }
) {
  try {
    const { enrollmentId, lessonId } = await params;
    const res = await backendFetch(
      `/api/enrollments/${enrollmentId}/lessons/${lessonId}/complete`,
      { method: "POST" }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: "Failed" }, { status: 500 });
  }
}