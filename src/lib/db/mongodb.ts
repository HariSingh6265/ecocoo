// ─── Dual MongoDB / In-Memory Mock Store ───
// Guarantees zero crashes and 100% demo uptime whether MongoDB Atlas is online or offline.

import { MongoClient, Db } from "mongodb";
import { DEMO_USERS, DEMO_COMPANY, DEMO_EMPLOYEES, DEMO_TRIPS } from "@/lib/demo-data";
import { generateId } from "@/lib/utils";

const MONGODB_URI = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let db: Db | null = null;

// ─── In-Memory Mock Database Store ───
class MockCollection {
  name: string;
  items: any[];

  constructor(name: string, initialData: any[] = []) {
    this.name = name;
    this.items = initialData.map((item, index) => ({
      _id: item._id || item.id || `mock_${name}_${index}_${generateId()}`,
      ...item,
    }));
  }

  private matches(item: any, query: any): boolean {
    if (!query || Object.keys(query).length === 0) return true;
    for (const key of Object.keys(query)) {
      if (key === "$or" && Array.isArray(query.$or)) {
        const anyMatch = query.$or.some((subQ: any) => this.matches(item, subQ));
        if (!anyMatch) return false;
        continue;
      }
      const expected = query[key];
      if (typeof expected === "object" && expected !== null) {
        if ("$exists" in expected) {
          const exists = key in item && item[key] !== undefined;
          if (exists !== expected.$exists) return false;
        } else if ("$in" in expected && Array.isArray(expected.$in)) {
          if (!expected.$in.includes(item[key])) return false;
        } else if ("$gte" in expected && item[key] < expected.$gte) {
          return false;
        } else if ("$lte" in expected && item[key] > expected.$lte) {
          return false;
        }
      } else {
        if (key === "id" || key === "_id") {
          if (item._id !== expected && item.id !== expected) return false;
        } else if (item[key] !== expected) {
          return false;
        }
      }
    }
    return true;
  }

  find(query: any = {}) {
    const filtered = this.items.filter((item) => this.matches(item, query));
    let result = [...filtered];

    return {
      sort: (sortObj: any) => {
        const key = Object.keys(sortObj)[0];
        const dir = sortObj[key];
        result.sort((a, b) => {
          if (a[key] < b[key]) return dir === -1 ? 1 : -1;
          if (a[key] > b[key]) return dir === -1 ? -1 : 1;
          return 0;
        });
        return {
          limit: (n: number) => ({
            toArray: async () => result.slice(0, n),
          }),
          toArray: async () => result,
        };
      },
      limit: (n: number) => ({
        toArray: async () => result.slice(0, n),
      }),
      toArray: async () => result,
    };
  }

  async findOne(query: any = {}) {
    const found = this.items.find((item) => this.matches(item, query));
    return found ? { ...found } : null;
  }

  async insertOne(doc: any) {
    const inserted = {
      _id: doc._id || doc.id || `doc_${generateId()}`,
      createdAt: doc.createdAt || new Date().toISOString(),
      ...doc,
    };
    this.items.unshift(inserted);
    return { insertedId: inserted._id, acknowledged: true };
  }

  async insertMany(docs: any[]) {
    const insertedDocs = docs.map((doc) => ({
      _id: doc._id || doc.id || `doc_${generateId()}`,
      createdAt: doc.createdAt || new Date().toISOString(),
      ...doc,
    }));
    this.items.unshift(...insertedDocs);
    return { insertedCount: docs.length, acknowledged: true };
  }

  async updateOne(query: any, update: any) {
    const index = this.items.findIndex((item) => this.matches(item, query));
    if (index !== -1) {
      if (update.$set) {
        this.items[index] = { ...this.items[index], ...update.$set };
      }
      if (update.$inc) {
        for (const k of Object.keys(update.$inc)) {
          this.items[index][k] = (this.items[index][k] || 0) + update.$inc[k];
        }
      }
      if (!update.$set && !update.$inc) {
        this.items[index] = { ...this.items[index], ...update };
      }
      return { modifiedCount: 1, matchedCount: 1, acknowledged: true };
    }
    return { modifiedCount: 0, matchedCount: 0, acknowledged: true };
  }

