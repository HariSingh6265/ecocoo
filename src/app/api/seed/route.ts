import { NextRequest, NextResponse } from "next/server";
import { DEMO_MODE } from "@/lib/config";
import { DEMO_USERS, DEMO_COMPANY, DEMO_EMPLOYEES, DEMO_TRIPS } from "@/lib/demo-data";
import { getCollection } from "@/lib/db/mongodb";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    if (!DEMO_MODE) {
      return NextResponse.json({ error: "Seed only available in DEMO_MODE" }, { status: 403 });
    }

    const usersCol = await getCollection("users");
    const companiesCol = await getCollection("companies");
    const tripsCol = await getCollection("trips");
    const employeesCol = await getCollection("employees");

    await usersCol.deleteMany({});
    await companiesCol.deleteMany({});
    await tripsCol.deleteMany({});
    await employeesCol.deleteMany({});

    const usersToInsert = await Promise.all(DEMO_USERS.map(async u => ({
      ...u,
      password: await hashPassword(u.role === "company" ? "company1234" : u.role === "employee" ? "employee1234" : "demo1234")
    })));
    
    if (usersToInsert.length > 0) await usersCol.insertMany(usersToInsert);
    if (DEMO_COMPANY) await companiesCol.insertOne(DEMO_COMPANY);
    if (DEMO_EMPLOYEES.length > 0) await employeesCol.insertMany(DEMO_EMPLOYEES);
    if (DEMO_TRIPS.length > 0) await tripsCol.insertMany(DEMO_TRIPS);

    const count = usersToInsert.length + (DEMO_COMPANY ? 1 : 0) + DEMO_EMPLOYEES.length + DEMO_TRIPS.length;

    return NextResponse.json({ success: true, count, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
