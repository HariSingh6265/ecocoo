import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db/mongodb";
import { getAuthFromCookies } from "@/lib/auth";
import { generateId } from "@/lib/utils";
import { GREEN_POINTS } from "@/lib/config";
import { sendViaSocketEvent } from "@/lib/services/viasocket";
import type { Trip } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthFromCookies(req.cookies);
    const userId = authUser?.id || authUser?.userId || "demo-user-1";
    const period = req.nextUrl.searchParams.get("period") || "all";
    const limitParam = req.nextUrl.searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : 50;

    const tripsCol = await getCollection("trips");
    let query: any = { userId };

    const now = new Date();
    if (period === "today") {
      const todayStr = now.toISOString().split("T")[0];
      query.date = { $gte: todayStr };
    } else if (period === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      query.date = { $gte: weekAgo };
    } else if (period === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      query.date = { $gte: monthAgo };
    }

    const allTrips = await tripsCol.find(query).sort({ date: -1, createdAt: -1 }).limit(limit).toArray();

    // Map trips so fields are consistent for UI
    const mapped = allTrips.map((t: any) => ({
      _id: t._id || t.id,
      id: t.id || t._id,
      userId: t.userId,
      companyId: t.companyId,
      from: typeof t.from === "object" ? t.from : { name: t.fromLocationId || t.from || "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
      to: typeof t.to === "object" ? t.to : { name: t.toLocationId || t.to || "Rajwada", lat: 22.7196, lng: 75.8577 },
      fromLocationId: typeof t.from === "object" ? t.from.name : (t.fromLocationId || t.from || "Vijay Nagar"),
      toLocationId: typeof t.to === "object" ? t.to.name : (t.toLocationId || t.to || "Rajwada"),
      mode: t.mode || "bus",
      cost: t.cost ?? t.option?.cost ?? t.option?.estimatedCost ?? 25,
      distance: t.distance ?? t.distanceKm ?? t.option?.distance ?? 8.4,
      distanceKm: t.distanceKm ?? t.distance ?? t.option?.distance ?? 8.4,
      time: t.time ?? t.durationMinutes ?? t.option?.time ?? 30,
      durationMinutes: t.durationMinutes ?? t.time ?? t.option?.time ?? 30,
      co2: t.co2 ?? t.estimatedCo2Kg ?? t.option?.co2 ?? 0.31,
      estimatedCo2Kg: t.estimatedCo2Kg ?? t.co2 ?? t.option?.co2 ?? 0.31,
      ecoScore: t.ecoScore ?? t.option?.ecoScore ?? 85,
      moneySaved: t.moneySaved ?? t.option?.moneySaved ?? 40,
      co2Saved: t.co2Saved ?? t.option?.co2Saved ?? 1.2,
      passengers: t.passengers || 1,
      status: t.status || "completed",
      date: t.date || (t.createdAt ? t.createdAt.split("T")[0] : new Date().toISOString().split("T")[0]),
      createdAt: t.createdAt || new Date().toISOString(),
    }));

    return NextResponse.json({ trips: mapped });
  } catch (error) {
    console.error("Get Trips Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthFromCookies(req.cookies);
    const userId = authUser?.id || authUser?.userId || "demo-user-1";
    const body = await req.json();

    const option = body.option || {};
    const mode = body.mode || option.mode || "bus";
    const fromName = body.from?.name || body.fromLocationId || (typeof body.from === "string" ? body.from : "Vijay Nagar");
    const toName = body.to?.name || body.toLocationId || (typeof body.to === "string" ? body.to : "Rajwada");

    const distance = body.distance || option.distance || option.distanceKm || 8.4;
    const cost = body.cost ?? option.cost ?? option.estimatedCost ?? 25;
    const time = body.time ?? option.time ?? option.durationMinutes ?? 28;
    const co2 = body.co2 ?? option.co2 ?? option.estimatedCo2Kg ?? 0.31;
    const ecoScore = body.ecoScore ?? option.ecoScore ?? 88;
    const moneySaved = body.moneySaved ?? option.moneySaved ?? 45;
    const co2Saved = body.co2Saved ?? option.co2Saved ?? 1.25;

    // Award Green Points based on sustainability
    let pointsAwarded = 0;
    if (mode === "cycling") pointsAwarded = GREEN_POINTS.cyclingTrip;
    else if (mode === "walking") pointsAwarded = GREEN_POINTS.walkingTrip;
    else if (mode === "carpool") pointsAwarded = GREEN_POINTS.carpoolTrip;
    else if (mode === "bus") pointsAwarded = GREEN_POINTS.busTrip;
    else if (mode === "cab") pointsAwarded = GREEN_POINTS.cabTrip;

    const tripId = `trip_${generateId()}`;
    const now = new Date();

    const tripRecord: Trip = {
      _id: tripId,
      id: tripId,
      userId,
      companyId: authUser?.companyId || body.companyId || "demo-company-1",
      employeeId: authUser?.employeeId || body.employeeId,
      from: { name: fromName, lat: body.from?.lat || 22.7533, lng: body.from?.lng || 75.8937 },
      to: { name: toName, lat: body.to?.lat || 22.7196, lng: body.to?.lng || 75.8577 },
      fromLocationId: fromName,
      toLocationId: toName,
      mode,
      cost,
      distance,
      distanceKm: distance,
      time,
      durationMinutes: time,
      co2,
      estimatedCo2Kg: co2,
      ecoScore,
      moneySaved,
      co2Saved,
      passengers: body.passengers || option.occupancy || 1,
      status: "completed",
      date: now.toISOString().split("T")[0],
      createdAt: now.toISOString(),
      timestamp: now,
    };

    const tripsCol = await getCollection("trips");
    await tripsCol.insertOne(tripRecord);

    // Update user stats
    const usersCol = await getCollection("users");
    await usersCol.updateOne(
      { $or: [{ id: userId }, { _id: userId }] },
      {
        $inc: {
          greenPoints: pointsAwarded,
          totalTrips: 1,
          totalCO2Saved: co2Saved,
          totalMoneySaved: moneySaved,
        },
      }
    );

    // Trigger viaSocket event for sustainable commute
    const isSustainable = ["bus", "carpool", "cycling", "walking"].includes(mode);
    if (isSustainable) {
      await sendViaSocketEvent({
        eventType: "commute.completed",
        companyId: authUser?.companyId || "demo-company-1",
        employeeId: authUser?.employeeId || "GT001",
        employeeName: authUser?.name || "Hari Singh",
        transportMode: mode,
        cost,
        co2Emitted: co2,
        co2Saved,
        ecoScore,
        greenPoints: pointsAwarded,
        metadata: {
          tripId,
          from: fromName,
          to: toName,
          distanceKm: distance,
        },
      });
    }

    return NextResponse.json({
      success: true,
      id: tripId,
      tripId,
      trip: tripRecord,
      pointsAwarded,
    });
  } catch (error) {
    console.error("Create Trip Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
