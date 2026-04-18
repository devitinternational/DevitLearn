import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { backendFetch } from "@/lib/backend";

/**
 * /dashboard/curriculum — redirects to /dashboard/curriculum/[enrollmentId]
 * If not enrolled, redirects to internships page.
 */
export default async function CurriculumRedirectPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  try {
    const res = await backendFetch("/api/enrollments/active");
    const json = await res.json();

    if (json.success && json.data?.id) {
      redirect(`/dashboard/curriculum/${json.data.id}`);
    }
  } catch {
    // fall through
  }

  redirect("/internships");
}