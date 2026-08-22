import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db/mongodb";
import { getAuthFromCookies } from "@/lib/auth";
import { generateId } from "@/lib/utils";
import { sendViaSocketEvent } from "@/lib/services/viasocket";
import type { Reward } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthFromCookies(req.cookies);
    const companyId = user?.companyId || "demo-company-1";

    const rewardsCol = await getCollection("rewards");
    const rewards = await rewardsCol.find({
      $or: [{ companyId }, { companyId: { $exists: false } }],
    }).toArray();

    return NextResponse.json({ rewards });
  } catch (error) {
    console.error("Get Rewards Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthFromCookies(req.cookies);
    const companyId = user?.companyId || "demo-company-1";
    const body = await req.json();

    const newReward: Reward = {
      _id: `rwd_${generateId()}`,
      id: `rwd_${generateId()}`,
      companyId,
      employeeId: body.employeeId || "GT001",
      employeeName: body.employeeName || "Rahul Verma",
      points: body.points || 500,
      amount: body.amount || 2000,
      reason: body.reason || "Monthly Top Eco Commuter Award",
      status: "awarded",
      date: new Date().toISOString().split("T")[0],
    };

    const rewardsCol = await getCollection("rewards");
    await rewardsCol.insertOne(newReward);

    // Send viaSocket event
    await sendViaSocketEvent({
      eventType: "reward.earned",
      companyId,
      employeeId: newReward.employeeId,
      employeeName: newReward.employeeName,
      greenPoints: newReward.points,
      metadata: {
        amount: newReward.amount,
        reason: newReward.reason,
      },
    });

    return NextResponse.json({ success: true, reward: newReward });
  } catch (error) {
    console.error("Create Reward Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
