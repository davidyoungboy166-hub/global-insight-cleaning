"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Sparkles, Menu, X, ArrowRight, ShieldCheck, Clock, Truck } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onOpenQuote?: () => void;
  onOpenTracker?: () => void;
}

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "42-Point Checklist", href: "#checklist" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Reviews", href: "#reviews" },
];

export default function Navbar({ onOpenQuote, onOpenTracker }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll detection for refined shadow and glassmorphic elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section for nav highlight
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offset = 80; // height of sticky navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setMobileMenuOpen(false);
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onOpenQuote) {
      onOpenQuote();
    } else {
      // Fallback: smooth scroll to booking or instant quote section if onOpenQuote is not provided
      const bookingSection = document.getElementById("booking") || document.getElementById("quote");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(10,25,47,0.06)]"
            : "backdrop-blur-md bg-white/90 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Custom Scalable Logo */}
            <div className="flex-shrink-0">
              <Logo variant="dark" size="md" />
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-[#0066CC] font-semibold bg-blue-50/70"
                        : "text-[#0A192F]/80 hover:text-[#0066CC] hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#0066CC] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Click-to-call badge & Primary CTA */}
            <div className="hidden lg:flex items-center space-x-3.5">
              {/* Self-Service Booking Tracker Pill */}
              {onOpenTracker && (
                <button
                  type="button"
                  onClick={onOpenTracker}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-[#0066CC] bg-slate-100 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-200 transition-all cursor-pointer"
                  title="Track your cleaning reservation"
                >
                  <Truck className="w-3.5 h-3.5 text-[#0066CC]" />
                  <span>Track Booking</span>
                </button>
              )}

              {/* Click-to-call badge */}
              <a
                href="tel:0591582306"
                className="group flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-200 transition-all duration-200"
                title="Call Global Insight Cleaning Accra"
              >
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white shadow-xs border border-slate-100 text-[#0066CC] group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-4 h-4" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    Call Accra Office
                  </span>
                  <span className="text-sm font-bold text-[#0A192F] tracking-tight group-hover:text-[#0066CC] transition-colors">
                    059 158 2306
                  </span>
                </div>
              </a>

              {/* Primary CTA button */}
              <button
                type="button"
                onClick={handleCtaClick}
                className="relative inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#0066CC] hover:bg-[#0052A3] active:scale-[0.98] shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-offset-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-sky-200" />
                <span>Get Instant Quote</span>
              </button>
            </div>

            {/* Mobile Actions: Call Button & Hamburger Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a
                href="tel:0591582306"
                className="p-2.5 rounded-xl bg-blue-50 text-[#0066CC] border border-blue-100 hover:bg-blue-100 transition-colors"
                aria-label="Call 059 158 2306"
              >
                <PhoneCall className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-[#0A192F] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0066CC] transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-20 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-20 inset-x-0 z-50 bg-white border-b border-slate-200 shadow-2xl lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <div className="px-5 py-6 space-y-6">
                {/* Navigation links */}
                <div className="space-y-1">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Navigation
                  </p>
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold text-[#0A192F] hover:text-[#0066CC] hover:bg-blue-50/60 active:bg-blue-50 transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </a>
                  ))}
                </div>

                {/* Trust mini-banner inside drawer */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3 text-xs text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-[#0066CC] flex-shrink-0" />
                  <span>Vetted cleaners & 100% Satisfaction Guaranteed across Greater Accra</span>
                </div>

                {/* Mobile Call-to-actions */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCtaClick}
                    className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl text-base font-bold text-white bg-[#0066CC] hover:bg-[#0052A3] active:scale-[0.99] shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-sky-200" />
                    <span>Get Instant Quote</span>
                  </button>

                  {onOpenTracker && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenTracker();
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold text-[#0066CC] bg-blue-50 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Track Booking (GI-XXXXX)</span>
                    </button>
                  )}

                  <a
                    href="tel:0591582306"
                    className="w-full flex items-center justify-center space-x-3 px-5 py-3 rounded-xl text-sm font-semibold text-[#0A192F] bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200/70"
                  >
                    <PhoneCall className="w-4 h-4 text-[#0066CC]" />
                    <span>Direct Call: 059 158 2306</span>
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mon - Sat: 7:00 AM - 7:00 PM | Sun: On Request</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
