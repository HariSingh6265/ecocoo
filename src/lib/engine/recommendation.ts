import {
  EMISSION_FACTORS,
  COST_PER_KM,
  BASE_FARE,
  AVG_SPEED,
  CAPACITY,
  WEIGHT_PROFILES,
  INDORE_LOCATIONS,
  type TransportMode,
  type WeightProfile,
} from "@/lib/config";
import type { TransportOption, CommuteRequest, CommuteResult } from "@/types";
import { calculateEcoScore } from "./eco-score";
import { findCarpoolMatches } from "./carpool";
import { fetchGoogleDirections, RealRouteResult } from "@/lib/services/google-maps";

// ─── Haversine Distance (km) ───
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Road distance multiplier (straight line → road distance)
const ROAD_MULTIPLIER = 1.35;

export function resolveLocation(nameOrId: string): { id?: string; name: string; lat: number; lng: number } | null {
  if (!nameOrId) return null;
  const search = nameOrId.toLowerCase().trim();

  // Match by id
  const byId = INDORE_LOCATIONS.find((l) => l.id.toLowerCase() === search);
  if (byId) return byId;

  // Match by exact name
  const exact = INDORE_LOCATIONS.find((l) => l.name.toLowerCase() === search);
  if (exact) return exact;

  // Fuzzy match
  const fuzzy = INDORE_LOCATIONS.find(
    (l) =>
      l.name.toLowerCase().includes(search) ||
      search.includes(l.name.toLowerCase()) ||
      l.id.toLowerCase().includes(search)
  );
  return fuzzy || null;
}

