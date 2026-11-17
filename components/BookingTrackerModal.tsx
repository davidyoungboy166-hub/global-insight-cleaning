"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  FileText,
  CalendarCheck2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Building2,
} from "lucide-react";
import Logo from "./Logo";
import { Booking } from "@/lib/db";
import ProFormaInvoiceModal, { ProFormaData } from "./ProFormaInvoiceModal";

interface BookingTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

// Official WhatsApp vector icon
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

export default function BookingTrackerModal({
  isOpen,
  onClose,
  initialQuery = "",
}: BookingTrackerModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Pro-forma preview modal state
  const [isProFormaOpen, setIsProFormaOpen] = useState(false);
  const [proFormaData, setProFormaData] = useState<ProFormaData | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/bookings?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        setSearchResults(data.bookings);
        if (data.bookings.length > 0) {
          setSelectedBooking(data.bookings[0]);
        } else {
          setSelectedBooking(null);
        }
      } else {
        setSearchResults([]);
        setSelectedBooking(null);
      }
    } catch (err) {
      console.error("Failed to track booking:", err);
      setSearchResults([]);
      setSelectedBooking(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenProForma = (b: Booking) => {
    setProFormaData({
      quoteId: b.id,
      clientName: b.customerName,
      companyName: b.customerName,
      phone: b.phone,
      email: b.email,
      address: b.address,
      serviceType: b.serviceType,
      propertySize: b.propertySize,
      preferredDate: b.preferredDate,
      timeSlot: b.timeSlot,
      notes: b.notes,
      estimatedPrice: b.estimatedPrice,
      createdAt: b.createdAt,
    });
    setIsProFormaOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full overflow-hidden text-slate-800 flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="bg-[#0A192F] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#38BDF8] flex items-center justify-center border border-blue-400/30">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white">
                  Track Your Cleaning Reservation
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time Greater Accra dispatch &amp; crew schedule status
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close tracker"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box Strip */}
          <div className="p-5 sm:p-6 bg-[#F4F8FD] border-b border-slate-200/80">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Booking Ref (e.g. GI-84921) or Ghana Phone (e.g. 024...)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-medium focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-800 placeholder-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !searchQuery.trim()}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex-shrink-0"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Locating...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Track Status</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Quick demo lookups: Try <strong>GI-84921</strong>, <strong>GI-84922</strong>, or your booking phone</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-grow">
            {!hasSearched && !selectedBooking ? (
              /* Initial State */
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0066CC] flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-extrabold text-base text-[#0A192F]">
                  Enter Your Booking Details Above
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Enter your 5-digit booking reference number (from your confirmation receipt or WhatsApp) or the phone number used during reservation.
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              /* Not Found State */
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-base text-[#0A192F]">
                    No Reservation Found for &quot;{searchQuery}&quot;
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                    Please check for any typos in your Booking ID (e.g., <strong>GI-84921</strong>) or confirm using the phone number registered on the quote.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/233591582306?text=Hello%20Global%20Insight%2C%20I%20am%20trying%20to%20locate%20my%20cleaning%20booking."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                    <span>Inquire with Dispatch on WhatsApp</span>
                  </a>

                  <a
                    href="tel:0591582306"
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#0066CC]" />
                    <span>Call 059 158 2306</span>
                  </a>
                </div>
              </div>
            ) : selectedBooking ? (
              /* Result Found */
              <div className="space-y-6">
                {/* Multi-result picker if multiple bookings exist for that phone */}
                {searchResults.length > 1 && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-600 block mb-2">
                      Multiple reservations found for this phone number ({searchResults.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {searchResults.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setSelectedBooking(b)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedBooking.id === b.id
                              ? "bg-[#0066CC] text-white"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {b.id} • {b.preferredDate} ({b.status})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reservation Summary Card */}
                <div className="bg-[#F4F8FD] rounded-2xl p-5 border border-blue-100 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Booking ID:
                      </span>
                      <span className="font-heading font-extrabold text-base text-[#0066CC]">
                        {selectedBooking.id}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                        selectedBooking.status === "PENDING"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : selectedBooking.status === "CONFIRMED"
                          ? "bg-blue-100 text-[#0066CC] border border-blue-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {selectedBooking.status === "PENDING"
                        ? "Queued / Pending Confirmation"
                        : selectedBooking.status === "CONFIRMED"
                        ? "Confirmed & Crew Assigned"
                        : "Completed & Quality Handover"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Client / Contact:
                      </span>
                      <p className="font-heading font-bold text-sm text-[#0A192F] mt-0.5">
                        {selectedBooking.customerName}
                      </p>
                      <p className="text-slate-600">{selectedBooking.phone}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Service Scope:
                      </span>
                      <p className="font-bold text-[#0066CC] text-xs mt-0.5">
                        {selectedBooking.serviceType}
                      </p>
                      <p className="text-slate-600">
                        Scale: <span className="font-semibold text-slate-800">{selectedBooking.propertySize}</span>
                        {selectedBooking.frequency && selectedBooking.frequency !== "One-Time" && (
                          <span className="text-purple-700 font-semibold ml-1">
                            ({selectedBooking.frequency})
                          </span>
                        )}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Scheduled Date &amp; Slot:
                      </span>
                      <p className="font-semibold text-slate-800 mt-0.5 flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0066CC]" />
                        <span>{selectedBooking.preferredDate}</span>
                      </p>
                      {selectedBooking.timeSlot && (
                        <p className="text-slate-500">{selectedBooking.timeSlot}</p>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Location / Premise:
                      </span>
                      <p className="font-semibold text-slate-800 mt-0.5 flex items-start space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span>{selectedBooking.address}</span>
                      </p>
                    </div>
                  </div>

                  {/* Add-ons line if present */}
                  {selectedBooking.addOns && selectedBooking.addOns.length > 0 && (
                    <div className="pt-2 border-t border-blue-200/60 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Included Add-Ons:
                      </span>
                      {selectedBooking.addOns.map((addon, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white border border-blue-200 text-slate-700 text-[11px] font-semibold"
                        >
                          + {addon}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4-STEP LIVE PROGRESS TIMELINE */}
                <div className="space-y-3">
                  <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-500">
                    Live Dispatch Progression:
                  </h4>

                  <div className="space-y-3">
                    {/* Step 1: Request Received */}
                    <div className="flex items-start space-x-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-[#0A192F]">
                            1. Booking Request Received &amp; Logged
                          </h5>
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">
                            Completed
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Reservation registered in Accra operations system. Initial rate estimate calculated at {selectedBooking.estimatedPrice}.
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Confirmed by Operations */}
                    <div
                      className={`flex items-start space-x-3.5 p-3 rounded-xl border ${
                        selectedBooking.status === "CONFIRMED" || selectedBooking.status === "COMPLETED"
                          ? "bg-emerald-50/60 border-emerald-200"
                          : "bg-amber-50/60 border-amber-200"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          selectedBooking.status === "CONFIRMED" || selectedBooking.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700 animate-pulse"
                        }`}
                      >
                        {selectedBooking.status === "CONFIRMED" || selectedBooking.status === "COMPLETED" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-[#0A192F]">
                            2. Schedule &amp; Team Confirmation
                          </h5>
                          <span
                            className={`text-[10px] font-bold uppercase ${
                              selectedBooking.status === "CONFIRMED" || selectedBooking.status === "COMPLETED"
                                ? "text-emerald-700"
                                : "text-amber-700"
                            }`}
                          >
                            {selectedBooking.status === "CONFIRMED" || selectedBooking.status === "COMPLETED"
                              ? "Confirmed"
                              : "Under Review"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {selectedBooking.status === "CONFIRMED" || selectedBooking.status === "COMPLETED"
                            ? "Cleaning specialists and dedicated supervisor assigned for your date and time slot."
                            : "Operations desk is currently reviewing crew availability for your preferred date."}
                        </p>
                      </div>
                    </div>

                    {/* Step 3: Equipment & Mobilization */}
                    <div
                      className={`flex items-start space-x-3.5 p-3 rounded-xl border ${
                        selectedBooking.status === "COMPLETED"
                          ? "bg-emerald-50/60 border-emerald-200"
                          : selectedBooking.status === "CONFIRMED"
                          ? "bg-blue-50/60 border-blue-200"
                          : "bg-slate-50 border-slate-200 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          selectedBooking.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : selectedBooking.status === "CONFIRMED"
                            ? "bg-blue-100 text-[#0066CC]"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        <Truck className="w-4 h-4" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-[#0A192F]">
                            3. Mobilization &amp; Site Dispatch
                          </h5>
                          <span
                            className={`text-[10px] font-bold uppercase ${
                              selectedBooking.status === "COMPLETED"
                                ? "text-emerald-700"
                                : selectedBooking.status === "CONFIRMED"
                                ? "text-[#0066CC]"
                                : "text-slate-400"
                            }`}
                          >
                            {selectedBooking.status === "COMPLETED"
                              ? "Executed"
                              : selectedBooking.status === "CONFIRMED"
                              ? "Mobilization Ready"
                              : "Pending Step 2"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Industrial vacuum cleaners, rotary scrubbers, steam extractors, and FDA-approved detergents packed for transport.
                        </p>
                      </div>
                    </div>

                    {/* Step 4: Quality Inspection & Handover */}
                    <div
                      className={`flex items-start space-x-3.5 p-3 rounded-xl border ${
                        selectedBooking.status === "COMPLETED"
                          ? "bg-emerald-50/60 border-emerald-200"
                          : "bg-slate-50 border-slate-200 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          selectedBooking.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-[#0A192F]">
                            4. 42-Point Audit &amp; Client Handover
                          </h5>
                          <span
                            className={`text-[10px] font-bold uppercase ${
                              selectedBooking.status === "COMPLETED"
                                ? "text-emerald-700"
                                : "text-slate-400"
                            }`}
                          >
                            {selectedBooking.status === "COMPLETED" ? "Completed" : "Scheduled"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Supervisor site walkthrough, client satisfaction sign-off, and payment receipt settlement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instant Action Buttons Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
                  {/* Pro-Forma Invoice Trigger */}
                  <button
                    type="button"
                    onClick={() => handleOpenProForma(selectedBooking)}
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] font-bold text-xs transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#0066CC]" />
                    <span>View Pro-Forma Invoice (PDF)</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Direct WhatsApp to Dispatch */}
                    <a
                      href={`https://wa.me/233591582306?text=${encodeURIComponent(
                        `Hello Global Insight Operations, I am checking the dispatch status for my cleaning booking *${selectedBooking.id}* scheduled for *${selectedBooking.preferredDate}*.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp Dispatch</span>
                    </a>

                    {/* Phone Call */}
                    <a
                      href="tel:0591582306"
                      className="p-2.5 rounded-xl bg-blue-50 text-[#0066CC] hover:bg-blue-100 transition-colors"
                      title="Call 059 158 2306"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer Note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Accra Mobile Operations Desk • 059 158 2306</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>

      {/* Pro-Forma Invoice Viewer Modal when triggered */}
      {isProFormaOpen && proFormaData && (
        <ProFormaInvoiceModal
          isOpen={isProFormaOpen}
          onClose={() => setIsProFormaOpen(false)}
          initialData={proFormaData}
        />
      )}
    </>
  );
}
