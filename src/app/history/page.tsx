"use client";

import { useEffect, useState } from "react";
import { Leaf, MapPin, Map, Calendar, Coins, ArrowRight, ShieldCheck, Bus, Car, Bike, Footprints, Users } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency, formatCO2, formatDistance, formatDuration, formatDate, getTransportLabel, getEcoLabel } from "@/lib/utils";

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

export default function HistoryPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadTrips() {
      setLoading(true);
      try {
        let url = "/api/trips";
        if (filter !== "all") url += `?period=${filter}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setTrips(data.trips || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTrips();
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Trip History</h1>
              <p className="text-slate-500 mt-1">Review your completed commutes and ecological impact.</p>
            </div>
            <Link href="/plan">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Plan New Commute <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="all" onValueChange={setFilter}>
            <TabsList className="mb-4 bg-white border border-slate-200">
              <TabsTrigger value="all">All Time</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-4 outline-none">
              {loading ? (
                <div className="py-12 text-center text-slate-500">
                  <div className="animate-spin w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                  Loading trips...
                </div>
              ) : trips.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <Map className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No trips recorded yet</h3>
                    <p className="text-slate-500 mt-1 max-w-sm">
                      Plan a sustainable commute in Indore to start logging trips and earning Green Points!
                    </p>
                    <Link href="/plan" className="mt-6">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Plan a Trip</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                trips.map((trip: any, idx: number) => {
                  const ecoInfo = getEcoLabel(trip.ecoScore || 80);
                  const fromLoc = trip.fromLocationId || trip.from?.name || "Vijay Nagar";
                  const toLoc = trip.toLocationId || trip.to?.name || "Rajwada";
                  const cost = trip.cost ?? trip.estimatedCost ?? 0;
                  const dist = trip.distance ?? trip.distanceKm ?? 0;
                  const dur = trip.time ?? trip.durationMinutes ?? 0;
                  const co2Saved = trip.co2Saved || 0;
                  const moneySaved = trip.moneySaved || 0;

                  return (
                    <Card key={idx} className="overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-4 md:p-6 flex-1 flex items-start gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 border border-slate-200">
                              <ModeIcon mode={trip.mode} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-bold text-slate-900 text-base">{fromLoc}</span>
                                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="font-bold text-slate-900 text-base">{toLoc}</span>
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" /> {formatDate(trip.date || trip.createdAt)}
                                </span>
                                <span className="font-medium text-slate-700">• {getTransportLabel(trip.mode)}</span>
                                <span>• {formatDistance(dist)}</span>
                                <span>• {formatDuration(dur)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-50 p-4 md:p-6 flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-200 min-w-[210px]">
                            <div className="text-xl font-bold text-slate-900">{formatCurrency(cost)}</div>
                            <div className="flex items-center gap-3 mt-1 text-xs">
                              {co2Saved > 0 && (
                                <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                                  <Leaf className="w-3.5 h-3.5" /> -{formatCO2(co2Saved)}
                                </div>
                              )}
                              {moneySaved > 0 && (
                                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                                  <Coins className="w-3.5 h-3.5" /> +{formatCurrency(moneySaved)}
                                </div>
                              )}
                            </div>
                            <div className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border mt-2 ${ecoInfo.badgeColor}`}>
                              Eco Score: {trip.ecoScore || 80}/100
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
