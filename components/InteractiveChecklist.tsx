"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  Utensils,
  Bath,
  Home,
  Building,
  Hammer,
  ShieldCheck,
  ArrowRight,
  Check,
  RotateCcw,
  Clock,
  Award,
} from "lucide-react";

interface InteractiveChecklistProps {
  onOpenBooking: (serviceId?: string) => void;
}

interface ChecklistItem {
  id: string;
  task: string;
  detail: string;
  equipment: string;
  defaultChecked?: boolean;
}

interface RoomSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge: string;
  recommendedServiceId: string;
  items: ChecklistItem[];
}

export const checklistRooms: RoomSection[] = [
  {
    id: "kitchen",
    title: "Kitchen & Pantry",
    subtitle: "Heavy grease eradication, appliance steaming & food-prep sanitization",
    icon: Utensils,
    badge: "12-Point Deep Care",
    recommendedServiceId: "residential-commercial",
    items: [
      {
        id: "k1",
        task: "Stove & Gas Burner Carbon Degreasing",
        detail: "Deep chemical breakdown of baked-on oils, burnt residue, and iron grate carbon.",
        equipment: "FDA-approved non-toxic heavy degreaser & brass detail brushes",
      },
      {
        id: "k2",
        task: "Extractor Hood & Grease Mesh Ultrasonic Soak",
        detail: "Removal and steam immersion of exhaust filters to restore ventilation suction.",
        equipment: "High-pressure 140°C food-safe steam lance",
      },
      {
        id: "k3",
        task: "Cabinet & Drawer Interiors Sanitization",
        detail: "Shelves vacuumed of crumbs, pest droppings, and wiped with antibacterial solution.",
        equipment: "Microfiber antimicrobial cloths & hospital-grade sanitizer",
      },
      {
        id: "k4",
        task: "Stainless Steel Sink & Limescale Descaling",
        detail: "Faucet fixtures, sink bowls, and drain traps cleared of hard Accra water deposits.",
        equipment: "Citric acid mineral dissolver & stainless buffing compound",
      },
      {
        id: "k5",
        task: "Tile Splashback & Grout Line Scrubbing",
        detail: "Restores stained wall grout lines behind cooktops to original bright color.",
        equipment: "Rotary grout brush & oxygenated grout brightening cream",
      },
      {
        id: "k6",
        task: "Refrigerator & Microwave Interior Detailing",
        detail: "Full shelf breakdown, food residue clearance, and anti-odor lemon misting.",
        equipment: "Food-contact safe quaternary disinfectant",
      },
    ],
  },
  {
    id: "bathroom",
    title: "Bathrooms & Restrooms",
    subtitle: "Limescale removal, hospital-grade anti-viral misting & mirror buffing",
    icon: Bath,
    badge: "10-Point Hygiene Audit",
    recommendedServiceId: "surface-sanitization",
    items: [
      {
        id: "b1",
        task: "Shower Glass Hard Water Stain Eradication",
        detail: "Removes cloudy mineral deposits caused by Accra borehole/tap water.",
        equipment: "Ceramic glass abrasive cream & rubber squeegee system",
      },
      {
        id: "b2",
        task: "Toilet Bowl, Tank & Hinges Thermal Steam Cleansing",
        detail: "Thermal eradication of 99.99% of bacteria, mildew, and urinary salts in hidden joints.",
        equipment: "140°C pressurized dry steam extractor",
      },
      {
        id: "b3",
        task: "Wall Tile Steam Sanitization & Mildew Prevention",
        detail: "Deep scrubbing of moisture corners and silicone joints to prevent black mold regrowth.",
        equipment: "Anti-fungal bio-active foam & high-heat steam",
      },
      {
        id: "b4",
        task: "Mirror & Chrome Fixture Mirror-Finish Polish",
        detail: "Streak-free polishing of bathroom vanities, rain showerheads, and towel racks.",
        equipment: "Waffle-weave glass cloths & streak-free optical polish",
      },
      {
        id: "b5",
        task: "Floor Drain Trap Deodorization & Scrub",
        detail: "Hair and sludge extraction with enzyme odor digestant down pipe traps.",
        equipment: "Drain enzyme flush & flexible coil cleaning brush",
      },
    ],
  },
  {
    id: "living",
    title: "Living Areas & Bedrooms",
    subtitle: "Harmattan dust extraction, tile scrubbing, skirting & mattress care",
    icon: Home,
    badge: "11-Point Detail",
    recommendedServiceId: "deep-cleaning-packages",
    items: [
      {
        id: "l1",
        task: "Harmattan Dust & Fine Sand HEPA Extraction",
        detail: "Deep multi-stage filtration vacuuming of ceilings, cornices, curtains, and cushions.",
        equipment: "Industrial commercial HEPA H14 vacuum filtration unit",
      },
      {
        id: "l2",
        task: "Tile & Hardwood High-Speed Rotary Floor Scrubbing",
        detail: "Removes deep grime trapped in tile pores, restoring original shine without scratching.",
        equipment: "Commercial rotary floor scrubbing machine with soft pads",
      },
      {
        id: "l3",
        task: "Baseboards, Doors & Skirting Board Hand-Wipe",
        detail: "Hand-detailing of all woodwork, door handles, light switches, and wall trims.",
        equipment: "pH-neutral conditioning wood cleanser",
      },
      {
        id: "l4",
        task: "Ceiling Fans & AC Vented Filter Deep Washing",
        detail: "Blades de-dusted and air conditioning plastic filter nets washed and disinfected.",
        equipment: "Microfiber static duster & antibacterial coil rinse",
      },
      {
        id: "l5",
        task: "Mattress & Fabric Sofa Anti-Allergen Extraction",
        detail: "Deep steam vacuuming to remove dead skin cells, dust mites, and odors.",
        equipment: "Industrial wet/dry upholstery injection-extraction machine",
      },
    ],
  },
  {
    id: "office",
    title: "Commercial Offices & Suites",
    subtitle: "Workstation sanitization, glass partitions & corporate boardroom prep",
    icon: Building,
    badge: "Corporate Standard",
    recommendedServiceId: "residential-commercial",
    items: [
      {
        id: "o1",
        task: "Computer Keyboard & Workstation Sanitization",
        detail: "Safe, anti-static electrostatic disinfection of high-touch staff keyboards, mice, and phones.",
        equipment: "Electronics-safe 70% isopropanol wipes & micro-static brushes",
      },
      {
        id: "o2",
        task: "Floor-to-Ceiling Glass Partition Fingerprint Buffing",
        detail: "Optical-grade glass polishing of meeting room partitions, lobby doors, and vision panels.",
        equipment: "Telescopic squeegee blades & lint-free microfiber sleeves",
      },
      {
        id: "o3",
        task: "Conference Table Wood Detailing & Leather Chair Buffing",
        detail: "Removal of hand oils, pen marks, and coffee rings, followed by conditioning wax.",
        equipment: "Natural beeswax conditioner & soft buffing lamb wool",
      },
      {
        id: "o4",
        task: "Commercial Carpet Tile Vacuuming & Stain Spotting",
        detail: "High-traffic lane extraction removing tracked-in Accra dust and mud.",
        equipment: "Dual-motor commercial upright vacuum & enzyme spotter",
      },
      {
        id: "o5",
        task: "Communal Kitchenette & Restroom Restocking Protocol",
        detail: "Sanitization of shared microwaves, water dispensers, and waste segregation.",
        equipment: "Color-coded cross-contamination prevention protocol",
      },
    ],
  },
  {
    id: "postcon",
    title: "Compound & Post-Construction",
    subtitle: "Red sand washing, paint splatter stripping & window track clearing",
    icon: Hammer,
    badge: "Heavy-Duty Spec",
    recommendedServiceId: "post-construction",
    items: [
      {
        id: "p1",
        task: "Cement Splatter & Tile Grout Haze Removal",
        detail: "Gentle acid washing that dissolves grout film and cement drops without harming porcelain.",
        equipment: "Specialized buffered masonry cleaner & nylon floor scrubbers",
      },
      {
        id: "p2",
        task: "Window Sliding Track Debris Extraction",
        detail: "Removes trapped cement grit, red sand, and stucco from sliding window rails.",
        equipment: "Crevice vacuum attachments & high-pressure air nozzle",
      },
      {
        id: "p3",
        task: "Exterior Compound Pavement Pressure Jet Washing",
        detail: "High-pressure water washing of compound paving blocks, carports, and entryway ramps.",
        equipment: "180-Bar industrial petrol pressure washer with rotary dirt blaster",
      },
      {
        id: "p4",
        task: "Protective Tape & Paint Overspray Razor Scraping",
        detail: "Safe removal of masking tape residue and paint specks from window panes and frames.",
        equipment: "Safety-handled brass scraper blades & adhesive solvent",
      },
    ],
  },
];

