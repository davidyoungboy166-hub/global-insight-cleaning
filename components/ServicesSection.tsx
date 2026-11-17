"use client";

import React, { useState } from "react";
import {
  Building2,
  KeyRound,
  Truck,
  Hammer,
  Bug,
  CalendarCheck2,
  Layers,
  Armchair,
  PartyPopper,
  ShieldPlus,
  Crown,
  ArrowRight,
  Sparkles,
  FileText,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: React.ElementType;
  tag?: string;
  category: "residential" | "commercial" | "specialized";
  ghanaHighlight?: string;
}

// Dynamic icon mapping dictionary for guaranteed resolution
export const serviceIconMap: Record<string, React.ElementType> = {
  "residential-commercial": Building2,
  "real-estate": KeyRound,
  "move-in-out": Truck,
  "post-construction": Hammer,
  "fumigation": Bug,
  "airbnb-turnover": CalendarCheck2,
  "floor-polishing": Layers,
  "upholstery-sofa": Armchair,
  "after-event": PartyPopper,
  "surface-sanitization": ShieldPlus,
  "deep-cleaning-packages": Crown,
};

export const allServices: ServiceItem[] = [
  {
    id: "residential-commercial",
    title: "Residential & Commercial Cleaning",
    description:
      "Routine and periodic maintenance for homes, retail locations, and corporate office complexes.",
    price: "From GH₵ 450",
    icon: Building2,
    tag: "Most Popular",
    category: "residential",
    ghanaHighlight: "High-traffic dusting & HEPA deep vacuuming",
  },
  {
    id: "real-estate",
    title: "Real Estate Property Cleaning",
    description:
      "Show-ready detailing for brokers, property managers, and developers presenting to high-value buyers.",
    price: "From GH₵ 600",
    icon: KeyRound,
    tag: "Show Ready",
    category: "commercial",
    ghanaHighlight: "Pristine inspection standard for diaspora buyers",
  },
  {
    id: "move-in-out",
    title: "Move-In & Move-Out Cleaning",
    description:
      "Exhaustive sanitation for tenants, landlords, and homeowners ensuring spotless handovers and deposit returns.",
    price: "From GH₵ 650",
    icon: Truck,
    category: "residential",
    ghanaHighlight: "Complete wall, cabinet & appliance overhaul",
  },
  {
    id: "post-construction",
    title: "Post-Construction Cleaning",
    description:
      "Heavy dust eradication, paint & adhesive stripping, window razor detailing, and debris clearance.",
    price: "From GH₵ 950",
    icon: Hammer,
    tag: "Heavy Duty",
    category: "specialized",
    ghanaHighlight: "Red sand & tile cement haze stripping",
  },
  {
    id: "fumigation",
    title: "Fumigation & Pest Control",
    description:
      "FDA-approved odorless misting and targeted extermination for termites, rodents, cockroaches, and bedbugs.",
    price: "From GH₵ 400",
    icon: Bug,
    category: "specialized",
    ghanaHighlight: "FDA approved, odorless, 90-day warrantied",
  },
  {
    id: "airbnb-turnover",
    title: "Airbnb & Short-Let Turnover Cleaning",
    description:
      "Rapid hotel-grade guest turnover with linen changing, toiletries replenishment, and 5-star staging.",
    price: "From GH₵ 350",
    icon: CalendarCheck2,
    tag: "Quick Turnaround",
    category: "residential",
    ghanaHighlight: "3-hour turnaround with linen change in Accra",
  },
  {
    id: "floor-polishing",
    title: "Floor Polishing Services",
    description:
      "Machine scrubbing, marble honing, terrazzo buffing, porcelain sealants, and grout line restoration.",
    price: "From GH₵ 550",
    icon: Layers,
    category: "commercial",
    ghanaHighlight: "Rotary diamond buffing for terrazzo & marble",
  },
  {
    id: "upholstery-sofa",
    title: "Upholstery & Sofa Deep Cleaning",
    description:
      "Hot-water extraction and steam decontamination for luxury fabrics, velvet couches, and leather suites.",
    price: "From GH₵ 380",
    icon: Armchair,
    category: "residential",
    ghanaHighlight: "Deep extraction eliminates Accra road soot & dust",
  },
  {
    id: "after-event",
    title: "After-Event Cleanup",
    description:
      "Swift post-celebration clearing, trash removal, floor sanitization, and venue restoration across Accra.",
    price: "From GH₵ 700",
    icon: PartyPopper,
    category: "specialized",
    ghanaHighlight: "Fast overnight teardown & waste disposal",
  },
  {
    id: "surface-sanitization",
    title: "Surface Sanitization",
    description:
      "Electrostatic hospital-grade antiviral fogging for clinics, schools, daycare centers, and corporate desks.",
    price: "From GH₵ 350",
    icon: ShieldPlus,
    category: "commercial",
    ghanaHighlight: "Hospital-grade touchpoint decontamination",
  },
  {
    id: "deep-cleaning-packages",
    title: "Deep Cleaning Packages",
    description:
      "All-inclusive full-property overhauls covering ceilings, walls, kitchen appliances, and exterior glass.",
    price: "From GH₵ 800",
    icon: Crown,
    tag: "Comprehensive",
    category: "specialized",
    ghanaHighlight: "Ceiling fans, grease traps & louvre window washing",
  },
];

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onRequestQuote?: () => void;
}

