import { NextRequest, NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/auth";
import { getCollection } from "@/lib/db/mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthFromCookies(req.cookies);
    if (!auth) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const usersCol = await getCollection("users");
    const dbUser = await usersCol.findOne({
      $or: [{ id: auth.id }, { _id: auth.id }, { email: auth.email }],
    });

    const user = {
      id: dbUser?.id || dbUser?._id || auth.id,
      name: dbUser?.name || auth.name || "Commuter",
      email: dbUser?.email || auth.email,
      role: dbUser?.role || auth.role || "user",
      companyId: dbUser?.companyId || auth.companyId,
      greenPoints: dbUser?.greenPoints ?? 100,
      totalTrips: dbUser?.totalTrips ?? 0,
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Me Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
