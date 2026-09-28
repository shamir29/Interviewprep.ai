"use client";

import React from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SAMPLE_WEAKNESSES } from "@/lib/mockData";
import {
  TrendingUp,
  BrainCircuit,
  Zap,
  Sparkles,
  ArrowRight,
  Flame,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  BarChart3,
} from "lucide-react";

export default function WeaknessPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Adaptive Distribution Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Weakness Analysis & Topic Weights
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Real-time calculation of your technical accuracy, error trends, and dynamic question weighting.
            </p>
          </div>

          <Link href="/quiz/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Drill All Weak Areas (5 Qs)</span>
            </Button>
          </Link>
        </div>

        {/* Mathematical Engine Explanation Banner */}
        <Card className="border-indigo-200 bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-md">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-300 font-mono text-xs uppercase tracking-wider">
              <BrainCircuit className="h-4 w-4 text-indigo-400" />
              <span>Adaptive Weight Allocation Formula</span>
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-indigo-100 bg-slate-800/80 p-3 rounded-lg border border-slate-700 max-w-2xl">
              Weight(Topic) = f(WeaknessScore, Recency, RolePriority)
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              If your <strong>Java Concurrency</strong> accuracy is 42% and your <strong>React</strong> accuracy is 85%,
              the platform automatically allocates 35% of your next quiz to Concurrency questions, accelerating your path to interview readiness.
            </p>
          </CardContent>
        </Card>

        {/* Detailed Topic Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            <span>Active Knowledge Domains</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_WEAKNESSES.map((w) => {
              const isUrgent = w.accuracy < 55;
              return (
                <Card
                  key={w.topic}
                  className={`border transition-all ${
                    isUrgent
                      ? "border-rose-200 bg-rose-50/20 shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          isUrgent
                            ? "bg-rose-100 text-rose-800 border-rose-300 font-bold"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {w.domain} • Next Quiz Weight: {w.weightInNextQuiz}%
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">
                        {w.questionsAttempted} Attempted
                      </span>
                    </div>

                    <CardTitle className="text-base font-bold text-slate-900 mt-2">
                      {w.topic}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Accuracy</span>
                        <span className={`font-bold ${isUrgent ? "text-rose-600" : "text-emerald-600"}`}>
                          {w.accuracy}%
                        </span>
                      </div>
                      <Progress
                        value={w.accuracy}
                        className={`h-2 ${isUrgent ? "bg-rose-100" : "bg-slate-200"}`}
                      />
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                      <span className="font-semibold text-slate-800">Recommendation:</span>
                      <p className="text-slate-600 leading-relaxed">{w.recommendedAction}</p>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium capitalize">
                        Trend: {w.trend}
                      </span>
                      <Link href="/quiz/create">
                        <Button size="sm" variant="outline" className="text-xs text-indigo-600 hover:bg-indigo-50 border-indigo-200">
                          <span>Practice Topic</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
