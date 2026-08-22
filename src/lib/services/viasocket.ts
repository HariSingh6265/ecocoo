// ─── viaSocket Integration Service ───
// Decoupled automation layer for B2B workflows.
// Core application logic (recommendation, CO2, Eco Score) NEVER depends on viaSocket.

import { getCollection } from "@/lib/db/mongodb";
import { generateId } from "@/lib/utils";

export interface ViaSocketEventPayload {
  eventId?: string;
  eventType:
    | "commute.completed"
    | "employee.registered"
    | "weekly.report.generated"
    | "reward.earned"
    | "carpool.matched"
    | "navigation.opened_external"
    | string;
  companyId?: string;
  employeeId?: string;
  employeeName?: string;
  transportMode?: string;
  cost?: number;
  co2Emitted?: number;
  co2Saved?: number;
  ecoScore?: number;
  greenPoints?: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AutomationEventRecord {
  _id?: string;
  eventId: string;
  eventType: string;
  companyId?: string;
  employeeId?: string;
  status: "delivered" | "logged_locally" | "failed";
  payload: ViaSocketEventPayload;
  webhookUrl?: string;
  statusCode?: number;
  responseMessage?: string;
  createdAt: string;
}

export async function sendViaSocketEvent(
  payload: Omit<ViaSocketEventPayload, "timestamp">
): Promise<AutomationEventRecord> {
  const eventId = `evt_${generateId()}`;
  const timestamp = new Date().toISOString();
  const fullPayload: ViaSocketEventPayload = {
    ...payload,
    eventId,
    timestamp,
  };

  const isEnabled = process.env.VIASOCKET_ENABLED === "true";
  const webhookUrl = process.env.VIASOCKET_WEBHOOK_URL;
  const apiKey = process.env.VIASOCKET_API_KEY;

  let status: "delivered" | "logged_locally" | "failed" = "logged_locally";
  let statusCode: number | undefined;
  let responseMessage: string | undefined;

  if (isEnabled && webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify(fullPayload),
      });

      statusCode = res.status;
      if (res.ok) {
        status = "delivered";
        responseMessage = "Webhook delivered successfully.";
      } else {
        status = "failed";
        responseMessage = `Webhook returned status ${res.status}: ${res.statusText}`;
      }
    } catch (err: any) {
      status = "failed";
      responseMessage = err?.message || "Failed to dispatch webhook.";
    }
  } else {
    status = "logged_locally";
    responseMessage = "viaSocket integration disabled or unconfigured. Event logged locally.";
  }

  const record: AutomationEventRecord = {
    _id: eventId,
    eventId,
    eventType: payload.eventType,
    companyId: payload.companyId,
    employeeId: payload.employeeId,
    status,
    payload: fullPayload,
    webhookUrl,
    statusCode,
    responseMessage,
    createdAt: timestamp,
  };

  try {
    const eventsCol = await getCollection("automationEvents");
    await eventsCol.insertOne(record);
  } catch (err) {
    console.error("Failed to persist automation event:", err);
  }

  return record;
}

export async function getAutomationEvents(companyId?: string, limit: number = 30): Promise<AutomationEventRecord[]> {
  try {
    const eventsCol = await getCollection("automationEvents");
    const query = companyId ? { $or: [{ companyId }, { companyId: { $exists: false } }] } : {};
    const events = await eventsCol.find(query).sort({ createdAt: -1 }).limit(limit).toArray();
    return events as AutomationEventRecord[];
  } catch (err) {
    console.error("Failed to get automation events:", err);
    return [];
  }
}
