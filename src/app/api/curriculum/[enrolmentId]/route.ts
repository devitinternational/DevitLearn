import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET(
  _req: NextRequest,
  { params }: { params: { enrollmentId: string } }
) {
  try {
    const res = await backendFetch(
      `/api/enrollments/${params.enrollmentId}/curriculum`
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("No session token")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Failed to fetch curriculum" }, { status: 500 });
  }
}