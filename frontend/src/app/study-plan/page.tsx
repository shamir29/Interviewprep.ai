"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SAMPLE_STUDY_PLAN } from "@/lib/mockData";
import { StudyPlanDay } from "@/lib/types";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  ArrowRight,
  HelpCircle,
  Code2,
  MessagesSquare,
  BookOpen,
} from "lucide-react";

export default function StudyPlanPage() {
  const [days, setDays] = useState<StudyPlanDay[]>(SAMPLE_STUDY_PLAN);

  const toggleTask = (dayIndex: number, taskId: string) => {
    setDays((prev) => {
      const next = [...prev];
      const targetDay = { ...next[dayIndex] };
      targetDay.tasks = targetDay.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      targetDay.completed = targetDay.tasks.every((t) => t.completed);
      next[dayIndex] = targetDay;
      return next;
    });
  };

  const totalTasks = days.flatMap((d) => d.tasks).length;
  const completedTasks = days.flatMap((d) => d.tasks).filter((t) => t.completed).length;
  const planProgress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tailored to Your Target Role</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Personalized Daily Study Plan
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Curated daily preparation roadmap balancing conceptual depth, timed coding, and mock interviews.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-right">
              <div className="text-xs text-slate-500 font-medium">Plan Completion</div>
              <div className="text-xl font-bold text-indigo-600">{planProgress}%</div>
            </div>
          </div>
        </div>

        {/* Days Timeline */}
        <div className="space-y-6">
          {days.map((day, dayIdx) => (
            <Card
              key={day.day}
              className={`border transition-all ${
                day.completed ? "border-emerald-200 bg-emerald-50/15" : "border-slate-200 bg-white"
              }`}
            >
              <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <Badge className={day.completed ? "bg-emerald-600" : "bg-indigo-600"}>
                      Day {day.day}
                    </Badge>
                    <Badge variant="outline" className="text-slate-600">
                      {day.focusDomain}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900 mt-1.5">
                    {day.title}
                  </CardTitle>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Est. {day.estimatedMinutes} mins</span>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 space-y-3">
                {day.tasks.map((task) => {
                  let TaskIcon = HelpCircle;
                  if (task.type === "coding") TaskIcon = Code2;
                  if (task.type === "interview") TaskIcon = MessagesSquare;
                  if (task.type === "reading") TaskIcon = BookOpen;

                  return (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        task.completed
                          ? "bg-emerald-50/40 border-emerald-200 text-slate-500 line-through"
                          : "bg-slate-50/60 border-slate-200 text-slate-800"
                      }`}
                    >
                      <div className="flex items-start sm:items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(dayIdx, task.id)}
                          className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 mt-0.5 sm:mt-0 cursor-pointer"
                        />
                        <div className="flex items-center space-x-2">
                          <TaskIcon className={`h-4 w-4 shrink-0 ${task.completed ? "text-emerald-600" : "text-indigo-600"}`} />
                          <span className="text-xs sm:text-sm font-semibold">{task.title}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 self-end sm:self-auto">
                        <span className="text-[11px] text-slate-400 font-medium">{task.duration}</span>
                        <Link href={task.link}>
                          <Button size="sm" variant="outline" className="h-8 text-xs font-semibold border-slate-200 hover:bg-white">
                            Launch
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
