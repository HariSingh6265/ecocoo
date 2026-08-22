import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Verify database connectivity
    const usersCol = await getCollection("users");
    const count = await usersCol.countDocuments();

    return NextResponse.json(
      {
        status: "ready",
        database: "connected",
        userCount: count,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "degraded",
        database: "offline/in-memory",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
