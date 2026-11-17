"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  PhoneCall,
  Calendar,
  MapPin,
  CheckCircle2,
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
  ShieldCheck,
  Send,
  MessageCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  User,
  Mail,
  Home,
  FileText,
  Printer,
} from "lucide-react";
import ProFormaInvoiceModal from "./ProFormaInvoiceModal";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  initialService?: string;
}

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

export interface ServiceOption {
  id: string;
  name: string;
  icon: React.ElementType;
  basePrice: number;
}

export const servicesCatalog: ServiceOption[] = [
  { id: "residential-commercial", name: "Residential & Commercial Cleaning", icon: Building2, basePrice: 450 },
  { id: "real-estate", name: "Real Estate Property Cleaning", icon: KeyRound, basePrice: 600 },
  { id: "move-in-out", name: "Move-In & Move-Out Cleaning", icon: Truck, basePrice: 650 },
  { id: "post-construction", name: "Post-Construction Cleaning", icon: Hammer, basePrice: 950 },
  { id: "fumigation", name: "Fumigation & Pest Control", icon: Bug, basePrice: 400 },
  { id: "airbnb-turnover", name: "Airbnb & Short-Let Turnover Cleaning", icon: CalendarCheck2, basePrice: 350 },
  { id: "floor-polishing", name: "Floor Polishing Services", icon: Layers, basePrice: 550 },
  { id: "upholstery-sofa", name: "Upholstery & Sofa Deep Cleaning", icon: Armchair, basePrice: 380 },
  { id: "after-event", name: "After-Event Cleanup", icon: PartyPopper, basePrice: 700 },
  { id: "surface-sanitization", name: "Surface Sanitization", icon: ShieldPlus, basePrice: 350 },
  { id: "deep-cleaning-packages", name: "Deep Cleaning Packages", icon: Crown, basePrice: 800 },
];

export const propertySizes = [
  { id: "1-2 Bedroom", label: "1-2 Bedroom", subtitle: "Compact Apartment / Flat", multiplier: 1 },
  { id: "3-4 Bedroom", label: "3-4 Bedroom", subtitle: "Standard Home / Townhouse", multiplier: 1.4 },
  { id: "Office/Commercial", label: "Office/Commercial", subtitle: "Corporate Hub / Retail Space", multiplier: 1.8 },
  { id: "Post-Construction", label: "Post-Construction", subtitle: "Full Estate / Heavy Debris", multiplier: 2.2 },
];

export interface FrequencyOption {
  id: string;
  name: string;
  badge?: string;
  discountPercent: number;
  multiplier: number;
  description: string;
}

export const frequencyOptions: FrequencyOption[] = [
  {
    id: "one-time",
    name: "One-Time Service",
    discountPercent: 0,
    multiplier: 1.0,
    description: "Standard single deep clean visit",
  },
  {
    id: "bi-weekly",
    name: "Bi-Weekly Clean",
    badge: "Save 15%",
    discountPercent: 15,
    multiplier: 0.85,
    description: "Every 2 weeks • Regular maintenance",
  },
  {
    id: "weekly",
    name: "Weekly Corporate/Home",
    badge: "Save 25%",
    discountPercent: 25,
    multiplier: 0.75,
    description: "Once weekly • Priority crew slot",
  },
];

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const cleaningAddOns: AddOnOption[] = [
  {
    id: "oven-microwave",
    name: "Oven & Microwave Degreasing",
    price: 60,
    description: "Carbon grease breakdown & steam sanitization",
  },
  {
    id: "fridge-sanitization",
    name: "Refrigerator Interior Detailing",
    price: 70,
    description: "Shelves removal, wipe-down & deodorization",
  },
  {
    id: "balcony-glass",
    name: "Balcony & High Glass Detailing",
    price: 90,
    description: "Balcony tile scrubbing & exterior glass railings",
  },
  {
    id: "mattress-steam",
    name: "Mattress Steam & Dust Extraction",
    price: 120,
    description: "Allergen vacuuming & high-temperature anti-mite steaming",
  },
];

const timeSlots = [
  "Morning (8:00 AM - 12:00 PM)",
  "Midday (11:00 AM - 2:00 PM)",
  "Afternoon (1:00 PM - 5:00 PM)",
  "Full Day (8:30 AM - 5:00 PM)",
];

