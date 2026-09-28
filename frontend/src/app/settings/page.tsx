"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  User,
  Key,
  Bell,
  Save,
  CheckCircle2,
  Shield,
  Sparkles,
} from "lucide-react";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("Alex Hunter");
  const [email, setEmail] = useState("alex.hunter@example.com");
  const [targetRole, setTargetRole] = useState("Java Full Stack Developer");
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Account & Preparation Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your profile, target role competencies, and Gemini AI provider settings.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Card */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <User className="h-4 w-4 text-indigo-600" />
                <span>Profile & Candidate Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Primary Target Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                >
                  <option value="Java Full Stack Developer">Java Full Stack Developer</option>
                  <option value="Backend Engineer (Java/Spring)">Backend Engineer (Java/Spring)</option>
                  <option value="Frontend Engineer (React/Next.js)">Frontend Engineer (React/Next.js)</option>
                  <option value="Data Analyst & SQL Specialist">Data Analyst & SQL Specialist</option>
                  <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <Key className="h-4 w-4 text-indigo-600" />
                <span>Google Gemini AI Configuration</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Optional: Supply your personal Gemini API key for unlimited adaptive question generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Gemini API Key</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Action */}
          <div className="flex items-center justify-between">
            {saved ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Preferences saved successfully!
              </span>
            ) : <span />}

            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6">
              <Save className="h-4 w-4 mr-1.5" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
