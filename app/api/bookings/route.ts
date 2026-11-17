import { NextRequest, NextResponse } from "next/server";
import { getBookings, createBooking, BookingStatus } from "@/lib/db";

// GET /api/bookings - Retrieve all bookings (optional ?status= and ?query= filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status")?.toUpperCase() as BookingStatus | undefined;
    const queryParam = searchParams.get("query")?.trim().toLowerCase();

    let bookings = await getBookings();

    if (statusParam && ["PENDING", "CONFIRMED", "COMPLETED"].includes(statusParam)) {
      bookings = bookings.filter((b) => b.status === statusParam);
    }

    if (queryParam) {
      const cleanDigits = queryParam.replace(/\D/g, "");
      bookings = bookings.filter((b) => {
        const matchesId = b.id.toLowerCase().includes(queryParam);
        const matchesPhone = cleanDigits.length >= 3 && b.phone.replace(/\D/g, "").includes(cleanDigits);
        const matchesName = b.customerName.toLowerCase().includes(queryParam);
        return matchesId || matchesPhone || matchesName;
      });
    }

    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Validate and create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      phone,
      email,
      serviceType,
      propertySize,
      preferredDate,
      timeSlot,
      address,
      notes,
      estimatedPrice,
      frequency,
      addOns,
    } = body;

    // Validation
    const errors: string[] = [];
    if (!customerName || typeof customerName !== "string" || !customerName.trim()) {
      errors.push("Customer name is required");
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      errors.push("Phone number is required");
    }
    if (!serviceType || typeof serviceType !== "string") {
      errors.push("Service type is required");
    }
    if (!propertySize || typeof propertySize !== "string") {
      errors.push("Property size is required");
    }
    if (!preferredDate || typeof preferredDate !== "string") {
      errors.push("Preferred cleaning date is required");
    }
    if (!address || typeof address !== "string" || !address.trim()) {
      errors.push("Accra address or location is required");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "Validation failed" },
        { status: 400 }
      );
    }

    const newBooking = await createBooking({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: (email || "").trim(),
      serviceType: serviceType.trim(),
      propertySize: propertySize.trim(),
      preferredDate: preferredDate.trim(),
      timeSlot: (timeSlot || "Morning (8:00 AM - 12:00 PM)").trim(),
      address: address.trim(),
      notes: (notes || "").trim(),
      estimatedPrice: estimatedPrice || "GH₵ 450 - 650",
      frequency: frequency ? String(frequency).trim() : undefined,
      addOns: Array.isArray(addOns) ? addOns : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking successfully created",
        booking: newBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error saving booking" },
      { status: 500 }
    );
  }
}
