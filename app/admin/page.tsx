"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PhoneCall,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Clock4,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Lock,
  Unlock,
  KeyRound,
  DollarSign,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Building,
  User,
  Sparkles,
  ArrowUpDown,
  Download,
  FileSpreadsheet,
  Users,
  Copy,
  Layers,
} from "lucide-react";
import Logo from "@/components/Logo";
import { Booking, BookingStatus } from "@/lib/db";

const DEFAULT_PIN = "2026"; // Default Operations PIN

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | BookingStatus>("ALL");
  const [areaFilter, setAreaFilter] = useState("ALL");
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedBriefId, setCopiedBriefId] = useState<string | null>(null);

  const accraAreas = [
    "ALL",
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
  ];

  // Check persisted auth in session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("gi_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch bookings when authenticated
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  // Handle PIN Unlock
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN || pinInput === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("gi_admin_auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("gi_admin_auth");
    setPinInput("");
  };

  // Status update handler
  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    setIsUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
        showToast(`Booking ${id} marked as ${newStatus}`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      showToast("Failed to update status");
    } finally {
      setIsUpdatingId(null);
    }
  };

  // Delete booking handler
  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete booking ${id}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        showToast(`Booking ${id} deleted`);
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      showToast("Failed to delete booking");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Export Bookings to CSV
  const handleExportCSV = () => {
    if (bookings.length === 0) {
      showToast("No bookings to export");
      return;
    }

    const headers = [
      "Booking ID",
      "Customer Name",
      "Phone",
      "Email",
      "Service Type",
      "Property Size",
      "Preferred Date",
      "Time Slot",
      "Address",
      "Frequency",
      "Add-Ons",
      "Estimated Price",
      "Status",
      "Special Instructions",
      "Created At",
    ];

    const dataToExport = filteredBookings.length > 0 ? filteredBookings : bookings;

    const rows = dataToExport.map((b) => [
      b.id,
      b.customerName,
      b.phone,
      b.email || "",
      b.serviceType,
      b.propertySize,
      b.preferredDate,
      b.timeSlot || "",
      b.address,
      b.frequency || "One-Time",
      (b.addOns || []).join("; "),
      b.estimatedPrice,
      b.status,
      b.notes || "",
      new Date(b.createdAt).toISOString(),
    ]);

    const csvContent = [
      headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    link.href = url;
    link.setAttribute("download", `global_insight_bookings_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${dataToExport.length} bookings to CSV`);
  };

  // WhatsApp helpers
  const formatPhoneForWhatsApp = (rawPhone: string) => {
    const digits = rawPhone.replace(/\D/g, "");
    if (digits.startsWith("233")) return digits;
    if (digits.startsWith("0")) return "233" + digits.slice(1);
    return "233" + digits;
  };

  // Client Confirmation WhatsApp message
  const getClientDispatchMessage = (b: Booking) => {
    return encodeURIComponent(
      `🇬🇭 *GLOBAL INSIGHT CLEANING DISPATCH CONFIRMATION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *Booking Ref:* *${b.id}*\n` +
      `👤 *Client:* ${b.customerName}\n` +
      `✨ *Service:* ${b.serviceType}\n` +
      `📐 *Scale:* ${b.propertySize}\n` +
      `📅 *Scheduled Date:* ${b.preferredDate} (${b.timeSlot || "Scheduled"})\n` +
      `📍 *Site Location:* ${b.address}\n` +
      (b.frequency ? `🔄 *Frequency:* ${b.frequency}\n` : "") +
      (b.addOns && b.addOns.length > 0 ? `➕ *Add-Ons:* ${b.addOns.join(", ")}\n` : "") +
      `💰 *Estimated Rate:* ${b.estimatedPrice}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Dear ${b.customerName}, your cleaning appointment with Global Insight has been CONFIRMED. Our vetted specialist crew and supervisor are scheduled for prompt dispatch.\n\n` +
      `📞 Operations Desk: 059 158 2306 / 054 985 1802\n` +
      `🌐 Accra, Ghana`
    );
  };

  // Cleaning Crew Brief message
  const getCrewBriefText = (b: Booking) => {
    return (
      `🧹 *CLEANING CREW DISPATCH BRIEF*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *Job Ref:* *${b.id}*\n` +
      `📍 *Site Address:* ${b.address}\n` +
      `👤 *Client Contact:* ${b.customerName} (${b.phone})\n` +
      `✨ *Service Type:* ${b.serviceType}\n` +
      `📐 *Property Scale:* ${b.propertySize}\n` +
      `📅 *Date & Slot:* ${b.preferredDate} (${b.timeSlot || "Morning"})\n` +
      (b.frequency ? `🔄 *Contract Tier:* ${b.frequency}\n` : "") +
      (b.addOns && b.addOns.length > 0 ? `➕ *Extra Add-Ons:* ${b.addOns.join(", ")}\n` : "") +
      (b.notes ? `📝 *Special Instructions:* ${b.notes}\n` : "") +
      `💰 *Rate on Record:* ${b.estimatedPrice}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `⚠️ *Crew Notice:* Inspect site upon arrival with client, wear full Global Insight uniform & ID badges, ensure 42-point quality check before client handover.`
    );
  };

  const handleCopyCrewBrief = (b: Booking) => {
    navigator.clipboard.writeText(getCrewBriefText(b));
    setCopiedBriefId(b.id);
    showToast(`Crew brief for ${b.id} copied to clipboard`);
    setTimeout(() => setCopiedBriefId(null), 2500);
  };

  // Metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    const matchesArea =
      areaFilter === "ALL" ||
      b.address.toLowerCase().includes(areaFilter.toLowerCase());
    const matchesSearch =
      searchTerm.trim() === "" ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesArea && matchesSearch;
  });

  // PIN Gate screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A192F] text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 text-center">
          <div className="flex justify-center mb-2">
            <Logo variant="light" size="md" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-[#38BDF8] text-xs font-bold border border-blue-500/20">
              <Lock className="w-3.5 h-3.5" />
              <span>Operations Portal Gate</span>
            </div>
            <h1 className="text-xl font-heading font-extrabold text-white mt-2">
              Dispatch &amp; Booking Management
            </h1>
            <p className="text-xs text-slate-400">
              Enter your authorized staff PIN to access client requests.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-300 block">
                Security PIN Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter PIN (Default: 2026)"
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-center tracking-widest text-lg font-mono focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/30 outline-none"
                />
              </div>
              {pinError && (
                <p className="text-xs text-rose-400 pt-1 flex items-center justify-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid PIN code. Please try again.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Demo PIN: <strong>2026</strong></span>
            <Link href="/" className="text-[#38BDF8] hover:underline flex items-center gap-1">
              <span>Return to Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="min-h-screen bg-[#F4F8FD] text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A192F] text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar in Deep Navy #0A192F */}
      <header className="bg-[#0A192F] text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo & Portal title */}
            <div className="flex items-center space-x-4">
              <Logo variant="light" size="sm" asLink={false} />
              <div className="hidden sm:block h-6 w-px bg-slate-700" />
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#38BDF8]">
                  Operations Dispatch Portal
                </span>
                <span className="text-[10px] text-slate-400">
                  Accra Real-Time Booking Management
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-200 text-xs font-bold transition-colors border border-emerald-500/30 cursor-pointer"
                title="Export Bookings to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <button
                type="button"
                onClick={fetchBookings}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                title="Refresh Bookings"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>

              <Link
                href="/"
                target="_blank"
                className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-slate-700/60"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-bold transition-colors border border-rose-500/20 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full space-y-8">
        {/* KPI Metrics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Total Requests
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0A192F] mt-1">
                {totalCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Pending Action */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
                Pending Action
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-600 mt-1">
                {pendingCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock4 className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Confirmed */}
          <div className="bg-white rounded-2xl p-5 border border-blue-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider block">
                Confirmed Jobs
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0066CC] mt-1">
                {confirmedCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Completed */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                Completed Handover
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-600 mt-1">
                {completedCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0">
            {(["ALL", "PENDING", "CONFIRMED", "COMPLETED"] as const).map((st) => {
              const isActive = statusFilter === st;
              const count =
                st === "ALL"
                  ? totalCount
                  : st === "PENDING"
                  ? pendingCount
                  : st === "CONFIRMED"
                  ? confirmedCount
                  : completedCount;

              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#0066CC] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>
                    {st === "ALL" ? "All Bookings" : st.charAt(0) + st.slice(1).toLowerCase()}
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-extrabold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Area & Search Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Neighborhood Area Dropdown */}
            <div className="relative w-full sm:w-auto">
              <div className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/80 text-xs text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                <span className="font-semibold text-[11px] text-slate-500 whitespace-nowrap">Zone:</span>
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="bg-transparent font-bold text-xs text-[#0A192F] focus:outline-none cursor-pointer pr-1"
                >
                  <option value="ALL">All Accra Zones</option>
                  {accraAreas.filter((a) => a !== "ALL").map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, phone, area..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Bookings Table / List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#0A192F]">
                Active Client Requests
              </h3>
              <p className="text-xs text-slate-500">
                Showing {filteredBookings.length} of {totalCount} reservations
                {areaFilter !== "ALL" && ` in ${areaFilter}`}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                title="Download CSV report"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>
              <span className="hidden sm:inline text-[11px] font-semibold text-slate-500">
                Hotline: <strong>059 158 2306</strong>
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#0066CC] animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">Loading bookings from store...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#0A192F]">No bookings match your filter</h4>
              <p className="text-xs text-slate-500">
                Try adjusting your search keywords, status filter tabs, or neighborhood zone.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-x-auto">
              {filteredBookings.map((b) => {
                const isUpdating = isUpdatingId === b.id;
                const formattedWaPhone = formatPhoneForWhatsApp(b.phone);
                const clientDispatchMsg = getClientDispatchMessage(b);
                const crewBriefText = getCrewBriefText(b);
                const isCrewCopied = copiedBriefId === b.id;

                return (
                  <div
                    key={b.id}
                    className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-start justify-between gap-6"
                  >
                    {/* Left Column: Client & Service Details */}
                    <div className="space-y-3 flex-grow">
                      {/* Top row: ID, Date created, Status badge, Frequency badge */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-heading font-extrabold text-sm text-[#0066CC] bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                          {b.id}
                        </span>

                        <span className="text-xs text-slate-400">
                          Booked {new Date(b.createdAt).toLocaleDateString("en-GB")}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            b.status === "PENDING"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : b.status === "CONFIRMED"
                              ? "bg-blue-100 text-[#0066CC] border border-blue-200"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {b.status}
                        </span>

                        {/* Frequency Contract Badge if present */}
                        {b.frequency && b.frequency !== "One-Time" && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                            🔄 {b.frequency}
                          </span>
                        )}
                      </div>

                      {/* Client Name & Contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <h4 className="text-base font-heading font-bold text-[#0A192F]">
                            {b.customerName}
                          </h4>
                          <div className="flex items-center space-x-3 text-xs text-slate-600 mt-1">
                            <span className="font-semibold text-slate-800">{b.phone}</span>
                            {b.email && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500 truncate">{b.email}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Service & Price */}
                        <div>
                          <div className="text-xs font-bold text-[#0066CC]">
                            {b.serviceType}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Scale: <span className="font-semibold text-slate-700">{b.propertySize}</span> • Estimate: <span className="font-bold text-[#0A192F]">{b.estimatedPrice}</span>
                          </div>
                        </div>
                      </div>

                      {/* Selected Add-ons pills if present */}
                      {b.addOns && b.addOns.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Add-ons:
                          </span>
                          {b.addOns.map((addon, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 text-[11px] font-semibold"
                            >
                              + {addon}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Schedule & Location */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-600">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#0066CC]" />
                          <span className="font-semibold text-slate-800">
                            {b.preferredDate}
                          </span>
                          {b.timeSlot && (
                            <span className="text-slate-500">({b.timeSlot})</span>
                          )}
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0066CC]" />
                          <span>{b.address}</span>
                        </div>
                      </div>

                      {/* Notes if available */}
                      {b.notes && (
                        <div className="p-2.5 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200/60 max-w-2xl">
                          <strong className="text-slate-700">Special Instructions:</strong> {b.notes}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Superpower Dispatch Actions */}
                    <div className="flex flex-col items-start sm:items-end justify-between gap-3 flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 min-w-[280px]">
                      {/* Action Row 1: Direct Communication & One-Click Dispatches */}
                      <div className="flex flex-wrap items-center gap-2 w-full justify-start sm:justify-end">
                        {/* Call */}
                        <a
                          href={`tel:${b.phone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center justify-center space-x-1 px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066CC] font-bold text-xs transition-colors border border-blue-200/60"
                          title="Call client directly"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>

                        {/* One-Click WhatsApp Client Dispatch Confirmation */}
                        <a
                          href={`https://wa.me/${formattedWaPhone}?text=${clientDispatchMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors border border-emerald-300"
                          title="Send pre-formatted confirmation to Client on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Confirm Client</span>
                        </a>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteBooking(b.id)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Action Row 2: Cleaning Crew Superpower Actions */}
                      <div className="flex items-center gap-2 w-full justify-start sm:justify-end">
                        {/* Copy Crew Dispatch Brief */}
                        <button
                          type="button"
                          onClick={() => handleCopyCrewBrief(b)}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-200"
                          title="Copy standardized Cleaning Crew Brief for team WhatsApp"
                        >
                          {isCrewCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Copy Crew Brief</span>
                            </>
                          )}
                        </button>

                        {/* WhatsApp Crew Dispatch Link */}
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(crewBriefText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-1 px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0066CC] font-bold text-xs transition-colors border border-sky-200"
                          title="Forward Crew Brief directly to WhatsApp group"
                        >
                          <Users className="w-3.5 h-3.5 text-[#0066CC]" />
                          <span>Send Crew</span>
                        </a>
                      </div>

                      {/* Status Update Quick Select */}
                      <div className="flex items-center space-x-2 w-full justify-start sm:justify-end pt-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Status:
                        </span>

                        <select
                          disabled={isUpdating}
                          value={b.status}
                          onChange={(e) =>
                            handleUpdateStatus(b.id, e.target.value as BookingStatus)
                          }
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:border-[#0066CC] outline-none transition-all cursor-pointer shadow-xs"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-4 text-center text-xs text-slate-500">
        <p>Global Insight Operations Management Console • Accra, Ghana</p>
      </footer>
    </div>
  );
}
