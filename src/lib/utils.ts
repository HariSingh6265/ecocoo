import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return "₹0";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function formatDistance(km: number | undefined | null): string {
  if (km === undefined || km === null) return "0 km";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function formatDuration(minutes: number | undefined | null): string {
  if (minutes === undefined || minutes === null) return "0 min";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}

export function formatCO2(kg: number | undefined | null): string {
  if (kg === undefined || kg === null) return "0 kg";
  if (kg < 0.01) return `${Math.round(kg * 1000)} g`;
  return `${kg.toFixed(2)} kg`;
}

export function formatDate(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getEcoLabel(score: number): { label: string; color: string; badgeColor: string } {
  if (score >= 90) return { label: "Excellent", color: "text-emerald-600", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300" };
  if (score >= 75) return { label: "Good", color: "text-green-600", badgeColor: "bg-green-100 text-green-800 border-green-300" };
  if (score >= 50) return { label: "Moderate", color: "text-yellow-600", badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300" };
  return { label: "High Impact", color: "text-red-600", badgeColor: "bg-red-100 text-red-800 border-red-300" };
}

export function getTransportLabel(mode: string | undefined): string {
  if (!mode) return "Commute";
  const labels: Record<string, string> = {
    bus: "Public Bus",
    cab: "Solo Cab",
    personal: "Personal Car",
    carpool: "Carpool",
    cycling: "Bicycle / EV Cycle",
    walking: "Walking",
  };
  return labels[mode.toLowerCase()] || mode;
}

export function getTransportColor(mode: string | undefined): string {
  if (!mode) return "bg-slate-100 text-slate-700";
  const colors: Record<string, string> = {
    bus: "bg-blue-100 text-blue-700 border-blue-200",
    cab: "bg-amber-100 text-amber-700 border-amber-200",
    personal: "bg-slate-100 text-slate-700 border-slate-200",
    carpool: "bg-purple-100 text-purple-700 border-purple-200",
    cycling: "bg-emerald-100 text-emerald-700 border-emerald-200",
    walking: "bg-teal-100 text-teal-700 border-teal-200",
  };
  return colors[mode.toLowerCase()] || "bg-slate-100 text-slate-700 border-slate-200";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

/**
 * Universal Google Maps Navigation URL deep link.
 * On mobile, opens Google Maps native app for turn-by-turn navigation.
 * On web, opens Google Maps web in a new tab.
 */
export function getGoogleMapsDeepLink(
  origin: string | { lat: number; lng: number },
  destination: string | { lat: number; lng: number },
  mode: string = "transit"
): string {
  const o = typeof origin === "string" ? encodeURIComponent(origin) : `${origin.lat},${origin.lng}`;
  const d = typeof destination === "string" ? encodeURIComponent(destination) : `${destination.lat},${destination.lng}`;

  let travelmode = "transit";
  switch (mode?.toLowerCase()) {
    case "bus":
      travelmode = "transit";
      break;
    case "cab":
    case "personal":
    case "carpool":
      travelmode = "driving";
      break;
    case "cycling":
      travelmode = "bicycling";
      break;
    case "walking":
      travelmode = "walking";
      break;
  }

  return `https://www.google.com/maps/dir/?api=1&origin=${o}&destination=${d}&travelmode=${travelmode}`;
}
