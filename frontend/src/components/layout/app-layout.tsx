"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Menu, X } from "lucide-react";

export function AppLayout({
  children,
  fullWidth = false,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 w-64 border-r border-slate-200 bg-white">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64 bg-white h-full shadow-2xl flex flex-col">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-lg"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <div className="relative sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
          <Header />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <main
          className={`flex-1 w-full ${
            fullWidth
              ? "p-4 sm:p-6 lg:p-8"
              : "p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
