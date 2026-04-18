import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET() {
  try {
    const res = await backendFetch("/api/enrollments/active");
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("No session token")) {
      return NextResponse.json({ success: false, data: null }, { status: 200 });
    }
    return NextResponse.json({ success: false, data: null }, { status: 500 });
  }
}