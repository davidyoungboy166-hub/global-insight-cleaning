"use client";

import React from "react";
import {
  CheckCircle2,
  Calendar,
  Sparkles,
  ClipboardList,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

const steps = [
  {
    number: "01",
    title: "Choose Your Service & Property Size",
    description:
      "Select from 11 specialized services—from 1-bedroom apartments to expansive estates and multi-floor commercial complexes.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Pick Date & Get Instant Estimate",
    description:
      "Choose your preferred day and time. Receive an upfront, transparent estimate in Ghana Cedis with zero surprise surcharges.",
    icon: Calendar,
  },
  {
    number: "03",
    title: "Relax While We Make It Shine",
    description:
      "Our uniformed, vetted specialists arrive with professional machinery, complete the checklist, and conduct a final walkthrough.",
    icon: Sparkles,
  },
];

const standardsChecklist = [
  {
    title: "Hospital-Grade Machinery & Eco-Safe Formulas",
    desc: "Industrial HEPA allergen extractors, commercial steam pressure cleaners, and pet/child-safe degreasers that leave surfaces genuinely sterile.",
    icon: ShieldCheck,
  },
  {
    title: "Vetted, Insured & Uniformed Specialists",
    desc: "Strict police background screenings, identification cards, and comprehensive training in high-end materials, granite, and hardwood care.",
    icon: BadgeCheck,
  },
  {
    title: "Punctual & Highly Flexible Scheduling",
    desc: "Same-week appointments, early-morning or after-hours commercial dispatch, and emergency turnarounds across Greater Accra.",
    icon: Clock,
  },
  {
    title: "100% Satisfaction Re-Clean Guarantee",
    desc: "If any corner does not meet our spotless benchmark, notify our supervisor within 24 hours and we return to re-clean it free of charge.",
    icon: HeartHandshake,
  },
];

export default function ProcessSection({ onOpenBooking }: ProcessSectionProps) {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#F4F8FD] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading: How It Works */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-blue-200/60 text-[#0066CC] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>Frictionless Booking Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0A192F] tracking-tight">
            How Global Insight Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            A streamlined 3-step experience designed for busy professionals, property managers, and
            homeowners in Ghana.
          </p>
        </div>

        {/* 3-Step Horizontal Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-24">
          {/* Connector Line (Desktop Only) */}
          <div
            className="hidden md:block absolute top-1/2 left-[15%] right-[15%] -translate-y-8 h-0.5 border-t-2 border-dashed border-blue-200 -z-0"
            aria-hidden="true"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(10,25,47,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(0,102,204,0.08)] transition-all duration-300 z-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-extrabold text-2xl text-[#0066CC] tracking-tight">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#0A192F] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#0066CC]">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* WHY GLOBAL INSIGHT & QUALITY STANDARDS CHECKLIST */}
        <div id="why-choose-us" className="pt-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(10,25,47,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Standards Checklist */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0066CC] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#0066CC]" />
                  <span>The Quality Assurance Difference</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0A192F] tracking-tight">
                  Why Global Insight is Accra&apos;s Trusted Cleaning Benchmark
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We reject the standard &ldquo;mop-and-bucket&rdquo; shortcut. Every assignment
                  follows a 42-point cleaning checklist backed by industrial extraction and supervised
                  quality gates.
                </p>

                {/* Checklist items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {standardsChecklist.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="p-4 rounded-xl bg-[#F4F8FD]/80 border border-blue-100/60"
                      >
                        <div className="flex items-center space-x-2.5 mb-2">
                          <ItemIcon className="w-5 h-5 text-[#0066CC] flex-shrink-0" />
                          <h4 className="text-xs font-heading font-bold text-[#0A192F]">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-sm shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Schedule Your Deep Clean</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Before & After Quality Showcase */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-4 border-slate-100 shadow-xl group">
                  <img
                    src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
                    alt="Pristine cleanliness transformation by Global Insight"
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/20 to-transparent" />

                  {/* Quality Seal floating badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-white text-xs font-bold text-[#0A192F] flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Post-Cleaning Verified</span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-300 block mb-1">
                      Before &amp; After Inspection
                    </span>
                    <h5 className="text-base font-bold">
                      Zero Residue, Zero Odor, 100% Turnkey Standard
                    </h5>
                    <p className="text-xs text-slate-200 mt-1">
                      Includes grout polishing, baseboard detailing, and airborne dust filtration.
                    </p>
                  </div>
                </div>

                {/* Sub-strip with Accra coverage points */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#0066CC]" />
                    <span className="font-semibold text-slate-800">
                      Serving East Legon, Cantonments, Airport &amp; Beyond
                    </span>
                  </div>
                  <span className="font-bold text-[#0066CC]">7 Days / Wk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
