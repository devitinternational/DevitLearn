// app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logoutUser } from "@/actions/auth.action";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-[#F5E642] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-8 mb-4">
          <h1 className="text-3xl font-black">
            Welcome, {session.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            {session.user.email} · {session.user.role}
          </p>
        </div>

        <form action={logoutUser}>
          <button
            type="submit"
            className="bg-black text-[#F5E642] font-black px-6 py-3 border-4 border-black
                       shadow-[4px_4px_0px_0px_#555] hover:translate-x-[2px] hover:translate-y-[2px]
                       hover:shadow-none transition-all"
          >
            Sign Out
          </button>
        </form>
      </div>
    </main>
  );
}