// ─── Score and Rank Options ───
export function scoreOptions(
  estimates: {
    mode: TransportMode;
    cost: number;
    time: number;
    distance: number;
    co2: number;
    occupancy: number;
    realRoute?: RealRouteResult;
  }[],
  profile: WeightProfile = "balanced"
): TransportOption[] {
  if (estimates.length === 0) return [];

  const weights = WEIGHT_PROFILES[profile] || WEIGHT_PROFILES.balanced;

  // Find min/max for normalization
  const costs = estimates.map((e) => e.cost);
  const times = estimates.map((e) => e.time);
  const distances = estimates.map((e) => e.distance);
  const co2s = estimates.map((e) => e.co2);
  const occupancies = estimates.map((e) => e.occupancy);

  const minCost = Math.min(...costs), maxCost = Math.max(...costs);
  const minTime = Math.min(...times), maxTime = Math.max(...times);
  const minDist = Math.min(...distances), maxDist = Math.max(...distances);
  const minCO2 = Math.min(...co2s), maxCO2 = Math.max(...co2s);
  const minOcc = Math.min(...occupancies), maxOcc = Math.max(...occupancies);

  // Baseline: solo cab for calculating monetary & CO2 savings
  const cabEst = estimates.find((e) => e.mode === "cab") || { cost: Math.max(...costs), co2: Math.max(...co2s) };
  const baselineCost = cabEst.cost;
  const baselineCO2 = cabEst.co2;

  const normalize = (val: number, min: number, max: number) => (max === min ? 0 : (val - min) / (max - min));

  const scored = estimates.map((est) => {
    const nCost = 1 - normalize(est.cost, minCost, maxCost);
    const nTime = 1 - normalize(est.time, minTime, maxTime);
    const nDist = 1 - normalize(est.distance, minDist, maxDist);
    const nCO2 = 1 - normalize(est.co2, minCO2, maxCO2);
    const nOcc = normalize(est.occupancy, minOcc, maxOcc);

    const rawScore =
      weights.cost * nCost +
      weights.co2 * nCO2 +
      weights.time * nTime +
      weights.distance * nDist +
      weights.occupancy * nOcc;

    const score = Math.min(100, Math.max(10, Math.round(rawScore * 100)));
    const ecoScore = calculateEcoScore(est.mode, est.co2, est.distance, est.occupancy);

    const moneySaved = Math.max(0, baselineCost - est.cost);
    const co2Saved = Math.max(0, Math.round((baselineCO2 - est.co2) * 100) / 100);

    return {
      mode: est.mode,
      cost: est.cost,
      estimatedCost: est.cost,
      time: est.time,
      durationMinutes: est.time,
      distance: est.distance,
      distanceKm: est.distance,
      co2: est.co2,
      estimatedCo2Kg: est.co2,
      ecoScore,
      score,
      rank: 0,
      recommended: false,
      reason: "",
      moneySaved,
      co2Saved,
      occupancy: est.occupancy,
      trafficStatus: est.realRoute?.trafficStatus || "live_traffic",
      overviewPolyline: est.realRoute?.overviewPolyline,
      steps: est.realRoute?.steps,
      isRealTime: est.realRoute?.isRealTime ?? true,
    };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Assign ranks and recommendation reason
  scored.forEach((opt, idx) => {
    opt.rank = idx + 1;
    if (idx === 0) {
      opt.recommended = true;
      opt.reason = generateReason(opt, scored);
    }
  });

  return scored;
}

// ─── Generate Reason Explanation ───
function generateReason(best: TransportOption, all: TransportOption[]): string {
  const parts: string[] = [];

  if (best.moneySaved > 0) {
    parts.push(`You save ₹${best.moneySaved.toFixed(0)}`);
  }
  if (best.co2Saved > 0) {
    parts.push(`approximately ${best.co2Saved.toFixed(2)} kg CO₂ compared with a solo cab`);
  }
  if (best.mode === "bus") {
    parts.push("high-efficiency public transit with low per-person footprint");
  } else if (best.mode === "carpool") {
    parts.push("shared ride reduces per-person fuel expense and road congestion");
  } else if (best.mode === "cycling") {
    parts.push("zero carbon emissions and active health benefits");
  } else if (best.mode === "walking") {
    parts.push("100% clean footprint for short commute distance");
  }

  return parts.length > 0
    ? parts.join(" and ") + "."
    : "Highest rated option based on balanced cost, travel duration, and emission efficiency.";
}

// ─── Main Recommendation Entry Point ───
export async function getRealTimeRecommendation(request: CommuteRequest): Promise<CommuteResult> {
  const fromName = request.from;
  const toName = request.to;

  if (!fromName || !toName) {
    throw new Error("Both origin (from) and destination (to) are required.");
  }

  const fromLoc = request.fromLat && request.fromLng
    ? { name: fromName, lat: request.fromLat, lng: request.fromLng }
    : resolveLocation(fromName) || { name: fromName, lat: 22.7533, lng: 75.8937 };

  const toLoc = request.toLat && request.toLng
    ? { name: toName, lat: request.toLat, lng: request.toLng }
    : resolveLocation(toName) || { name: toName, lat: 22.7196, lng: 75.8577 };

  const passengers = request.passengers || 1;
  const modes: TransportMode[] = ["bus", "cab", "personal", "carpool", "cycling", "walking"];

  // Baseline theoretical road distance via coordinates
  const straightLine = haversineDistance(fromLoc.lat, fromLoc.lng, toLoc.lat, toLoc.lng);
  const fallbackRoadDistance = Math.max(1.2, Math.round(straightLine * ROAD_MULTIPLIER * 10) / 10);

  // 1. Fetch live routes for each mode concurrently
  const routePromises = modes.map(async (mode) => {
    let distance = fallbackRoadDistance;
    let time = Math.max(5, Math.round((distance / AVG_SPEED[mode]) * 60));
    let realRoute: RealRouteResult | undefined;

    try {
      const googleRes = await fetchGoogleDirections(
        { lat: fromLoc.lat, lng: fromLoc.lng },
        { lat: toLoc.lat, lng: toLoc.lng },
        mode
      );

      if (googleRes.success && googleRes.route) {
        distance = googleRes.route.distanceKm;
        time = googleRes.route.durationInTrafficMinutes || googleRes.route.durationMinutes;
        realRoute = googleRes.route;
      }
    } catch (e) {
      // Graceful fallback to precise mathematical coordinate distance
    }

    // Process through EcoCommute's Fare & Pricing Engine
    const cost = BASE_FARE[mode] + COST_PER_KM[mode] * distance;
    // Process through EcoCommute's CO2 Emission Calculator
    const co2 = EMISSION_FACTORS[mode] * distance;
    const occupancy = Math.min(passengers, CAPACITY[mode]) / CAPACITY[mode];

    return {
      mode,
      cost: Math.round(cost),
      time,
      distance,
      co2: Math.round(co2 * 100) / 100,
      occupancy: Math.round(occupancy * 100) / 100,
      realRoute,
    };
  });

  const resolvedEstimates = await Promise.all(routePromises);

  // 2. Apply user budget and time constraints
  let filtered = resolvedEstimates.filter((est) => {
    if (request.maxBudget && est.cost > request.maxBudget) return false;
    if (request.maxTime && est.time > request.maxTime) return false;
    if (est.mode === "walking" && est.distance > 5.5) return false;
    if (est.mode === "cycling" && est.distance > 18) return false;
    return true;
  });

  if (filtered.length === 0) filtered = resolvedEstimates;

  const priority = request.priority || request.weightProfile || "balanced";
  const options = scoreOptions(filtered, priority as WeightProfile);

  // Boost preferred mode
  const preferredTransport = request.preferredTransport || request.preferredMode;
  if (preferredTransport && preferredTransport !== "all") {
    const pref = options.find((o) => o.mode === preferredTransport);
    if (pref) {
      pref.score = Math.min(100, pref.score + 10);
    }
  }

  options.sort((a, b) => b.score - a.score);
  options.forEach((opt, idx) => {
    opt.rank = idx + 1;
    opt.recommended = idx === 0;
    if (idx === 0) {
      opt.reason = generateReason(opt, options);
    }
  });

  // Find carpool matches along this route
  let carpoolMatch: import("@/types").CarpoolMatch | undefined;
  const matches = findCarpoolMatches(fromLoc, toLoc, "08:30");
  if (matches.length > 0) {
    carpoolMatch = matches[0];
  }

  return {
    options,
    recommended: options[0],
    carpoolMatch,
    from: fromLoc,
    to: toLoc,
    request,
  };
}
