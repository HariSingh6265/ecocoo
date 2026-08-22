import { NextRequest, NextResponse } from "next/server";
import { getDemoCompanyStats } from "@/lib/demo-data";
import { getAuthFromCookies } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthFromCookies(req.cookies);
    const stats = getDemoCompanyStats();
    return NextResponse.json({
      ...stats,
      company: {
        id: user?.companyId || "demo-company-1",
        name: user?.name || "GreenTech Solutions",
        location: "Vijay Nagar, Indore",
      },
    });
  } catch (error) {
    console.error("Company Dashboard Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
