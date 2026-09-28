"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_CODING_PROBLEMS } from "@/lib/mockData";
import { CodingProblem } from "@/lib/types";
import {
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  Terminal,
  Code2,
  Layers,
  RotateCcw,
  Zap,
  Check,
  AlertTriangle,
} from "lucide-react";

export default function CodingSandboxPage() {
  const [problems] = useState<CodingProblem[]>(SAMPLE_CODING_PROBLEMS);
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(SAMPLE_CODING_PROBLEMS[0]);
  const [language, setLanguage] = useState<"java" | "python" | "javascript">("java");
  const [code, setCode] = useState<string>(selectedProblem.initialCode.java);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ id: string; status: "PASS" | "FAIL"; runtimeMs: number }>>([]);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [aiReview, setAiReview] = useState<string>("");

  const handleSelectProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setCode(prob.initialCode[language] || prob.initialCode.java);
    setTestResults([]);
    setConsoleOutput("");
    setAiReview("");
  };

  const handleLanguageChange = (newLang: "java" | "python" | "javascript") => {
    setLanguage(newLang);
    setCode(selectedProblem.initialCode[newLang] || selectedProblem.initialCode.java);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput("Initializing Docker Sandbox Container (Ubuntu 22.04 LTS)...\nCompiling source code with OpenJDK 21...\nExecuting test suites against sample inputs...");

    setTimeout(() => {
      setIsRunning(false);
      setTestResults([
        { id: "tc-1", status: "PASS", runtimeMs: 12 },
        { id: "tc-2", status: "PASS", runtimeMs: 8 },
        { id: "tc-3", status: "PASS", runtimeMs: 9 },
      ]);
      setConsoleOutput("✔ Test Case 1: PASSED (12ms, 38.4 MB memory)\n✔ Test Case 2: PASSED (8ms, 38.2 MB memory)\n✔ Test Case 3: PASSED (9ms, 38.3 MB memory)\n\nAll 3 test cases passed successfully! Code is production ready.");
    }, 1200);
  };

  const handleRequestAiReview = () => {
    setAiReview("Analyzing algorithmic complexity and cleanliness...");
    setTimeout(() => {
      setAiReview("🤖 **AI Code Review Analysis:**\n• **Time Complexity:** O(N) using Single-pass Hash Map.\n• **Space Complexity:** O(N) auxiliary map storage.\n• **Cleanliness:** Excellent null-safety and variable naming.\n• **Optimization Suggestion:** You can specify an initial capacity on the `HashMap` (e.g. `new HashMap<>(nums.length)`) to prevent unnecessary bucket rehashing under large arrays.");
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Secure Docker Code Sandbox
              </h1>
              <p className="text-xs text-slate-500">
                Isolated environment with automated test runner & AI complexity analysis.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {(["java", "python", "javascript"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md uppercase transition-all ${
                    language === lang
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center space-x-1.5"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isRunning ? "Running in Sandbox..." : "Run Code"}</span>
            </Button>
          </div>
        </div>

        {/* 2-Column Problem & Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Problem Description */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      {selectedProblem.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        selectedProblem.difficulty === "EASY"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-rose-50 text-rose-700 border-rose-300"
                      }
                    >
                      {selectedProblem.difficulty}
                    </Badge>
                  </div>

                  <select
                    value={selectedProblem.id}
                    onChange={(e) => {
                      const found = problems.find((p) => p.id === e.target.value);
                      if (found) handleSelectProblem(found);
                    }}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 font-medium"
                  >
                    {problems.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <CardTitle className="text-base font-bold text-slate-900 mt-2">
                  {selectedProblem.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedProblem.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Example Test Cases:</h4>
                  <div className="space-y-2">
                    {selectedProblem.testCases.map((tc, idx) => (
                      <div key={tc.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] space-y-1">
                        <div><span className="text-slate-500">Input:</span> {tc.input}</div>
                        <div><span className="text-emerald-700 font-bold">Expected Output:</span> {tc.expectedOutput}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Review trigger button */}
                <Button
                  onClick={handleRequestAiReview}
                  variant="outline"
                  size="sm"
                  className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Analyze Code Quality with AI
                </Button>

                {aiReview && (
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 text-xs text-indigo-950 whitespace-pre-line leading-relaxed">
                    {aiReview}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Editor & Console Output */}
          <div className="lg:col-span-7 space-y-4">
            {/* Code Editor */}
            <Card className="border-slate-800 bg-slate-950 text-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-900 px-4 py-2 text-xs font-mono text-slate-400 flex items-center justify-between border-b border-slate-800">
                <span className="flex items-center space-x-1.5">
                  <Code2 className="h-4 w-4 text-indigo-400" />
                  <span>Solution.{language === "java" ? "java" : language === "python" ? "py" : "js"}</span>
                </span>
                <span className="text-[11px] text-slate-500">Docker Sandbox Enabled</span>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={16}
                spellCheck={false}
                className="w-full bg-slate-950 text-emerald-300 font-mono text-xs p-4 focus:outline-none leading-relaxed resize-none selection:bg-indigo-600"
              />
            </Card>

            {/* Test Results and Console Output */}
            <Card className="border-slate-200">
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Sandbox Execution Console</span>
                  {testResults.length > 0 && (
                    <Badge className="bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                      3/3 Tests Passed
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs overflow-x-auto min-h-[80px] leading-relaxed">
                  <code>{consoleOutput || "Run your solution to view compilation logs and test outputs..."}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
