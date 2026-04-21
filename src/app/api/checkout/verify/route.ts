import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

/**
 * POST /api/checkout/verify
 * Thin proxy: reads session cookie, forwards to backend POST /api/payments/verify
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await backendFetch("/api/payments/verify", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("No session token")) {
      return NextResponse.json(
        { success: false, message: "Please log in to continue." },
        { status: 401 }
      );
    }
    console.error("checkout/verify proxy error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to verify payment." },
      { status: 500 }
    );
  }
}