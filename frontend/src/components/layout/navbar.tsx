import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/logo";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center space-x-2.5">
          <BrandLogo size={36} className="h-9 w-9" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            InterviewPrep<span className="text-indigo-600">.AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-indigo-600 transition-colors">
            Adaptive Engine
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
            Dashboard Preview
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-slate-700">
              Log in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center space-x-1.5">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
