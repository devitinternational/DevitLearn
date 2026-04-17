import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white text-[#0A0A0A] antialiased">
        {children}
      </body>
    </html>
  );
}
