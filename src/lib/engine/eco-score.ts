// ─── Eco Score Calculator ───
// Score 0–100 based on CO2 efficiency, transport choice, and occupancy.

import { EMISSION_FACTORS, type TransportMode } from "@/lib/config";

// Mode base scores (inherent sustainability)
const MODE_BASE_SCORE: Record<string, number> = {
  walking: 100,
  cycling: 98,
  bus: 80,
  carpool: 72,
  personal: 30,
  cab: 25,
};

export function calculateEcoScore(
  mode: string,
  co2: number,
  distance: number,
  occupancy: number
): number {
  // Component 1: Mode base score (40% weight)
  const modeScore = MODE_BASE_SCORE[mode] || 50;

  // Component 2: CO2 efficiency (35% weight)
  // Compare to worst case (solo cab)
  const worstCO2PerKm = EMISSION_FACTORS.cab;
  const actualCO2PerKm = distance > 0 ? co2 / distance : 0;
  const co2Efficiency = worstCO2PerKm > 0
    ? Math.max(0, (1 - actualCO2PerKm / worstCO2PerKm)) * 100
    : 100;

  // Component 3: Occupancy bonus (15% weight)
  const occupancyScore = occupancy * 100;

  // Component 4: Distance efficiency bonus (10% weight)
  // Shorter distances are generally better
  const distanceScore = Math.max(0, Math.min(100, 100 - distance * 3));

  const finalScore =
    modeScore * 0.40 +
    co2Efficiency * 0.35 +
    occupancyScore * 0.15 +
    distanceScore * 0.10;

  return Math.round(Math.min(100, Math.max(0, finalScore)));
}

export function getEcoScoreLabel(score: number): {
  label: string;
  color: string;
  bgColor: string;
  emoji: string;
} {
  if (score >= 90) return { label: "Excellent", color: "text-emerald-700", bgColor: "bg-emerald-50", emoji: "🌿" };
  if (score >= 75) return { label: "Good", color: "text-green-700", bgColor: "bg-green-50", emoji: "🍃" };
  if (score >= 50) return { label: "Moderate", color: "text-yellow-700", bgColor: "bg-yellow-50", emoji: "🌤" };
  return { label: "High Impact", color: "text-red-700", bgColor: "bg-red-50", emoji: "⚠️" };
}
