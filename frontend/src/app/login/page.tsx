"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/ui/logo";
import { authService } from "@/lib/auth";
import {
  Sparkles,
  ArrowRight,
  Globe,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(true);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [region, setRegion] = useState("US");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const res = await authService.login(email, password);
      if (res.success) {
        setSuccessMsg("Signed in successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 700);
      } else {
        setErrorMsg(res.message);
        setIsLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected login error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#fafbfc] overflow-hidden text-slate-900 font-sans">
      {/* LEFT SIDE: Form & Branding (55% on desktop) */}
      <div className="w-full lg:w-[54%] min-h-screen p-6 sm:p-10 lg:p-14 flex flex-col justify-between z-10">
        {/* Brand Header */}
        <div>
          <Link href="/" className="inline-flex items-center space-x-2.5">
            <BrandLogo size={36} className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              InterviewPrep<span className="text-[#6d28d9]">.AI</span>
            </span>
          </Link>
        </div>

        {/* Main Content Form Block */}
        <div className="my-auto py-8 max-w-md w-full mx-auto lg:mx-0 lg:ml-8">
          {/* Bold Vanta-Style Headline */}
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight mb-8">
            Welcome back!
          </h1>

          {/* Floating Minimalist Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 space-y-5">
            <h2 className="text-lg font-bold text-slate-900">
              Sign into InterviewPrep AI
            </h2>

            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2 animate-pulse">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">
                  Enter your email address
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.hunter@example.com"
                  className="h-11 bg-white border-slate-200 rounded-xl text-sm focus-visible:ring-[#6d28d9] focus-visible:border-[#6d28d9]"
                />
              </div>

              {/* Password Input */}
              {showPasswordField && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-600">
                      Enter your password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPasswordText(!showPasswordText)}
                      className="text-[11px] text-slate-400 hover:text-slate-700 font-medium"
                    >
                      {showPasswordText ? "Hide" : "Show"}
                    </button>
                  </div>
                  <Input
                    type={showPasswordText ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 bg-white border-slate-200 rounded-xl text-sm focus-visible:ring-[#6d28d9]"
                  />
                </div>
              )}

              {/* Purple Pill Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-semibold rounded-xl shadow-md shadow-purple-600/15 transition-all flex items-center justify-center space-x-2 mt-2"
              >
                <span>{isLoading ? "Signing in..." : "Continue with email"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Bottom Card Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-slate-500">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#6d28d9] font-bold hover:underline">
                  Create account.
                </Link>
              </div>

              {/* Region Pill */}
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-100">
                <Globe className="h-3.5 w-3.5 text-slate-500" />
                <span>{region}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-xs text-slate-400">
          © {new Date().getFullYear()} InterviewPrep AI • Enterprise Adaptive Intelligence
        </div>
      </div>

      {/* RIGHT SIDE: Organic Coral/Indigo Illustration Art Backdrop */}
      <div className="hidden lg:flex w-[46%] min-h-screen relative items-center justify-center p-8 xl:p-12 overflow-hidden bg-gradient-to-br from-[#e05646] via-[#d64535] to-[#c23627]">
        {/* Subtle Organic Curve on Left Edge */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg
            className="absolute -left-1 top-0 h-full w-20 text-[#fafbfc] fill-current opacity-90"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L100,0 C30,35 60,65 100,100 L0,100 Z" />
          </svg>
        </div>

        {/* Mascot & Clean Text Directly on Color (NO BOXES) */}
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center space-y-6 ml-auto mr-4 xl:mr-14 pl-6">
          {/* Mascot Image */}
          <div className="relative w-64 h-64 xl:w-72 xl:h-72 rounded-3xl overflow-hidden shadow-2xl bg-white border-2 border-white/30">
            <Image
              src="/images/auth-mascot.jpg"
              alt="InterviewPrep AI Mascot"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Clean Typography Directly on Solid Color */}
          <div className="space-y-2 text-white text-center">
            <h3 className="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
              Adaptive Interview Intelligence
            </h3>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-xs mx-auto">
              Targeted drills, real-time mock interviews, and PDF resume extraction designed for top-tier software engineers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
