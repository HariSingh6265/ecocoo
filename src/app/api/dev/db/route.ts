import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const table = req.nextUrl.searchParams.get("table") || "users";

    const validTables = ["users", "companies", "employees", "trips", "rewards", "automationEvents", "auditLogs"];
    if (!validTables.includes(table)) {
      return NextResponse.json({ error: "Invalid table requested." }, { status: 400 });
    }

    const col = await getCollection(table);

    // CRITICAL SECURITY RULE: NEVER return passwords or password hashes to developer queries
    let records: any[] = [];
    if (table === "users") {
      records = await col.find({}, { projection: { password: 0 } }).toArray();
    } else {
      records = await col.find({}).toArray();
    }

    // Sanitize any potential sensitive fields as a second security boundary
    const sanitized = records.map((r: any) => {
      const copy = { ...r };
      delete copy.password;
      delete copy.hash;
      delete copy.token;
      return copy;
    });

    return NextResponse.json({
      success: true,
      table,
      count: sanitized.length,
      data: sanitized,
    });
  } catch (error) {
    console.error("Dev DB Explorer Error:", error);
    return NextResponse.json({ error: "Failed to query database." }, { status: 500 });
  }
}
