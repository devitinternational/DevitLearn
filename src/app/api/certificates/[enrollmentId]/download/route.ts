import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

/**
 * GET /api/certificates/[enrollmentId]/download
 * Proxies to backend GET /api/certificates/enrollment/:enrollmentId/download
 * Backend auto-heals if pdfUrl is null (regenerates + uploads).
 * Returns a presigned R2 URL → we redirect to it.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ enrollmentId: string }> }
) {
  try {
    const { enrollmentId } = await params;
    const res = await backendFetch(
      `/api/certificates/enrollment/${enrollmentId}/download`
    );
    const data = await res.json();

    if (!data.success || !data.data?.url) {
      return NextResponse.json(
        { success: false, message: data.message ?? "Certificate not available" },
        { status: res.status }
      );
    }

    // Redirect directly to the presigned R2 URL so the browser downloads the PDF
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
      { success: false, message: "Failed to get certificate PDF" },
      { status: 500 }
    );
  }
}