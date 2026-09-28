"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  BrainCircuit,
  FileCheck,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Code,
} from "lucide-react";

export default function ResumePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isParsed, setIsParsed] = useState(true); // default demo state
  const [fileName, setFileName] = useState("Alex_Hunter_Senior_Resume.pdf");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsUploading(true);
      setIsParsed(false);

      setTimeout(() => {
        setIsUploading(false);
        setIsParsed(true);
      }, 1500);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Apache PDFBox + Profile Agent</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Smart Resume Extraction
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Upload your PDF resume to automatically tailor quizzes and mock interviews to your verified stack.
            </p>
          </div>

          {isParsed && (
            <Link href="/quiz/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Generate Quiz From Resume</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Upload Dropzone */}
        <Card className="border-dashed border-2 border-slate-300 bg-slate-50/60 hover:bg-slate-50 transition-colors">
          <CardContent className="p-8 text-center space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
              <UploadCloud className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">
                Upload your latest resume (PDF format)
              </h3>
              <p className="text-xs text-slate-500">
                Supports PDF up to 10MB. Our backend uses Apache PDFBox and Gemini 1.5 Pro to extract competencies.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <label className="cursor-pointer">
                <span className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-semibold text-indigo-600 shadow-sm ring-1 ring-slate-200 hover:bg-indigo-50">
                  Select PDF Document
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {isUploading && (
              <div className="flex items-center justify-center space-x-2 text-xs text-indigo-600 font-medium animate-pulse">
                <BrainCircuit className="h-4 w-4 animate-spin" />
                <span>PDFBox parsing document and extracting structured profile...</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Parsed Resume Breakdown */}
        {isParsed && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Main Overview */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-slate-200">
                <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <FileCheck className="h-5 w-5 text-emerald-600" />
                      <span>{fileName}</span>
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      Successfully parsed and indexed in local profile database.
                    </CardDescription>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 font-semibold">
                    Verified Active
                  </Badge>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* Extracted Skills Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Code className="h-4 w-4 text-indigo-600" /> Extracted Technologies & Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Java 21",
                        "Spring Boot 3",
                        "PostgreSQL",
                        "Redis",
                        "Docker",
                        "Kafka",
                        "React 19",
                        "Next.js App Router",
                        "Tailwind CSS",
                        "REST APIs",
                        "JUnit 5",
                        "Microservices",
                        "AWS ECS",
                        "Hibernate / JPA",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-800 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-indigo-600" /> Parsed Professional Experience
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Software Development Engineer II</span>
                          <span className="text-slate-500">2023 - Present</span>
                        </div>
                        <div className="text-slate-600 font-medium">Acme Financial Cloud Systems</div>
                        <p className="text-slate-500 text-[11px] leading-relaxed pt-1">
                          Engineered high-throughput payments engine using Spring Boot, Kafka, and PostgreSQL, processing 4M+ daily transactions.
                        </p>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Junior Backend Developer</span>
                          <span className="text-slate-500">2021 - 2023</span>
                        </div>
                        <div className="text-slate-600 font-medium">Fintech Solutions Inc.</div>
                        <p className="text-slate-500 text-[11px] leading-relaxed pt-1">
                          Built RESTful microservices, configured Redis caching layer, and optimized SQL query latency by 40%.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Generated Resume Questions */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-indigo-600" /> AI Cross-Examination Questions (Derived From Your Resume)
                    </h4>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-indigo-600 text-white text-[10px]">Project-Specific: Payments Engine</Badge>
                          <span className="text-[11px] text-slate-400 font-mono">Kafka & Concurrency</span>
                        </div>
                        <p className="font-semibold text-slate-800">
                          &ldquo;You mentioned building a high-throughput payments system with Kafka and Spring Boot. How did you handle idempotent consumer processing to prevent duplicate payment debits during network retries?&rdquo;
                        </p>
                      </div>

                      <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-emerald-600 text-white text-[10px]">Stack-Specific: Redis & PostgreSQL</Badge>
                          <span className="text-[11px] text-slate-400 font-mono">Caching & Latency</span>
                        </div>
                        <p className="font-semibold text-slate-800">
                          &ldquo;You optimized SQL latency by 40% with Redis caching. How did you mitigate Cache Penetration and Cache Stampede (Thundering Herd) when hot keys expired?&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Target Role Alignment */}
            <div className="space-y-6">
              <Card className="border-slate-200 bg-indigo-50/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Role Competency Match
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Target: <strong className="text-indigo-700">Java Full Stack Developer</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-bold text-slate-800 mb-1">
                      <span>Overall Match Score</span>
                      <span className="text-indigo-600 text-sm">84%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-800 flex items-center gap-1 text-xs">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                      Suggested Weak Spot Practice:
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Your resume shows strong Backend/Spring foundation, but has fewer entries on <strong>Distributed Lock Management</strong> and <strong>React Server Components</strong>.
                    </p>
                  </div>

                  <Link href="/quiz/create" className="block pt-2">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                      <span>Launch Role Practice Quiz</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
