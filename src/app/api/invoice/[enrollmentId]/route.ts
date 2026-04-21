import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

/**
 * GET /api/invoice/[enrollmentId]
 * Fetches a signed invoice PDF URL from backend, then redirects to it.
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ enrollmentId: string }> }
) {
  try {
    const { enrollmentId } = await context.params;

    const res = await backendFetch(
      `/api/payments/invoice/${enrollmentId}`
    );

    const data = await res.json();

    if (!data.success || !data.data?.url) {
      return NextResponse.json(
        { success: false, message: "Invoice not found" },
        { status: 404 }
      );
    }

    // Redirect to presigned R2 URL
    return NextResponse.redirect(data.data.url);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message.includes("No session token")) {
      return NextResponse.json(
        { success: false, message: "Please log in to continue." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to fetch invoice." },
      { status: 500 }
    );
  }
}