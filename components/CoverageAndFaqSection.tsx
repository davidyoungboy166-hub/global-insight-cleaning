"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  PhoneCall,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const neighborhoods = [
  "East Legon",
  "Cantonments",
  "Airport Residential",
  "Osu",
  "Labone",
  "Spintex",
  "Tema",
  "Dansoman",
  "Madina",
  "Dzorwulu",
  "Roman Ridge",
  "Teshie-Nungua",
];

const neighborhoodDetails: Record<string, { hub: string; leadTime: string; popularFor: string }> = {
  "East Legon": {
    hub: "American House / Boundary Road Hub",
    leadTime: "Same-day priority & scheduled slots",
    popularFor: "Executive villas, townhouses & post-construction handover",
  },
  "Cantonments": {
    hub: "Switchback / 5th Circular Road Patrol",
    leadTime: "Daily dedicated crew on standby",
    popularFor: "Diplomatic residences, Embassy Gardens & luxury penthouses",
  },
  "Airport Residential": {
    hub: "Airport City Corporate Enclave",
    leadTime: "Rapid 30-min mobilization window",
    popularFor: "Commercial suites, Mirage Residence & luxury short-lets",
  },
  "Osu": {
    hub: "Oxford Street & Ring Road Unit",
    leadTime: "Morning & afternoon turnover slots",
    popularFor: "Airbnb turnovers, boutique offices & restaurants",
  },
  "Labone": {
    hub: "Labone Junction Mobile Base",
    leadTime: "Daily scheduled morning teams",
    popularFor: "Private residences & diplomatic apartment deep cleans",
  },
  "Spintex": {
    hub: "Spintex Coastal / Junction Hub",
    leadTime: "Morning & afternoon daily routes",
    popularFor: "Gated estates, retail hubs & compound tile pressure washing",
  },
  "Tema": {
    hub: "Communities 1-25 Logistics Base",
    leadTime: "Daily scheduled routes",
    popularFor: "Industrial sanitization, harbor offices & residential estates",
  },
  "Dansoman": {
    hub: "Dansoman Keep Fit Mobile Base",
    leadTime: "Scheduled morning & afternoon visits",
    popularFor: "Family residences, move-in sanitization & compound washing",
  },
  "Madina": {
    hub: "Zongo Junction & Legon Enclave",
    leadTime: "Same-week priority slots",
    popularFor: "Modern apartments & residential compound detailing",
  },
  "Dzorwulu": {
    hub: "Blohum Street Mobile Unit",
    leadTime: "Daily commercial & home dispatch",
    popularFor: "Corporate hubs, media studios & private residences",
  },
  "Roman Ridge": {
    hub: "Patrice Lumumba Patrol Unit",
    leadTime: "Priority slots open",
    popularFor: "Executive suites, real estate staging & embassy homes",
  },
  "Teshie-Nungua": {
    hub: "Bush Road / Estates Enclave Unit",
    leadTime: "Scheduled morning routes",
    popularFor: "Compound pressure washing & residential deep cleans",
  },
};

const faqs = [
  {
    question: "Do your cleaners bring their own equipment and cleaning supplies?",
    answer:
      "Yes. Every Global Insight team arrives fully equipped with industrial vacuum cleaners, floor scrubbers, microfiber systems, and eco-safe, non-toxic disinfectants—at no extra supply charge.",
  },
  {
    question: "Are your cleaning staff vetted and supervised?",
    answer:
      "100%. All specialists undergo thorough background verification, guarantor checks, and hands-on training before entering any client property. Commercial and post-construction jobs also include an on-site team supervisor.",
  },
  {
    question: "Can I book same-day or emergency Airbnb turnover cleaning?",
    answer:
      "Yes, subject to team availability. For urgent same-day turnovers or after-event cleanups in Accra, call or WhatsApp 059 158 2306 directly for priority dispatch.",
  },
  {
    question: "How does pricing work for offices, post-construction, or large homes?",
    answer:
      "Standard residential and Airbnb cleanings follow transparent tiered pricing based on bedroom count. For post-construction sites, fumigation, and commercial offices, we provide an instant estimate online and confirm exact scope via a quick site check or video walkthrough.",
  },
  {
    question: "How do I pay for my cleaning service?",
    answer:
      "You can reserve your date online with zero upfront deposit. Payment is settled upon completion and inspection via Mobile Money (MTN MoMo / Telecel Cash), bank transfer, or cash.",
  },
];