export default function ServicesSection({ onSelectService, onRequestQuote }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "residential" | "commercial" | "specialized">("all");

  const filteredServices = selectedCategory === "all" 
    ? allServices 
    : allServices.filter(s => s.category === selectedCategory || (selectedCategory === "commercial" && s.id === "residential-commercial"));

  const categories = [
    { id: "all", label: `All Services (${allServices.length})` },
    { id: "residential", label: "🏡 Residential & Airbnb" },
    { id: "commercial", label: "🏢 Commercial & Offices" },
    { id: "specialized", label: "🏗️ Heavy Duty & Specialized" },
  ] as const;

  return (
    <section id="services" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0066CC] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>Comprehensive Cleaning Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0A192F] tracking-tight">
            Specialized Cleaning Services in Accra
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            From luxury residences in Cantonments and Airport to commercial centers in Ridge and
            East Legon, we provide dedicated equipment, vetted staff, and exact standards.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0A192F] text-white shadow-md shadow-slate-900/15 ring-2 ring-[#0A192F]/20 scale-[1.02]"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Responsive Grid for filtered services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const Icon = serviceIconMap[service.id] || service.icon || Sparkles;
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-[#0066CC]/50 shadow-[0_4px_20px_-4px_rgba(10,25,47,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(0,102,204,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Icon & Price / Tag */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center flex-shrink-0 border border-blue-100/70 shadow-sm group-hover:bg-[#0066CC] group-hover:border-[#0066CC] group-hover:text-white transition-all duration-300">
                      <Icon
                        className="w-6 h-6 text-[#0066CC] group-hover:text-white transition-colors duration-300 flex-shrink-0"
                        strokeWidth={2.2}
                      />
                    </div>

                    <div className="flex flex-col items-end">
                      {service.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100/70 text-[#0066CC] mb-1">
                          {service.tag}
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-800 font-heading">
                        {service.price}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-[#0A192F] mb-2 group-hover:text-[#0066CC] transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Ghanaian specific feature badge */}
                  {service.ghanaHighlight && (
                    <div className="flex items-center space-x-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100 mb-6">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{service.ghanaHighlight}</span>
                    </div>
                  )}
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="flex-1 inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`https://wa.me/233544485577?text=${encodeURIComponent(`Hello Global Insight Cleaning, I would like to inquire about booking your ${service.title} in Accra.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Quick WhatsApp Inquiry"
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-200/60 transition-all flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom inquiry strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#F4F8FD] to-white border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-heading font-bold text-[#0A192F]">
              Require a Custom Corporate or Estate Contract?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              We offer bespoke recurring service agreements for property developers, facility
              managers, and diplomatic residences across Greater Accra.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-shrink-0">
            {onRequestQuote && (
              <button
                type="button"
                onClick={onRequestQuote}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-white border border-blue-200 text-[#0066CC] hover:bg-blue-50 font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Instant Pro-Forma Quote (PDF)</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onSelectService("residential-commercial")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              Request Custom Proposal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
