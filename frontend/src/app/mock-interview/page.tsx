"use client";

import React, { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MockInterviewMessage } from "@/lib/types";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  RotateCcw,
  CheckCircle2,
  Award,
  Volume2,
  Flame,
  BrainCircuit,
  MessageSquare,
  AlertCircle,
  Play,
  Square,
} from "lucide-react";

const INITIAL_MESSAGES: MockInterviewMessage[] = [
  {
    id: "m-1",
    sender: "ai",
    text: "Hello Alex! Welcome to your Senior Java Full Stack Technical Mock Interview. Today we'll cover concurrency, Spring transaction management, and system design tradeoffs. Let's start with a foundational scenario: Can you explain the difference between optimistic locking and pessimistic locking in a distributed database system, and when you would choose one over the other?",
    timestamp: "10:00 AM",
    category: "technical",
  },
];

export default function MockInterviewPage() {
  const [messages, setMessages] = useState<MockInterviewMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [sessionTimeSeconds, setSessionTimeSeconds] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiThinking]);

  useEffect(() => {
    if (interviewFinished) return;
    const interval = setInterval(() => {
      setSessionTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [interviewFinished]);

  const formatSessionTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || isAiThinking) return;

    const userMsg: MockInterviewMessage = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsAiThinking(true);

    // Simulate multi-turn AI reasoning and follow-up
    setTimeout(() => {
      let aiResponseText = "";
      let category: "followup" | "system-design" | "technical" = "followup";

      if (messages.length === 1) {
        aiResponseText = "Great explanation! You rightly highlighted that optimistic locking works best with low contention via version columns, while pessimistic locking holds explicit row locks. Now, let's take that to the next level: In a high-throughput flash sale system where 10,000 requests per second try to purchase the same inventory item, pessimistic DB locking will cause massive connection pool exhaustion. How would you redesign the inventory decrement using Redis Lua scripts or distributed caching?";
        category = "system-design";
      } else if (messages.length === 3) {
        aiResponseText = "Spot on with atomic Lua scripts on Redis and async write-backs to Postgres! Let's touch on Spring Boot: If you are using `@Async` with `@Transactional` in the same class method call, why does the transaction context often fail to propagate or rollback as expected?";
        category = "technical";
      } else {
        aiResponseText = "Excellent analysis of Spring AOP proxy self-invocation and thread-local Security/Transaction contexts! That completes the technical evaluation portion of our interview.";
        setInterviewFinished(true);
      }

      const aiMsg: MockInterviewMessage = {
        id: `m-ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        category,
        feedback: {
          score: 88,
          clarity: "Strong technical vocabulary, direct answer with practical tradeoffs.",
          strengths: ["Clear differentiation between locks", "Demonstrated distributed systems awareness"],
          improvements: ["Mention database deadlock detection time-outs explicitly"],
        },
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 1800);
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate speech-to-text input
      setTimeout(() => {
        setInputText("Optimistic locking assumes conflicts are rare, using a version number or timestamp check before writing. Pessimistic locking explicitly locks the record using SELECT FOR UPDATE to guarantee exclusivity.");
        setIsRecording(false);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-indigo-600 text-white">AI Mock Interview Room</Badge>
              <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200">
                Agent Active • Gemini 1.5 Pro
              </Badge>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Senior Java Full Stack Engineer Simulation
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700">
              ⏱️ Elapsed: {formatSessionTime(sessionTimeSeconds)}
            </div>
            <Button
              onClick={() => {
                setMessages(INITIAL_MESSAGES);
                setInterviewFinished(false);
                setSessionTimeSeconds(0);
              }}
              variant="outline"
              size="sm"
              className="border-slate-200"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Session
            </Button>
          </div>
        </div>

        {/* Evaluation Summary Card if finished */}
        {interviewFinished && (
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50/50 to-indigo-50/40">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Mock Interview Performance Assessment: 88 / 100
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Strong technical depth on Distributed Locking, Redis Caching, and Spring AOP Proxies.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className="bg-indigo-600 text-white font-semibold py-1 px-3">
                    Hiring Decision: Strong Hire
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interview Conversation Stream */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-slate-200 flex flex-col h-[560px]">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">AI Recruiter & Tech Lead</div>
                      <div className="text-[10px] text-emerald-600 font-medium">● Real-time evaluation online</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[11px] text-slate-500">
                    {messages.length} Exchanges
                  </Badge>
                </div>
              </CardHeader>

              {/* Message List */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isAi = msg.sender === "ai";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}
                    >
                      <div className="flex items-center space-x-1.5 mb-1 px-1">
                        <span className="text-[11px] font-semibold text-slate-500">
                          {isAi ? "Interviewer" : "You"}
                        </span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                          isAi
                            ? "bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200"
                            : "bg-indigo-600 text-white rounded-tr-none shadow-sm font-normal"
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* AI Micro Feedback chip */}
                      {msg.feedback && (
                        <div className="mt-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 max-w-md">
                          <div className="font-bold flex items-center gap-1 mb-1">
                            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                            Turn Score: {msg.feedback.score}% • {msg.feedback.clarity}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            <strong>Tip:</strong> {msg.feedback.improvements[0]}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {isAiThinking && (
                  <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-100 p-3 rounded-xl max-w-xs border border-slate-200">
                    <BrainCircuit className="h-4 w-4 animate-spin text-indigo-600" />
                    <span>Analyzing response depth & generating follow-up...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Bottom Bar */}
              <div className="p-3 border-t border-slate-200 bg-white space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleToggleRecording}
                    className={`p-2.5 rounded-lg border transition-all ${
                      isRecording
                        ? "bg-rose-50 border-rose-300 text-rose-600 animate-pulse font-bold ring-2 ring-rose-200"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                    title="Toggle Speech to Text Microphone"
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={
                      isRecording
                        ? "Listening... Speak your answer now..."
                        : "Type your answer or technical reasoning..."
                    }
                    disabled={isAiThinking || interviewFinished}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />

                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isAiThinking || interviewFinished}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>💡 Press Enter to submit answer</span>
                  <span>Supports STAR method responses</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Live Analytics & Competencies Column */}
          <div className="space-y-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Real-Time Competency Evaluation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Technical Depth</span>
                    <span className="font-bold text-indigo-600">86%</span>
                  </div>
                  <Progress value={86} className="h-1.5" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Communication & Structure</span>
                    <span className="font-bold text-emerald-600">90%</span>
                  </div>
                  <Progress value={90} className="h-1.5" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Edge Case Awareness</span>
                    <span className="font-bold text-amber-500">75%</span>
                  </div>
                  <Progress value={75} className="h-1.5" />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Tradeoff Justification</span>
                    <span className="font-bold text-indigo-600">82%</span>
                  </div>
                  <Progress value={82} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-slate-800">
                  Target Interview Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p>• State the time & space complexity before diving into code.</p>
                <p>• Clarify scale and latency constraints before recommending Redis or Kafka.</p>
                <p>• Always mention ACID property tradeoffs when discussing transactions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
