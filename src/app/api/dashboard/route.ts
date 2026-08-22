import { NextRequest, NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/auth";
import { getCollection } from "@/lib/db/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthFromCookies(req.cookies);
    const userId = authUser?.id || authUser?.userId || "demo-user-1";

    const usersCol = await getCollection("users");
    const tripsCol = await getCollection("trips");

    const dbUser = await usersCol.findOne({ $or: [{ id: userId }, { _id: userId }, { email: authUser?.email }] });

    // Calculate real stats from user's logged trips
    const userTrips = await tripsCol.find({ userId }).toArray();
    const tripCount = userTrips.length;
    const totalCO2Saved = userTrips.reduce((acc: number, t: any) => acc + (t.co2Saved || 0), 0);
    const totalMoneySaved = userTrips.reduce((acc: number, t: any) => acc + (t.moneySaved || 0), 0);

    const userName = dbUser?.name || authUser?.name || "Commuter";
    const greenPoints = dbUser?.greenPoints ?? 100;
    const avgEcoScore = tripCount > 0
      ? Math.round(userTrips.reduce((acc: number, t: any) => acc + (t.ecoScore || 80), 0) / tripCount)
      : (dbUser?.ecoScore || 85);

    return NextResponse.json({
      success: true,
      totalCO2Saved: Math.round(totalCO2Saved * 100) / 100 || (dbUser?.totalCO2Saved ?? 0),
      totalMoneySaved: Math.round(totalMoneySaved) || (dbUser?.totalMoneySaved ?? 0),
      ecoScore: avgEcoScore,
      avgEcoScore,
      greenPoints,
      totalTrips: tripCount || (dbUser?.totalTrips ?? 0),
      monthTrips: tripCount,
      user: {
        id: userId,
        name: userName,
        email: dbUser?.email || authUser?.email || "user@ecocommute.in",
        role: dbUser?.role || authUser?.role || "user",
        greenPoints,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
