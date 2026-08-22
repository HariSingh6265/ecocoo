"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Leaf,
  MapPin,
  Play,
  Clock,
  Navigation,
  Sparkles,
  TrendingDown,
  Coins,
  ShieldCheck,
  Users,
  Bus,
  Car,
  Bike,
  Footprints,
  ChevronRight,
  Info,
  ExternalLink,
  Compass,
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
  getEcoLabel,
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

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("commuteResults");
    if (data) {
      try {
        setResults(JSON.parse(data));
      } catch (e) {
        router.push("/plan");
      }
    } else {
      router.push("/plan");
    }
    setLoading(false);
  }, [router]);

  const handleOpenGoogleMaps = (option: any) => {
    const fromName = results.from?.name || results.request?.from || "Vijay Nagar";
    const toName = results.to?.name || results.request?.to || "Rajwada";
    const deepLink = getGoogleMapsDeepLink(fromName, toName, option.mode);

    // Log navigation handoff asynchronously
    fetch("/api/analytics/navigation-handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: fromName,
        destination: toName,
        mode: option.mode,
        url: deepLink,
      }),
    }).catch(() => {});

    // Open Google Maps in new tab / native app
    window.open(deepLink, "_blank", "noopener,noreferrer");
  };

  const handleStartTrip = async (option: any) => {
    setSaving(true);
    try {
      const fromName = results.from?.name || results.request?.from || "Vijay Nagar";
      const toName = results.to?.name || results.request?.to || "Rajwada";

      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: results.from || { name: fromName, lat: 22.7533, lng: 75.8937 },
          to: results.to || { name: toName, lat: 22.7196, lng: 75.8577 },
          fromLocationId: fromName,
          toLocationId: toName,
          mode: option.mode,
          cost: option.cost ?? option.estimatedCost,
          distance: option.distance ?? option.distanceKm,
          time: option.time ?? option.durationMinutes,
          co2: option.co2 ?? option.estimatedCo2Kg,
          ecoScore: option.ecoScore,
          moneySaved: option.moneySaved,
          co2Saved: option.co2Saved,
          passengers: option.occupancy || 1,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const tripId = data.id || data.tripId || "trip_live";
        sessionStorage.setItem("activeTrip", JSON.stringify(data.trip || { ...option, fromName, toName }));
        router.push(`/trip/${tripId}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Failed to start trip", err);
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="animate-spin w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-slate-600 font-medium">Evaluating multimodal routes & emission profiles...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!results || !results.options || results.options.length === 0) return null;

  const recommended = results.recommended || results.options[0];
  const alternatives = results.options.slice(1);
  const fromName = results.from?.name || results.request?.from || "Vijay Nagar";
  const toName = results.to?.name || results.request?.to || "Rajwada";
  const carpool = results.carpoolMatch;
  const ecoBadge = getEcoLabel(recommended.ecoScore || 85);

  const cost = recommended.cost ?? recommended.estimatedCost ?? 20;
  const dist = recommended.distance ?? recommended.distanceKm ?? 8.4;
  const dur = recommended.time ?? recommended.durationMinutes ?? 25;
  const co2 = recommended.co2 ?? recommended.estimatedCo2Kg ?? 0.45;
  const moneySaved = recommended.moneySaved ?? 155;
  const co2Saved = recommended.co2Saved ?? 1.21;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-in max-w-4xl">
        <div className="space-y-6">
          {/* Header & Back Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => router.push("/plan")} className="rounded-xl">
                <ArrowLeft className="h-5 w-5 text-slate-700" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Recommended Commute</h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  {fromName} → {toName} • Traffic-aware real-time route
                </p>
              </div>
            </div>
            <Link href="/plan">
              <Button variant="ghost" size="sm" className="text-xs text-slate-600">
                Change Inputs
              </Button>
            </Link>
          </div>

          {/* Interactive Route Map */}
          <RouteMap
            fromName={fromName}
            toName={toName}
            mode={recommended.mode}
            distanceKm={dist}
            durationMinutes={dur}
          />

          {/* BEST OPTION HERO CARD */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Best Real-Time Commute Recommendation
              </span>
              <span className="text-xs text-slate-500 font-medium">Rank #1 of {results.options.length}</span>
            </div>

            <Card className="shadow-xl border-2 border-emerald-500 rounded-3xl overflow-hidden relative bg-white">
              {/* Highlight header banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 fill-current text-emerald-200" />
                  <span className="font-bold text-sm uppercase tracking-wide">BEST OVERALL OPTION</span>
                </div>
                <div className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  Score {recommended.score || 95}/100
                </div>
              </div>

              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Mode & Cost Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                      <ModeIcon mode={recommended.mode} className="w-9 h-9" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recommended Transport</div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 capitalize">
                        {getTransportLabel(recommended.mode)}
                      </h3>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mt-1">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {formatDuration(dur)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Navigation className="w-3.5 h-3.5 text-slate-400" /> {formatDistance(dist)}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-700">{formatCO2(co2)} CO₂</span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Estimated Cost</div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900">{formatCurrency(cost)}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Fixed trip estimate</div>
                  </div>
                </div>

                {/* Savings & Reason Highlight Box */}
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-200/80 rounded-xl text-emerald-900 shrink-0 mt-0.5">
                      <TrendingDown className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-bold text-emerald-950">
                        "You save {formatCurrency(moneySaved)} and approximately {formatCO2(co2Saved)} compared with a solo cab."
                      </h4>
                      <p className="text-xs text-emerald-900/80 leading-relaxed">
                        <span className="font-semibold">Why this was recommended: </span>
                        {recommended.reason || "Delivers maximum carbon reduction and affordable transit within your travel preferences."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Badges */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-center">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Eco Score</div>
                    <div className="text-xl font-bold text-emerald-700 mt-0.5">{recommended.ecoScore || 91}/100</div>
                    <div className="text-[10px] text-emerald-600 font-medium">{ecoBadge.label}</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-center">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">CO₂ Saved</div>
                    <div className="text-xl font-bold text-emerald-700 mt-0.5">-{formatCO2(co2Saved)}</div>
                    <div className="text-[10px] text-slate-500">vs solo cab</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-center">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Green Credits</div>
                    <div className="text-xl font-bold text-amber-600 mt-0.5">
                      +{recommended.mode === "cycling" ? 30 : recommended.mode === "walking" ? 25 : recommended.mode === "carpool" ? 20 : 15} pts
                    </div>
                    <div className="text-[10px] text-slate-500">Upon completion</div>
                  </div>
                </div>

                {/* Dual Action Buttons: Start Trip & Direct Google Maps Handoff */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Button
                    size="lg"
                    className="h-13 text-sm sm:text-base font-bold bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-lg shadow-emerald-600/20"
                    onClick={() => handleStartTrip(recommended)}
                    disabled={saving}
                  >
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    {saving ? "Launching Commute..." : "Start & Complete Trip"}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 text-sm sm:text-base font-bold border-slate-300 hover:bg-slate-100 text-slate-800 rounded-2xl"
                    onClick={() => handleOpenGoogleMaps(recommended)}
                  >
                    <Compass className="w-4 h-4 mr-2 text-indigo-600" />
                    Open in Google Maps <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CARPOOL AVAILABLE CARD */}
          {carpool && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900">
                <Users className="w-4 h-4 text-purple-600" /> Compatible Carpool Ride Available
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-3xl overflow-hidden shadow-sm">
                <CardContent className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-200 text-purple-900 flex items-center justify-center shrink-0 font-bold text-lg">
                      {carpool.driverName.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 text-base">
                          🤝 Carpool Available: {carpool.driverName}
                        </h4>
                        <span className="bg-purple-200 text-purple-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {carpool.availableSeats} seats left
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-3 flex-wrap">
                        <span>Departure: <strong>{carpool.departureTime}</strong></span>
                        <span>•</span>
                        <span>Estimated Cost: <strong>{formatCurrency(carpool.estimatedCost)}</strong></span>
                        <span>•</span>
                        <span>Estimated CO₂/person: <strong>{formatCO2(carpool.estimatedCO2PerPerson)}</strong></span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold h-11 px-5 shadow-sm shrink-0 w-full md:w-auto"
                    onClick={() => handleStartTrip({ ...recommended, mode: "carpool", cost: carpool.estimatedCost })}
                  >
                    Join Ride (+20 Green Points)
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ALL MODES COMPARISON */}
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-bold text-slate-900">All Transit Options Compared</h3>

            <div className="space-y-3">
              {results.options.map((option: any, idx: number) => {
                const optCost = option.cost ?? option.estimatedCost ?? 0;
                const optDur = option.time ?? option.durationMinutes ?? 0;
                const optDist = option.distance ?? option.distanceKm ?? 0;
                const optCo2 = option.co2 ?? option.estimatedCo2Kg ?? 0;
                const optBadge = getEcoLabel(option.ecoScore || 70);

                return (
                  <Card
                    key={idx}
                    className={`rounded-2xl border transition-all hover:shadow-md bg-white ${
                      option.recommended ? "border-emerald-400 ring-2 ring-emerald-500/20" : "border-slate-200"
                    }`}
                  >
                    <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                          <ModeIcon mode={option.mode} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-slate-900">{getTransportLabel(option.mode)}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${optBadge.badgeColor}`}>
                              Eco Score: {option.ecoScore}/100
                            </span>
                            {option.recommended && (
                              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span>{formatDuration(optDur)}</span>
                            <span>•</span>
                            <span>{formatDistance(optDist)}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">{formatCO2(optCo2)} CO₂</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <div className="font-bold text-lg text-slate-900">{formatCurrency(optCost)}</div>
                          <div className="text-[11px] text-emerald-600 font-medium">
                            {option.moneySaved > 0 ? `-${formatCurrency(option.moneySaved)} vs cab` : "Baseline cost"}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-xl text-xs h-9 px-2 text-slate-600 hover:text-indigo-600"
                            onClick={() => handleOpenGoogleMaps(option)}
                            title="Open turn-by-turn in Google Maps"
                          >
                            <Compass className="w-4 h-4 mr-1 text-indigo-600" /> Maps
                          </Button>
                          <Button
                            size="sm"
                            className="bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold h-9 px-3.5 transition-colors"
                            onClick={() => handleStartTrip(option)}
                          >
                            Select Mode
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
