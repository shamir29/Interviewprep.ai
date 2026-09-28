"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Sliders,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  FileCode,
  Layers,
  Flame,
  Award,
  BookOpen,
  Code2,
  Database,
  Search,
  Check,
} from "lucide-react";

const TARGET_ROLES = [
  "Java Full Stack Developer",
  "Backend Engineer (Java/Spring)",
  "Campus Placement / Online Assessment (OA)",
  "Frontend Engineer (React/Next.js)",
  "Data Analyst & SQL Specialist",
  "AI / Machine Learning Engineer",
];

const QUESTION_FORMATS = [
  { id: "MCQ", label: "Multiple Choice (MCQ)", desc: "Core concepts, memory models & deep JVM/cloud trivia", icon: BrainCircuit },
  { id: "APTITUDE", label: "Quantitative Aptitude", desc: "Time & work, probability, permutations, speed & distance", icon: Award },
  { id: "LOGICAL", label: "Logical Reasoning & Puzzles", desc: "Syllogisms, blood relations, coding-decoding, and sequences", icon: Sparkles },
  { id: "SQL", label: "SQL & Query Optimization", desc: "Window functions, execution plans, and composite indexes", icon: Database },
  { id: "DSA", label: "DSA & Algorithmic Scenarios", desc: "Two-pointer, dynamic programming, and trade-off selections", icon: Layers },
  { id: "DEBUGGING", label: "Code Debugging & Traps", desc: "Locate concurrency, race conditions, and memory leaks", icon: Code2 },
  { id: "SCENARIO", label: "System Design Scenarios", desc: "Rate limiting, caching layer, and distributed locking", icon: Target },
];

export default function QuizHubPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["MCQ", "SQL", "DEBUGGING", "SCENARIO"]);
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD" | "ADAPTIVE">("ADAPTIVE");
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleFormat = (formatId: string) => {
    if (selectedFormats.includes(formatId)) {
      if (selectedFormats.length > 1) {
        setSelectedFormats(selectedFormats.filter((f) => f !== formatId));
      }
    } else {
      setSelectedFormats([...selectedFormats, formatId]);
    }
  };

  const handleStartAdaptiveQuiz = () => {
    setIsGenerating(true);
    setTimeout(() => {
      router.push("/quiz/adaptive-session-1");
    }, 700);
  };

  return (
    <AppLayout fullWidth>
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Top Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3.5 py-1 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Multi-Agent Adaptive Learning Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Adaptive Quiz Generator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Generate customizable technical assessments dynamically weighted toward your historical weakness points, ensuring maximum preparation efficiency.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleStartAdaptiveQuiz}
              disabled={isGenerating}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md px-8 h-12 font-semibold flex items-center space-x-2 shrink-0"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>{isGenerating ? "Building Personalized Quiz..." : "Quick 5-Min Adaptive Quiz"}</span>
            </Button>
          </div>
        </div>

        {/* 2-Column Wide Layout (8 cols config, 4 cols weight telemetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Configuration Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-lg font-bold flex items-center space-x-2 text-slate-900">
                  <Sliders className="h-5 w-5 text-indigo-600" />
                  <span>Customize Quiz Session</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Configure your target role and technical domains. The AI balances weak points automatically.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Role Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
                    1. Target Job Role
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {TARGET_ROLES.map((role) => {
                      const isSelected = selectedRole === role;
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-500/20 shadow-sm"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white text-slate-700 font-medium"
                          }`}
                        >
                          <span>{role}</span>
                          {isSelected && <Check className="h-4 w-4 text-indigo-600 shrink-0 ml-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Formats */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
                    2. Question Formats & Exercise Types
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {QUESTION_FORMATS.map((fmt) => {
                      const isSelected = selectedFormats.includes(fmt.id);
                      const Icon = fmt.icon;
                      return (
                        <div
                          key={fmt.id}
                          onClick={() => toggleFormat(fmt.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3.5 ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-500 shadow-sm"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white text-slate-600"
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs sm:text-sm">{fmt.label}</span>
                              <div
                                className={`h-4 w-4 rounded flex items-center justify-center text-xs ${
                                  isSelected ? "bg-indigo-600 text-white" : "border border-slate-300"
                                }`}
                              >
                                {isSelected && "✓"}
                              </div>
                            </div>
                            <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">{fmt.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulty & Count Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      3. Difficulty Level
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl">
                      {(["ADAPTIVE", "EASY", "MEDIUM", "HARD"] as const).map((diff) => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => setDifficulty(diff)}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${
                            difficulty === diff
                              ? "bg-white text-indigo-700 shadow-sm"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      4. Question Count
                    </label>
                    <div className="flex items-center space-x-2">
                      {[5, 10, 15, 20].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setQuestionCount(count)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                            questionCount === count
                              ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {count} Qs
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Launch Bar */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs sm:text-sm text-slate-500 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-indigo-600" />
                    <span>Estimated Duration: ~{questionCount * 2} minutes with AI debrief</span>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleStartAdaptiveQuiz}
                    disabled={isGenerating}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 h-12 shadow-sm"
                  >
                    <span>{isGenerating ? "Synthesizing Pool..." : "Launch Quiz Session"}</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar: AI Weight Allocation Breakdown (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-slate-200 bg-gradient-to-b from-white to-indigo-50/20 shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>AI Topic Weight Balance</span>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    Live Telemetry
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Questions are distributed based on your accuracy profile:
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span className="text-rose-600 font-bold flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5" /> Java Multithreading & JMM
                    </span>
                    <span className="font-bold text-slate-900">35%</span>
                  </div>
                  <Progress value={35} className="h-2 bg-slate-200" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span className="text-amber-600 font-bold">SQL Window Functions & Indexing</span>
                    <span className="font-bold text-slate-900">25%</span>
                  </div>
                  <Progress value={25} className="h-2 bg-slate-200" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span className="text-slate-800">Spring Boot Transaction Management</span>
                    <span className="font-bold text-slate-900">20%</span>
                  </div>
                  <Progress value={20} className="h-2 bg-slate-200" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span className="text-emerald-600 font-bold">React 19 & Next.js Architecture</span>
                    <span className="font-bold text-slate-900">10%</span>
                  </div>
                  <Progress value={10} className="h-2 bg-slate-200" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span className="text-slate-800">System Design Rate Limiting</span>
                    <span className="font-bold text-slate-900">10%</span>
                  </div>
                  <Progress value={10} className="h-2 bg-slate-200" />
                </div>

                <div className="mt-4 p-4 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs text-indigo-950 leading-relaxed">
                  💡 <strong>Adaptive Algorithm:</strong> Weak topics (&lt;60% historical accuracy) receive dynamic boost to help you pass technical screens.
                </div>
              </CardContent>
            </Card>

            {/* Quick Practice History Card */}
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Recent Quiz History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2.5">
                <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Java Concurrency & Memory</div>
                    <div className="text-slate-400 text-[11px]">Yesterday • 5 Qs</div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 font-bold">80%</Badge>
                </div>

                <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Spring Boot & Microservices</div>
                    <div className="text-slate-400 text-[11px]">3 days ago • 10 Qs</div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 font-bold">70%</Badge>
                </div>

                <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">PostgreSQL Windowing & Indexes</div>
                    <div className="text-slate-400 text-[11px]">5 days ago • 8 Qs</div>
                  </div>
                  <Badge className="bg-rose-100 text-rose-800 font-bold">50%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
