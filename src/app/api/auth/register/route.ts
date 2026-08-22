import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, signToken, createAuthCookieHeader } from "@/lib/auth";
import { getCollection } from "@/lib/db/mongodb";
import { generateId } from "@/lib/utils";

export const dynamic = "force-dynamic";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
  role: z.enum(["user", "company", "employee"]).default("user"),
  // Optional company fields
  location: z.any().optional(),
  workingHours: z.any().optional(),
  commutePolicy: z.string().optional(),
  monthlyBudget: z.number().optional(),
  transportOptions: z.array(z.string()).optional(),
  rewardRules: z.string().optional(),
  bestEmployeeCriteria: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }
    const { name, email, password, role } = parsed.data;

    const userId = `usr_${generateId()}`;
    const hashedPassword = await hashPassword(password);
    const usersCol = await getCollection("users");

    const existing = await usersCol.findOne({ email });
    if (existing) {
      // Update the user's name, role, and password in the database
      await usersCol.updateOne(
        { email },
        {
          $set: {
            name,
            password: hashedPassword,
            role: role || existing.role,
            updatedAt: new Date().toISOString(),
          },
        }
      );

      const payload = {
        id: existing.id || existing._id || userId,
        email: existing.email,
        role: role || existing.role || "user",
        name,
        companyId: existing.companyId,
      };
      const token = await signToken(payload);
      const response = NextResponse.json({ success: true, user: payload, message: "User updated and logged in" });
      response.headers.set("Set-Cookie", createAuthCookieHeader(token));
      return response;
    }

    const newUser = {
      _id: userId,
      id: userId,
      name,
      email,
      password: hashedPassword,
      role,
      preferences: { weightProfile: "balanced" },
      greenPoints: 100,
      totalTrips: 0,
      totalCO2Saved: 0,
      totalMoneySaved: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await usersCol.insertOne(newUser);

    if (role === "company") {
      const companiesCol = await getCollection("companies");
      const companyRecord = {
        _id: `comp_${generateId()}`,
        id: `comp_${generateId()}`,
        name,
        email,
        password: hashedPassword,
        location: body.location || { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
        workingHours: body.workingHours || { start: "09:00", end: "18:00" },
        commutePolicy: body.commutePolicy || "Encourage public transport and carpooling.",
        monthlyBudget: body.monthlyBudget || 50000,
        transportOptions: body.transportOptions || ["bus", "carpool", "cycling"],
        rewardRules: body.rewardRules || "Monthly top eco performers reward",
        bestEmployeeCriteria: body.bestEmployeeCriteria || "Highest Eco Score",
        createdAt: new Date().toISOString(),
      };
      await companiesCol.insertOne(companyRecord);
    }

    const payload = { id: userId, email, role, name };
    const token = await signToken(payload);

    const response = NextResponse.json({ success: true, user: payload });
    response.headers.set("Set-Cookie", createAuthCookieHeader(token));
    return response;
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
