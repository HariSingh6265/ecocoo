import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db/mongodb";
import { getAuthFromCookies } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthFromCookies(req.cookies);
    const userId = authUser?.id || authUser?.userId || "demo-user-1";

    const tripsCol = await getCollection("trips");
    const trip = await tripsCol.findOne({
      $or: [
        { id: params.id },
        { _id: params.id },
      ],
    });

    if (!trip) {
      // Fallback demo trip
      return NextResponse.json({
        trip: {
          id: params.id,
          _id: params.id,
          userId,
          from: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
          to: { name: "Rajwada", lat: 22.7196, lng: 75.8577 },
          fromLocationId: "Vijay Nagar",
          toLocationId: "Rajwada",
          mode: "bus",
          cost: 25,
          distanceKm: 8.4,
          distance: 8.4,
          durationMinutes: 32,
          time: 32,
          estimatedCo2Kg: 0.31,
          co2: 0.31,
          ecoScore: 91,
          moneySaved: 155,
          co2Saved: 1.21,
          status: "in_progress",
          date: new Date().toISOString().split("T")[0],
          createdAt: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({ trip });
  } catch (error) {
    console.error("Get Trip Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const tripsCol = await getCollection("trips");
    await tripsCol.updateOne(
      { $or: [{ id: params.id }, { _id: params.id }] },
      { $set: body }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update Trip Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
