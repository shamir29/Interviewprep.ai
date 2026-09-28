import React from "react";

export function BrandLogo({
  className = "h-8 w-8",
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform hover:scale-105"
      >
        <defs>
          <linearGradient id="ipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="ipAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <filter id="ipGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#6366f1" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer Rounded Squircle Base */}
        <rect
          width="40"
          height="40"
          rx="11"
          fill="url(#ipGrad)"
          filter="url(#ipGlow)"
        />

        {/* Neural Network Nodes & Upward Career Trajectory Graphic */}
        <path
          d="M12 28L18 20L24 24L30 13"
          stroke="url(#ipAccent)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Node Points */}
        <circle cx="12" cy="28" r="2.2" fill="#ffffff" />
        <circle cx="18" cy="20" r="2.2" fill="#ffffff" />
        <circle cx="24" cy="24" r="2.2" fill="#ffffff" />
        <circle cx="30" cy="13" r="3" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />

        {/* AI Pulse Wave Arcs */}
        <path
          d="M10 16C13.5 12.5 19 12 23 14"
          stroke="#ffffff"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
