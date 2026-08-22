import { NextRequest, NextResponse } from "next/server";
import { getRealTimeRecommendation } from "@/lib/engine/recommendation";
import { CommuteRequest } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CommuteRequest;
    if (!body.from || !body.to) {
      return NextResponse.json(
        { success: false, error: { code: "MISSING_PARAMS", message: "Origin (from) and destination (to) are required." } },
        { status: 400 }
      );
    }

    const result = await getRealTimeRecommendation(body);
    return NextResponse.json({
      success: true,
      data: result,
      ...result, // keep top-level compatibility for existing UI
    });
  } catch (error: any) {
    console.error("Commute Plan Error:", error);
    const message = error?.message || "Route calculation failed.";
    const isRouteUnavailable = message.includes("ROUTE_UNAVAILABLE") || message.includes("ZERO_RESULTS");

    return NextResponse.json(
      {
        success: false,
        error: {
          code: isRouteUnavailable ? "ROUTE_UNAVAILABLE" : "CALCULATION_ERROR",
          message: isRouteUnavailable
            ? "No direct route found for the requested origin and destination. Please verify the addresses."
            : message,
        },
      },
      { status: isRouteUnavailable ? 404 : 500 }
    );
  }
}
