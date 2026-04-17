import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "DevIt Internship Platform — Build Real. Grow Fast.",
  description:
    "Join DevIt's internship program. Choose your domain, complete project-based tasks, earn a verifiable certificate. Python, Java, C++, Front-End, Back-End and more.",
  keywords: ["internship", "developer internship", "coding internship", "DevIt", "software development", "certificate"],
  openGraph: {
    title: "DevIt Internship Platform",
    description: "Real projects. Real skills. Real certificates.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="bg-white text-[#0A0A0A] antialiased">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
