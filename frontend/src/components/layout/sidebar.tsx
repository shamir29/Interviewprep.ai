"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/logo";
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  BrainCircuit,
  CalendarCheck,
  MessagesSquare,
  Code2,
  TrendingUp,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navigationItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Resume", href: "/resume", icon: FileText },
  { name: "Adaptive Quizzes", href: "/quiz", icon: HelpCircle },
  { name: "Weakness Analysis", href: "/weaknesses", icon: TrendingUp },
  { name: "Study Plan", href: "/study-plan", icon: CalendarCheck },
  { name: "AI Mock Interview", href: "/mock-interview", icon: MessagesSquare },
  { name: "Coding Sandbox", href: "/coding", icon: Code2 },
  { name: "AI Agent Monitor", href: "/agents", icon: BrainCircuit },
];

const secondaryItems = [
  { name: "Admin Portal", href: "/admin", icon: ShieldCheck },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center space-x-2.5">
            <BrandLogo size={32} className="h-8 w-8" />
            <span className="font-bold text-slate-900 tracking-tight text-lg">
              InterviewPrep<span className="text-indigo-600">.AI</span>
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Preparation Menu
          </div>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-indigo-600" : "text-slate-400"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Secondary & System Navigation */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          System
        </div>
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4 text-slate-400" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
