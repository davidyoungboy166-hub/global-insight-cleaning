"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  Star,
  ArrowRight,
  Award,
  Calculator,
  Image as ImageIcon,
  Building2,
  Home,
  Hammer,
  Truck,
  MessageCircle,
  MapPin,
  Clock,
  Layers,
} from "lucide-react";

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
}

// WhatsApp official icon
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.58 20.15 9.14 19.76 7.89 19.02L7.59 18.84L4.47 19.66L5.3 16.61L5.1 16.3C4.29 15.01 3.86 13.48 3.86 11.91C3.86 7.4 7.54 3.73 12.05 3.73C14.24 3.73 16.29 4.58 17.84 6.14C19.39 7.69 20.24 9.74 20.24 11.92C20.24 16.44 16.57 20.15 12.05 20.15ZM16.54 14.41C16.29 14.29 15.08 13.69 14.86 13.61C14.63 13.53 14.47 13.49 14.3 13.73C14.14 13.98 13.67 14.53 13.53 14.69C13.38 14.86 13.24 14.88 12.99 14.76C12.74 14.63 11.95 14.38 11.01 13.54C10.28 12.89 9.78 12.08 9.64 11.83C9.5 11.59 9.62 11.45 9.75 11.33C9.86 11.22 10 11.06 10.12 10.92C10.24 10.78 10.28 10.68 10.36 10.51C10.44 10.35 10.4 10.21 10.34 10.09C10.28 9.96 9.8 8.78 9.6 8.3C9.41 7.83 9.21 7.89 9.07 7.89C8.93 7.88 8.77 7.88 8.61 7.88C8.44 7.88 8.18 7.94 7.95 8.19C7.72 8.44 7.09 9.03 7.09 10.23C7.09 11.43 7.97 12.59 8.09 12.75C8.21 12.91 9.81 15.38 12.28 16.44C12.86 16.69 13.32 16.84 13.68 16.96C14.28 17.15 14.82 17.12 15.26 17.06C15.74 16.99 16.74 16.45 16.95 15.86C17.16 15.27 17.16 14.76 17.1 14.66C17.03 14.56 16.88 14.49 16.54 14.41Z" />
    </svg>
  );
}

const quickServices = [
  { id: "residential-commercial", name: "Deep Home Clean", base: 450, icon: Home },
  { id: "office-commercial", name: "Office / Corporate", base: 550, icon: Building2 },
  { id: "post-construction", name: "Post-Construction", base: 950, icon: Hammer },
  { id: "move-in-out", name: "Move-In / Move-Out", base: 650, icon: Truck },
];

const quickSizes = [
  { id: "1-2", label: "1-2 Bedroom", mult: 1.0 },
  { id: "3-4", label: "3-4 Bedroom", mult: 1.4 },
  { id: "commercial", label: "Corporate Hub", mult: 1.8 },
  { id: "estate", label: "Full Complex", mult: 2.2 },
];

const quickFrequencies = [
  { id: "once", label: "One-Time", discount: 0, mult: 1.0 },
  { id: "biweekly", label: "Bi-Weekly", badge: "15% Off", discount: 15, mult: 0.85 },
  { id: "weekly", label: "Weekly", badge: "25% Off", discount: 25, mult: 0.75 },
];

