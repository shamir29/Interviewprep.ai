import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-sm text-slate-500">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-white font-bold">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-semibold text-slate-900">InterviewPrep AI</span>
          <span className="text-xs text-slate-400">© 2026 All rights reserved.</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
            Dashboard
          </Link>
          <a
            href="http://localhost:8080/swagger-ui/index.html"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            Swagger API
          </a>
          <a
            href="http://localhost:8080/api/health"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            System Health
          </a>
        </div>
      </div>
    </footer>
  );
}
