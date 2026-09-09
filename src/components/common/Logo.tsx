import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: { box: 28, text: "text-base" },
    md: { box: 36, text: "text-xl" },
    lg: { box: 44, text: "text-2xl" },
  };

  const current = iconSizes[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-transform ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={current.box}
          height={current.box}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_12px_rgba(99,102,241,0.45)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="pinGrad" x1="6" y1="2" x2="30" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="0.5" stopColor="#4F46E5" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="barGrad" x1="12" y1="18" x2="24" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
          {/* Map Pin */}
          <path
            d="M18 2C10.82 2 5 7.82 5 15C5 24.5 18 34 18 34C18 34 31 24.5 31 15C31 7.82 25.18 2 18 2Z"
            fill="url(#pinGrad)"
          />
          {/* Inner dark center */}
          <circle cx="18" cy="14" r="8.5" fill="#0F172A" />
          {/* Audit Bar Chart bars */}
          <rect x="12.5" y="15" width="2" height="4.5" rx="0.75" fill="#818CF8" />
          <rect x="15.5" y="12" width="2" height="7.5" rx="0.75" fill="#6366F1" />
          <rect x="18.5" y="9.5" width="2" height="10" rx="0.75" fill="url(#barGrad)" />
          <rect x="21.5" y="13.5" width="2" height="6" rx="0.75" fill="#34D399" />
          {/* Micro Trend Line */}
          <path
            d="M13 15L16.5 12L19.5 9.5L22.5 13.5"
            stroke="#A7F3D0"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-tight text-white ${current.text}`}>
            GBP<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-400 ml-1.5">Auditor</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
            Local SEO Intelligence
          </span>
        </div>
      )}
    </Link>
  );
}