export default function Hero({ onOpenBooking }: HeroProps) {
  // Right side toggle: Live Estimator vs Verified Visual Showcase
  const [activeTab, setActiveTab] = useState<"estimator" | "gallery">("estimator");

  // Estimator State
  const [selectedServiceId, setSelectedServiceId] = useState(quickServices[0].id);
  const [selectedSizeId, setSelectedSizeId] = useState(quickSizes[1].id);
  const [selectedFreqId, setSelectedFreqId] = useState(quickFrequencies[1].id);

  // Dynamic calculations
  const serviceObj = quickServices.find((s) => s.id === selectedServiceId) || quickServices[0];
  const sizeObj = quickSizes.find((s) => s.id === selectedSizeId) || quickSizes[1];
  const freqObj = quickFrequencies.find((f) => f.id === selectedFreqId) || quickFrequencies[1];

  const calcMin = Math.round(serviceObj.base * sizeObj.mult * freqObj.mult);
  const calcMax = Math.round(calcMin * 1.25);
  const rateRange = `GH₵ ${calcMin} - ${calcMax}`;

  const prefilledWhatsAppUrl = `https://wa.me/233591582306?text=${encodeURIComponent(
    `🇬🇭 Hello Global Insight Operations! I estimated *${serviceObj.name}* for *${sizeObj.label}* (*${freqObj.label}*) at *${rateRange}* on your website. I would like to book a team for dispatch in Accra.`
  )}`;

  return (
    <section className="relative overflow-hidden pt-4 pb-16 lg:pt-8 lg:pb-24 bg-gradient-to-b from-white via-[#F4F8FD] to-[#E6F0FA]">
      {/* 1. Real-Time Live Dispatch Alert Bar (Top of Hero) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-[#0A192F] text-white px-4 py-2.5 rounded-2xl shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-extrabold text-[#38BDF8] tracking-wider uppercase text-[10px]">
              Live Dispatch Alert:
            </span>
            <span className="text-slate-300 truncate">
              Mobile specialist teams active today across <strong>East Legon, Cantonments, Airport &amp; Spintex</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-300">
            <span className="hidden md:inline">⚡ Same-Week Slots Available</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="text-amber-400 font-bold">MTN MoMo: 849201</span>
          </div>
        </div>
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-24 right-4 w-[500px] h-[500px] bg-blue-200/35 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-sky-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Trust Pill Badge with Ghana Flag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-blue-200/90 shadow-xs text-xs font-bold text-[#0066CC]">
              <span className="text-base leading-none">🇬🇭</span>
              <span>Accra&apos;s Trusted Commercial &amp; Home Cleaning Firm</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-slate-600 font-semibold hidden sm:inline">100% Guaranteed</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-heading font-extrabold text-[#0A192F] tracking-tight leading-[1.12]">
              Spotless Living &amp; Workspaces Across{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] to-[#0284C7]">
                Greater Accra.
              </span>
            </h1>

            {/* Subheadline with concrete local context */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              We tackle fine Harmattan dust, stubborn post-construction red sand, and daily commercial foot
              traffic using industrial floor rotary scrubbers, hospital-grade sanitizers, and background-vetted
              specialists. Zero deposit required.
            </p>

            {/* Action Buttons: Instant Quote, WhatsApp, Phone */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-1">
              {/* Primary Booking Button */}
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center space-x-2.5 px-7 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-[#0066CC] hover:bg-[#0052A3] active:scale-[0.98] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-sky-200" />
                <span>Book a Cleaning</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* Direct WhatsApp Instant Handoff */}
              <a
                href={prefilledWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 px-6 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>WhatsApp: 059 158 2306</span>
              </a>

              {/* Direct Call */}
              <a
                href="tel:0591582306"
                className="hidden xl:inline-flex items-center justify-center space-x-2 px-5 py-4 rounded-xl text-sm font-bold text-[#0A192F] bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#0066CC]" />
                <span>059 158 2306</span>
              </a>
            </div>

            {/* Verified Ghanaian Payment Channels Strip */}
            <div className="pt-2 border-t border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center lg:text-left">
                Approved Payment Channels (Pay Upon Inspection):
              </span>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                {/* MTN MoMo */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-400/15 border border-amber-300 text-amber-900 font-bold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>MTN MoMo (Merchant: 849201)</span>
                </div>

                {/* Telecel Cash */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-200 text-rose-800 font-bold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Telecel Cash</span>
                </div>

                {/* Stanbic Bank */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0066CC] font-bold text-[11px]">
                  <span>Stanbic Bank Ghana Wire</span>
                </div>

                {/* Zero Deposit */}
                <div className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero Deposit Required</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: INTERACTIVE SWITCHER (Live Instant Calculator vs Verified Photo Gallery) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Tab Selector Pill Switcher */}
            <div className="flex items-center justify-between p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("estimator")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  activeTab === "estimator"
                    ? "bg-[#0066CC] text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Instant Accra Estimator</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  activeTab === "gallery"
                    ? "bg-[#0066CC] text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Verified Clean Gallery</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "estimator" ? (
                /* ── TAB 1: INTERACTIVE INSTANT PRICE ESTIMATOR ── */
                <motion.div
                  key="estimator"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-100 shadow-2xl shadow-blue-950/10 space-y-5 text-left"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0066CC] block">
                        Interactive Calculator
                      </span>
                      <h3 className="text-base font-heading font-extrabold text-[#0A192F]">
                        Calculate Your Transparent Rate
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Fixed Rates in GH₵
                    </span>
                  </div>

                  {/* 1. Service Type Selector */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      1. Service Scope:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {quickServices.map((qs) => {
                        const Icon = qs.icon;
                        const isSelected = selectedServiceId === qs.id;
                        return (
                          <button
                            key={qs.id}
                            type="button"
                            onClick={() => setSelectedServiceId(qs.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center space-x-2 cursor-pointer ${
                              isSelected
                                ? "bg-blue-50 border-[#0066CC] text-[#0066CC] font-bold ring-1 ring-[#0066CC]"
                                : "border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="text-xs truncate">{qs.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Property Size Selector */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      2. Property Scale:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {quickSizes.map((qz) => {
                        const isSelected = selectedSizeId === qz.id;
                        return (
                          <button
                            key={qz.id}
                            type="button"
                            onClick={() => setSelectedSizeId(qz.id)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-blue-50 border-[#0066CC] text-[#0066CC] font-bold ring-1 ring-[#0066CC]"
                                : "border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-xs block">{qz.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Frequency Cadence */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      3. Frequency Cadence:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {quickFrequencies.map((qf) => {
                        const isSelected = selectedFreqId === qf.id;
                        return (
                          <button
                            key={qf.id}
                            type="button"
                            onClick={() => setSelectedFreqId(qf.id)}
                            className={`p-2 rounded-xl border text-center transition-all relative cursor-pointer ${
                              isSelected
                                ? "bg-blue-50 border-[#0066CC] text-[#0066CC] font-bold ring-1 ring-[#0066CC]"
                                : "border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {qf.badge && (
                              <span className="absolute -top-2 right-1 px-1 py-0.2 rounded bg-emerald-500 text-white text-[8px] font-extrabold uppercase">
                                {qf.badge}
                              </span>
                            )}
                            <span className="text-xs block">{qf.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Rate Readout Banner */}
                  <div className="p-4 rounded-2xl bg-[#F4F8FD] border border-blue-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Estimated Upfront Rate:
                      </span>
                      <div className="text-2xl font-heading font-extrabold text-[#0066CC]">
                        {rateRange}
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-500">
                      <span className="text-emerald-700 font-bold block">✓ Kit &amp; Crew Included</span>
                      <span>Greater Accra Mobile Hub</span>
                    </div>
                  </div>

                  {/* Primary 1-Click Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <a
                      href={prefilledWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>Confirm This Quote on WhatsApp →</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onOpenBooking(serviceObj.id)}
                      className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      <span>Reserve Online With Zero Deposit →</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── TAB 2: VERIFIED PHOTO GALLERY ── */
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-12 gap-4">
                    {/* Primary Hero Image: Spotless Modern Interior */}
                    <div className="col-span-12 relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-blue-900/10 h-64 sm:h-72 group">
                      <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                        alt="Spotless luxury interior in Accra cleaned by Global Insight"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5 text-white text-left">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                          Accra Residential &amp; Airbnb Standard
                        </span>
                        <p className="text-sm font-semibold">
                          Spotless Living Room &amp; Penthouse Turnovers
                        </p>
                      </div>
                    </div>

                    {/* Sub-Card 1 */}
                    <div className="col-span-6 relative overflow-hidden rounded-2xl border-4 border-white shadow-lg h-36 group">
                      <img
                        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                        alt="Professional cleaner using hospital-grade sanitization"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 text-white text-left">
                        <p className="text-xs font-bold leading-tight">Vetted Specialists</p>
                        <p className="text-[10px] text-sky-200">Hospital-Grade Protocol</p>
                      </div>
                    </div>

                    {/* Sub-Card 2 */}
                    <div className="col-span-6 relative overflow-hidden rounded-2xl border-4 border-white shadow-lg h-36 group">
                      <img
                        src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80"
                        alt="Spotless kitchen counters and deep cleaning detail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 text-white text-left">
                        <p className="text-xs font-bold leading-tight">Deep Sanitization</p>
                        <p className="text-[10px] text-sky-200">Kitchens &amp; Restrooms</p>
                      </div>
                    </div>
                  </div>

                  {/* 500+ Properties Cleaned Badge */}
                  <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#0284C7] flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center space-x-1">
                          <span className="text-base font-heading font-extrabold text-[#0A192F]">500+</span>
                          <span className="text-xs font-bold text-[#0066CC]">Verified</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Cleanings completed across Greater Accra</p>
                      </div>
                    </div>

                    <div className="flex items-center text-[#F59E0B] text-xs font-bold space-x-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
                      <span>4.9 / 5.0</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
