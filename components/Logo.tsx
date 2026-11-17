import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  className?: string;
  asLink?: boolean;
}

export default function Logo({
  variant = "dark",
  size = "md",
  showSubtitle = true,
  className = "",
  asLink = true,
}: LogoProps) {
  const isLight = variant === "light";

  // Sizing configurations
  const sizeMap = {
    sm: {
      emblem: 32,
      primaryText: "text-lg",
      subtitleText: "text-[8px] tracking-[0.24em]",
      gap: "gap-2.5",
    },
    md: {
      emblem: 40,
      primaryText: "text-xl",
      subtitleText: "text-[9px] tracking-[0.28em]",
      gap: "gap-3",
    },
    lg: {
      emblem: 50,
      primaryText: "text-2xl",
      subtitleText: "text-[10px] tracking-[0.3em]",
      gap: "gap-3.5",
    },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center ${currentSize.gap} select-none group ${className}`}>
      {/* Geometric SVG Emblem */}
      <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          width={currentSize.emblem}
          height={currentSize.emblem}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id={`gi-blue-grad-${variant}`} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0066CC" />
              <stop offset="0.6" stopColor="#0284C7" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id={`gi-sparkle-grad-${variant}`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0066CC" />
            </linearGradient>

            <filter id={`gi-glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0066CC" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Minimalist Globe Orbit & Arcs */}
          {/* Main outer dynamic globe ring */}
          <circle
            cx="22"
            cy="26"
            r="16"
            stroke={isLight ? "rgba(255, 255, 255, 0.2)" : "#E2E8F0"}
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          <path
            d="M 9 32 C 8 20, 20 10, 34 13"
            stroke={`url(#gi-blue-grad-${variant})`}
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          <path
            d="M 12 37 C 22 43, 36 38, 40 28"
            stroke={isLight ? "#38BDF8" : "#0066CC"}
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Precision Equatorial latitude swoosh */}
          <path
            d="M 8 26 C 14 32, 30 32, 38 23"
            stroke={isLight ? "rgba(56, 189, 248, 0.7)" : "#38BDF8"}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Center meridional depth curve */}
          <path
            d="M 22 10 C 27 18, 27 34, 22 42"
            stroke={isLight ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 102, 204, 0.3)"}
            strokeWidth="1.75"
            strokeDasharray="2 2"
          />

          {/* Sparkle 1: Primary 4-point Cleanliness Star (Top Right) */}
          {/* Center at (36, 12), radius 7 */}
          <path
            d="M 36 5 Q 36 12 43 12 Q 36 12 36 19 Q 36 12 29 12 Q 36 12 36 5 Z"
            fill={`url(#gi-sparkle-grad-${variant})`}
            filter={`url(#gi-glow-${variant})`}
          />

          {/* Sparkle 2: Secondary Cleanliness Star (Offset Accent) */}
          {/* Center at (42, 23), radius 4 */}
          <path
            d="M 42 19 Q 42 23 46 23 Q 42 23 42 27 Q 42 23 38 23 Q 42 23 42 19 Z"
            fill="#38BDF8"
          />

          {/* Cleanliness micro-glisten dot */}
          <circle cx="28" cy="8" r="1.25" fill="#38BDF8" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col justify-center">
        <div className={`font-heading ${currentSize.primaryText} font-extrabold tracking-tight leading-none flex items-center`}>
          <span className={isLight ? "text-white" : "text-[#0A192F]"}>
            GLOBAL
          </span>
          <span className="text-[#0066CC] ml-1.5 transition-colors duration-200 group-hover:text-[#0052A3]">
            {isLight ? <span className="text-[#38BDF8]">INSIGHT</span> : "INSIGHT"}
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-sans font-semibold uppercase mt-1 leading-none ${currentSize.subtitleText} ${
              isLight ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Cleaning Services
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="Global Insight Cleaning Services - Home">
        {content}
      </Link>
    );
  }

  return content;
}
