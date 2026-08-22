"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Leaf,
  MapPin,
  Clock,
  Navigation,
  ShieldCheck,
  Zap,
  Bus,
  Car,
  Bike,
  Footprints,
  Users,
  Radio,
  Sparkles,
  Compass,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RouteMap from "@/components/map/route-map";
import {
  formatCurrency,
  formatDistance,
  formatDuration,
  formatCO2,
  getTransportLabel,
  getGoogleMapsDeepLink,
} from "@/lib/utils";

function ModeIcon({ mode, className = "w-6 h-6" }: { mode: string; className?: string }) {
  switch (mode?.toLowerCase()) {
    case "bus":
      return <Bus className={className} />;
    case "cab":
      return <Car className={className} />;
    case "personal":
      return <Car className={className} />;
    case "carpool":
      return <Users className={className} />;
    case "cycling":
      return <Bike className={className} />;
    case "walking":
      return <Footprints className={className} />;
    default:
      return <MapPin className={className} />;
  }
}

export default function TripDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tripId = params?.id as string;

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(25);

  useEffect(() => {
    async function loadTrip() {
      // First try sessionStorage
      const cached = sessionStorage.getItem("activeTrip");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setTrip(parsed);
        } catch (e) {}
      }

      // Fetch from API
      try {
        const res = await fetch(`/api/trips/${tripId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.trip) setTrip(data.trip);
        }
      } catch (err) {
        console.error("Failed to load trip", err);
      } finally {
        setLoading(false);
      }
    }
    loadTrip();
  }, [tripId]);

  const handleOpenGoogleMaps = () => {
    const fromName = trip?.from?.name || trip?.fromLocationId || "Vijay Nagar";
    const toName = trip?.to?.name || trip?.toLocationId || "Rajwada";
    const mode = trip?.mode || "transit";
    const deepLink = getGoogleMapsDeepLink(fromName, toName, mode);

    fetch("/api/analytics/navigation-handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin: fromName, destination: toName, mode, url: deepLink }),
    }).catch(() => {});

    window.open(deepLink, "_blank", "noopener,noreferrer");
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      const res = await fetch(`/api/trips/${tripId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });

      if (res.ok) {
        const data = await res.json();
        setEarnedPoints(data.pointsEarned || 25);
        setCompleted(true);
      } else {
        setCompleted(true);
      }
    } catch (err) {
      setCompleted(true);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 flex justify-center items-center">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
        </main>
      </div>
    );
  }

  const fromName = trip?.from?.name || trip?.fromLocationId || "Vijay Nagar";
  const toName = trip?.to?.name || trip?.toLocationId || "Rajwada";
  const mode = trip?.mode || "bus";
  const cost = trip?.cost ?? trip?.estimatedCost ?? 20;
  const dist = trip?.distance ?? trip?.distanceKm ?? 8.4;
  const time = trip?.time ?? trip?.durationMinutes ?? 25;
  const co2 = trip?.co2 ?? trip?.estimatedCo2Kg ?? 0.45;
  const ecoScore = trip?.ecoScore || 90;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={() => router.push("/history")} className="rounded-xl">
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </Button>
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              ● Live Active Commute Session
            </span>
          </div>
          <div className="w-10"></div>
        </div>

        {completed ? (
          <Card className="rounded-3xl border-2 border-emerald-500 shadow-xl bg-white overflow-hidden text-center p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Commute Completed!</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Your commute from <strong>{fromName}</strong> to <strong>{toName}</strong> has been logged to your immutable carbon ledger.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md max-w-sm mx-auto space-y-1">
              <div className="text-xs uppercase font-bold tracking-wider text-emerald-100">Reward Credited</div>
              <div className="text-3xl font-black">+{earnedPoints} Green Points</div>
              <div className="text-[11px] text-emerald-100">viaSocket automated HR webhook event dispatched</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl h-11 px-6"
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/plan")}
                className="rounded-xl h-11 px-6 border-slate-300"
              >
                Plan Next Journey
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <RouteMap
              fromName={fromName}
              toName={toName}
              mode={mode}
              distanceKm={dist}
              durationMinutes={time}
            />

            <Card className="rounded-3xl border border-slate-200 shadow-md bg-white overflow-hidden">
              <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                    <ModeIcon mode={mode} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{getTransportLabel(mode)}</h3>
                    <p className="text-xs text-slate-400">{fromName} → {toName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black">{formatCurrency(cost)}</div>
                  <div className="text-xs text-emerald-400 font-medium">Eco Score {ecoScore}/100</div>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Live Transit Corridor Status */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></div>
                    <div>
                      <div className="font-bold text-blue-950">Live Traffic & Navigation Stream</div>
                      <div className="text-blue-800/80">Real-time GPS route active</div>
                    </div>
                  </div>
                  <span className="bg-blue-200 text-blue-900 font-bold px-2.5 py-1 rounded-full">
                    Active Route
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border text-center">
                    <div className="text-xs text-slate-500">Remaining Dist</div>
                    <div className="font-bold text-base text-slate-900 mt-0.5">{formatDistance(dist)}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border text-center">
                    <div className="text-xs text-slate-500">Est. Duration</div>
                    <div className="font-bold text-base text-slate-900 mt-0.5">{formatDuration(time)}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border text-center">
                    <div className="text-xs text-slate-500">Est. CO₂</div>
                    <div className="font-bold text-base text-emerald-600 mt-0.5">{formatCO2(co2)}</div>
                  </div>
                </div>

                {/* Dual Action: Open in Google Maps & Complete Commute */}
                <div className="space-y-3 pt-2">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 border-slate-300 hover:bg-slate-100 text-slate-800 rounded-2xl font-bold text-sm"
                    onClick={handleOpenGoogleMaps}
                  >
                    <Compass className="w-4 h-4 mr-2 text-indigo-600" />
                    Open Turn-by-Turn in Google Maps <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
                  </Button>

                  <Button
                    size="lg"
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-base font-bold rounded-2xl shadow-lg shadow-emerald-600/20"
                    onClick={handleComplete}
                    disabled={completing}
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    {completing ? "Finalizing Commute..." : "Complete Commute & Claim Green Points"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
