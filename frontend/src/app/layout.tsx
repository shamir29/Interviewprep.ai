import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InterviewPrep AI - Agentic AI Interview Preparation Platform",
  description: "Prepare smarter with personalized adaptive technical quizzes, real-time mock interviews, Docker code sandbox, and intelligent weakness detection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="h-full flex flex-col antialiased text-slate-900 bg-[#f8fafc] font-sans">
        {children}
      </body>
    </html>
  );
}
