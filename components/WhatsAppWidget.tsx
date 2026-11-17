"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, PhoneCall, Sparkles, ArrowUpRight } from "lucide-react";

// Official WhatsApp Vector Icon
function WhatsAppIcon({ className = "w-7 h-7" }: { className?: string }) {
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

const quickTopics = [
  {
    title: "🏠 Home / Apartment Cleaning",
    message: "Hello Global Insight, I'd like to inquire about residential cleaning in Accra.",
  },
  {
    title: "🏢 Office / Post-Construction",
    message:
      "Hello Global Insight, I need a quote for commercial / post-construction cleaning.",
  },
  {
    title: "🔑 Airbnb / Short-Let Turnover",
    message: "Hello Global Insight, I'm interested in Airbnb turnover cleaning services.",
  },
];

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Hide widget completely on /admin routes
  const isAdmin = pathname?.startsWith("/admin");

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (isAdmin) {
    return null;
  }

  const primaryWhatsAppUrl =
    "https://wa.me/233591582306?text=Hello%20Global%20Insight%2C%20I%20would%20like%20to%20request%20a%20cleaning%20quote.";

  const handleOpenTopic = (msg: string) => {
    const url = `https://wa.me/233591582306?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <aside
      aria-label="WhatsApp live chat support"
      ref={widgetRef}
      className="fixed z-40 flex flex-col items-end right-4 sm:right-6 bottom-4 sm:bottom-6"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
        right: "max(1rem, env(safe-area-inset-right, 1rem))",
      }}
    >
      {/* 1. INTERACTIVE MINI-CHAT POPOVER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-[calc(100vw-2rem)] sm:w-[330px] max-w-[340px] rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden mb-3 select-none flex flex-col"
          >
            {/* Popover Header: Brand Deep Navy #0A192F with #0066CC accent bar */}
            <div className="relative bg-[#0A192F] text-white p-4">
              {/* Subtle primary blue top accent bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0066CC] via-[#0284C7] to-[#38BDF8]" />

              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center space-x-3">
                  {/* Avatar with emerald online badge */}
                  <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                    <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0A192F]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-heading font-bold text-white tracking-tight leading-tight">
                      Global Insight Support
                    </h3>
                    <p className="text-[11px] text-sky-200 mt-0.5 flex items-center space-x-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Typically replies in under 5 mins • Accra</span>
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close WhatsApp chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Popover Body */}
            <div className="p-4 bg-[#F8FAFC] space-y-3">
              {/* Soft Sky Tint chat bubble greeting */}
              <div className="bg-[#F4F8FD] p-3.5 rounded-2xl rounded-tl-xs border border-blue-100/70 shadow-2xs">
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Hi there! 👋 Need a spotless home, office, or Airbnb turnover in Accra? Tap a quick option below or start a chat:
                </p>
                <div className="flex items-center justify-end mt-1.5 space-x-1 text-[10px] text-slate-400">
                  <span>Accra Support</span>
                  <span>•</span>
                  <span>Just now</span>
                </div>
              </div>

              {/* Quick-Reply Topic Chips */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  Choose your inquiry:
                </p>
                {quickTopics.map((topic) => (
                  <button
                    key={topic.title}
                    type="button"
                    onClick={() => handleOpenTopic(topic.message)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white hover:bg-emerald-50/80 border border-slate-200/80 hover:border-emerald-300 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-all shadow-2xs text-left group cursor-pointer"
                  >
                    <span className="truncate pr-2">{topic.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Popover Footer: Primary CTA & Alternate Call Info */}
            <div className="p-3.5 bg-white border-t border-slate-100 space-y-2">
              <a
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md shadow-emerald-600/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Start WhatsApp Chat</span>
                <Send className="w-3.5 h-3.5 ml-1" />
              </a>

              {/* Secondary Alternate Line */}
              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 pt-0.5">
                <PhoneCall className="w-3 h-3 text-[#0066CC]" />
                <span>Alternate dispatch:</span>
                <a
                  href="tel:0549851802"
                  className="font-bold text-[#0A192F] hover:text-[#0066CC] transition-colors"
                >
                  054 985 1802
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING TRIGGER BUTTON & TOOLTIP */}
      <div className="relative flex items-center">
        {/* Desktop Hover Tooltip (shown when chat card is closed) */}
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 hidden sm:flex items-center space-x-1.5 bg-white text-[#0A192F] font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-md border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Chat with Global Insight</span>
          </div>
        )}

        {/* Circular Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat with Global Insight"}
          aria-expanded={isOpen}
          className="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg shadow-emerald-600/30 hover:-translate-y-1 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        >
          {/* Subtle online status dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white" />
          </span>

          {isOpen ? (
            <X className="w-6 h-6 text-white transition-transform duration-200" />
          ) : (
            <WhatsAppIcon className="w-7 h-7 text-white transition-transform group-hover:scale-110 duration-200" />
          )}
        </button>
      </div>
    </aside>
  );
}