interface CoverageAndFaqSectionProps {
  onOpenBooking?: (serviceId?: string) => void;
}

export default function CoverageAndFaqSection({ onOpenBooking }: CoverageAndFaqSectionProps) {
  const [selectedArea, setSelectedArea] = useState<string>("East Legon");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  return (
    <section id="faq" className="py-16 lg:py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN (lg:col-span-5): Greater Accra Service Coverage Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#F4F8FD] rounded-3xl p-6 sm:p-8 border border-blue-100/80 shadow-[0_10px_30px_-5px_rgba(10,25,47,0.04)] sticky top-28">
              {/* Card Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#0066CC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5 text-[#0066CC]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066CC] block">
                    Greater Accra Hub
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0A192F] tracking-tight">
                    Areas We Serve Across Accra
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Fast mobile dispatch teams stationed across Greater Accra for homes, offices, and
                short-lets.
              </p>

              {/* Interactive Neighborhood Pills */}
              <div className="space-y-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.map((area) => {
                    const isSelected = selectedArea === area;
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setSelectedArea(area)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? "bg-[#0066CC] text-white shadow-sm border border-[#0066CC] scale-[1.03]"
                            : "bg-white text-slate-700 hover:text-[#0066CC] hover:bg-white/90 border border-slate-200/80 shadow-2xs"
                        }`}
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>

                {/* Live Status Readout */}
                {(() => {
                  const details = neighborhoodDetails[selectedArea] || neighborhoodDetails["East Legon"];
                  return (
                    <div className="p-4 rounded-2xl bg-white border border-blue-200/90 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="font-heading font-extrabold text-xs sm:text-sm text-[#0A192F] truncate">
                            {details.hub}
                          </span>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                          Active Hub
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                        <p>
                          <span className="font-bold text-slate-800">Arrival Window: </span>
                          <span className="text-[#0066CC] font-semibold">{details.leadTime}</span>
                        </p>
                        <p className="text-[11px] text-slate-500">
                          <span className="font-bold text-slate-700">Standard Scope: </span>
                          {details.popularFor}
                        </p>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={handleBookingClick}
                          className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-[#0066CC] text-[#0066CC] hover:text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <span>Request {selectedArea} Dispatch Team →</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Bottom Callout Strip inside card */}
              <div className="pt-5 border-t border-blue-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-600">
                <p className="leading-relaxed">
                  Outside these areas? Call{" "}
                  <a
                    href="tel:0591582306"
                    className="font-bold text-[#0A192F] hover:text-[#0066CC] transition-colors"
                  >
                    059 158 2306
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:0549851802"
                    className="font-bold text-[#0A192F] hover:text-[#0066CC] transition-colors"
                  >
                    054 985 1802
                  </a>{" "}
                  to confirm custom dispatch anywhere in Greater Accra.
                </p>

                <button
                  type="button"
                  onClick={handleBookingClick}
                  className="inline-flex items-center space-x-1 font-bold text-[#0066CC] hover:text-[#0052A3] whitespace-nowrap cursor-pointer flex-shrink-0 pt-1 sm:pt-0"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (lg:col-span-7): Frequently Asked Questions Accordion */}
          <div className="lg:col-span-7">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0066CC] text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>COMMON QUESTIONS</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#0A192F] tracking-tight">
                Everything You Need to Know
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Transparent answers about our equipment, vetting standards, pricing, and Accra booking process.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-[#0066CC]/50 bg-blue-50/20 shadow-xs"
                        : "border-slate-200/80 bg-white hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer group focus:outline-none"
                    >
                      <span
                        className={`text-sm sm:text-base font-heading font-bold pr-4 transition-colors ${
                          isOpen ? "text-[#0066CC]" : "text-[#0A192F] group-hover:text-[#0066CC]"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          isOpen
                            ? "bg-[#0066CC] text-white rotate-180"
                            : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0066CC]"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-blue-100/40">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mini Trust Bar beneath FAQs */}
            <div className="mt-8 p-4 rounded-2xl bg-[#F4F8FD] border border-blue-100/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                <span>Still have questions about a special assignment?</span>
              </div>
              <a
                href="https://wa.me/233591582306?text=Hello%20Global%20Insight%2C%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0066CC] hover:text-[#0052A3] transition-colors whitespace-nowrap"
              >
                Chat on WhatsApp with our team →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
