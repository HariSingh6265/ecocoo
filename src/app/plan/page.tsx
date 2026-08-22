"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Users,
  Activity,
  Settings2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Car,
  Bus,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { INDORE_LOCATIONS } from "@/lib/config";

export default function PlanPage() {
  const router = useRouter();
  const [from, setFrom] = useState("Vijay Nagar");
  const [to, setTo] = useState("Rajwada");
  const [preferredTransport, setPreferredTransport] = useState("all");
  const [priority, setPriority] = useState("balanced");
  const [passengers, setPassengers] = useState("1");
  const [carpoolSeats, setCarpoolSeats] = useState("2");
  const [maxBudget, setMaxBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/commute/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          preferredTransport,
          priority,
          passengers: parseInt(passengers) || 1,
          carpoolSeats: parseInt(carpoolSeats) || 0,
          maxBudget: maxBudget ? parseFloat(maxBudget) : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const payload = data.data || data;
        sessionStorage.setItem("commuteResults", JSON.stringify(payload));
        router.push("/results");
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error?.message || errData.error || "Failed to calculate route recommendations.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Network or server error while planning commute.");
    } finally {
      setLoading(false);
    }
  };

  const setQuickRoute = (start: string, end: string) => {
    setFrom(start);
    setTo(end);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> B2C Smart Mobility Recommender
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Plan Your Clean Commute</h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Compare Public Bus, Cab, Carpool, Personal Car, Cycling, and Walking across cost, travel time, and CO₂ emissions.
            </p>
          </div>

          {/* Quick Route Preset Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs justify-center flex-wrap">
            <span className="text-slate-500 font-semibold">Indore presets:</span>
            <button
              type="button"
              onClick={() => setQuickRoute("Vijay Nagar", "Rajwada")}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-medium transition-all shadow-xs"
            >
              Vijay Nagar → Rajwada
            </button>
            <button
              type="button"
              onClick={() => setQuickRoute("Palasia", "Bhawarkua")}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-medium transition-all shadow-xs"
            >
              Palasia → Bhawarkua
            </button>
            <button
              type="button"
              onClick={() => setQuickRoute("MR 10", "Devi Ahilya Bai Holkar Airport")}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-medium transition-all shadow-xs"
            >
              MR 10 → Airport
            </button>
            <button
              type="button"
              onClick={() => setQuickRoute("Rau", "AB Road")}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-medium transition-all shadow-xs"
            >
              Rau → AB Road
            </button>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <Card className="border-t-4 border-t-emerald-600 shadow-lg rounded-3xl overflow-hidden bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Trip Parameters</CardTitle>
              <CardDescription className="text-xs">Enter your start and end points in Indore</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* FROM & TO SELECTORS */}
                <div className="space-y-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  <div className="space-y-1.5">
                    <Label htmlFor="from" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> FROM (ORIGIN)
                    </Label>
                    <select
                      id="from"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {INDORE_LOCATIONS.map((loc) => (
                        <option key={loc.id || loc.name} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="to" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> TO (DESTINATION)
                    </Label>
                    <select
                      id="to"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {INDORE_LOCATIONS.map((loc) => (
                        <option key={loc.id || loc.name} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* WEIGHT & TRANSPORT PREFERENCES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="priority" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-slate-500" /> OPTIMIZATION PRIORITY
                    </Label>
                    <select
                      id="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="balanced">Balanced (Cost 35%, CO₂ 30%, Time 20%)</option>
                      <option value="cost">Cost-Saver (Cost 55%, CO₂ 20%)</option>
                      <option value="eco">Eco-Warrior (CO₂ 55%, Cost 20%)</option>
                      <option value="time">Fastest (Time 55%, Cost 20%)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="preferredTransport" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-slate-500" /> PREFERRED TRANSPORT
                    </Label>
                    <select
                      id="preferredTransport"
                      value={preferredTransport}
                      onChange={(e) => setPreferredTransport(e.target.value)}
                      className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="all">All Available Options</option>
                      <option value="bus">Public Bus / BRTS</option>
                      <option value="carpool">Carpool</option>
                      <option value="cycling">Bicycle / EV Cycle</option>
                      <option value="cab">Cab</option>
                      <option value="personal">Personal Car</option>
                      <option value="walking">Walking</option>
                    </select>
                  </div>
                </div>

                {/* PASSENGERS & CARPOOL SEATS & BUDGET */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="passengers" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" /> PASSENGERS
                    </Label>
                    <Input
                      id="passengers"
                      type="number"
                      min="1"
                      max="6"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="carpoolSeats" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-slate-500" /> CARPOOL SEATS
                    </Label>
                    <Input
                      id="carpoolSeats"
                      type="number"
                      min="0"
                      max="4"
                      value={carpoolSeats}
                      onChange={(e) => setCarpoolSeats(e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="maxBudget" className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-500" /> MAX BUDGET (OPTIONAL)
                    </Label>
                    <Input
                      id="maxBudget"
                      type="number"
                      placeholder="₹ optional cap"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      className="rounded-xl h-11"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-13 text-base font-bold bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all mt-4"
                  disabled={loading}
                >
                  <Search className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  {loading ? "Evaluating Best Routes & Live Transit..." : "Find Best Option"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