export default function InteractiveChecklist({ onOpenBooking }: InteractiveChecklistProps) {
  const [activeTab, setActiveTab] = useState<string>("kitchen");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    // Default all items to checked to demonstrate complete quality
    const initial: Record<string, boolean> = {};
    checklistRooms.forEach((room) => {
      room.items.forEach((item) => {
        initial[item.id] = true;
      });
    });
    return initial;
  });

  const activeRoom = checklistRooms.find((r) => r.id === activeTab) || checklistRooms[0];

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const selectAllInRoom = () => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      activeRoom.items.forEach((item) => {
        updated[item.id] = true;
      });
      return updated;
    });
  };

  const clearAllInRoom = () => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      activeRoom.items.forEach((item) => {
        updated[item.id] = false;
      });
      return updated;
    });
  };

  const checkedCount = activeRoom.items.filter((item) => checkedItems[item.id]).length;
  const totalCount = activeRoom.items.length;
  const progressPercent = Math.round((checkedCount / totalCount) * 100);

  return (
    <section id="checklist" className="py-20 lg:py-28 bg-[#F4F8FD] border-t border-slate-200/80 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/60 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-[#0066CC] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>Interactive Cleaning Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0A192F] tracking-tight">
            The Global Insight 42-Point Spotless Audit
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Wondering what our uniformed cleaning teams do when on site? Explore our room-by-room
            standardized checklist below. Every cleaning concludes with a supervisor sign-off.
          </p>
        </div>

        {/* Room Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {checklistRooms.map((room) => {
            const Icon = room.icon;
            const isActive = activeTab === room.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => setActiveTab(room.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0066CC] text-white shadow-lg shadow-blue-600/25 scale-[1.02]"
                    : "bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-sky-200" : "text-[#0066CC]"}`} />
                <span>{room.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {room.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Checklist Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-blue-950/5 border border-slate-200/90 overflow-hidden">
          {/* Card Header Ribbon */}
          <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#38BDF8] flex items-center justify-center border border-blue-400/30">
                  <activeRoom.icon className="w-4 h-4" />
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  {activeRoom.title} Inspection Checklist
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {activeRoom.subtitle}
              </p>
            </div>

            {/* Live Audit Progress Pill */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center font-heading font-extrabold text-xs">
                {progressPercent}%
              </div>
              <div className="text-left text-xs">
                <span className="text-slate-300 text-[11px] block">Audit Progress:</span>
                <span className="font-extrabold text-white">
                  {checkedCount} of {totalCount} points active
                </span>
              </div>
            </div>
          </div>

          {/* Checklist Actions Toolbar */}
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold">
              Tap any item to customize your requested scope:
            </span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={selectAllInRoom}
                className="text-[#0066CC] hover:underline font-bold cursor-pointer"
              >
                Select All
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={clearAllInRoom}
                className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Checklist Items List */}
          <div className="p-6 sm:p-8 space-y-3.5 divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {activeRoom.items.map((item, index) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`pt-3.5 first:pt-0 flex items-start space-x-3.5 p-3 rounded-2xl transition-all cursor-pointer ${
                    isChecked
                      ? "bg-blue-50/40 hover:bg-blue-50/70"
                      : "bg-slate-50/50 hover:bg-slate-100/60 opacity-60"
                  }`}
                >
                  {/* Checkbox Icon */}
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border transition-all ${
                      isChecked
                        ? "bg-[#0066CC] border-[#0066CC] text-white shadow-xs"
                        : "bg-white border-slate-300 text-transparent"
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>

                  {/* Task Text & Equipment Detail */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-sm font-heading font-bold ${
                          isChecked ? "text-[#0A192F]" : "text-slate-500 line-through"
                        }`}
                      >
                        {item.task}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-slate-400 flex-shrink-0">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {item.detail}
                    </p>

                    <div className="mt-2 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/80 text-[10px] font-semibold text-slate-500 shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-[#0066CC]" />
                      <span>Industrial Kit: <strong>{item.equipment}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout & Action Bar */}
          <div className="p-6 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 space-y-0.5 text-center sm:text-left">
              <span className="font-bold text-[#0A192F] block">
                🇬🇭 100% On-Site Satisfaction Re-Clean Guarantee
              </span>
              <span>
                If any point above doesn&apos;t meet your inspection, we re-clean within 24 hours at zero extra charge.
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto flex-shrink-0">
              <button
                type="button"
                onClick={() => onOpenBooking(activeRoom.recommendedServiceId)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Book This Cleaning Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
