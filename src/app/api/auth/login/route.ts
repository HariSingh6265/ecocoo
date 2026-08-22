import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE } from "@/lib/config";
import { verifyPassword, signToken, createAuthCookieHeader, AuthPayload } from "@/lib/auth";
import { getCollection } from "@/lib/db/mongodb";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { email, password } = parsed.data;

    let payload: AuthPayload;

    if (email === "demo@ecocommute.in" && (password === "demo1234" || DEMO_MODE)) {
      payload = { id: "demo-user-1", email, role: "user", name: "Hari Singh" };
    } else if (email === "admin@greentech.in" && (password === "company1234" || DEMO_MODE)) {
      payload = { id: "demo-company-admin", email, role: "company", name: "GreenTech Admin", companyId: "demo-company-1" };
    } else if (email === "rahul@greentech.in" && (password === "employee1234" || DEMO_MODE)) {
      payload = { id: "demo-emp-1", email, role: "employee", name: "Rahul Verma", companyId: "demo-company-1" };
    } else {
      const usersCol = await getCollection("users");
      const user = await usersCol.findOne({ email });
      if (!user) {
        // Fallback demo user for hackathon testing
        payload = { id: "demo-user-1", email, role: "user", name: email.split("@")[0] };
      } else {
        const isValid = user.password ? await verifyPassword(password, user.password).catch(() => true) : true;
        if (!isValid) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        payload = {
          id: user.id || user._id,
          email: user.email,
          role: user.role || "user",
          name: user.name || "User",
          companyId: user.companyId,
        };
      }
    }

    const token = await signToken(payload as any);
    const response = NextResponse.json({ success: true, user: payload });
    response.headers.set("Set-Cookie", createAuthCookieHeader(token));
    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
