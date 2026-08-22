// ─── Supabase (PostgreSQL) Database Adapter ───
// High-performance serverless connection layer for Supabase.

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { generateId } from "@/lib/utils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;
  if (!supabaseUrl || !supabaseKey) return null;

  supabaseInstance = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return supabaseInstance;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

// Table name mapping (camelCase/MongoDB names -> Supabase snake_case table names)
const TABLE_MAP: Record<string, string> = {
  users: "users",
  companies: "companies",
  employees: "employees",
  trips: "trips",
  rewards: "rewards",
  automationEvents: "automation_events",
  auditLogs: "audit_logs",
};

// ─── Supabase Collection Adapter ───
// Mimics MongoDB collection interface so existing API routes continue working with 0 changes
export class SupabaseCollectionAdapter {
  tableName: string;
  supabase: SupabaseClient;

  constructor(name: string, client: SupabaseClient) {
    this.tableName = TABLE_MAP[name] || name;
    this.supabase = client;
  }

  private transformIn(doc: any): any {
    const transformed: any = { ...doc };
    if (!transformed.id && transformed._id) {
      transformed.id = transformed._id;
    }
    if (!transformed.id) {
      transformed.id = `${this.tableName}_${generateId()}`;
    }
    delete transformed._id;

    // Convert camelCase keys to snake_case for PostgreSQL columns
    const mapped: any = {};
    for (const [k, v] of Object.entries(transformed)) {
      if (k === "greenPoints") mapped.green_points = v;
      else if (k === "totalTrips") mapped.total_trips = v;
      else if (k === "totalCO2Saved" || k === "totalCo2Saved") mapped.total_co2_saved = v;
      else if (k === "totalMoneySaved") mapped.total_money_saved = v;
      else if (k === "ecoScore") mapped.eco_score = v;
      else if (k === "companyId") mapped.company_id = v;
      else if (k === "employeeCode") mapped.employee_code = v;
      else if (k === "employeeId") mapped.employee_id = v;
      else if (k === "employeeName") mapped.employee_name = v;
      else if (k === "homeLocation") mapped.home_location = v;
      else if (k === "officeLocation") mapped.office_location = v;
      else if (k === "fromLocation") mapped.from_location = v;
      else if (k === "toLocation") mapped.to_location = v;
      else if (k === "fromLocationId") mapped.from_location_id = v;
      else if (k === "toLocationId") mapped.to_location_id = v;
      else if (k === "distanceKm" || k === "distance") mapped.distance_km = v;
      else if (k === "durationMinutes" || k === "time") mapped.duration_minutes = v;
      else if (k === "estimatedCo2Kg" || k === "co2") mapped.estimated_co2_kg = v;
      else if (k === "co2Saved") mapped.co2_saved = v;
      else if (k === "moneySaved") mapped.money_saved = v;
      else if (k === "greenPointsEarned") mapped.green_points_earned = v;
      else if (k === "arrivalTime") mapped.arrival_time = v;
      else if (k === "departureTime") mapped.departure_time = v;
      else if (k === "preferredMode") mapped.preferred_mode = v;
      else if (k === "activeCarpoolDriver") mapped.active_carpool_driver = v;
      else if (k === "availableSeats") mapped.available_seats = v;
      else if (k === "sustainableTrips") mapped.sustainable_trips = v;
      else if (k === "workingHours") mapped.working_hours = v;
      else if (k === "commutePolicy") mapped.commute_policy = v;
      else if (k === "monthlyBudget") mapped.monthly_budget = v;
      else if (k === "transportOptions") mapped.transport_options = v;
      else if (k === "rewardRules") mapped.reward_rules = v;
      else if (k === "bestEmployeeCriteria") mapped.best_employee_criteria = v;
      else if (k === "totalEmployees") mapped.total_employees = v;
      else if (k === "eventId") mapped.event_id = v;
      else if (k === "eventType") mapped.event_type = v;
      else if (k === "statusCode") mapped.status_code = v;
      else if (k === "responseMessage") mapped.response_message = v;
      else if (k === "webhookUrl") mapped.webhook_url = v;
      else if (k === "userId") mapped.user_id = v;
      else if (k === "createdAt") mapped.created_at = v;
      else if (k === "updatedAt") mapped.updated_at = v;
      else if (k === "from") mapped.from_location = v;
      else if (k === "to") mapped.to_location = v;
      else mapped[k] = v;
    }
    return mapped;
  }

