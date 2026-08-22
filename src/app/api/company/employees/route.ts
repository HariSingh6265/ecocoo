import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db/mongodb";
import { getAuthFromCookies } from "@/lib/auth";
import { generateId } from "@/lib/utils";
import { DEMO_EMPLOYEES } from "@/lib/demo-data";
import { sendViaSocketEvent } from "@/lib/services/viasocket";
import type { Employee } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthFromCookies(req.cookies);
    const companyId = user?.companyId || user?.id || "demo-company-1";

    const empCol = await getCollection("employees");
    const employees = await empCol.find({
      $or: [{ companyId }, { companyId: "" }, { companyId: { $exists: false } }],
    }).toArray();

    return NextResponse.json({ employees: employees || [] });
  } catch (error) {
    console.error("Company Employees Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthFromCookies(req.cookies);
    const companyId = user?.companyId || user?.id || "demo-company-1";
    const body = await req.json();

    const employeeCode = body.employeeCode || `GT00${Math.floor(10 + Math.random() * 90)}`;
    const newEmployee: Employee = {
      _id: `emp_${generateId()}`,
      id: `emp_${generateId()}`,
      companyId,
      employeeCode,
      name: body.name || "New Employee",
      email: body.email || `employee_${generateId()}@company.in`,
      department: body.department || "Engineering",
      homeLocation: {
        name: body.homeLocation?.name || body.homeLocation || "Palasia",
        lat: body.homeLocation?.lat || 22.7236,
        lng: body.homeLocation?.lng || 75.8824,
      },
      officeLocation: {
        name: body.officeLocation?.name || body.officeLocation || "Vijay Nagar",
        lat: body.officeLocation?.lat || 22.7533,
        lng: body.officeLocation?.lng || 75.8937,
      },
      arrivalTime: body.arrivalTime || "09:00",
      departureTime: body.departureTime || "18:00",
      preferredMode: body.preferredMode || "bus",
      greenPoints: 100,
      ecoScore: 80,
      totalTrips: 0,
      sustainableTrips: 0,
      totalCO2Saved: 0,
      totalMoneySaved: 0,
    };

    const empCol = await getCollection("employees");
    await empCol.insertOne(newEmployee);

    // Send viaSocket event
    await sendViaSocketEvent({
      eventType: "employee.registered",
      companyId,
      employeeId: employeeCode,
      employeeName: newEmployee.name,
      metadata: {
        email: newEmployee.email,
        department: newEmployee.department,
        homeLocation: newEmployee.homeLocation.name,
        preferredMode: newEmployee.preferredMode,
      },
    });

    return NextResponse.json({ success: true, employee: newEmployee });
  } catch (error) {
    console.error("Add Employee Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
