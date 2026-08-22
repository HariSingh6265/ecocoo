// ─── Demo Data for EcoCommute ───
// Realistic seeded data for Indore locations, users, trips, companies, employees

import { INDORE_LOCATIONS } from "@/lib/config";
import type { User, Company, Employee, Trip, CarpoolMatch, Reward } from "@/types";

// ─── Demo Users ───
export const DEMO_USERS: Omit<User, "_id">[] = [
  {
    name: "Hari Singh",
    email: "demo@ecocommute.in",
    password: "$2a$10$XQxBj5Kz1Z5J5J5J5J5J5OdummyhashfordemouserX",
    role: "user",
    preferences: { weightProfile: "balanced" },
    greenPoints: 450,
    totalTrips: 34,
    totalCO2Saved: 12.8,
    totalMoneySaved: 2340,
    createdAt: "2026-07-15T10:00:00Z",
  },
  {
    name: "Meera Joshi",
    email: "meera@ecocommute.in",
    password: "$2a$10$XQxBj5Kz1Z5J5J5J5J5J5OdummyhashfordemouserY",
    role: "user",
    preferences: { weightProfile: "eco" },
    greenPoints: 720,
    totalTrips: 52,
    totalCO2Saved: 21.5,
    totalMoneySaved: 3800,
    createdAt: "2026-07-10T10:00:00Z",
  },
  {
    name: "Arjun Malhotra",
    email: "arjun@ecocommute.in",
    password: "$2a$10$XQxBj5Kz1Z5J5J5J5J5J5OdummyhashfordemouserZ",
    role: "user",
    preferences: { weightProfile: "cost" },
    greenPoints: 280,
    totalTrips: 18,
    totalCO2Saved: 6.2,
    totalMoneySaved: 1560,
    createdAt: "2026-08-01T10:00:00Z",
  },
];

// ─── Demo Company ───
export const DEMO_COMPANY: Omit<Company, "_id"> = {
  name: "GreenTech Solutions",
  email: "admin@greentech.in",
  password: "$2a$10$XQxBj5Kz1Z5J5J5J5J5J5OdummyhashforcompanyA",
  location: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
  workingHours: { start: "09:00", end: "18:00" },
  commutePolicy: "Encourage public transport and carpooling. Monthly rewards for sustainable commuters.",
  monthlyBudget: 50000,
  transportOptions: ["bus", "carpool", "cycling", "cab"],
  rewardRules: "Top 3 eco-score employees get ₹2000 bonus each month",
  bestEmployeeCriteria: "Highest Eco Score + Most sustainable trips",
  createdAt: "2026-07-01T10:00:00Z",
};

