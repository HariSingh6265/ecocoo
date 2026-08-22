// ─── Carpool Matching Engine ───
// Smart route/time matching with seeded Indore commuters and dynamic fallback

import { CARPOOL_CONFIG } from "@/lib/config";
import type { CarpoolMatch } from "@/types";
import { haversineDistance } from "./recommendation";

const DEMO_CARPOOL_OFFERS: CarpoolMatch[] = [
  {
    driverId: "demo-driver-1",
    driverName: "Rahul Verma",
    from: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    to: { name: "Rajwada", lat: 22.7196, lng: 75.8577 },
    departureTime: "08:20 AM",
    availableSeats: 2,
    estimatedCost: 60,
    estimatedCO2PerPerson: 0.62,
    estimatedSavings: 120,
    status: "available",
  },
  {
    driverId: "demo-driver-2",
    driverName: "Priya Patel",
    from: { name: "Palasia", lat: 22.7236, lng: 75.8824 },
    to: { name: "Bhawarkua", lat: 22.7284, lng: 75.8669 },
    departureTime: "08:45 AM",
    availableSeats: 3,
    estimatedCost: 40,
    estimatedCO2PerPerson: 0.45,
    estimatedSavings: 85,
    status: "available",
  },
  {
    driverId: "demo-driver-3",
    driverName: "Sneha Gupta",
    from: { name: "Sapna Sangeeta", lat: 22.7301, lng: 75.8741 },
    to: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    departureTime: "09:00 AM",
    availableSeats: 2,
    estimatedCost: 50,
    estimatedCO2PerPerson: 0.52,
    estimatedSavings: 95,
    status: "available",
  },
  {
    driverId: "demo-driver-4",
    driverName: "Amit Kashyap",
    from: { name: "Rau", lat: 22.6644, lng: 75.8613 },
    to: { name: "Vijay Nagar", lat: 22.7533, lng: 75.8937 },
    departureTime: "08:30 AM",
    availableSeats: 2,
    estimatedCost: 75,
    estimatedCO2PerPerson: 0.78,
    estimatedSavings: 140,
    status: "available",
  },
];

export function findCarpoolMatches(
  from: { lat: number; lng: number; name?: string },
  to: { lat: number; lng: number; name?: string },
  departureTime?: string
): CarpoolMatch[] {
  const matches = DEMO_CARPOOL_OFFERS.filter((offer) => {
    const originDist = haversineDistance(from.lat, from.lng, offer.from.lat, offer.from.lng);
    const destDist = haversineDistance(to.lat, to.lng, offer.to.lat, offer.to.lng);
    return originDist <= 6.0 && destDist <= 6.0;
  });

  if (matches.length > 0) {
    return matches.sort((a, b) => a.estimatedCost - b.estimatedCost);
  }

  // Dynamic deterministic match for any pair
  const dist = haversineDistance(from.lat, from.lng, to.lat, to.lng);
  const cost = Math.max(30, Math.round(dist * 5 + 20));
  const soloCabCost = Math.max(70, Math.round(dist * 14 + 50));
  const savings = Math.max(30, soloCabCost - cost);
  const co2 = Math.max(0.2, Math.round(dist * 0.06 * 100) / 100);

  return [
    {
      driverId: "carpool-partner-1",
      driverName: "Rahul Verma",
      from: { name: from.name || "Origin", lat: from.lat, lng: from.lng },
      to: { name: to.name || "Destination", lat: to.lat, lng: to.lng },
      departureTime: departureTime || "08:30 AM",
      availableSeats: 2,
      estimatedCost: cost,
      estimatedCO2PerPerson: co2,
      estimatedSavings: savings,
      status: "available",
    },
  ];
}
