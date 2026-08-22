// ─── Dual MongoDB / In-Memory Mock Store ───
// High-performance serverless connection pooling for Vercel & MongoDB Atlas.

import { MongoClient, Db } from "mongodb";
import { DEMO_USERS, DEMO_COMPANY, DEMO_EMPLOYEES, DEMO_TRIPS } from "@/lib/demo-data";
import { generateId } from "@/lib/utils";

const uri = process.env.MONGODB_URI;

const options = {
  maxPoolSize: 10,
  minPoolSize: 0,
  connectTimeoutMS: 20000,
  serverSelectionTimeoutMS: 20000,
  maxIdleTimeMS: 30000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode (Vercel Serverless), cache the client promise globally on the container
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromiseProd?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromiseProd) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromiseProd = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromiseProd;
  }
}

// ─── In-Memory Mock Database Store (Used only if no MONGODB_URI is provided) ───
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
    const item = this.items.find((i) => this.matches(i, query));
    return item ? { ...item } : null;
  }

  async insertOne(doc: any) {
    const newDoc = {
      _id: doc._id || doc.id || `mock_${this.name}_${generateId()}`,
      ...doc,
    };
    this.items.push(newDoc);
    return { insertedId: newDoc._id, acknowledged: true };
  }

  async insertMany(docs: any[]) {
    const newDocs = docs.map((doc) => ({
      _id: doc._id || doc.id || `mock_${this.name}_${generateId()}`,
      ...doc,
    }));
    this.items.push(...newDocs);
    return { insertedCount: newDocs.length, acknowledged: true };
  }

  async updateOne(query: any, update: any) {
    const index = this.items.findIndex((i) => this.matches(i, query));
    if (index !== -1) {
      if (update.$set) {
        this.items[index] = { ...this.items[index], ...update.$set };
      }
      if (update.$inc) {
        for (const [key, val] of Object.entries(update.$inc)) {
          this.items[index][key] = (this.items[index][key] || 0) + (val as number);
        }
      }
      return { modifiedCount: 1, acknowledged: true };
    }
    return { modifiedCount: 0, acknowledged: true };
  }

  async updateMany(query: any, update: any) {
    let count = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.matches(this.items[i], query)) {
        if (update.$set) {
          this.items[i] = { ...this.items[i], ...update.$set };
        }
        if (update.$inc) {
          for (const [key, val] of Object.entries(update.$inc)) {
            this.items[i][key] = (this.items[i][key] || 0) + (val as number);
          }
        }
        count++;
      }
    }
    return { modifiedCount: count, acknowledged: true };
  }

  async deleteMany(query: any = {}) {
    const initial = this.items.length;
    if (Object.keys(query).length === 0) {
      this.items = [];
    } else {
      this.items = this.items.filter((i) => !this.matches(i, query));
    }
    return { deletedCount: initial - this.items.length, acknowledged: true };
  }

  async countDocuments(query: any = {}) {
    return this.items.filter((i) => this.matches(i, query)).length;
  }
}

// In-Memory Demo Data Store
const mockDb = {
  users: new MockCollection("users", DEMO_USERS),
  companies: new MockCollection("companies", DEMO_COMPANY ? [DEMO_COMPANY] : []),
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
  ]),
};

export async function getDb(): Promise<Db | null> {
  const currentUri = process.env.MONGODB_URI || uri;
  if (!currentUri) return null;

  try {
    if (!clientPromise) {
      const activeClient = new MongoClient(currentUri, options);
      clientPromise = activeClient.connect();
    }
    const activeClient = await clientPromise;
    return activeClient.db();
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error);
    // Reset promise so next request attempts a fresh connection
    clientPromise = null;
    return null;
  }
}

export async function getCollection(name: string): Promise<any> {
  const currentUri = process.env.MONGODB_URI || uri;
  if (currentUri) {
    const realDb = await getDb();
    if (realDb) {
      return realDb.collection(name);
    }
  }

  // Fallback to in-memory store if offline
  if (!(name in mockDb)) {
    (mockDb as any)[name] = new MockCollection(name);
  }
  return (mockDb as any)[name];
}
