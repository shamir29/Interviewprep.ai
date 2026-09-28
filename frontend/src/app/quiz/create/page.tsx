"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Zap,
  ArrowRight,
  BrainCircuit,
  Bot,
  CheckCircle2,
  FileCode2,
  Layers,
  Flame,
} from "lucide-react";

export default function QuizCreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<"CONFIG" | "GENERATING" | "READY">("CONFIG");
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentAgentLog, setCurrentAgentLog] = useState("");

  const handleGenerate = () => {
    setStep("GENERATING");
    setProgressPercent(15);
    setCurrentAgentLog("QuizBuilderAgent: Fetching user profile and target role competencies...");

    setTimeout(() => {
      setProgressPercent(45);
      setCurrentAgentLog("AdaptiveEngine: Analyzing historical accuracy scores (Java Concurrency 42%, SQL 54%)...");
    }, 600);

    setTimeout(() => {
      setProgressPercent(75);
      setCurrentAgentLog("Gemini 1.5 Pro: Synthesizing adaptive question pool with structured schema validation...");
    }, 1200);

    setTimeout(() => {
      setProgressPercent(100);
      setCurrentAgentLog("ValidationAgent: 5/5 questions verified for syntax correctness, code snippets, and explanations.");
      setStep("READY");
    }, 1800);
  };

  const handleStart = () => {
    router.push("/quiz/adaptive-session-1");
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Multi-Agent Adaptive Quiz Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Create Adaptive Quiz
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Our agentic AI system calculates weak points and dynamically crafts fresh interview challenges.
          </p>
        </div>

        {step === "CONFIG" && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Adaptive Parameters</CardTitle>
              <CardDescription>
                Generating tailored session for <strong className="text-slate-800">Java Full Stack Developer</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5 text-rose-600">
                    <Flame className="h-4 w-4" /> Focus Domain: Java Multithreading & SQL Optimization
                  </span>
                  <Badge className="bg-rose-100 text-rose-800">High Priority Weakness</Badge>
                </div>
                <p className="text-xs text-slate-500">
                  Based on your last 3 sessions, your accuracy in Java concurrency was 42%. The agent will allocate 60% of question weight to these areas.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 border border-slate-200 rounded-lg bg-white">
                  <div className="text-xl font-bold text-slate-900">5</div>
                  <div className="text-[11px] text-slate-500 font-medium">Adaptive Questions</div>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg bg-white">
                  <div className="text-xl font-bold text-slate-900">15 min</div>
                  <div className="text-[11px] text-slate-500 font-medium">Session Duration</div>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg bg-white">
                  <div className="text-xl font-bold text-indigo-600">Gemini 1.5</div>
                  <div className="text-[11px] text-slate-500 font-medium">Structured AI Engine</div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                size="lg"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-12 shadow-sm flex items-center justify-center space-x-2"
              >
                <Zap className="h-4 w-4" />
                <span>Trigger Agentic Quiz Generation</span>
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "GENERATING" && (
          <Card className="border-slate-200 text-center py-10 px-6">
            <CardContent className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mx-auto flex items-center justify-center animate-pulse">
                <BrainCircuit className="h-7 w-7 animate-spin" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">AI Agents at Work</h3>
                <p className="text-xs font-mono text-slate-600 bg-slate-100 p-2.5 rounded-lg max-w-lg mx-auto border border-slate-200">
                  {currentAgentLog}
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Generation Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {step === "READY" && (
          <Card className="border-emerald-200 bg-emerald-50/30 text-center py-10 px-6">
            <CardContent className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Your Adaptive Quiz is Ready!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  5 customized questions prepared across Java Concurrency, SQL Window Functions, and Spring Boot.
                </p>
              </div>

              <Button
                onClick={handleStart}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 h-12 shadow-sm"
              >
                <span>Begin Quiz Session Now</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
