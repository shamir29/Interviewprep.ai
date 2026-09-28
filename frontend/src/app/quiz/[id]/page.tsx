"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SAMPLE_QUESTIONS } from "@/lib/mockData";
import { Question } from "@/lib/types";
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Award,
  RotateCcw,
  LayoutDashboard,
  BrainCircuit,
  Lightbulb,
  Check,
  Code2,
  Database,
  Terminal,
  Layers,
  ArrowRight,
  BookOpen,
  Copy,
  Zap,
} from "lucide-react";

export default function QuizPlayerPage() {
  const router = useRouter();
  const params = useParams();

  const [questions, setQuestions] = useState<Question[]>(SAMPLE_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(900); // 15 mins
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAiExplanation, setShowAiExplanation] = useState(false);
  const [activeSqlInput, setActiveSqlInput] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const currentQ = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainderSecs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
  };

  const handleCopySnippet = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Calculate results
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (q.type === "SQL") {
        if (answers[q.id]?.trim().length > 10) correct += 1;
      } else if (answers[q.id] === q.correctOptionId) {
        correct += 1;
      }
    });
    return {
      correctCount: correct,
      totalCount: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const scoreResult = calculateScore();
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  return (
    <AppLayout fullWidth>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Top Floating App Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/quiz">
              <Button variant="outline" size="sm" className="h-10 px-3 text-slate-600 border-slate-200 hover:bg-slate-50">
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Exit Quiz</span>
              </Button>
            </Link>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900">
                  Adaptive Technical Quiz: Java Full Stack
                </h1>
                <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 hidden sm:inline-flex">
                  Live Adaptive Assessment
                </Badge>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>•</span>
                <span>{answeredCount} of {questions.length} Answered</span>
                <span>•</span>
                <span className="text-indigo-600 font-semibold">{currentQ.topic}</span>
              </div>
            </div>
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
            {/* Timer */}
            <div className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-mono font-bold shadow-sm">
              <Clock className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* Flag Button */}
            {!isSubmitted && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleFlag}
                className={`h-10 px-3.5 text-xs font-semibold transition-all ${
                  flagged[currentQ.id]
                    ? "bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-100"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Flag className={`h-3.5 w-3.5 mr-1.5 ${flagged[currentQ.id] ? "fill-current text-amber-600" : ""}`} />
                <span>{flagged[currentQ.id] ? "Flagged" : "Flag"}</span>
              </Button>
            )}

            {!isSubmitted ? (
              <Button
                onClick={handleSubmitQuiz}
                size="sm"
                className="h-10 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
              >
                Submit Session
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setAnswers({});
                  setCurrentIndex(0);
                  setSecondsRemaining(900);
                }}
                variant="outline"
                size="sm"
                className="h-10 border-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Retake
              </Button>
            )}
          </div>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Main Content Area */}
        {isSubmitted ? (
          /* Submission Results View */
          <div className="space-y-6">
            <Card className="border-slate-200 bg-gradient-to-br from-white via-indigo-50/30 to-slate-50 shadow-md">
              <CardContent className="p-8 sm:p-12 text-center space-y-6">
                <div className="h-20 w-20 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center font-bold shadow-lg shadow-indigo-600/20">
                  <Award className="h-10 w-10" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Assessment Completed!
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Great effort! Your technical responses have been evaluated and your adaptive learning profile has been updated.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-4xl font-extrabold text-indigo-600">
                      {scoreResult.percentage}%
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                      Final Score
                    </div>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-4xl font-extrabold text-emerald-600">
                      {scoreResult.correctCount} / {scoreResult.totalCount}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                      Correct Answers
                    </div>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-4xl font-extrabold text-amber-500">
                      +20 XP
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                      Readiness Boost
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Link href="/weaknesses">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold px-6">
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      View Updated Weakness Radar
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="border-slate-200 font-semibold px-6">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Return to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Answer Detailed Review */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Detailed Answer Analysis</h3>
              <div className="grid grid-cols-1 gap-4">
                {questions.map((q, idx) => {
                  const userAns = answers[q.id];
                  const isCorrect = q.type === "SQL" ? (userAns?.trim().length > 10) : userAns === q.correctOptionId;
                  return (
                    <Card key={q.id} className={`border ${isCorrect ? "border-emerald-200 bg-emerald-50/20" : "border-rose-200 bg-rose-50/20"}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={isCorrect ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold" : "bg-rose-100 text-rose-800 border-rose-300 font-semibold"}>
                            {isCorrect ? "✓ Correct" : "✕ Needs Review"} • {q.topic}
                          </Badge>
                          <span className="text-xs font-semibold text-slate-400">Question {idx + 1} of {questions.length}</span>
                        </div>
                        <CardTitle className="text-base font-bold text-slate-900 mt-2">
                          {q.title}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-slate-700 mt-1">
                          {q.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 text-xs sm:text-sm">
                        {q.codeSnippet && (
                          <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                            <code>{q.codeSnippet}</code>
                          </pre>
                        )}
                        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                          <div className="font-bold text-slate-800 flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 text-indigo-600" />
                            <span>AI Comprehensive Explanation:</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{q.correctExplanation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Active Split-Pane Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Problem & Context (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                {/* Card Banner */}
                <div className="p-5 sm:p-6 border-b border-slate-100 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-indigo-600 text-white font-semibold px-2.5 py-0.5">
                        {currentQ.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`font-semibold ${
                          currentQ.difficulty === "EASY"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : currentQ.difficulty === "MEDIUM"
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : "bg-rose-50 text-rose-700 border-rose-300"
                        }`}
                      >
                        {currentQ.difficulty}
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        {currentQ.topic}
                      </Badge>
                    </div>

                    <div className="text-xs text-slate-400 font-medium">
                      ID: {currentQ.id}
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {currentQ.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {currentQ.description}
                  </p>
                </div>

                <CardContent className="p-5 sm:p-6 space-y-5">
                  {/* Code Snippet Box */}
                  {currentQ.codeSnippet && (
                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-sm">
                      <div className="bg-slate-900/90 px-4 py-2 text-xs font-mono text-slate-400 flex items-center justify-between border-b border-slate-800">
                        <span className="flex items-center space-x-2">
                          <Code2 className="h-4 w-4 text-indigo-400" />
                          <span className="uppercase font-semibold">{currentQ.codeLanguage || "Source Code"}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopySnippet(currentQ.codeSnippet || "")}
                          className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>{copiedCode ? "Copied!" : "Copy"}</span>
                        </button>
                      </div>
                      <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-emerald-300 selection:bg-indigo-600">
                        <code>{currentQ.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Schema Details */}
                  {currentQ.schemaDetails && (
                    <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs sm:text-sm font-mono text-indigo-950 flex items-start space-x-2.5">
                      <Database className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Database Schema: </span>
                        <span>{currentQ.schemaDetails}</span>
                      </div>
                    </div>
                  )}

                  {/* AI Hint & Explanation Accordions */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs sm:text-sm">
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1.5 font-semibold"
                    >
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAiExplanation(!showAiExplanation)}
                      className="text-slate-600 hover:text-slate-900 flex items-center space-x-1.5 font-medium"
                    >
                      <Sparkles className="h-4 w-4 text-indigo-600" />
                      <span>{showAiExplanation ? "Hide Explanation" : "Preview AI Reasoning"}</span>
                    </button>
                  </div>

                  {showHint && (
                    <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
                      💡 <strong>Hint:</strong> Focus on the difference between memory visibility barriers and atomic compound execution (e.g. read-modify-write).
                    </div>
                  )}

                  {showAiExplanation && (
                    <div className="p-4 bg-indigo-50/80 rounded-xl border border-indigo-200 text-xs sm:text-sm text-indigo-950 leading-relaxed">
                      🤖 <strong>AI Explanation:</strong> {currentQ.correctExplanation}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Interaction, SQL Editor, & Navigator (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Answer Choices or SQL Editor Card */}
              <Card className="border-slate-200 shadow-sm bg-white">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      {currentQ.type === "SQL" ? "Your Query Solution" : "Select Correct Option"}
                    </CardTitle>
                    <span className="text-xs text-slate-400">
                      {answers[currentQ.id] ? "✓ Choice Recorded" : "Unanswered"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-3">
                  {currentQ.type === "SQL" ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500">
                        Write standard PostgreSQL / ANSI SQL. The evaluation engine will test your query against benchmark datasets.
                      </p>
                      <textarea
                        rows={8}
                        value={answers[currentQ.id] || activeSqlInput}
                        onChange={(e) => {
                          setActiveSqlInput(e.target.value);
                          setAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }));
                        }}
                        placeholder="SELECT department_id, salary FROM employees..."
                        className="w-full font-mono text-xs sm:text-sm p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-900 text-emerald-300 leading-relaxed"
                      />
                    </div>
                  ) : (
                    /* Options List */
                    <div className="space-y-2.5">
                      {currentQ.options?.map((opt, optIndex) => {
                        const isSelected = answers[currentQ.id] === opt.id;
                        const optionLetters = ["A", "B", "C", "D"];
                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectOption(opt.id)}
                            className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-start space-x-3.5 ${
                              isSelected
                                ? "border-indigo-600 bg-indigo-50/80 text-indigo-950 font-medium ring-2 ring-indigo-600/30 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white text-slate-700"
                            }`}
                          >
                            <div
                              className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                                isSelected
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "bg-slate-100 text-slate-600 border border-slate-200"
                              }`}
                            >
                              {optionLetters[optIndex]}
                            </div>
                            <div className="flex-1 leading-relaxed">{opt.text}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Question Navigation Matrix */}
              <Card className="border-slate-200 shadow-sm bg-white">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Question Matrix Navigator
                    </CardTitle>
                    <span className="text-xs font-semibold text-slate-500">
                      {answeredCount}/{questions.length} Completed
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-4">
                  <div className="grid grid-cols-5 gap-2.5">
                    {questions.map((q, idx) => {
                      const isAnswered = !!answers[q.id];
                      const isCurrent = currentIndex === idx;
                      const isFlagged = !!flagged[q.id];

                      let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
                      if (isAnswered) btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold";
                      if (isCurrent) btnStyle = "border-indigo-600 bg-indigo-600 text-white font-bold ring-2 ring-indigo-300 shadow-sm";

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentIndex(idx)}
                          className={`relative h-11 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center ${btnStyle}`}
                        >
                          <span>{idx + 1}</span>
                          {isFlagged && (
                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-500 ring-2 ring-white"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigator Legend */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center space-x-1.5">
                      <span className="h-2.5 w-2.5 rounded bg-indigo-600 inline-block"></span>
                      <span>Current</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="h-2.5 w-2.5 rounded bg-emerald-500 inline-block"></span>
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="h-2.5 w-2.5 rounded bg-amber-500 inline-block"></span>
                      <span>Flagged</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Sticky Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex-1 h-11 border-slate-200 font-semibold"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                {currentIndex < questions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="flex-1 h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitQuiz}
                    className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                  >
                    <span>Submit Quiz</span>
                    <CheckCircle2 className="h-4 w-4 ml-1.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
