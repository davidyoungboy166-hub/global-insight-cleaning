"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Sparkles,
  PhoneCall,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Edit3,
  Check,
  Copy,
} from "lucide-react";
import Logo from "./Logo";

// Official WhatsApp Vector Icon
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
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

export interface ProFormaData {
  quoteId?: string;
  clientName?: string;
  companyName?: string;
  attentionName?: string;
  phone?: string;
  email?: string;
  address?: string;
  serviceType?: string;
  propertySize?: string;
  frequency?: string;
  addOns?: string[];
  preferredDate?: string;
  timeSlot?: string;
  notes?: string;
  estimatedPrice?: string;
  createdAt?: string;
}

interface ProFormaInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ProFormaData | null;
}

export default function ProFormaInvoiceModal({
  isOpen,
  onClose,
  initialData,
}: ProFormaInvoiceModalProps) {
  // Quotation editable parameters
  const [isEditing, setIsEditing] = useState(false);
  const [quoteId] = useState(initialData?.quoteId || `GI-QUO-${Math.floor(10000 + Math.random() * 90000)}`);
  const [clientCompany, setClientCompany] = useState(initialData?.companyName || initialData?.clientName || "Corporate Client / Facility Head");
  const [attention, setAttention] = useState(initialData?.attentionName || initialData?.clientName || "Head of Facility Management");
  const [clientPhone, setClientPhone] = useState(initialData?.phone || "059 158 2306");
  const [clientEmail, setClientEmail] = useState(initialData?.email || "facility@client.com.gh");
  const [siteAddress, setSiteAddress] = useState(initialData?.address || "Airport City Commercial Enclave, Accra, Ghana");
  const [serviceName, setServiceName] = useState(initialData?.serviceType || "Residential & Commercial Cleaning");
  const [scale, setScale] = useState(initialData?.propertySize || "Office/Commercial");
  const [frequency] = useState(initialData?.frequency || "One-Time Service");
  const [addOns] = useState<string[]>(initialData?.addOns || []);
  const [rateString, setRateString] = useState(initialData?.estimatedPrice || "GH₵ 750.00");
  const [quoteDate] = useState(() => {
    const d = new Date();
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  });
  const [validUntil] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  });

  const [copiedLink, setCopiedLink] = useState(false);

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // WhatsApp share
  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `🇬🇭 *GLOBAL INSIGHT PRO-FORMA QUOTATION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *Quotation Ref:* ${quoteId}\n` +
      `🏢 *Client / Entity:* ${clientCompany}\n` +
      `👤 *Attention:* ${attention}\n` +
      `🧹 *Scope:* ${serviceName} (${scale})\n` +
      (frequency && frequency !== "One-Time Service" ? `🔄 *Cadence:* ${frequency}\n` : "") +
      (addOns && addOns.length > 0 ? `➕ *Included Add-Ons:* ${addOns.join(", ")}\n` : "") +
      `📍 *Site Location:* ${siteAddress}\n` +
      `💵 *Total Estimate:* ${rateString}\n` +
      `📅 *Validity:* 30 Days (Valid until ${validUntil})\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Official quote generated via Global Insight Cleaning Services Ltd, Accra. Please reach out for purchase order confirmation.`
    );
    window.open(`https://wa.me/233591582306?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleCopyQuoteRef = () => {
    navigator.clipboard.writeText(quoteId);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-xs print:hidden"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-4 flex flex-col max-h-[95vh] print:max-h-none print:m-0 print:border-none print:shadow-none print:rounded-none"
          >
            {/* Screen Action Bar (Hidden during Print) */}
            <div className="bg-[#0A192F] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 print:hidden flex-shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#38BDF8] flex items-center justify-center border border-blue-400/30">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-white tracking-tight leading-tight">
                    Corporate Pro-Forma Invoice &amp; Quotation
                  </h3>
                  <p className="text-[11px] text-sky-200">
                    Official board-ready estimate for procurement &amp; facility sign-off
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isEditing
                      ? "bg-[#0066CC] text-white"
                      : "bg-white/10 hover:bg-white/20 text-slate-200"
                  }`}
                  title="Toggle client customization fields"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? "Lock Fields" : "Customize Client"}</span>
                </button>

                <button
                  type="button"
                  onClick={shareWhatsApp}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  title="Forward Quote via WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white text-xs font-bold shadow-md shadow-blue-900/30 transition-all cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close quote modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Optional Edit Bar (Hidden during Print) */}
            {isEditing && (
              <div className="bg-blue-50/90 border-b border-blue-200/80 p-4 print:hidden text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Client / Company Name
                    </label>
                    <input
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Attention Person
                    </label>
                    <input
                      type="text"
                      value={attention}
                      onChange={(e) => setAttention(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Premises Address / Landmark
                    </label>
                    <input
                      type="text"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Scrollable Printable Document Sheet */}
            <div className="p-4 sm:p-8 md:p-10 overflow-y-auto bg-slate-100/70 print:bg-white print:p-0">
              <div
                id="pro-forma-sheet"
                className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 max-w-3xl mx-auto print:border-none print:shadow-none print:p-6 print:max-w-none text-slate-800"
              >
                {/* 1. OFFICIAL CORPORATE LETTERHEAD */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[#0066CC] pb-6 gap-6">
                  <div>
                    <Logo variant="dark" size="lg" asLink={false} />
                    <div className="mt-3 text-[11px] text-slate-500 space-y-0.5 leading-relaxed">
                      <p className="font-bold text-[#0A192F]">Global Insight Cleaning Services Ltd.</p>
                      <p>Ghana Company Reg: CS08492024 • TIN: C0029481920</p>
                      <p>Suite 402, Heritage Tower, Ridge Commercial Enclave, Accra, Ghana</p>
                      <p>Direct Operations: +233 (0) 59 158 2306 | Accounts: +233 (0) 54 985 1802</p>
                      <p>Email: accounts@globalinsightcleaning.com | www.globalinsightcleaning.com</p>
                    </div>
                  </div>

                  {/* Document Meta Badge */}
                  <div className="bg-[#F4F8FD] rounded-xl p-4 border border-blue-100 sm:text-right min-w-[220px]">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0066CC] text-white text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                      PRO-FORMA INVOICE
                    </span>
                    <div className="text-xs space-y-1 mt-1 text-slate-600">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Quotation Ref:</span>
                        <span className="font-heading font-extrabold text-[#0066CC] text-sm">{quoteId}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Issued Date:</span>
                        <span className="font-semibold text-slate-800">{quoteDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Valid Until:</span>
                        <span className="font-semibold text-slate-800">{validUntil} (30 Days)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CLIENT & PREMISES INFORMATION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0066CC] block mb-1">
                      QUOTATION PREPARED FOR:
                    </span>
                    <p className="text-sm font-bold text-[#0A192F] font-heading">{clientCompany}</p>
                    <p className="text-slate-600 mt-0.5">Attn: {attention}</p>
                    <p className="text-slate-600">Tel: {clientPhone}</p>
                    <p className="text-slate-600">Email: {clientEmail}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0066CC] block mb-1">
                      SITE LOCATION &amp; SCHEDULE:
                    </span>
                    <p className="text-sm font-bold text-[#0A192F] font-heading">{siteAddress}</p>
                    <p className="text-slate-600 mt-0.5">
                      Target Service: <span className="font-semibold text-slate-800">{serviceName}</span>
                    </p>
                    <p className="text-slate-600">
                      Property Scale: <span className="font-semibold text-slate-800">{scale}</span>
                    </p>
                    {frequency && frequency !== "One-Time Service" && (
                      <p className="text-slate-600">
                        Contract Cadence: <span className="font-semibold text-purple-700">{frequency}</span>
                      </p>
                    )}
                    <p className="text-emerald-700 font-semibold mt-1 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                      <span>Mobilization Ready (Greater Accra Hub)</span>
                    </p>
                  </div>
                </div>

                {/* 3. ITEMIZED CLEANING SCOPE TABLE */}
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#0A192F] text-white font-heading">
                        <th className="py-2.5 px-3 rounded-tl-lg font-bold">#</th>
                        <th className="py-2.5 px-3 font-bold">Scope of Specified Operations</th>
                        <th className="py-2.5 px-3 font-bold">Allocation Scale</th>
                        <th className="py-2.5 px-3 text-right rounded-tr-lg font-bold">Subtotal (GH₵)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 border-x border-b border-slate-200">
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-bold text-slate-500">01</td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-[#0A192F]">{serviceName}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Comprehensive deep sanitization, machine floor rotary scrubbing, workstation de-dusting, and high-touch surface sterilization.
                          </p>
                          {frequency && frequency !== "One-Time Service" && (
                            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                              Contract Tier: {frequency}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-700">{scale}</td>
                        <td className="py-3 px-3 text-right font-bold text-[#0A192F]">{rateString}</td>
                      </tr>

                      {/* Render optional add-ons if selected */}
                      {addOns && addOns.length > 0 && addOns.map((addon, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 bg-amber-50/20">
                          <td className="py-3 px-3 font-bold text-slate-500">0{index + 2}</td>
                          <td className="py-3 px-3">
                            <p className="font-bold text-[#0A192F] flex items-center space-x-1.5">
                              <span>+ {addon}</span>
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Specialized deep appliance &amp; detail treatment using commercial steamers and degreasing agents.
                            </p>
                          </td>
                          <td className="py-3 px-3 text-slate-600">Client Premises</td>
                          <td className="py-3 px-3 text-right font-semibold text-emerald-700">INCLUDED</td>
                        </tr>
                      ))}

                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-bold text-slate-500">
                          {addOns && addOns.length > 0 ? `0${addOns.length + 2}` : "02"}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-[#0A192F]">Industrial Equipment &amp; High-Pressure Steamers</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Commercial HEPA allergy extractors, commercial carpet/upholstery washers, and industrial extension gear.
                          </p>
                        </td>
                        <td className="py-3 px-3 text-slate-600">Full Allotment</td>
                        <td className="py-3 px-3 text-right font-semibold text-emerald-700">INCLUDED</td>
                      </tr>

                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-bold text-slate-500">
                          {addOns && addOns.length > 0 ? `0${addOns.length + 3}` : "03"}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-[#0A192F]">Hospital-Grade &amp; Eco-Safe Detergents</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            FDA-approved non-toxic sanitizers, anti-viral mist formulas, and pet/human-safe degreasers.
                          </p>
                        </td>
                        <td className="py-3 px-3 text-slate-600">Site Requirement</td>
                        <td className="py-3 px-3 text-right font-semibold text-emerald-700">INCLUDED</td>
                      </tr>

                      <tr className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-bold text-slate-500">
                          {addOns && addOns.length > 0 ? `0${addOns.length + 4}` : "04"}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-[#0A192F]">Vetted Specialists &amp; Dedicated On-Site Supervisor</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Uniformed, background-screened personnel and comprehensive 42-point quality assurance gate audit.
                          </p>
                        </td>
                        <td className="py-3 px-3 text-slate-600">Supervised Crew</td>
                        <td className="py-3 px-3 text-right font-semibold text-emerald-700">INCLUDED</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 4. TOTALS & FINANCIAL SUMMARY */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#F4F8FD] p-4 rounded-xl border border-blue-100 my-4 gap-4">
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p className="font-bold text-[#0A192F]">Accra Logistics &amp; Mobile Crew Dispatch:</p>
                    <p className="text-[11px]">Free delivery of equipment within Greater Accra service zones.</p>
                    <p className="text-[11px] text-[#0066CC] font-semibold">100% Satisfaction Re-Clean Guarantee Included.</p>
                  </div>

                  <div className="text-right sm:min-w-[200px]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      TOTAL PRO-FORMA ESTIMATE
                    </span>
                    <span className="text-2xl font-extrabold font-heading text-[#0066CC]">
                      {rateString}
                    </span>
                    <span className="block text-[10px] text-slate-500">Ghana Cedis (Net Scope)</span>
                  </div>
                </div>

                {/* 5. OFFICIAL SETTLEMENT & BANKING IN GHANA */}
                <div className="my-6 pt-4 border-t border-slate-200">
                  <h4 className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#0A192F] mb-3">
                    Approved Payment Channels (Pay Upon Inspection):
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {/* Bank Wire */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <p className="font-bold text-[#0A192F] mb-1">1. Stanbic Bank Wire</p>
                      <p className="text-[11px] text-slate-600">Bank: Stanbic Bank Ghana</p>
                      <p className="text-[11px] text-slate-600">Branch: Airport City Corporate</p>
                      <p className="text-[11px] text-slate-600">A/C: Global Insight Cleaning Ltd</p>
                      <p className="text-[11px] font-bold text-[#0066CC]">A/C No: 9040003849201</p>
                    </div>

                    {/* MTN MoMo Merchant */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <p className="font-bold text-[#0A192F] mb-1">2. MTN MoMo Merchant</p>
                      <p className="text-[11px] text-slate-600">Dial: *170# &gt; Pay Merchant</p>
                      <p className="text-[11px] font-bold text-emerald-700">Merchant ID: 849201</p>
                      <p className="text-[11px] text-slate-600">Name: Global Insight Services</p>
                      <p className="text-[11px] text-slate-500">Ref: {quoteId}</p>
                    </div>

                    {/* Telecel Cash / Direct MoMo */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <p className="font-bold text-[#0A192F] mb-1">3. Direct Cash / Mobile</p>
                      <p className="text-[11px] text-slate-600">Primary Desk: 059 158 2306</p>
                      <p className="text-[11px] text-slate-600">Alternate Line: 054 985 1802</p>
                      <p className="text-[11px] text-slate-600">Receipt: Instant SMS / Stamp</p>
                      <p className="text-[11px] text-emerald-600 font-semibold">Zero Advance Deposit</p>
                    </div>
                  </div>
                </div>

                {/* 6. SIGNATORY & CORPORATE EXECUTION STAMP */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-slate-200 gap-6 text-xs text-slate-600">
                  <div className="space-y-1">
                    <p className="font-bold text-[#0A192F]">Terms &amp; Notice of Acceptance:</p>
                    <p className="text-[11px]">
                      1. Standard bookings require zero upfront fee. Payment is settled post-cleaning inspection.
                    </p>
                    <p className="text-[11px]">
                      2. Formal purchase orders can be acknowledged by signing or stamping below and sending to accounts@globalinsightcleaning.com.
                    </p>
                    <div className="pt-4 flex items-center space-x-3 text-slate-400">
                      <span>Client Acceptance Signature / Date: ___________________________</span>
                    </div>
                  </div>

                  {/* Company Stamp SVG Graphic */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-[#0066CC] flex flex-col items-center justify-center p-2 text-center text-[#0066CC] select-none rotate-[-6deg]">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest">
                        GLOBAL INSIGHT
                      </span>
                      <ShieldCheck className="w-6 h-6 my-0.5 text-[#0066CC]" />
                      <span className="text-[7px] font-bold uppercase tracking-wider">
                        QUALITY ASSURED
                      </span>
                      <span className="text-[7px] text-slate-500">ACCRA • GHANA</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 font-semibold">Authorized Signatory</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
