import { NextRequest, NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/auth";
import { sendViaSocketEvent } from "@/lib/services/viasocket";
import { getCollection } from "@/lib/db/mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthFromCookies(req.cookies);
    const body = await req.json();

    const auditCol = await getCollection("auditLogs");
    await auditCol.insertOne({
      eventType: "navigation.opened_external",
      userId: authUser?.id || "anonymous",
      companyId: authUser?.companyId || null,
      origin: body.origin,
      destination: body.destination,
      mode: body.mode,
      url: body.url,
      timestamp: new Date(),
    });

    // Optionally dispatch viaSocket event if configured
    await sendViaSocketEvent({
      eventType: "navigation.opened_external",
      companyId: authUser?.companyId,
      metadata: {
        userId: authUser?.id || "anonymous",
        origin: body.origin,
        destination: body.destination,
        mode: body.mode,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Navigation Handoff Logging Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