const accraNeighborhoods = [
  "Airport Residential",
  "Cantonments",
  "East Legon",
  "Labone",
  "Osu",
  "Ridge",
  "Roman Ridge",
  "Dzorwulu",
  "Spintex",
  "Tema",
  "Dansoman",
  "Achimota",
  "Other Greater Accra",
];

export default function BookingModal({
  isOpen,
  onClose,
  defaultService,
  initialService,
}: BookingModalProps) {
  // Resolve service prop
  const activeServiceProp = defaultService || initialService || "residential-commercial";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Service/Size, 2: Schedule/Location, 3: Contact, 4: Receipt
  const [selectedService, setSelectedService] = useState(activeServiceProp);
  const [selectedPropertySize, setSelectedPropertySize] = useState("3-4 Bedroom");
  const [selectedFrequency, setSelectedFrequency] = useState("one-time");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Step 2 state
  const [preferredDate, setPreferredDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[0]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(accraNeighborhoods[0]);
  const [streetAddress, setStreetAddress] = useState("");

  // Step 3 state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    customerName: string;
    phone: string;
    email?: string;
    serviceType: string;
    propertySize: string;
    preferredDate: string;
    timeSlot: string;
    address: string;
    notes?: string;
    estimatedPrice: string;
    frequency?: string;
    addOns?: string[];
    createdAt?: string;
  } | null>(null);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const [copiedId, setCopiedId] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isProFormaOpen, setIsProFormaOpen] = useState(false);

  // Sync service when opening with new prop
  useEffect(() => {
    if (activeServiceProp) {
      const match = servicesCatalog.find((s) => s.id === activeServiceProp);
      setSelectedService(match ? activeServiceProp : "residential-commercial");
    }
  }, [activeServiceProp, isOpen]);

  // Set default date to tomorrow
  useEffect(() => {
    if (!preferredDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPreferredDate(tomorrow.toISOString().split("T")[0]);
    }
  }, [preferredDate]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Calculate pricing
  const currentServiceObj =
    servicesCatalog.find((s) => s.id === selectedService) || servicesCatalog[0];
  const currentSizeObj =
    propertySizes.find((p) => p.id === selectedPropertySize) || propertySizes[1];
  const currentFrequencyObj =
    frequencyOptions.find((f) => f.id === selectedFrequency) || frequencyOptions[0];

  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const item = cleaningAddOns.find((a) => a.id === addOnId);
    return sum + (item ? item.price : 0);
  }, 0);

  const scaledBase = Math.round(
    currentServiceObj.basePrice * currentSizeObj.multiplier * currentFrequencyObj.multiplier
  );
  const estimatedMin = scaledBase + addOnsTotal;
  const estimatedMax = Math.round(scaledBase * 1.25) + addOnsTotal;
  const estimatedPriceString = `GH₵ ${estimatedMin} - ${estimatedMax}`;

  // Form Submission
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const fullAddress = `${streetAddress ? `${streetAddress}, ` : ""}${selectedNeighborhood}, Accra`;
    const selectedAddOnNames = selectedAddOns
      .map((id) => cleaningAddOns.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[];

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          serviceType: currentServiceObj.name,
          propertySize: selectedPropertySize,
          preferredDate,
          timeSlot: selectedTimeSlot,
          address: fullAddress,
          notes,
          estimatedPrice: estimatedPriceString,
          frequency: currentFrequencyObj.name,
          addOns: selectedAddOnNames,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to submit booking");
      }

      setConfirmedBooking({
        id: data.booking.id,
        customerName: data.booking.customerName,
        phone: data.booking.phone,
        email: data.booking.email,
        serviceType: data.booking.serviceType,
        propertySize: data.booking.propertySize,
        preferredDate: data.booking.preferredDate,
        timeSlot: data.booking.timeSlot,
        address: data.booking.address,
        notes: data.booking.notes,
        estimatedPrice: data.booking.estimatedPrice,
        frequency: data.booking.frequency || currentFrequencyObj.name,
        addOns: data.booking.addOns || selectedAddOnNames,
        createdAt: data.booking.createdAt,
      });

      setStep(4); // Move to confirmation receipt step
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again or call 059 158 2306.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBookingId = () => {
    if (confirmedBooking?.id) {
      navigator.clipboard.writeText(confirmedBooking.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleCopySummary = () => {
    if (!confirmedBooking) return;
    const text =
      `GLOBAL INSIGHT CLEANING SERVICES - ACCRA\n` +
      `──────────────────────────\n` +
      `Booking Reference: ${confirmedBooking.id}\n` +
      `Client Name: ${confirmedBooking.customerName}\n` +
      `Phone Number: ${confirmedBooking.phone}\n` +
      `Service: ${confirmedBooking.serviceType}\n` +
      `Property Scale: ${confirmedBooking.propertySize}\n` +
      (confirmedBooking.frequency && confirmedBooking.frequency !== "One-Time Service" ? `Frequency Cadence: ${confirmedBooking.frequency}\n` : "") +
      (confirmedBooking.addOns && confirmedBooking.addOns.length > 0 ? `Selected Add-Ons: ${confirmedBooking.addOns.join(", ")}\n` : "") +
      `Scheduled Date: ${confirmedBooking.preferredDate} (${confirmedBooking.timeSlot})\n` +
      `Accra Location: ${confirmedBooking.address}\n` +
      `Estimated Rate: ${confirmedBooking.estimatedPrice}\n` +
      (confirmedBooking.notes ? `Notes: ${confirmedBooking.notes}\n` : "") +
      `Status: Queued for Dispatch (Accra Operations)`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleResetModal = () => {
    setStep(1);
    setConfirmedBooking(null);
    setSelectedAddOns([]);
    setSelectedFrequency("one-time");
    setSubmitError("");
    onClose();
  };

  // WhatsApp prefilled message with formatted Ghana dispatch layout
  const whatsappText = confirmedBooking
    ? encodeURIComponent(
        `🇬🇭 *GLOBAL INSIGHT CLEANING RESERVATION*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📋 *Booking Ref:* *${confirmedBooking.id}*\n` +
        `👤 *Client Name:* ${confirmedBooking.customerName}\n` +
        `📞 *Phone:* ${confirmedBooking.phone}\n` +
        `🧹 *Service:* *${confirmedBooking.serviceType}*\n` +
        `📐 *Property Scale:* ${confirmedBooking.propertySize}\n` +
        (confirmedBooking.frequency && confirmedBooking.frequency !== "One-Time Service" ? `🔄 *Cadence:* ${confirmedBooking.frequency}\n` : "") +
        (confirmedBooking.addOns && confirmedBooking.addOns.length > 0 ? `➕ *Included Add-Ons:* ${confirmedBooking.addOns.join(", ")}\n` : "") +
        `📅 *Scheduled Date:* ${confirmedBooking.preferredDate} (${confirmedBooking.timeSlot})\n` +
        `📍 *Accra Address:* ${confirmedBooking.address}\n` +
        `💵 *Estimated Quote:* *${confirmedBooking.estimatedPrice}*\n` +
        (confirmedBooking.notes ? `📝 *Notes:* ${confirmedBooking.notes}\n` : "") +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Hello Global Insight Operations Team! I just placed this booking on your website. Please confirm cleaner availability and crew dispatch. Thank you!`
      )
    : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A192F]/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#0066CC] via-[#0284C7] to-[#0052A3] px-6 py-5 text-white flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-sky-200 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-sky-300" />
                <span>Instant Booking &amp; Transparent Estimator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                {step === 4 ? "Official Digital Booking Receipt" : "Book a Cleaning in Accra"}
              </h2>

              {/* Multi-step progress indicators */}
              {step < 4 && (
                <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-white/15 text-xs font-semibold">
                  <div
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full ${
                      step === 1 ? "bg-white text-[#0066CC]" : "bg-white/20 text-white"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0066CC] text-white text-[10px] flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Service &amp; Size</span>
                  </div>

                  <div
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full ${
                      step === 2 ? "bg-white text-[#0066CC]" : "bg-white/20 text-white"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0066CC] text-white text-[10px] flex items-center justify-center font-bold">
                      2
                    </span>
                    <span>Schedule &amp; Area</span>
                  </div>

                  <div
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full ${
                      step === 3 ? "bg-white text-[#0066CC]" : "bg-white/20 text-white"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0066CC] text-white text-[10px] flex items-center justify-center font-bold">
                      3
                    </span>
                    <span>Client Details</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              {/* STEP 1: Select Service & Property Size */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Service selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A192F] uppercase tracking-wider mb-2">
                      Choose Your Specialized Service
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                      {servicesCatalog.map((service) => {
                        const Icon = service.icon;
                        const isSelected = selectedService === service.id;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setSelectedService(service.id)}
                            className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#0066CC] bg-blue-50/80 text-[#0066CC] font-semibold ring-1 ring-[#0066CC]"
                                : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <div
                              className={`p-2 rounded-lg flex-shrink-0 ${
                                isSelected ? "bg-[#0066CC] text-white" : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <span className="text-xs font-semibold block truncate">
                                {service.name}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                Base: GH₵ {service.basePrice}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Property size selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A192F] uppercase tracking-wider mb-2">
                      Property Size &amp; Scale
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {propertySizes.map((size) => {
                        const isSelected = selectedPropertySize === size.id;
                        return (
                          <button
                            key={size.id}
                            type="button"
                            onClick={() => setSelectedPropertySize(size.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#0066CC] bg-blue-50/80 text-[#0066CC] ring-1 ring-[#0066CC]"
                                : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-xs font-bold block">{size.label}</span>
                            <span className="text-[11px] text-slate-500">{size.subtitle}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cleaning Frequency & Subscription Discounts (Step 3) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-[#0A192F] uppercase tracking-wider">
                        Cleaning Frequency &amp; Discounts
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Up to 25% Off
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {frequencyOptions.map((freq) => {
                        const isSelected = selectedFrequency === freq.id;
                        return (
                          <button
                            key={freq.id}
                            type="button"
                            onClick={() => setSelectedFrequency(freq.id)}
                            className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                              isSelected
                                ? "border-[#0066CC] bg-blue-50/80 text-[#0066CC] ring-1 ring-[#0066CC]"
                                : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {freq.badge && (
                              <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-extrabold tracking-wider uppercase shadow-xs">
                                {freq.badge}
                              </span>
                            )}
                            <span className="text-xs font-bold block">{freq.name}</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              {freq.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Optional High-Care Cleaning Add-Ons (Step 4) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-[#0A192F] uppercase tracking-wider">
                        Optional Add-On Cleaning Checklist
                      </label>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        Select any deep-care areas
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {cleaningAddOns.map((addon) => {
                        const isChecked = selectedAddOns.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddOn(addon.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                              isChecked
                                ? "border-[#0066CC] bg-blue-50/70 text-[#0A192F] ring-1 ring-[#0066CC]"
                                : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center flex-shrink-0 border transition-colors ${
                                isChecked
                                  ? "bg-[#0066CC] border-[#0066CC] text-white"
                                  : "bg-white border-slate-300 text-transparent"
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>

                            <div className="flex-grow min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold truncate block">
                                  {addon.name}
                                </span>
                                <span className="text-[11px] font-extrabold text-[#0066CC] ml-1 flex-shrink-0">
                                  +GH₵ {addon.price}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-500 block mt-0.5 leading-snug">
                                {addon.description}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Real-Time Price Calculation Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          Estimated Rate (Accra)
                        </span>
                        {currentFrequencyObj.discountPercent > 0 && (
                          <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 text-[9px] font-extrabold">
                            Save {currentFrequencyObj.discountPercent}%
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-extrabold text-[#0066CC] font-heading mt-0.5">
                        {estimatedPriceString}
                      </div>
                      {selectedAddOns.length > 0 && (
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Includes {selectedAddOns.length} selected add-on{selectedAddOns.length > 1 ? "s" : ""} (+GH₵ {addOnsTotal})
                        </span>
                      )}
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Fixed Price Guarantee</span>
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-1">
                        Pay upon completion &amp; inspection
                      </span>
                    </div>
                  </div>

                  {/* Step 1 CTA */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-sm shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Continue to Schedule &amp; Location</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => setIsProFormaOpen(true)}
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0066CC] hover:text-[#0052A3] hover:underline cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Corporate client? Preview / Download Instant Pro-Forma Quote (PDF) &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Preferred Date, Time Slot & Accra Location */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Arrival Time Slot *
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <select
                          value={selectedTimeSlot}
                          onChange={(e) => setSelectedTimeSlot(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Neighborhood */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Accra Neighborhood / Area *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <select
                        value={selectedNeighborhood}
                        onChange={(e) => setSelectedNeighborhood(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all"
                      >
                        {accraNeighborhoods.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Street Address / Landmark */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Street Address &amp; Landmarks *
                    </label>
                    <div className="relative">
                      <Home className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="e.g. House 14, 5th Circular Road, near French Embassy"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Helps our vetted cleaning team arrive promptly with all necessary equipment.
                    </span>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!streetAddress.trim()) {
                          setSubmitError("Please enter your street address or landmark.");
                          return;
                        }
                        setSubmitError("");
                        setStep(3);
                      }}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-sm shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Continue to Contact Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Customer Details & Final Submit */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {submitError}
                    </div>
                  )}

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Kwesi Mensah"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 059 158 2306"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. kwesi@example.com (for booking receipt)"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Special Instructions / Focus Areas (Optional)
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Focus on kitchen degreasing, bathroom grout, or marble floor polish..."
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Summary recap badge */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-500">Service &amp; Scale:</span>
                      <span className="text-[#0A192F]">
                        {currentServiceObj.name} ({selectedPropertySize})
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-500">Date &amp; Location:</span>
                      <span className="text-[#0A192F]">
                        {preferredDate} • {selectedNeighborhood}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-[#0066CC] pt-1 border-t border-slate-200/80">
                      <span>Estimated Total:</span>
                      <span>{estimatedPriceString}</span>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setStep(2)}
                      className="px-4 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-sm shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Booking...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirm &amp; Place Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 4: Branded Digital Receipt & Instant WhatsApp Handoff */}
              {step === 4 && confirmedBooking && (
                <div className="py-2 space-y-5 text-center">
                  {/* Status Indicator */}
                  <div className="relative w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-heading font-extrabold text-[#0A192F]">
                      Booking Queued — Digital Receipt Ready
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                      Thank you, <span className="font-bold text-slate-800">{confirmedBooking.customerName}</span>. Your reservation has been assigned reference <span className="font-bold text-[#0066CC]">#{confirmedBooking.id}</span>.
                    </p>
                  </div>

                  {/* Branded Digital Receipt Card */}
                  <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-md text-left overflow-hidden max-w-lg mx-auto">
                    {/* Receipt Header Ribbon */}
                    <div className="bg-gradient-to-r from-[#0066CC] to-[#0284C7] px-4 py-2.5 text-white flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                        <span className="text-[11px] font-bold tracking-wider uppercase">
                          Global Insight Cleaning Services • Accra
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-extrabold tracking-wider uppercase">
                        ● Queued
                      </span>
                    </div>

                    {/* Receipt Body */}
                    <div className="p-4 sm:p-5 bg-slate-50/80 space-y-3.5">
                      {/* Booking Reference Line */}
                      <div className="flex items-center justify-between border-b border-slate-200/90 pb-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Booking Reference
                          </span>
                          <span className="text-base font-extrabold font-heading text-[#0066CC]">
                            #{confirmedBooking.id}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={handleCopyBookingId}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#0066CC] hover:border-blue-300 transition-colors cursor-pointer"
                            title="Copy Booking ID"
                          >
                            {copiedId ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-500" />
                                <span>Copy ID</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Itemized Grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Client Name:</span>
                          <span className="font-bold text-[#0A192F]">{confirmedBooking.customerName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Contact Phone:</span>
                          <span className="font-bold text-[#0A192F]">{confirmedBooking.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Selected Service:</span>
                          <span className="font-bold text-[#0A192F]">{confirmedBooking.serviceType}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Property Scale:</span>
                          <span className="font-bold text-[#0A192F]">{confirmedBooking.propertySize}</span>
                        </div>
                        {confirmedBooking.frequency && confirmedBooking.frequency !== "One-Time Service" && (
                          <div className="col-span-2">
                            <span className="text-slate-400 block text-[11px]">Cleaning Frequency:</span>
                            <span className="font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                              🔄 {confirmedBooking.frequency}
                            </span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-400 block text-[11px]">Scheduled Date:</span>
                          <span className="font-bold text-[#0A192F] flex items-center space-x-1 mt-0.5">
                            <Calendar className="w-3 h-3 text-[#0066CC] flex-shrink-0" />
                            <span>{confirmedBooking.preferredDate}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Time Window:</span>
                          <span className="font-bold text-[#0A192F] flex items-center space-x-1 mt-0.5">
                            <Clock className="w-3 h-3 text-[#0066CC] flex-shrink-0" />
                            <span className="truncate">{confirmedBooking.timeSlot}</span>
                          </span>
                        </div>
                      </div>

                      {/* Included Add-Ons Strip if present */}
                      {confirmedBooking.addOns && confirmedBooking.addOns.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/90 text-xs">
                          <span className="text-slate-400 block text-[11px] mb-1">High-Care Add-Ons:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {confirmedBooking.addOns.map((addon, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold text-[11px]"
                              >
                                + {addon}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Location Strip */}
                      <div className="pt-2 border-t border-slate-200/90 text-xs">
                        <span className="text-slate-400 block text-[11px]">Accra Address:</span>
                        <div className="flex items-start space-x-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-800">{confirmedBooking.address}</span>
                        </div>
                      </div>

                      {confirmedBooking.notes && (
                        <div className="text-xs pt-1">
                          <span className="text-slate-400 block text-[11px]">Special Notes:</span>
                          <span className="italic text-slate-600">{confirmedBooking.notes}</span>
                        </div>
                      )}

                      {/* Estimated Quote & Payment Terms */}
                      <div className="pt-2.5 border-t border-slate-200/90 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Estimated Rate
                          </span>
                          <span className="text-base font-extrabold text-[#0066CC] font-heading">
                            {confirmedBooking.estimatedPrice}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/60 font-semibold px-2 py-0.5 rounded-full inline-block">
                            Pay After Inspection
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            MoMo / Telecel / Cash
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary 1-Click WhatsApp Handoff Button */}
                  <div className="space-y-2.5 max-w-lg mx-auto">
                    <a
                      href={`https://wa.me/233591582306?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-xl shadow-emerald-600/30 active:scale-[0.98] transition-all cursor-pointer group"
                    >
                      <WhatsAppIcon className="w-5 h-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col text-left">
                        <span className="leading-tight">Send Details to Dispatch on WhatsApp</span>
                        <span className="text-[11px] text-emerald-100 font-normal">
                          Instant crew confirmation in under 5 minutes • 059 158 2306
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-100 ml-auto group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Secondary Actions Bar */}
                    <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        title="Copy full booking summary to clipboard"
                      >
                        {copiedSummary ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-3.5 h-3.5 text-[#0066CC]" />
                            <span>Copy Summary</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsProFormaOpen(true)}
                        className="py-2.5 px-3 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-[#0066CC] font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                        title="Download official corporate Pro-Forma Invoice (PDF / Print)"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#0066CC]" />
                        <span>Pro-Forma PDF</span>
                      </button>

                      <a
                        href="tel:0591582306"
                        className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-[#0066CC]" />
                        <span>Direct Call</span>
                      </a>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleResetModal}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Done &amp; Return to Home
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Official Corporate Pro-Forma Invoice & Quotation Generator Modal */}
      <ProFormaInvoiceModal
        isOpen={isProFormaOpen}
        onClose={() => setIsProFormaOpen(false)}
        initialData={
          confirmedBooking
            ? {
                quoteId: `GI-QUO-${confirmedBooking.id.replace("GI-", "")}`,
                clientName: confirmedBooking.customerName,
                companyName: confirmedBooking.customerName,
                phone: confirmedBooking.phone,
                email: confirmedBooking.email,
                address: confirmedBooking.address,
                serviceType: confirmedBooking.serviceType,
                propertySize: confirmedBooking.propertySize,
                frequency: confirmedBooking.frequency,
                addOns: confirmedBooking.addOns,
                preferredDate: confirmedBooking.preferredDate,
                timeSlot: confirmedBooking.timeSlot,
                notes: confirmedBooking.notes,
                estimatedPrice: confirmedBooking.estimatedPrice,
              }
            : {
                clientName: customerName || "Corporate Facility Head",
                companyName: customerName || "Corporate Enterprise Client",
                phone: phone || "059 158 2306",
                email: email || "accounts@client.com.gh",
                address: streetAddress ? `${streetAddress}, ${selectedNeighborhood}, Accra` : `${selectedNeighborhood}, Accra`,
                serviceType: currentServiceObj.name,
                propertySize: selectedPropertySize,
                frequency: currentFrequencyObj.name,
                addOns: selectedAddOns.map(id => cleaningAddOns.find(a => a.id === id)?.name).filter(Boolean) as string[],
                preferredDate: preferredDate || new Date().toISOString().split("T")[0],
                timeSlot: selectedTimeSlot,
                estimatedPrice: estimatedPriceString,
              }
        }
      />
    </AnimatePresence>
  );
}