// ─── Demo Employees ───
export const DEMO_EMPLOYEES: Omit<Employee, "_id">[] = [
  {
    userId: "", companyId: "", employeeCode: "GT001",
    name: "Rahul Verma", email: "rahul@greentech.in",
    homeLocation: { name: "Palasia", lat: 22.7236, lng: 75.8824 },
    officeLocation: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    arrivalTime: "09:00", departureTime: "18:00", preferredMode: "bus",
    greenPoints: 380, ecoScore: 87, totalTrips: 28, sustainableTrips: 24,
    totalCO2Saved: 9.8, totalMoneySaved: 1890,
  },
  {
    userId: "", companyId: "", employeeCode: "GT002",
    name: "Sneha Gupta", email: "sneha@greentech.in",
    homeLocation: { name: "Sapna Sangeeta", lat: 22.7301, lng: 75.8741 },
    officeLocation: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    arrivalTime: "09:30", departureTime: "18:30", preferredMode: "cycling",
    greenPoints: 620, ecoScore: 94, totalTrips: 30, sustainableTrips: 29,
    totalCO2Saved: 14.2, totalMoneySaved: 2800,
  },
  {
    userId: "", companyId: "", employeeCode: "GT003",
    name: "Vikram Singh", email: "vikram@greentech.in",
    homeLocation: { name: "Bhawarkua", lat: 22.7284, lng: 75.8669 },
    officeLocation: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    arrivalTime: "09:00", departureTime: "18:00", preferredMode: "carpool",
    greenPoints: 440, ecoScore: 82, totalTrips: 25, sustainableTrips: 20,
    totalCO2Saved: 8.5, totalMoneySaved: 1650,
  },
  {
    userId: "", companyId: "", employeeCode: "GT004",
    name: "Priya Patel", email: "priya@greentech.in",
    homeLocation: { name: "Rajwada", lat: 22.7196, lng: 75.8577 },
    officeLocation: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    arrivalTime: "09:00", departureTime: "18:00", preferredMode: "bus",
    greenPoints: 350, ecoScore: 79, totalTrips: 22, sustainableTrips: 17,
    totalCO2Saved: 7.1, totalMoneySaved: 1420,
  },
  {
    userId: "", companyId: "", employeeCode: "GT005",
    name: "Amit Kashyap", email: "amit@greentech.in",
    homeLocation: { name: "Rau", lat: 22.6644, lng: 75.8613 },
    officeLocation: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    arrivalTime: "08:30", departureTime: "17:30", preferredMode: "cab",
    greenPoints: 120, ecoScore: 45, totalTrips: 20, sustainableTrips: 5,
    totalCO2Saved: 2.1, totalMoneySaved: 320,
  },
  {
    userId: "", companyId: "", employeeCode: "GT006",
    name: "Kavita Sharma", email: "kavita@greentech.in",
    homeLocation: { name: "AB Road", lat: 22.7019, lng: 75.8574 },
    officeLocation: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    arrivalTime: "09:00", departureTime: "18:00", preferredMode: "bus",
    greenPoints: 410, ecoScore: 85, totalTrips: 26, sustainableTrips: 22,
    totalCO2Saved: 10.3, totalMoneySaved: 2100,
  },
  {
    userId: "", companyId: "", employeeCode: "GT007",
    name: "Deepak Agarwal", email: "deepak@greentech.in",
    homeLocation: { name: "MR 10", lat: 22.7628, lng: 75.9090 },
    officeLocation: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    arrivalTime: "09:15", departureTime: "18:15", preferredMode: "personal",
    greenPoints: 90, ecoScore: 38, totalTrips: 24, sustainableTrips: 3,
    totalCO2Saved: 1.2, totalMoneySaved: 180,
  },
  {
    userId: "", companyId: "", employeeCode: "GT008",
    name: "Nisha Tiwari", email: "nisha@greentech.in",
    homeLocation: { name: "Treasure Island Mall", lat: 22.7238, lng: 75.8892 },
    officeLocation: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    arrivalTime: "09:00", departureTime: "18:00", preferredMode: "cycling",
    greenPoints: 550, ecoScore: 91, totalTrips: 27, sustainableTrips: 26,
    totalCO2Saved: 12.8, totalMoneySaved: 2450,
  },
];

