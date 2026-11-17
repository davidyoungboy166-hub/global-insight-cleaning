import fs from "fs";
import path from "path";

export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED";

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: string;
  propertySize: string; // "1-2 Bedroom", "3-4 Bedroom", "Office/Commercial", "Post-Construction"
  preferredDate: string;
  timeSlot?: string;
  address: string;
  notes?: string;
  estimatedPrice: string;
  status: BookingStatus;
  frequency?: string;
  addOns?: string[];
  createdAt: string;
  updatedAt?: string;
}

const IS_VERCEL = Boolean(process.env.VERCEL);
const BUNDLED_DATA_FILE = path.join(process.cwd(), "data", "bookings.json");
const DATA_DIR = IS_VERCEL ? path.join("/tmp", "data") : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

// Initial seed data representing real Accra scenarios
const initialSeedBookings: Booking[] = [
  {
    id: "GI-84921",
    customerName: "Kweku Vanderpuije",
    phone: "024 412 8931",
    email: "kweku.v@gmail.com",
    serviceType: "Residential & Commercial Cleaning",
    propertySize: "3-4 Bedroom",
    preferredDate: "2026-11-18",
    timeSlot: "Morning (8:00 AM - 12:00 PM)",
    address: "House 14, 5th Circular Road, Cantonments, Accra",
    notes: "Deep focus on kitchen cabinets and guest bathrooms. Please bring floor buffing equipment.",
    estimatedPrice: "GH₵ 630 - 790",
    status: "CONFIRMED",
    createdAt: "2026-11-15T09:30:00.000Z",
    updatedAt: "2026-11-15T10:15:00.000Z",
  },
  {
    id: "GI-84922",
    customerName: "Abena Serwaa Boateng",
    phone: "050 982 3411",
    email: "abena.boateng@stanbic.com.gh",
    serviceType: "Post-Construction Cleaning",
    propertySize: "Post-Construction",
    preferredDate: "2026-11-19",
    timeSlot: "Full Day (8:30 AM - 5:00 PM)",
    address: "Plot 42, Adjiringanor Extension, East Legon, Accra",
    notes: "Newly tiled 2-story townhouse. Requires cement dust extraction and window paint scraping.",
    estimatedPrice: "GH₵ 1,800 - 2,250",
    status: "PENDING",
    createdAt: "2026-11-16T08:15:00.000Z",
  },
  {
    id: "GI-84923",
    customerName: "Dr. Kwesi Mensah",
    phone: "020 811 4452",
    email: "kmensah.med@yahoo.com",
    serviceType: "Move-In & Move-Out Cleaning",
    propertySize: "1-2 Bedroom",
    preferredDate: "2026-11-20",
    timeSlot: "Afternoon (1:00 PM - 5:00 PM)",
    address: "Mirage Residence, Flat 4B, Airport Residential, Accra",
    notes: "Move-in sanitization. All kitchen appliances and bedroom wardrobes must be steam cleaned.",
    estimatedPrice: "GH₵ 650 - 810",
    status: "CONFIRMED",
    createdAt: "2026-11-16T10:45:00.000Z",
  },
  {
    id: "GI-84924",
    customerName: "Farida Alhassan",
    phone: "055 330 9012",
    email: "farida@goldkey.com.gh",
    serviceType: "Real Estate Property Cleaning",
    propertySize: "Office/Commercial",
    preferredDate: "2026-11-17",
    timeSlot: "Morning (8:00 AM - 12:00 PM)",
    address: "One Airport Square, 6th Floor, Airport City, Accra",
    notes: "Commercial showroom detailing ahead of prospective tenant inspection.",
    estimatedPrice: "GH₵ 1,500 - 1,875",
    status: "COMPLETED",
    createdAt: "2026-11-14T14:20:00.000Z",
    updatedAt: "2026-11-17T12:30:00.000Z",
  },
  {
    id: "GI-84925",
    customerName: "Nathaniel Odoom",
    phone: "027 765 4321",
    email: "nodoom@airbnb-accra.com",
    serviceType: "Airbnb & Short-Let Turnover Cleaning",
    propertySize: "1-2 Bedroom",
    preferredDate: "2026-11-21",
    timeSlot: "Midday (11:00 AM - 2:00 PM)",
    address: "Embassy Gardens, Block C, Room 204, Cantonments",
    notes: "Guest checkout at 11am, next check-in at 3pm. Fresh linens required.",
    estimatedPrice: "GH₵ 350 - 440",
    status: "PENDING",
    createdAt: "2026-11-16T11:50:00.000Z",
  },
];

// Ensure directory and data file exist
function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      if (IS_VERCEL && fs.existsSync(BUNDLED_DATA_FILE)) {
        try {
          const bundledContent = fs.readFileSync(BUNDLED_DATA_FILE, "utf8");
          fs.writeFileSync(DATA_FILE, bundledContent, "utf8");
          return;
        } catch {
          // Fall through to seed bookings
        }
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialSeedBookings, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Error ensuring data file:", err);
  }
}

// Read all bookings
export async function getBookings(): Promise<Booking[]> {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const bookings: Booking[] = JSON.parse(data);
    // Sort descending by creation date
    return bookings.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.error("Error reading bookings database:", err);
    return [];
  }
}

// Get booking by ID
export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getBookings();
  return bookings.find((b) => b.id.toLowerCase() === id.toLowerCase()) || null;
}

// Create new booking
export async function createBooking(
  bookingData: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt"> & {
    id?: string;
    status?: BookingStatus;
  }
): Promise<Booking> {
  ensureDataFile();
  const bookings = await getBookings();

  // Generate unique human-readable ID: GI-XXXXX
  const randomFive = Math.floor(10000 + Math.random() * 90000);
  const newId = bookingData.id || `GI-${randomFive}`;

  const newBooking: Booking = {
    ...bookingData,
    id: newId,
    status: bookingData.status || "PENDING",
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(newBooking);
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), "utf8");
  return newBooking;
}

// Update booking status or notes
export async function updateBooking(
  id: string,
  updates: Partial<Pick<Booking, "status" | "notes" | "preferredDate" | "timeSlot">>
): Promise<Booking | null> {
  ensureDataFile();
  const bookings = await getBookings();
  const index = bookings.findIndex((b) => b.id.toLowerCase() === id.toLowerCase());

  if (index === -1) {
    return null;
  }

  const updatedBooking: Booking = {
    ...bookings[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  bookings[index] = updatedBooking;
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), "utf8");
  return updatedBooking;
}

// Delete booking
export async function deleteBooking(id: string): Promise<boolean> {
  ensureDataFile();
  const bookings = await getBookings();
  const index = bookings.findIndex((b) => b.id.toLowerCase() === id.toLowerCase());

  if (index === -1) {
    return false;
  }

  bookings.splice(index, 1);
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), "utf8");
  return true;
}
