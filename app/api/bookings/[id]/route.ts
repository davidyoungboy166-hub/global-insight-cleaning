import { NextRequest, NextResponse } from "next/server";
import { getBookingById, updateBooking, deleteBooking, BookingStatus } from "@/lib/db";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/bookings/[id] - Fetch single booking
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const booking = await getBookingById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error(`GET /api/bookings/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// PATCH /api/bookings/[id] - Update booking status or details
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();

    const allowedStatuses: BookingStatus[] = ["PENDING", "CONFIRMED", "COMPLETED"];

    if (body.status && !allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const updated = await updateBooking(id, {
      ...(body.status && { status: body.status }),
      ...(body.notes !== undefined && { notes: body.notes }),
      ...(body.preferredDate && { preferredDate: body.preferredDate }),
      ...(body.timeSlot && { timeSlot: body.timeSlot }),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Booking ${id} updated to ${updated.status}`,
      booking: updated,
    });
  } catch (error) {
    console.error(`PATCH /api/bookings/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Remove booking
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const deleted = await deleteBooking(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Booking ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(`DELETE /api/bookings/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
