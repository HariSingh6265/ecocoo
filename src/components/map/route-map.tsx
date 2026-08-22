"use client";

import { MapPin, Navigation, Compass, Layers, ShieldCheck, Bus, Car, Bike, Footprints } from "lucide-react";
import { formatDistance, formatDuration } from "@/lib/utils";

interface RouteMapProps {
  fromName: string;
  toName: string;
  mode?: string;
  distanceKm?: number;
  durationMinutes?: number;
  interactive?: boolean;
}

export default function RouteMap({
  fromName,
  toName,
  mode = "bus",
  distanceKm = 8.4,
  durationMinutes = 32,
  interactive = false,
}: RouteMapProps) {
  const getModeIcon = () => {
    switch (mode.toLowerCase()) {
      case "bus":
        return <Bus className="w-4 h-4 text-blue-600" />;
      case "cab":
        return <Car className="w-4 h-4 text-amber-600" />;
      case "carpool":
        return <Car className="w-4 h-4 text-purple-600" />;
      case "cycling":
        return <Bike className="w-4 h-4 text-emerald-600" />;
      case "walking":
        return <Footprints className="w-4 h-4 text-teal-600" />;
      default:
        return <Navigation className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
      {/* Background Map Grid & Vector Roads */}
      <div className="relative h-64 sm:h-72 w-full bg-[#131b26] flex items-center justify-center overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#34d399 1px, transparent 1px), radial-gradient(#60a5fa 1px, #131b26 1px)`,
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        {/* SVG Route Visualization */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Secondary road arteries */}
          <path
            d="M 20,40 Q 150,120 480,80"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
          />
          <path
            d="M 60,220 Q 220,100 440,200"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
          />
          <path
            d="M 250,20 L 250,220"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Primary Route Path with Glow */}
          <path
            d="M 90,160 C 180,60 320,180 410,70"
            fill="none"
            stroke="#059669"
            strokeWidth="10"
            strokeOpacity="0.3"
          />
          <path
            d="M 90,160 C 180,60 320,180 410,70"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Animated Waypoint Pulse */}
          <circle cx="250" cy="120" r="5" fill="#38bdf8" className="animate-ping" />
          <circle cx="250" cy="120" r="4" fill="#38bdf8" />
        </svg>

        {/* Start Point Pin */}
        <div className="absolute left-10 sm:left-16 bottom-12 flex flex-col items-center z-10">
          <div className="bg-white/95 backdrop-blur text-slate-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-lg border border-slate-200 mb-1.5 whitespace-nowrap">
            {fromName} (Start)
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-emerald-500/30 shadow-lg">
            <MapPin className="w-4 h-4" />
          </div>
        </div>

        {/* Midpoint Transit Hub / BRTS Stop */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="bg-slate-800/90 text-emerald-300 text-[11px] font-medium px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            AB Road BRTS Corridor
          </div>
        </div>

        {/* Destination Pin */}
        <div className="absolute right-10 sm:right-16 top-10 flex flex-col items-center z-10">
          <div className="bg-white/95 backdrop-blur text-slate-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-lg border border-slate-200 mb-1.5 whitespace-nowrap">
            {toName} (Destination)
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center ring-4 ring-blue-500/30 shadow-lg">
            <Navigation className="w-4 h-4" />
          </div>
        </div>

        {/* Route Stats Overlay Bar */}
        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-4 py-2.5 flex items-center justify-between text-white text-xs z-20">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-800 rounded-lg">{getModeIcon()}</div>
            <span className="font-semibold capitalize text-slate-200">Indore Smart Transit Route</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 font-medium">
            <span>{formatDistance(distanceKm)}</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
            <span>Est. {formatDuration(durationMinutes)}</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Optimal Clean Route
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
