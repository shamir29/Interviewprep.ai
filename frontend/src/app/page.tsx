import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Target,
  FileText,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Terminal,
  MessagesSquare,
  Layers,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 border-b border-slate-200/80 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-8 text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3.5 py-1 text-xs font-semibold text-indigo-700 mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Generation Adaptive Interview Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
              Prepare smarter. <br />
              <span className="text-indigo-600">Practice what you actually need.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
              An AI-powered adaptive interview preparation platform that analyzes your skills, resume,
              and performance to create personalized technical quizzes, mock interviews,
              coding practice, and study plans.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 h-12 shadow-sm flex items-center space-x-2">
                  <span>Start Preparing</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 border-slate-200 text-slate-700 hover:bg-slate-50">
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Teaser Feature Cards Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
              <div className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-4">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Adaptive Weighting</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Weak in DSA or SQL JOINs? Future quizzes automatically weight topics to fix your weak points.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">PDF Resume Parsing</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  PDFBox extracts your verified stack and projects to simulate authentic recruiter-style questioning.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50">
                <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                  <Terminal className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Docker Code Sandbox</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Execute Java, Python, C++, and JavaScript in secure, resource-bounded Docker containers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Adaptive Engine Showcase */}
        <section id="how-it-works" className="py-20 border-b border-slate-200/80">
          <div className="container mx-auto max-w-7xl px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-3">Deterministic & Explainable</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                How the Adaptive AI Engine Works
              </h2>
              <p className="mt-3 text-slate-600">
                The platform actively learns from your past answers and redistributes preparation weights to maximize score gains.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              {/* Initial State */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">1. Initial Performance Analysis</CardTitle>
                    <Badge variant="outline">Round 1</Badge>
                  </div>
                  <CardDescription>Accuracy across detected core competencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Java Core</span>
                      <span className="text-emerald-600">85% (Strong)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Spring Boot</span>
                      <span className="text-indigo-600">78% (Good)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>SQL & Relational DB</span>
                      <span className="text-amber-600">65% (Needs Practice)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>DSA (Linked List & Trees)</span>
                      <span className="text-red-600 font-bold">42% (Critical Weakness)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dynamic Next Quiz Allocation */}
              <Card className="border-indigo-200 bg-indigo-50/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold text-indigo-950">
                      2. Dynamically Adapted Next Quiz
                    </CardTitle>
                    <Badge variant="default">AI Rebalanced</Badge>
                  </div>
                  <CardDescription>
                    Automatic weight adjustment based on failure velocity & weaknesses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3.5 text-sm">
                  <div className="p-3 rounded-lg bg-white border border-indigo-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">DSA Weight</span>
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">35% (+15% boosted)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">SQL Queries</span>
                    <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">20% (Reinforcing)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Java / Spring / React</span>
                    <span className="font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">15% each (Maintained)</span>
                  </div>

                  <div className="text-xs text-indigo-900 bg-indigo-100/60 p-3 rounded-md mt-2 flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Why this quiz?</strong> DSA increased because recent accuracy is 42%. Java maintained at 15% to retain mastery without wasting time.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                End-to-End Interview Readiness Architecture
              </h2>
              <p className="mt-3 text-slate-600">
                Engineered for serious software engineering candidates aiming for top-tier roles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-2">
                    <Target className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Target Role Precision</CardTitle>
                  <CardDescription>
                    Tailored paths for Java Full Stack, Backend, React, AI Engineer, and more.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-2">
                    <MessagesSquare className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Multi-Turn AI Mock Interviews</CardTitle>
                  <CardDescription>
                    Dynamic follow-ups that challenge your rationale rather than reciting fixed static questions.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Interview Readiness Metric</CardTitle>
                  <CardDescription>
                    A comprehensive score calculated from technical accuracy, consistency, and topic coverage.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
