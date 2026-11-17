"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, Quote, MapPin, CheckCircle2 } from "lucide-react";

interface Review {
  name: string;
  role: string;
  location: string;
  rating: number;
  content: string;
  category: "all" | "residential" | "commercial" | "post-construction" | "airbnb";
  tag: string;
}

const reviews: Review[] = [
  {
    name: "Nana Ama Boateng",
    role: "Homeowner",
    location: "Cantonments, Accra",
    rating: 5,
    category: "residential",
    content:
      "Global Insight handled the deep cleaning for our 4-bedroom residence in Cantonments before moving in. The bathrooms looked brand new, the kitchen tiles were descaled, and the team was thoroughly professional and uniformed. Will continue using them monthly!",
    tag: "Residential Deep Clean",
  },
  {
    name: "Kofi Addison",
    role: "Facility & Operations Director",
    location: "Airport Residential Area",
    rating: 5,
    category: "commercial",
    content:
      "We contracted Global Insight for our corporate offices and executive boardrooms in Airport Residential. They operate quietly after hours, respect tight security protocols, and our workspace smells fresh and immaculate every morning.",
    tag: "Commercial Office Clean",
  },
  {
    name: "Dr. Emmanuel Quaye",
    role: "Property Investor",
    location: "East Legon, Accra",
    rating: 5,
    category: "post-construction",
    content:
      "Post-construction fine cement dust seemed impossible to remove after our renovation in East Legon. Global Insight brought industrial extraction vacuums, cleared all paint splatters, and handed back turnkey keys in a single day.",
    tag: "Post-Construction Handover",
  },
  {
    name: "Afiya Mensah",
    role: "Superhost & Real Estate Manager",
    location: "Labone & Osu",
    rating: 5,
    category: "airbnb",
    content:
      "Managing 6 luxury short-let apartments in Labone and Osu requires zero room for error. Global Insight’s Airbnb turnover team handles same-day checkouts with fresh linens and 5-star staging flawlessly.",
    tag: "Airbnb Turnover Specialist",
  },
  {
    name: "Kwaku Asare",
    role: "Real Estate Broker",
    location: "Ridge & Roman Ridge",
    rating: 5,
    category: "commercial",
    content:
      "Before client viewings, Global Insight does a complete show-ready detailing. Their floor buffing and glass polishing immediately elevate the property valuation in the eyes of prospective buyers.",
    tag: "Real Estate Show Detailing",
  },
  {
    name: "Sarah Jenkins",
    role: "Diplomatic Resident",
    location: "Cantonments Embassy Enclave",
    rating: 5,
    category: "residential",
    content:
      "Reliable, background-checked cleaners who take genuine care with delicate furniture and Italian marble surfaces. Their prompt customer service and transparent estimates make them the best in Ghana.",
    tag: "Executive Deep Cleaning",
  },
];

export default function ReviewsSection() {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial" | "post-construction" | "airbnb">("all");

  const filteredReviews = filter === "all" ? reviews : reviews.filter((r) => r.category === filter);

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#F4F8FD] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-blue-200/60 text-[#0066CC] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>Verified Accra Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0A192F] tracking-tight">
            Trusted by 500+ Homes, Offices &amp; Hosts
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Read authentic reviews from homeowners, commercial managers, and real estate leaders
            across Greater Accra.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: "all", label: "All Reviews (6)" },
              { id: "residential", label: "🏡 Residential Homes" },
              { id: "commercial", label: "🏢 Corporate Offices" },
              { id: "post-construction", label: "🏗️ Post-Construction" },
              { id: "airbnb", label: "🔑 Airbnb Short-Lets" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#0066CC] text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.name}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(10,25,47,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(0,102,204,0.08)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Star rating in #F59E0B */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-[#F59E0B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0066CC]">
                    {rev.tag}
                  </span>
                </div>

                {/* Quote body */}
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-sm font-heading font-bold text-[#0A192F]">{rev.name}</h4>
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{rev.role}</p>
                </div>
                <div className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500">
                  <MapPin className="w-3 h-3 text-[#0066CC]" />
                  <span>{rev.location.split(",")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
