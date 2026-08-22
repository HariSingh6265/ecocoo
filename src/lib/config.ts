// ─── EcoCommute Centralized Configuration ───
// All emission factors, scoring weights, and thresholds in one place.

export const DEMO_MODE = true; // Enabled by default for deterministic hackathon demo

// ─── Emission Factors (kg CO2 per km per passenger) ───
export const EMISSION_FACTORS: Record<string, number> = {
  bus: 0.037,        // Public bus, shared
  cab: 0.192,        // Solo cab ride
  personal: 0.171,   // Personal car, solo
  carpool: 0.060,    // Personal car, 3 passengers avg
  cycling: 0.0,      // Zero emissions
  walking: 0.0,      // Zero emissions
};

// ─── Cost per km (INR) ───
export const COST_PER_KM: Record<string, number> = {
  bus: 1.5,
  cab: 14.0,
  personal: 7.5,      // fuel + maintenance
  carpool: 3.5,       // shared fuel cost
  cycling: 0.0,
  walking: 0.0,
};

// ─── Base fare (INR) ───
export const BASE_FARE: Record<string, number> = {
  bus: 10,
  cab: 50,
  personal: 0,
  carpool: 10,
  cycling: 0,
  walking: 0,
};

// ─── Average speed (km/h) ───
export const AVG_SPEED: Record<string, number> = {
  bus: 18,
  cab: 25,
  personal: 28,
  carpool: 26,
  cycling: 15,
  walking: 5,
};

// ─── Default capacity ───
export const CAPACITY: Record<string, number> = {
  bus: 40,
  cab: 4,
  personal: 5,
  carpool: 4,
  cycling: 1,
  walking: 1,
};

// ─── Scoring Weight Profiles ───
export type WeightProfile = "balanced" | "cost" | "eco" | "time" | "save-money" | "eco-friendly" | "save-time";

export const WEIGHT_PROFILES: Record<string, {
  cost: number;
  co2: number;
  time: number;
  distance: number;
  occupancy: number;
}> = {
  balanced:       { cost: 0.35, co2: 0.30, time: 0.20, distance: 0.10, occupancy: 0.05 },
  cost:           { cost: 0.55, co2: 0.20, time: 0.15, distance: 0.05, occupancy: 0.05 },
  "save-money":   { cost: 0.55, co2: 0.20, time: 0.15, distance: 0.05, occupancy: 0.05 },
  eco:            { cost: 0.20, co2: 0.55, time: 0.15, distance: 0.05, occupancy: 0.05 },
  "eco-friendly": { cost: 0.20, co2: 0.55, time: 0.15, distance: 0.05, occupancy: 0.05 },
  time:           { cost: 0.20, co2: 0.15, time: 0.55, distance: 0.05, occupancy: 0.05 },
  "save-time":    { cost: 0.20, co2: 0.15, time: 0.55, distance: 0.05, occupancy: 0.05 },
};

// ─── Eco Score Thresholds ───
export const ECO_SCORE_THRESHOLDS = {
  excellent: 90,
  good: 75,
  moderate: 50,
};

// ─── Carpool Matching Config ───
export const CARPOOL_CONFIG = {
  maxOriginDistanceKm: 2.0,        // Origins must be within 2km
  maxDestinationDistanceKm: 1.5,   // Destinations must be within 1.5km
  maxTimeToleranceMinutes: 30,     // Departure times within 30 min
  defaultSeats: 3,
};

// ─── Transport Modes ───
export const TRANSPORT_MODES = ["bus", "cab", "personal", "carpool", "cycling", "walking"] as const;
export type TransportMode = typeof TRANSPORT_MODES[number];

// ─── Indore Demo Locations ───
export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export const INDORE_LOCATIONS: Location[] = [
  { id: "vijay-nagar", name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
  { id: "palasia", name: "Palasia", lat: 22.7236, lng: 75.8824 },
  { id: "rajwada", name: "Rajwada", lat: 22.7196, lng: 75.8577 },
  { id: "bhawarkua", name: "Bhawarkua", lat: 22.7284, lng: 75.8669 },
  { id: "rau", name: "Rau", lat: 22.6644, lng: 75.8613 },
  { id: "ab-road", name: "AB Road", lat: 22.7019, lng: 75.8574 },
  { id: "airport", name: "Devi Ahilya Bai Holkar Airport", lat: 22.7216, lng: 75.8011 },
  { id: "sapna-sangeeta", name: "Sapna Sangeeta", lat: 22.7301, lng: 75.8741 },
  { id: "mr-10", name: "MR 10", lat: 22.7628, lng: 75.9090 },
  { id: "ti-mall", name: "Treasure Island Mall", lat: 22.7238, lng: 75.8892 },
  { id: "bapat-square", name: "Bapat Square", lat: 22.7195, lng: 75.8760 },
  { id: "gpo-indore", name: "GPO Indore", lat: 22.7175, lng: 75.8558 },
  { id: "geeta-bhawan", name: "Geeta Bhawan", lat: 22.7122, lng: 75.8700 },
];

// ─── Green Points Config ───
export const GREEN_POINTS = {
  busTrip: 15,
  carpoolTrip: 20,
  cyclingTrip: 30,
  walkingTrip: 25,
  cabTrip: 2,
  personalTrip: 0,
  dailyStreak: 10,
  weeklyGoal: 50,
};
