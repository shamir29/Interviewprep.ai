"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Zap,
  Target,
  Flame,
  CheckCircle,
  HelpCircle,
  Code2,
  MessagesSquare,
  FileUp,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Good morning, Alex Hunter
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your interview preparation overview. Role: <span className="font-semibold text-slate-800">Java Full Stack Developer</span>
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/quiz/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center space-x-1.5">
              <Zap className="h-4 w-4" />
              <span>Start Adaptive Quiz</span>
            </Button>
          </Link>
          <Link href="/mock-interview">
            <Button variant="outline" className="border-slate-200">
              <MessagesSquare className="h-4 w-4 mr-1.5" />
              Mock Interview
            </Button>
          </Link>
        </div>
      </div>

      {/* Real Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Interview Readiness
            </CardTitle>
            <Target className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">72%</div>
            <p className="text-xs text-slate-500 mt-1">
              Internal preparation score
            </p>
            <div className="mt-3">
              <Progress value={72} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Questions Solved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">148</div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center font-medium">
              <span>+18 questions this week</span>
            </p>
            <div className="mt-3 text-[11px] text-slate-400">Target: 300 questions</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Technical Accuracy
            </CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">74.2%</div>
            <p className="text-xs text-slate-500 mt-1">
              Across 6 core technical domains
            </p>
            <div className="mt-3">
              <Progress value={74.2} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Current Streak
            </CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">5 Days</div>
            <p className="text-xs text-orange-600 font-medium mt-1">
              Active daily consistency
            </p>
            <div className="mt-3 text-[11px] text-slate-400">Best: 12 days streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Split: Skill Progress & Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">Domain Skill Progress</CardTitle>
                <CardDescription>Accuracy and attempt depth by technical domain</CardDescription>
              </div>
              <Badge variant="outline">Updated Today</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                <span className="font-semibold text-slate-900">Java Core (Multithreading & OOP)</span>
                <span className="text-emerald-700 font-semibold">86% (48/56)</span>
              </div>
              <Progress value={86} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                <span className="font-semibold text-slate-900">Spring Boot & Microservices</span>
                <span className="text-indigo-700 font-semibold">78% (35/45)</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                <span className="font-semibold text-slate-900">SQL & PostgreSQL Architecture</span>
                <span className="text-amber-700 font-semibold">65% (26/40)</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                <span className="font-semibold text-slate-900">Data Structures & Algorithms</span>
                <span className="text-red-700 font-semibold">42% (15/36)</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Weak Topics / Action Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">Weak Topics</CardTitle>
              <Badge variant="destructive">Needs Attention</Badge>
            </div>
            <CardDescription>Targeted topics scheduled for adaptive review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div className="p-3 rounded-lg border border-red-100 bg-red-50/40">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-red-950">Linked List Cycles</span>
                <span className="font-semibold text-red-700">38% acc</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">3 consecutive incorrect attempts</p>
              <Link href="/quiz/create?topic=DSA_LinkedList">
                <span className="text-xs font-semibold text-indigo-600 hover:underline flex items-center">
                  Practice 10 Questions <ArrowUpRight className="h-3 w-3 ml-0.5" />
                </span>
              </Link>
            </div>

            <div className="p-3 rounded-lg border border-amber-100 bg-amber-50/40">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-950">SQL Window Functions</span>
                <span className="font-semibold text-amber-700">54% acc</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">Review PARTITION BY syntax</p>
              <Link href="/quiz/create?topic=SQL_Windows">
                <span className="text-xs font-semibold text-indigo-600 hover:underline flex items-center">
                  Practice Window Functions <ArrowUpRight className="h-3 w-3 ml-0.5" />
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Today's Study Plan & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">Today&apos;s Adaptive Study Plan</CardTitle>
              <Badge variant="secondary">Day 4 of 7</Badge>
            </div>
            <CardDescription>Generated by Interview Planner Agent to maximize retention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs">
                  DSA
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Linked List Two-Pointer Mastery</div>
                  <div className="text-xs text-slate-500">Recommended: 30 minutes • High Priority</div>
                </div>
              </div>
              <Link href="/coding">
                <Button size="sm" variant="outline" className="text-xs">Start Task</Button>
              </Link>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  SQL
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">PostgreSQL Indexing & Optimization</div>
                  <div className="text-xs text-slate-500">Recommended: 20 minutes • Medium Priority</div>
                </div>
              </div>
              <Link href="/quiz/create">
                <Button size="sm" variant="outline" className="text-xs">Start Task</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Launchpad */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900">Quick Launchpad</CardTitle>
            <CardDescription>Access essential practice tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <Link href="/resume" className="block">
              <div className="p-3 rounded-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <FileUp className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm font-medium text-slate-800">Upload / Update Resume</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </div>
            </Link>

            <Link href="/coding" className="block">
              <div className="p-3 rounded-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Code2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-800">Docker Coding Practice</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