  async deleteMany(query: any = {}) {
    const initialLen = this.items.length;
    this.items = this.items.filter((item) => !this.matches(item, query));
    return { deletedCount: initialLen - this.items.length, acknowledged: true };
  }

  async countDocuments(query: any = {}) {
    return this.items.filter((item) => this.matches(item, query)).length;
  }
}

// Global in-memory mock store
const mockDb = {
  users: new MockCollection("users", DEMO_USERS),
  companies: new MockCollection("companies", [DEMO_COMPANY]),
  employees: new MockCollection("employees", DEMO_EMPLOYEES),
  trips: new MockCollection("trips", DEMO_TRIPS),
  rewards: new MockCollection("rewards", [
    {
      companyId: "demo-company-1",
      employeeId: "GT002",
      employeeName: "Sneha Gupta",
      points: 500,
      amount: 2000,
      reason: "Top Monthly Eco-Score (94/100)",
      status: "awarded",
      date: "2026-08-01",
    },
    {
      companyId: "demo-company-1",
      employeeId: "GT008",
      employeeName: "Nisha Tiwari",
      points: 400,
      amount: 1500,
      reason: "Most Sustainable Commute Trips (26 trips)",
      status: "awarded",
      date: "2026-08-01",
    },
  ]),
  automationEvents: new MockCollection("automationEvents", [
    {
      eventId: "evt_init_101",
      eventType: "commute.completed",
      companyId: "demo-company-1",
      employeeId: "GT002",
      status: "delivered",
      statusCode: 200,
      responseMessage: "viaSocket workflow triggered: HR green credits logged",
      payload: {
        eventType: "commute.completed",
        employeeId: "GT002",
        employeeName: "Sneha Gupta",
        transportMode: "cycling",
        cost: 0,
        co2Emitted: 0,
        co2Saved: 1.45,
        ecoScore: 95,
        greenPoints: 30,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      eventId: "evt_init_102",
      eventType: "reward.earned",
      companyId: "demo-company-1",
      employeeId: "GT001",
      status: "delivered",
      statusCode: 200,
      responseMessage: "viaSocket workflow triggered: Corporate Slack channel notification sent",
      payload: {
        eventType: "reward.earned",
        employeeId: "GT001",
        employeeName: "Rahul Verma",
        greenPoints: 50,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ]),
  parking: new MockCollection("parking", [
    {
      name: "Vijay Nagar Green Mobility Hub",
      location: "Vijay Nagar Square, Indore",
      totalSpots: 80,
      evChargingSpots: 20,
      carpoolReservedSpots: 30,
      availableSpots: 18,
      hourlyRate: 20,
      companyReserved: true,
    },
    {
      name: "Palasia EcoPark & Transit Hub",
      location: "Old Palasia, AB Road, Indore",
      totalSpots: 120,
      evChargingSpots: 35,
      carpoolReservedSpots: 40,
      availableSpots: 42,
      hourlyRate: 15,
      companyReserved: true,
    },
    {
      name: "MR-10 Metro & Corporate Hub",
      location: "MR 10 Junction, Indore",
      totalSpots: 150,
      evChargingSpots: 40,
      carpoolReservedSpots: 50,
      availableSpots: 64,
      hourlyRate: 15,
      companyReserved: true,
    },
  ]),
};

export async function getDb(): Promise<Db | null> {
  if (db) return db;
  const uri = process.env.MONGODB_URI || MONGODB_URI;
  if (!uri) return null;

  try {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
    await client.connect();
    db = client.db();
    return db;
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error);
    return null;
  }
}

export async function getCollection(name: string): Promise<any> {
  try {
    const realDb = await getDb();
    if (realDb) {
      return realDb.collection(name);
    }
  } catch (e) {
    // fallback to mock
  }

  if (!(name in mockDb)) {
    (mockDb as any)[name] = new MockCollection(name);
  }
  return (mockDb as any)[name];
}
