"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  MoveHorizontal,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Building2,
  Briefcase,
  Users,
} from "lucide-react";

export interface OfficeScenario {
  id: string;
  tabTitle: string;
  setting: string;
  focus: string;
  icon: React.ElementType;
  image: string;
  badge: string;
}

export const officeScenarios: OfficeScenario[] = [
  {
    id: "office-floor-desk",
    tabTitle: "Office Floor & Desk Deep Clean",
    setting: "Osu Commercial Office Suite",
    focus: "Tiled floor scrubbing, workstation sanitization & dust removal",
    icon: Briefcase,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    badge: "Osu Suite",
  },
  {
    id: "post-renovation-office",
    tabTitle: "Post-Renovation Office Cleanup",
    setting: "Spintex Road Office Space",
    focus: "Fine paint/cement dust removal, window tracks & floor polishing",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    badge: "Spintex Rd",
  },
  {
    id: "conference-room",
    tabTitle: "Conference Room & Chair Sanitization",
    setting: "Airport City Corporate Suite",
    focus: "Fabric office chair extraction, glass partitions & carpet vacuuming",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    badge: "Airport City",
  },
];

interface BeforeAfterSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function BeforeAfterSection({ onOpenBooking }: BeforeAfterSectionProps) {
  const [activeTabId, setActiveTabId] = useState<string>("office-floor-desk");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeScenario =
    officeScenarios.find((s) => s.id === activeTabId) || officeScenarios[0];

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updateSliderPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    setSliderPos(50);
  };

  return (
    <section
      id="before-after"
      className="py-14 bg-[#F4F8FD] border-t border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* COMPACT HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-white border border-blue-200/60 text-[#0066CC] text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#0066CC]" />
            <span>INSIDE OUR WORK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#0A192F] tracking-tight">
            Real Office Transformations
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Slide across to compare before and after our team cleans everyday indoor workspaces.
          </p>
        </div>

        {/* COMPACT SCENARIO TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-2xl mx-auto">
          {officeScenarios.map((sc) => {
            const Icon = sc.icon;
            const isActive = sc.id === activeTabId;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleTabChange(sc.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0066CC] text-white shadow-md shadow-blue-600/20 scale-[1.01]"
                    : "bg-white text-slate-700 hover:text-[#0066CC] hover:bg-white/90 border border-slate-200/80 shadow-xs"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 flex-shrink-0 ${
                    isActive ? "text-sky-200" : "text-[#0066CC]"
                  }`}
                />
                <span className="truncate">{sc.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* COMPACT COMPARISON VIEWER (max-w-3xl, h-[320px] sm:h-[360px]) */}
        <div className="max-w-3xl mx-auto">
          <div
            ref={containerRef}
            role="slider"
            tabIndex={0}
            aria-label="Office before and after comparison slider"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            className="relative w-full h-[320px] sm:h-[360px] rounded-2xl shadow-lg border-2 border-white overflow-hidden select-none cursor-ew-resize group focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 bg-slate-900 touch-none"
          >
            {/* 1. "AFTER" LAYER (Grounded, Clean Indoor Commercial Office) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
              <img
                src={activeScenario.image}
                alt={`${activeScenario.tabTitle} - After Cleaning`}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </div>

            {/* 2. "BEFORE" LAYER (Clipped with inset to prevent stretching) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              {/* Dimmed, dusty pre-cleaning base image */}
              <img
                src={activeScenario.image}
                alt={`${activeScenario.tabTitle} - Before Cleaning`}
                className="w-full h-full object-cover select-none filter contrast-[0.88] brightness-[0.82] saturate-[0.65] sepia-[0.2]"
                draggable={false}
              />

              {/* Realistic everyday office dust/scuff texture gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    activeScenario.id === "post-renovation-office"
                      ? "radial-gradient(circle at 40% 45%, rgba(220, 215, 205, 0.4) 0%, rgba(130, 120, 110, 0.45) 70%, rgba(60, 50, 45, 0.5) 100%), linear-gradient(to bottom, rgba(200, 190, 180, 0.3), rgba(70, 60, 50, 0.4))"
                      : "radial-gradient(ellipse at center, rgba(160, 145, 130, 0.3) 0%, rgba(70, 60, 50, 0.45) 85%), linear-gradient(135deg, rgba(80, 70, 60, 0.3), rgba(40, 35, 30, 0.4))",
                  mixBlendMode: "multiply",
                }}
              />

              {/* Fine matte film simulating un-scrubbed floor / un-dusted surfaces */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundColor: "rgba(150, 140, 130, 0.25)",
                  backdropFilter: "blur(0.35px)",
                }}
              />

              {/* Realistic room corner shadow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-35"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 45%, rgba(15, 10, 5, 0.6) 100%)",
                }}
              />
            </div>

            {/* 3. CENTER DIVIDER LINE & COMPACT HANDLE */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPos}%` }}
            />

            <div
              className="absolute top-1/2 z-20 pointer-events-none w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0066CC] text-white shadow-lg border-2 border-white flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                left: `${sliderPos}%`,
                transform: `translate(-50%, -50%) scale(${isDragging ? 1.08 : 1})`,
              }}
            >
              {!isDragging && (
                <span className="absolute -inset-1 rounded-full bg-[#0066CC]/35 animate-ping pointer-events-none" />
              )}
              <MoveHorizontal className="w-4 h-4 text-white" />
            </div>

            {/* 4. CORNER TAGS */}
            <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20 select-none pointer-events-none flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>BEFORE</span>
            </div>

            <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-[#0066CC]/95 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-blue-300/40 shadow-sm select-none pointer-events-none flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-sky-200" />
              <span>AFTER</span>
            </div>

            {/* Drag hint */}
            <div
              className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-medium shadow-xs transition-opacity duration-200 flex items-center space-x-1 select-none ${
                isDragging ? "opacity-0" : "opacity-85"
              }`}
            >
              <MoveHorizontal className="w-3 h-3 text-sky-300" />
              <span>Drag to compare</span>
            </div>
          </div>

          {/* 5. COMPACT ACTION BAR BELOW VIEWER */}
          <div className="mt-3 p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Space Type & Work Completed */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#0A192F]">
                <MapPin className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                <span>{activeScenario.setting}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-semibold">{activeScenario.tabTitle}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{activeScenario.focus}</span>
              </div>
            </div>

            {/* Book Office Cleaning CTA Button */}
            <div className="flex-shrink-0 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={() => onOpenBooking("residential-commercial")}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-xs shadow-sm active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Book Office Cleaning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
