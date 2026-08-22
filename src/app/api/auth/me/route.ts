import { NextRequest, NextResponse } from "next/server";
import { getAuthFromCookies, signToken, createAuthCookieHeader } from "@/lib/auth";
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
      preferences: dbUser?.preferences || { weightProfile: "balanced" },
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Me Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await getAuthFromCookies(req.cookies);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const usersCol = await getCollection("users");

    const updateFields: any = {
      updatedAt: new Date().toISOString(),
    };

    if (body.name && typeof body.name === "string" && body.name.trim().length > 0) {
      updateFields.name = body.name.trim();
    }

    if (body.preferences) {
      updateFields.preferences = body.preferences;
    }

    await usersCol.updateOne(
      { $or: [{ id: auth.id }, { _id: auth.id }, { email: auth.email }] },
      { $set: updateFields }
    );

    // Re-issue updated JWT token so cookie holds updated name
    const updatedPayload = {
      ...auth,
      name: updateFields.name || auth.name,
    };
    const token = await signToken(updatedPayload);

    const response = NextResponse.json({
      success: true,
      message: "Profile name and settings updated in database",
      user: updatedPayload,
    });
    response.headers.set("Set-Cookie", createAuthCookieHeader(token));
    return response;
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