// ─── Generate Demo Trips ───
function generateDemoTrips(): Omit<Trip, "_id">[] {
  const trips: Omit<Trip, "_id">[] = [];
  const modes = ["bus", "cab", "personal", "carpool", "cycling", "walking"];
  const now = new Date();

  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date(now);
    date.setDate(date.getDate() - dayOffset);
    const dateStr = date.toISOString().split("T")[0];

    // 2-4 trips per day
    const tripsPerDay = 2 + Math.floor(Math.random() * 3);
    for (let t = 0; t < tripsPerDay; t++) {
      const fromIdx = Math.floor(Math.random() * INDORE_LOCATIONS.length);
      let toIdx = Math.floor(Math.random() * INDORE_LOCATIONS.length);
      if (toIdx === fromIdx) toIdx = (toIdx + 1) % INDORE_LOCATIONS.length;

      const from = INDORE_LOCATIONS[fromIdx];
      const to = INDORE_LOCATIONS[toIdx];
      const mode = modes[Math.floor(Math.random() * modes.length)];
      const distance = 3 + Math.random() * 12;
      const isSustainable = ["bus", "carpool", "cycling", "walking"].includes(mode);

      trips.push({
        userId: "demo-user-1",
        from: { name: from.name, lat: from.lat, lng: from.lng },
        to: { name: to.name, lat: to.lat, lng: to.lng },
        mode,
        cost: mode === "cycling" || mode === "walking" ? 0 : 10 + Math.random() * 150,
        distance: Math.round(distance * 10) / 10,
        time: Math.round((distance / (15 + Math.random() * 15)) * 60),
        co2: mode === "cycling" || mode === "walking" ? 0 : Math.round(distance * 0.04 * 1000) / 1000 + Math.random() * 1.5,
        ecoScore: isSustainable ? 70 + Math.floor(Math.random() * 30) : 20 + Math.floor(Math.random() * 40),
        moneySaved: isSustainable ? Math.round(20 + Math.random() * 130) : 0,
        co2Saved: isSustainable ? Math.round((0.5 + Math.random() * 1.5) * 100) / 100 : 0,
        passengers: 1 + Math.floor(Math.random() * 3),
        status: "completed",
        date: dateStr,
        createdAt: date.toISOString(),
      });
    }
  }

  return trips;
}

export const DEMO_TRIPS = generateDemoTrips();

// ─── Demo Dashboard Stats ───
export function getDemoDashboardStats() {
  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const todayTrips = DEMO_TRIPS.filter((t) => t.date === today);
  const weekTrips = DEMO_TRIPS.filter((t) => t.date >= weekAgo);

  return {
    todayTrips: todayTrips.length || 2,
    weekTrips: weekTrips.length || 12,
    monthTrips: DEMO_TRIPS.length,
    totalCO2Saved: 12.8,
    totalMoneySaved: 2340,
    ecoScore: 82,
    greenPoints: 450,
    sustainablePercentage: 73,
    recentTrips: DEMO_TRIPS.slice(0, 5),
  };
}

// ─── Demo Company Dashboard Stats ───
export function getDemoCompanyStats() {
  return {
    totalEmployees: DEMO_EMPLOYEES.length,
    todayTrips: 14,
    co2SavedMonth: 76.4,
    moneySavedMonth: 14820,
    carpoolRate: 28,
    publicTransportUsage: 42,
    sustainablePercentage: 68,
    weeklyTrend: [
      { week: "Week 1", co2Saved: 18.2, trips: 42 },
      { week: "Week 2", co2Saved: 21.5, trips: 48 },
      { week: "Week 3", co2Saved: 19.8, trips: 45 },
      { week: "Week 4", co2Saved: 16.9, trips: 38 },
    ],
    monthlyTrend: [
      { month: "May", co2Saved: 52.3, moneySaved: 9800 },
      { month: "Jun", co2Saved: 61.8, moneySaved: 11200 },
      { month: "Jul", co2Saved: 68.5, moneySaved: 13400 },
      { month: "Aug", co2Saved: 76.4, moneySaved: 14820 },
    ],
    topEmployees: DEMO_EMPLOYEES
      .sort((a, b) => b.ecoScore - a.ecoScore)
      .slice(0, 5)
      .map((e) => ({
        name: e.name,
        ecoScore: e.ecoScore,
        greenPoints: e.greenPoints,
        trips: e.totalTrips,
      })),
    modeDistribution: [
      { mode: "bus", count: 42, percentage: 35 },
      { mode: "carpool", count: 28, percentage: 23 },
      { mode: "cycling", count: 18, percentage: 15 },
      { mode: "personal", count: 14, percentage: 12 },
      { mode: "cab", count: 10, percentage: 8 },
      { mode: "walking", count: 8, percentage: 7 },
    ],
  };
}