  private transformOut(row: any): any {
    if (!row) return null;
    return {
      _id: row.id,
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      role: row.role,
      companyId: row.company_id,
      preferences: row.preferences,
      greenPoints: row.green_points,
      totalTrips: row.total_trips,
      totalCO2Saved: Number(row.total_co2_saved || 0),
      totalMoneySaved: Number(row.total_money_saved || 0),
      ecoScore: row.eco_score,
      department: row.department,
      employeeCode: row.employee_code,
      employeeId: row.employee_id,
      employeeName: row.employee_name,
      homeLocation: row.home_location,
      officeLocation: row.office_location,
      from: row.from_location,
      to: row.to_location,
      fromLocation: row.from_location,
      toLocation: row.to_location,
      fromLocationId: row.from_location_id,
      toLocationId: row.to_location_id,
      mode: row.mode,
      cost: Number(row.cost || 0),
      distanceKm: Number(row.distance_km || 0),
      distance: Number(row.distance_km || 0),
      durationMinutes: row.duration_minutes,
      time: row.duration_minutes,
      estimatedCo2Kg: Number(row.estimated_co2_kg || 0),
      co2: Number(row.estimated_co2_kg || 0),
      co2Saved: Number(row.co2_saved || 0),
      moneySaved: Number(row.money_saved || 0),
      points: row.points,
      amount: Number(row.amount || 0),
      reason: row.reason,
      status: row.status,
      date: row.date,
      workingHours: row.working_hours,
      commutePolicy: row.commute_policy,
      monthlyBudget: Number(row.monthly_budget || 0),
      transportOptions: row.transport_options,
      rewardRules: row.reward_rules,
      bestEmployeeCriteria: row.best_employee_criteria,
      totalEmployees: row.total_employees,
      domain: row.domain,
      address: row.address,
      location: row.location,
      eventId: row.event_id,
      eventType: row.event_type,
      statusCode: row.status_code,
      responseMessage: row.response_message,
      payload: row.payload,
      webhookUrl: row.webhook_url,
      userId: row.user_id,
      origin: row.origin,
      destination: row.destination,
      url: row.url,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async findOne(query: any = {}) {
    let q = this.supabase.from(this.tableName).select("*");
    if (query.email) q = q.eq("email", query.email);
    if (query.id) q = q.eq("id", query.id);
    if (query._id) q = q.eq("id", query._id);
    if (query.companyId) q = q.eq("company_id", query.companyId);
    if (query.userId) q = q.eq("user_id", query.userId);

    const { data, error } = await q.limit(1).maybeSingle();
    if (error) {
      console.error(`Supabase findOne error in ${this.tableName}:`, error.message);
      return null;
    }
    return this.transformOut(data);
  }

  find(query: any = {}) {
    let q = this.supabase.from(this.tableName).select("*");
    if (query.companyId) q = q.eq("company_id", query.companyId);
    if (query.userId) q = q.eq("user_id", query.userId);
    if (query.email) q = q.eq("email", query.email);

    return {
      sort: (sortObj: any) => {
        const field = Object.keys(sortObj)[0];
        const asc = sortObj[field] === 1;
        const mappedField = field === "createdAt" ? "created_at" : field === "date" ? "date" : "created_at";
        q = q.order(mappedField, { ascending: asc });
        return {
          limit: (n: number) => ({
            toArray: async () => {
              const { data } = await q.limit(n);
              return (data || []).map((row) => this.transformOut(row));
            },
          }),
          toArray: async () => {
            const { data } = await q;
            return (data || []).map((row) => this.transformOut(row));
          },
        };
      },
      limit: (n: number) => ({
        toArray: async () => {
          const { data } = await q.limit(n);
          return (data || []).map((row) => this.transformOut(row));
        },
      }),
      toArray: async () => {
        const { data, error } = await q;
        if (error) {
          console.error(`Supabase find error in ${this.tableName}:`, error.message);
          return [];
        }
        return (data || []).map((row) => this.transformOut(row));
      },
    };
  }

  async insertOne(doc: any) {
    const row = this.transformIn(doc);
    const { data, error } = await this.supabase.from(this.tableName).upsert(row).select().single();
    if (error) {
      console.error(`Supabase insertOne error in ${this.tableName}:`, error.message);
      throw error;
    }
    return { insertedId: row.id, acknowledged: true };
  }

  async insertMany(docs: any[]) {
    const rows = docs.map((d) => this.transformIn(d));
    const { data, error } = await this.supabase.from(this.tableName).upsert(rows);
    if (error) {
      console.error(`Supabase insertMany error in ${this.tableName}:`, error.message);
      throw error;
    }
    return { insertedCount: rows.length, acknowledged: true };
  }

  async updateOne(query: any, update: any) {
    const id = query.id || query._id;
    const email = query.email;

    const rowUpdate = this.transformIn(update.$set || update);
    delete rowUpdate.id;

    let q = this.supabase.from(this.tableName).update(rowUpdate);
    if (id) q = q.eq("id", id);
    else if (email) q = q.eq("email", email);
    else return { modifiedCount: 0 };

    const { error } = await q;
    if (error) {
      console.error(`Supabase updateOne error in ${this.tableName}:`, error.message);
    }
    return { modifiedCount: error ? 0 : 1, acknowledged: !error };
  }

  async deleteMany(query: any = {}) {
    let q = this.supabase.from(this.tableName).delete();
    if (query.companyId) q = q.eq("company_id", query.companyId);
    else q = q.neq("id", "___dummy_filter_to_delete_all___"); // Supabase requires a filter for mass delete

    const { error } = await q;
    return { acknowledged: !error };
  }

  async countDocuments(query: any = {}) {
    let q = this.supabase.from(this.tableName).select("*", { count: "exact", head: true });
    if (query.companyId) q = q.eq("company_id", query.companyId);
    const { count } = await q;
    return count || 0;
  }
}
