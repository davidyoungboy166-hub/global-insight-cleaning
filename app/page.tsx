"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import InteractiveChecklist from "@/components/InteractiveChecklist";
import ProcessSection from "@/components/ProcessSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ReviewsSection from "@/components/ReviewsSection";
import CoverageAndFaqSection from "@/components/CoverageAndFaqSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import ProFormaInvoiceModal from "@/components/ProFormaInvoiceModal";
import BookingTrackerModal from "@/components/BookingTrackerModal";
import { Sparkles, PhoneCall, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProFormaOpen, setIsProFormaOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] =
    useState("residential-commercial");

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForModal(serviceId);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#0066CC]/15 selection:text-[#0066CC]">
      {/* 1. Sticky Glassmorphic Navbar */}
      <Navbar
        onOpenQuote={() => handleOpenBooking()}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Hero Section: Asymmetric 2-column layout & Editorial Bento Grid */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 3. Services Section: Clean 3-column grid featuring all 11 services */}
        <ServicesSection
          onSelectService={(serviceId) => handleOpenBooking(serviceId)}
          onRequestQuote={() => setIsProFormaOpen(true)}
        />

        {/* 4. The Global Insight 42-Point Spotless Cleaning Checklist (Interactive by room) */}
        <InteractiveChecklist onOpenBooking={(serviceId) => handleOpenBooking(serviceId)} />

        {/* 5. Why Global Insight & How It Works: 3-step horizontal process & quality standards */}
        <ProcessSection onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Before & After Transformations: Draggable Split-Screen Comparison Slider */}
        <BeforeAfterSection onOpenBooking={(serviceId) => handleOpenBooking(serviceId)} />

        {/* 6. Verified Client Reviews Section: 5-star ratings in #F59E0B */}
        <ReviewsSection />

        {/* 6. High-Converting Bottom Call-To-Action Banner */}
        <section id="quote" className="py-16 lg:py-20 bg-gradient-to-r from-[#0066CC] via-[#0284C7] to-[#0052A3] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-100 text-xs font-bold uppercase tracking-wider mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>Available This Week in Greater Accra</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
              Ready for a Spotless, Freshly Sanitized Space?
            </h2>

            <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto font-normal leading-relaxed">
              Book your customized cleaning in less than 60 seconds or speak directly with our
              Accra operations desk for immediate dispatch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl bg-white text-[#0066CC] font-bold text-base hover:bg-sky-50 shadow-xl shadow-blue-950/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#0066CC]" />
                <span>Get Instant Quote Now</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <a
                href="https://wa.me/233591582306?text=Hello%20Global%20Insight%2C%20I%20would%20like%20to%20book%20a%20cleaning%20session."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-950/25 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp: 059 158 2306</span>
              </a>

              <a
                href="tel:0591582306"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-[#0A192F] hover:bg-[#172A45] text-white font-bold text-base transition-all border border-blue-400/30"
              >
                <PhoneCall className="w-4 h-4 text-sky-300" />
                <span>Direct Call</span>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center space-x-2 text-xs text-sky-200">
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              <span>Fixed price quotes • Zero hidden fees • 100% satisfaction guarantee</span>
            </div>
          </div>
        </section>

        {/* 8. Accra Service Coverage & FAQs: Asymmetric 2-column grid */}
        <CoverageAndFaqSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* 9. Footer: Deep Navy #0A192F with Light SVG Logo & Direct Links */}
      <Footer
        onSelectService={(serviceId) => handleOpenBooking(serviceId)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* 8. Interactive Booking & Estimator Modal (All 11 Services) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={selectedServiceForModal}
      />

      {/* 9. Standalone Corporate Pro-Forma Invoice & Quotation Generator Modal */}
      <ProFormaInvoiceModal
        isOpen={isProFormaOpen}
        onClose={() => setIsProFormaOpen(false)}
      />

      {/* 10. Self-Service Real-Time Booking Status Tracker Modal */}
      <BookingTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />
    </div>
  );
}
