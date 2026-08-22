import { NextRequest, NextResponse } from "next/server";
import { getAutomationEvents, sendViaSocketEvent } from "@/lib/services/viasocket";
import { getAuthFromCookies } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthFromCookies(req.cookies);
    const companyId = user?.companyId || "demo-company-1";

    const isEnabled = process.env.VIASOCKET_ENABLED === "true";
    const webhookUrl = process.env.VIASOCKET_WEBHOOK_URL || "";
    const events = await getAutomationEvents(companyId);

    return NextResponse.json({
      configured: Boolean(webhookUrl),
      enabled: isEnabled,
      webhookUrl: webhookUrl ? webhookUrl.replace(/(\w{6})\w+/, "$1****") : "",
      status: isEnabled && webhookUrl ? "connected" : "ready_for_webhook",
      events,
    });
  } catch (error) {
    console.error("Get Integrations Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthFromCookies(req.cookies);
    const companyId = user?.companyId || "demo-company-1";
    const body = await req.json();

    const eventType = body.eventType || "commute.completed";
    const event = await sendViaSocketEvent({
      eventType,
      companyId,
      employeeId: body.employeeId || "GT002",
      employeeName: body.employeeName || "Sneha Gupta",
      transportMode: body.transportMode || "cycling",
      cost: body.cost || 0,
      co2Emitted: body.co2Emitted || 0,
      co2Saved: body.co2Saved || 1.85,
      ecoScore: body.ecoScore || 94,
      greenPoints: body.greenPoints || 30,
      metadata: {
        testTrigger: true,
        source: "EcoCommute Admin Portal",
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Trigger Integration Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
