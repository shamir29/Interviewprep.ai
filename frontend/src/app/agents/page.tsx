"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_AGENT_LOGS } from "@/lib/mockData";
import { AgentActivityLog } from "@/lib/types";
import {
  BrainCircuit,
  Bot,
  Activity,
  Zap,
  Sparkles,
  CheckCircle2,
  Terminal,
  RotateCcw,
  Cpu,
  Clock,
  Layers,
} from "lucide-react";

export default function AgentMonitorPage() {
  const [logs, setLogs] = useState<AgentActivityLog[]>(SAMPLE_AGENT_LOGS);

  const handleSimulateNewTrace = () => {
    const newLog: AgentActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: "Just now",
      agentName: "QuizBuilderAgent",
      action: "Adaptive question re-weighting triggered by live weakness update",
      model: "gemini-1.5-pro",
      tokenCount: 920,
      latencyMs: 1100,
      status: "SUCCESS",
      details: "Applied 35% weight to Java Concurrency and 25% to PostgreSQL Window functions.",
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real-Time Multi-Agent Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              AI Agent Execution Monitor
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Inspect reasoning traces, deterministic tool calls, prompt tokens, and schema validations in real time.
            </p>
          </div>

          <Button
            onClick={handleSimulateNewTrace}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center space-x-2"
          >
            <Activity className="h-4 w-4" />
            <span>Simulate Agent Event</span>
          </Button>
        </div>

        {/* 4 Agent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-1">
                <Bot className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm font-bold text-slate-900">QuizBuilderAgent</CardTitle>
              <CardDescription className="text-[11px]">Synthesizes adaptive questions</CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-1">
              <div className="text-slate-500">Status: <span className="text-emerald-600 font-semibold">Idle / Ready</span></div>
              <div className="text-slate-500">Avg Latency: <span className="font-semibold text-slate-800">1.2s</span></div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-1">
                <BrainCircuit className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm font-bold text-slate-900">ProfileAgent</CardTitle>
              <CardDescription className="text-[11px]">PDFBox & skill extraction</CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-1">
              <div className="text-slate-500">Status: <span className="text-emerald-600 font-semibold">Active</span></div>
              <div className="text-slate-500">Avg Latency: <span className="font-semibold text-slate-800">890ms</span></div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-1">
                <Zap className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm font-bold text-slate-900">EvaluationAgent</CardTitle>
              <CardDescription className="text-[11px]">Multi-turn scoring rubric</CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-1">
              <div className="text-slate-500">Status: <span className="text-emerald-600 font-semibold">Ready</span></div>
              <div className="text-slate-500">Avg Latency: <span className="font-semibold text-slate-800">1.4s</span></div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-1">
                <Terminal className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm font-bold text-slate-900">CodingSandboxAgent</CardTitle>
              <CardDescription className="text-[11px]">Docker sandbox runner</CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-1">
              <div className="text-slate-500">Status: <span className="text-emerald-600 font-semibold">Ready</span></div>
              <div className="text-slate-500">Avg Execution: <span className="font-semibold text-slate-800">12ms</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Live Trace Logs Stream */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Activity className="h-4 w-4 text-indigo-600" />
              <span>Live Agent Execution Traces</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100">
            {logs.map((log) => (
              <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-slate-900 text-white font-mono">{log.agentName}</Badge>
                    <span className="font-semibold text-slate-800">{log.action}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-400 font-mono text-[11px]">
                    <span>{log.model}</span>
                    <span>•</span>
                    <span>{log.tokenCount} tokens</span>
                    <span>•</span>
                    <span>{log.latencyMs}ms</span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {log.details}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
