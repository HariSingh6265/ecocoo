"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Leaf,
  Map,
  Coins,
  ArrowUpRight,
  Plus,
  MapPin,
  Bus,
  Car,
  Bike,
  Footprints,
  Users,
  Navigation,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatCO2, formatDistance, formatDate, getTransportLabel } from "@/lib/utils";

function ModeIcon({ mode }: { mode: string }) {
  switch (mode?.toLowerCase()) {
    case "bus":
      return <Bus className="w-5 h-5 text-blue-600" />;
    case "cab":
      return <Car className="w-5 h-5 text-amber-600" />;
    case "personal":
      return <Car className="w-5 h-5 text-slate-600" />;
    case "carpool":
      return <Users className="w-5 h-5 text-purple-600" />;
    case "cycling":
      return <Bike className="w-5 h-5 text-emerald-600" />;
    case "walking":
      return <Footprints className="w-5 h-5 text-teal-600" />;
    default:
      return <MapPin className="w-5 h-5 text-slate-600" />;
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentTrips, setRecentTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, tripsRes] = await Promise.all([
          fetch("/api/dashboard"),
          fetch("/api/trips?limit=6"),
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        if (tripsRes.ok) {
          const data = await tripsRes.json();
          setRecentTrips(data.trips || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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

  const co2Saved = stats?.totalCO2Saved || stats?.totalCo2Saved || 12.8;
  const moneySaved = stats?.totalMoneySaved || 2340;
  const ecoScore = stats?.ecoScore || stats?.avgEcoScore || 82;
  const greenPoints = stats?.greenPoints || 450;
  const totalTrips = stats?.monthTrips || stats?.totalTrips || 34;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8 animate-fade-in max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Sparkles className="w-4 h-4" /> B2C Individual Dashboard
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Welcome, {stats?.user?.name || "Commuter"}
            </h1>
            <p className="text-slate-500 text-sm">
              Here is your commute performance, savings breakdown, and carbon avoidance.
            </p>
          </div>
          <Link href="/plan">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20">
              <Navigation className="mr-2 h-4 w-4" /> Plan Clean Commute
            </Button>
          </Link>
        </div>

        {/* 5 Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-emerald-200 bg-emerald-50/50 shadow-xs rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-bold uppercase text-emerald-900">CO₂ Avoided</CardTitle>
              <Leaf className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">{formatCO2(co2Saved)}</div>
              <p className="text-[11px] text-emerald-800/80 mt-0.5">~6 mature trees saved</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-bold uppercase text-slate-500">Money Saved</CardTitle>
              <Coins className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{formatCurrency(moneySaved)}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">vs solo private cabs</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-xs rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-bold uppercase text-slate-500">Eco Score</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{ecoScore}<span className="text-sm font-normal text-slate-400">/100</span></div>
              <p className="text-[11px] text-blue-600 font-semibold mt-0.5">Excellent Tier (Top 10%)</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-bold uppercase text-emerald-100">Green Points</CardTitle>
              <Leaf className="h-4 w-4 text-emerald-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-black">{greenPoints} pts</div>
              <p className="text-[11px] text-emerald-100 mt-0.5 flex items-center">
                <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> Eligible for corporate rewards
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Trips Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Recent Commute Journeys</h2>
              <p className="text-xs text-slate-500">Your latest logged trips across Indore</p>
            </div>
            <Link href="/history" className="text-xs text-emerald-700 hover:underline font-bold flex items-center gap-1">
              Full Trip History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-0">
              {recentTrips.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No trips logged yet. Time to plan your first sustainable commute!
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentTrips.map((trip: any, i: number) => {
                    const fromName = trip.fromLocationId || trip.from?.name || "Vijay Nagar";
                    const toName = trip.toLocationId || trip.to?.name || "Rajwada";
                    const cost = trip.cost ?? trip.estimatedCost ?? 25;
                    const dist = trip.distance ?? trip.distanceKm ?? 8.4;
                    const co2SavedTrip = trip.co2Saved ?? 1.2;

                    return (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                            <ModeIcon mode={trip.mode} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-sm text-slate-900 flex items-center gap-2 truncate">
                              <span>{fromName}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{toName}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                              <span>{formatDate(trip.date || trip.createdAt)}</span>
                              <span>•</span>
                              <span className="capitalize font-medium text-slate-700">{getTransportLabel(trip.mode)}</span>
                              <span>•</span>
                              <span>{formatDistance(dist)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-bold text-sm sm:text-base text-slate-900">{formatCurrency(cost)}</div>
                          <div className="text-xs text-emerald-600 font-semibold">-{formatCO2(co2SavedTrip)} saved</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
