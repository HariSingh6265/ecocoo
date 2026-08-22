const { createClient } = require("@supabase/supabase-js");
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase environment variables missing in .env.");
  console.error("Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const DEMO_USERS = [
  {
    id: "demo-user-1",
    email: "demo@ecocommute.in",
    name: "Hari Singh",
    role: "user",
    green_points: 450,
    total_trips: 34,
    total_co2_saved: 12.8,
    total_money_saved: 2340,
    eco_score: 82,
    preferences: { weightProfile: "balanced", preferredTransport: "bus" },
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-user-2",
    email: "meera@ecocommute.in",
    name: "Meera Joshi",
    role: "user",
    green_points: 720,
    total_trips: 52,
    total_co2_saved: 28.4,
    total_money_saved: 4120,
    eco_score: 92,
    preferences: { weightProfile: "eco", preferredTransport: "cycling" },
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-user-3",
    email: "arjun@ecocommute.in",
    name: "Arjun Malhotra",
    role: "user",
    green_points: 280,
    total_trips: 18,
    total_co2_saved: 6.2,
    total_money_saved: 1100,
    eco_score: 74,
    preferences: { weightProfile: "cost", preferredTransport: "bus" },
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-company-user",
    email: "admin@greentech.in",
    name: "Vikram Malhotra",
    role: "company",
    company_id: "demo-company-1",
    green_points: 0,
    total_trips: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-employee-1",
    email: "rahul@greentech.in",
    name: "Rahul Verma",
    role: "employee",
    company_id: "demo-company-1",
    green_points: 520,
    total_trips: 42,
    total_co2_saved: 18.6,
    total_money_saved: 3200,
    eco_score: 88,
    created_at: new Date().toISOString(),
  },
];

const DEMO_COMPANY = {
  id: "demo-company-1",
  name: "GreenTech Solutions Indore",
  domain: "greentech.in",
  industry: "IT & Software",
  total_employees: 256,
  address: "Crystal IT Park, Ring Road, Indore, MP 452001",
  email: "admin@greentech.in",
  monthly_budget: 50000,
  commute_policy: "Encourage public transit and carpooling.",
  transport_options: ["bus", "carpool", "cycling"],
  reward_rules: "Monthly top eco performers reward",
  best_employee_criteria: "Highest Eco Score",
  location: { name: "Crystal IT Park", lat: 22.6868, lng: 75.8698 },
  working_hours: { start: "09:00", end: "18:00" },
  created_at: new Date().toISOString(),
};

const DEMO_EMPLOYEES = [
  {
    id: "emp-1",
    employee_code: "GT001",
    name: "Rahul Verma",
    email: "rahul@greentech.in",
    company_id: "demo-company-1",
    department: "Engineering",
    role: "Senior Full-Stack Engineer",
    home_location: { name: "Vijay Nagar, Indore", lat: 22.7533, lng: 75.8937 },
    office_location: { name: "Crystal IT Park, Indore", lat: 22.6868, lng: 75.8698 },
    preferred_mode: "carpool",
    eco_score: 88,
    green_points: 520,
    total_trips: 42,
    total_co2_saved: 18.6,
    total_money_saved: 3200,
    active_carpool_driver: true,
    available_seats: 2,
    departure_time: "08:45 AM",
    created_at: new Date().toISOString(),
  },
  {
    id: "emp-2",
    employee_code: "GT002",
    name: "Sneha Gupta",
    email: "sneha@greentech.in",
    company_id: "demo-company-1",
    department: "Product Design",
    role: "Lead UX Designer",
    home_location: { name: "Palasia, Indore", lat: 22.7244, lng: 75.8839 },
    office_location: { name: "Crystal IT Park, Indore", lat: 22.6868, lng: 75.8698 },
    preferred_mode: "cycling",
    eco_score: 94,
    green_points: 680,
    total_trips: 48,
    total_co2_saved: 24.2,
    total_money_saved: 4100,
    active_carpool_driver: false,
    available_seats: 0,
    departure_time: "09:00 AM",
    created_at: new Date().toISOString(),
  },
  {
    id: "emp-3",
    employee_code: "GT003",
    name: "Amit Sharma",
    email: "amit@greentech.in",
    company_id: "demo-company-1",
    department: "Marketing",
    role: "Growth Lead",
    home_location: { name: "Annapurna, Indore", lat: 22.6934, lng: 75.8361 },
    office_location: { name: "Crystal IT Park, Indore", lat: 22.6868, lng: 75.8698 },
    preferred_mode: "bus",
    eco_score: 82,
    green_points: 390,
    total_trips: 36,
    total_co2_saved: 14.8,
    total_money_saved: 2800,
    active_carpool_driver: false,
    available_seats: 0,
    departure_time: "09:15 AM",
    created_at: new Date().toISOString(),
  },
];

async function seedSupabase() {
  console.log("Connecting to Supabase PostgreSQL at:", supabaseUrl);
  try {
    // 1. Insert Company
    const { error: compErr } = await supabase.from("companies").upsert(DEMO_COMPANY);
    if (compErr) console.warn("Company upsert warning:", compErr.message);
    else console.log("✅ Seeded 1 Company (GreenTech Solutions Indore)");

    // 2. Hash passwords & insert Users
    const usersWithHash = await Promise.all(
      DEMO_USERS.map(async (u) => {
        const rawPass = u.role === "company" ? "company1234" : u.role === "employee" ? "employee1234" : "demo1234";
        const password = await bcrypt.hash(rawPass, 10);
        return { ...u, password };
      })
    );

    const { error: userErr } = await supabase.from("users").upsert(usersWithHash);
    if (userErr) console.warn("Users upsert warning:", userErr.message);
    else console.log(`✅ Seeded ${usersWithHash.length} Users into Supabase`);

    // 3. Insert Employees
    const { error: empErr } = await supabase.from("employees").upsert(DEMO_EMPLOYEES);
    if (empErr) console.warn("Employees upsert warning:", empErr.message);
    else console.log(`✅ Seeded ${DEMO_EMPLOYEES.length} Employees into Supabase`);

    console.log("\n🎉 Supabase database is now seeded and ready!");
  } catch (err) {
    console.error("❌ Supabase seeding error:", err.message);
  }
}

seedSupabase();
