// ─── Google Maps Platform Real-Time Routing Service ───
// Server-side only: never exposed directly to frontend clients.
// Uses Directions API (departure_time=now) and Distance Matrix API for traffic-aware ETA and distance.

import { getCachedRoute, setCachedRoute, generateRouteCacheKey } from "./route-cache";

export type GoogleTravelMode = "driving" | "transit" | "bicycling" | "walking";

export interface RealRouteResult {
  mode: string;
  distanceKm: number;
  durationMinutes: number;
  durationInTrafficMinutes?: number;
  startAddress?: string;
  endAddress?: string;
  startLocation?: { lat: number; lng: number };
  endLocation?: { lat: number; lng: number };
  overviewPolyline?: string;
  steps?: Array<{
    instruction: string;
    distance: string;
    duration: string;
    mode: string;
  }>;
  trafficStatus: "live_traffic" | "standard_time" | "unavailable";
  isRealTime: boolean;
}

export interface GoogleRouteResponse {
  success: boolean;
  status: "OK" | "ZERO_RESULTS" | "API_ERROR" | "KEY_MISSING" | "INVALID_REQUEST";
  errorMessage?: string;
  route?: RealRouteResult;
}

function getGoogleMapsApiKey(): string | null {
  return (
    process.env.GOOGLE_MAPS_SERVER_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ||
    null
  );
}

export function mapTransportModeToGoogle(mode: string): GoogleTravelMode {
  switch (mode.toLowerCase()) {
    case "bus":
      return "transit";
    case "cab":
    case "personal":
    case "carpool":
      return "driving";
    case "cycling":
      return "bicycling";
    case "walking":
      return "walking";
    default:
      return "driving";
  }
}

/**
 * Fetch real-time traffic-aware route from Google Directions API.
 * Server-side execution only with Redis/memory caching layer.
 */
export async function fetchGoogleDirections(
  origin: string | { lat: number; lng: number },
  destination: string | { lat: number; lng: number },
  mode: string
): Promise<GoogleRouteResponse> {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey) {
    return {
      success: false,
      status: "KEY_MISSING",
      errorMessage: "Google Maps API Key is not configured on the server. Please provide a valid GOOGLE_MAPS_SERVER_KEY with Directions API enabled.",
    };
  }

  const googleMode = mapTransportModeToGoogle(mode);
  const cacheKey = generateRouteCacheKey(origin, destination, googleMode);

  // 1. Check cache first
  const cached = await getCachedRoute(cacheKey);
  if (cached) {
    return {
      success: true,
      status: "OK",
      route: cached,
    };
  }

  // 2. Format origin and destination
  const originStr = typeof origin === "string" ? encodeURIComponent(origin) : `${origin.lat},${origin.lng}`;
  const destStr = typeof destination === "string" ? encodeURIComponent(destination) : `${destination.lat},${destination.lng}`;

  // 3. Build Google Directions URL with live departure_time=now for traffic
  const url = new URL("https://maps.googleapis.com/maps/api/directions/json");
  url.searchParams.set("origin", originStr);
  url.searchParams.set("destination", destStr);
  url.searchParams.set("mode", googleMode);
  url.searchParams.set("key", apiKey);

  // departure_time=now is supported for driving and transit modes
  if (googleMode === "driving" || googleMode === "transit") {
    url.searchParams.set("departure_time", "now");
  }

  try {
    const res = await fetch(url.toString(), {
      headers: { "Accept": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        success: false,
        status: "API_ERROR",
        errorMessage: `Google Directions HTTP Error ${res.status}: ${res.statusText}`,
      };
    }

    const data = await res.json();

    if (data.status === "ZERO_RESULTS" || !data.routes || data.routes.length === 0) {
      return {
        success: false,
        status: "ZERO_RESULTS",
        errorMessage: `No route found between "${originStr}" and "${destStr}" for mode "${googleMode}".`,
      };
    }

    if (data.status !== "OK") {
      return {
        success: false,
        status: "API_ERROR",
        errorMessage: data.error_message || `Google Directions API returned status: ${data.status}`,
      };
    }

    // Parse route leg
    const primaryRoute = data.routes[0];
    const leg = primaryRoute.legs[0];

    const distanceKm = Math.round((leg.distance.value / 1000) * 10) / 10;
    const durationMinutes = Math.round(leg.duration.value / 60);
    const durationInTrafficMinutes = leg.duration_in_traffic ? Math.round(leg.duration_in_traffic.value / 60) : durationMinutes;

    const parsedRoute: RealRouteResult = {
      mode,
      distanceKm,
      durationMinutes: durationInTrafficMinutes || durationMinutes,
      durationInTrafficMinutes,
      startAddress: leg.start_address,
      endAddress: leg.end_address,
      startLocation: leg.start_location,
      endLocation: leg.end_location,
      overviewPolyline: primaryRoute.overview_polyline?.points,
      steps: (leg.steps || []).map((s: any) => ({
        instruction: s.html_instructions?.replace(/<[^>]*>?/gm, "") || "",
        distance: s.distance?.text || "",
        duration: s.duration?.text || "",
        mode: s.travel_mode || googleMode,
      })),
      trafficStatus: leg.duration_in_traffic ? "live_traffic" : "standard_time",
      isRealTime: true,
    };

    // Cache the real-time result for 5 minutes
    await setCachedRoute(cacheKey, parsedRoute, 300);

    return {
      success: true,
      status: "OK",
      route: parsedRoute,
    };
  } catch (error: any) {
    return {
      success: false,
      status: "API_ERROR",
      errorMessage: error?.message || "Failed to reach Google Directions API server.",
    };
  }
}
