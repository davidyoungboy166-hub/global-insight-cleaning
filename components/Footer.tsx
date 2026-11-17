"use client";

import React from "react";
import Link from "next/link";
import {
  PhoneCall,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  ArrowUp,
  CheckCircle2,
} from "lucide-react";
import Logo from "./Logo";
import { allServices } from "./ServicesSection";

interface FooterProps {
  onSelectService?: (serviceId: string) => void;
  onOpenTracker?: () => void;
}

const accraAreas = [
  "Airport Residential Area",
  "Cantonments & Labone",
  "East Legon & Adjiringanor",
  "Osu, Ridge & Roman Ridge",
  "Dzorwulu & Abelemkpe",
  "Spintex & Sakumono",
  "Tema Metropolitan",
  "Dansoman & Achimota",
];

export default function Footer({ onSelectService, onOpenTracker }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleServiceClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    serviceId: string
  ) => {
    if (onSelectService) {
      e.preventDefault();
      onSelectService(serviceId);
    }
  };

  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/90">
          {/* Column 1: Brand & WhatsApp Quick Chat (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" size="md" />

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mt-3">
              Ghana&apos;s premier professional cleaning firm. Specializing in high-standard
              residential, commercial, post-construction, and short-let sanitization across Greater
              Accra.
            </p>

            {/* Official Ghanaian Settlement Strip */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                <span>🇬🇭 Approved Payment Channels:</span>
              </div>
              <p className="text-slate-300">
                MTN MoMo (Merchant: <strong className="text-white">849201</strong>) • Telecel Cash • Stanbic Wire
              </p>
              <p className="text-[10px] text-slate-500">
                Ghana Reg: CS08492024 • TIN: C0029481920
              </p>
            </div>

            {/* Direct WhatsApp Quick Chat Button */}
            <div className="pt-1">
              <a
                href="https://wa.me/233591582306?text=Hello%20Global%20Insight%2C%20I%20would%20like%20to%20request%20a%20cleaning%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/30 transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp (Instant Reply)</span>
              </a>
            </div>

            {/* Trust badge */}
            <div className="flex items-center space-x-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Registered, Vetted &amp; Insured in Ghana</span>
            </div>
          </div>

          {/* Column 2: Specialized Services Links (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white mb-4 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>Specialized Services</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {allServices.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleServiceClick(e, s.id)}
                    className="hover:text-[#38BDF8] transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span>{s.title}</span>
                    <span className="text-[10px] text-slate-500 group-hover:text-[#38BDF8]">
                      {s.price}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  className="text-[#38BDF8] hover:underline font-semibold text-xs inline-block pt-1"
                >
                  View All 11 Services →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Accra Coverage Areas (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white mb-4 flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Accra Coverage</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {accraAreas.map((area) => (
                <li key={area} className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#38BDF8] flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Operations (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white mb-4 flex items-center space-x-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Direct Dispatch</span>
            </h4>

            {/* Clickable Phone Numbers */}
            <div className="space-y-2.5">
              <a
                href="tel:0591582306"
                className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-[#0066CC] transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0066CC] text-white flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                    Primary Dispatch
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    059 158 2306
                  </span>
                </div>
              </a>

              <a
                href="tel:0549851802"
                className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-[#0066CC] transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                    Secondary Line
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    054 985 1802
                  </span>
                </div>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-slate-800">
              <div className="flex items-center space-x-2 text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="font-semibold text-white">Operating Hours:</span>
              </div>
              <p className="flex justify-between text-[11px]">
                <span className="text-slate-400">Monday - Saturday:</span>
                <span className="font-medium text-white">7:00 AM - 7:00 PM</span>
              </p>
              <p className="flex justify-between text-[11px]">
                <span className="text-slate-400">Sunday &amp; Holidays:</span>
                <span className="font-medium text-[#38BDF8]">On Appointment</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} Global Insight Cleaning Services. All rights reserved.
            Accra, Ghana.
          </p>

          <div className="flex items-center space-x-5">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span>•</span>
            {onOpenTracker && (
              <>
                <button
                  type="button"
                  onClick={onOpenTracker}
                  className="text-slate-400 hover:text-[#38BDF8] transition-colors cursor-pointer"
                >
                  Track Booking
                </button>
                <span>•</span>
              </>
            )}
            <Link
              href="/admin"
              className="text-slate-400 hover:text-[#38BDF8] transition-colors"
            >
              Staff Portal
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 text-xs text-[#38BDF8] hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
