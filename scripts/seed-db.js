const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

// Load .env file
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let val = match[2] || "";
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[match[1]] = val;
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in .env");
  process.exit(1);
}

const DEMO_USERS = [
  {
    id: "demo-user-1",
    email: "demo@ecocommute.in",
    name: "Hari Singh",
    role: "user",
    greenPoints: 450,
    totalTrips: 34,
    totalCO2Saved: 12.8,
    totalMoneySaved: 2340,
    ecoScore: 82,
    preferences: { weightProfile: "balanced", preferredTransport: "bus" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-user-2",
    email: "meera@ecocommute.in",
    name: "Meera Joshi",
    role: "user",
    greenPoints: 720,
    totalTrips: 52,
    totalCO2Saved: 28.4,
    totalMoneySaved: 4120,
    ecoScore: 92,
    preferences: { weightProfile: "eco", preferredTransport: "cycling" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-user-3",
    email: "arjun@ecocommute.in",
    name: "Arjun Malhotra",
    role: "user",
    greenPoints: 280,
    totalTrips: 18,
    totalCO2Saved: 6.2,
    totalMoneySaved: 1100,
    ecoScore: 74,
    preferences: { weightProfile: "cost", preferredTransport: "bus" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-company-user",
    email: "admin@greentech.in",
    name: "Vikram Malhotra",
    role: "company",
    companyId: "demo-company-1",
    greenPoints: 0,
    totalTrips: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-employee-1",
    email: "rahul@greentech.in",
    name: "Rahul Verma",
    role: "employee",
    companyId: "demo-company-1",
    employeeCode: "GT001",
    greenPoints: 520,
    totalTrips: 42,
    totalCO2Saved: 18.6,
    totalMoneySaved: 3200,
    ecoScore: 88,
    createdAt: new Date().toISOString(),
  },
];

const DEMO_COMPANY = {
  id: "demo-company-1",
  name: "GreenTech Solutions Indore",
  domain: "greentech.in",
  industry: "IT & Software",
  totalEmployees: 256,
  address: "Crystal IT Park, Ring Road, Indore, MP 452001",
  adminEmail: "admin@greentech.in",
  monthlyBudget: 50000,
  carpoolIncentivePerKm: 2.0,
  publicTransitSubsidyPercent: 50,
  evChargingDiscountPercent: 75,
  minEcoScoreForReward: 75,
  rewardPerPointINR: 1.0,
  createdAt: new Date().toISOString(),
};

const DEMO_EMPLOYEES = [
  {
    id: "emp-1",
    employeeCode: "GT001",
    name: "Rahul Verma",
    email: "rahul@greentech.in",
    companyId: "demo-company-1",
    department: "Engineering",
    role: "Senior Full-Stack Engineer",
    homeLocation: { name: "Vijay Nagar, Indore", lat: 22.7533, lng: 75.8937 },
    workLocation: { name: "Crystal IT Park, Indore", lat: 22.6868, lng: 75.8698 },
    preferredTransport: "carpool",
    ecoScore: 88,
    greenPoints: 520,
    totalTrips: 42,
    co2SavedKg: 18.6,
    moneySavedINR: 3200,
    activeCarpoolDriver: true,
    availableSeats: 2,
    departureTime: "08:45 AM",
    createdAt: new Date().toISOString(),
  },
  {
    id: "emp-2",
    employeeCode: "GT002",
    name: "Sneha Gupta",
    email: "sneha@greentech.in",
    companyId: "demo-company-1",
    department: "Product Design",
    role: "Lead UX Designer",
    homeLocation: { name: "Palasia, Indore", lat: 22.7244, lng: 75.8839 },
    workLocation: { name: "Crystal IT Park, Indore", lat: 22.6868, lng: 75.8698 },
    preferredTransport: "cycling",
    ecoScore: 94,
    greenPoints: 680,
    totalTrips: 48,
    co2SavedKg: 24.2,
    moneySavedINR: 4100,
    activeCarpoolDriver: false,
    availableSeats: 0,
    departureTime: "09:00 AM",
    createdAt: new Date().toISOString(),
  },
  {
    id: "emp-3",
    employeeCode: "GT003",
    name: "Amit Sharma",
    email: "amit@greentech.in",
    companyId: "demo-company-1",
    department: "Marketing",
    role: "Growth Lead",
    homeLocation: { name: "Annapurna, Indore", lat: 22.6934, lng: 75.8361 },
    workLocation: { name: "Crystal IT Park, Indore", lat: 22.6868, lng: 75.8698 },
    preferredTransport: "bus",
    ecoScore: 82,
    greenPoints: 390,
    totalTrips: 36,
    co2SavedKg: 14.8,
    moneySavedINR: 2800,
    activeCarpoolDriver: false,
    availableSeats: 0,
    departureTime: "09:15 AM",
    createdAt: new Date().toISOString(),
  },
];

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    console.log(" Connected to MongoDB Atlas!");
    const db = client.db("ecocommute");

    const usersCol = db.collection("users");
    const companiesCol = db.collection("companies");
    const employeesCol = db.collection("employees");

    console.log("Seeding data into MongoDB Atlas...");

    // Insert Users with bcrypt hashed passwords
    const usersToInsert = await Promise.all(
      DEMO_USERS.map(async (u) => {
        const rawPass = u.role === "company" ? "company1234" : u.role === "employee" ? "employee1234" : "demo1234";
        const password = await bcrypt.hash(rawPass, 10);
        return { ...u, password };
      })
    );

    await usersCol.deleteMany({});
    await usersCol.insertMany(usersToInsert);
    console.log(` Inserted ${usersToInsert.length} users into MongoDB Atlas 'users' collection`);

    await companiesCol.deleteMany({});
    await companiesCol.insertOne(DEMO_COMPANY);
    console.log(` Inserted company '${DEMO_COMPANY.name}' into 'companies' collection`);

    await employeesCol.deleteMany({});
    await employeesCol.insertMany(DEMO_EMPLOYEES);
    console.log(` Inserted ${DEMO_EMPLOYEES.length} employees into 'employees' collection`);

    console.log("\n MongoDB Atlas Database is now seeded and ready!");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await client.close();
  }
}

seed();
