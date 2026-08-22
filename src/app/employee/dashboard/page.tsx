"use client";

import { useState } from "react";
import {
  MapPin,
  Navigation,
  Car,
  Bus,
  Leaf,
  Trophy,
  ArrowRight,
  Wallet,
  Activity,
  Award,
  CheckCircle2,
  Users,
  Zap,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/navbar";
import { INDORE_LOCATIONS } from "@/lib/config";
import { formatCO2, formatCurrency, formatDistance, formatDuration } from "@/lib/utils";

export default function EmployeeDashboardPage() {
  const [fromLoc, setFromLoc] = useState("Palasia");
  const [toLoc, setToLoc] = useState("Vijay Nagar");
  const [carpoolSeats, setCarpoolSeats] = useState("0");
  const [priority, setPriority] = useState("balanced");
  const [isPlanning, setIsPlanning] = useState(false);
  const [planResult, setPlanResult] = useState<any>(null);
  const [completingTrip, setCompletingTrip] = useState(false);
  const [tripCompletedSuccess, setTripCompletedSuccess] = useState(false);

  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanning(true);
    setTripCompletedSuccess(false);

    try {
      const res = await fetch("/api/commute/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromLoc,
          to: toLoc,
          priority,
          carpoolSeats: parseInt(carpoolSeats) || 0,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPlanResult(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteCommute = async (option: any) => {
    setCompletingTrip(true);
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromLoc,
          to: toLoc,
          mode: option.mode,
          cost: option.cost,
          distance: option.distance,
          time: option.time,
          co2: option.co2,
          ecoScore: option.ecoScore,
          moneySaved: option.moneySaved,
          co2Saved: option.co2Saved,
          companyId: "demo-company-1",
          employeeId: "GT001",
        }),
      });
      if (res.ok) {
        setTripCompletedSuccess(true);
      }
    } catch (err) {
      console.error("Trip completion error:", err);
    } finally {
      setCompletingTrip(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar role="employee" />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 text-white shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold mb-1">
              <Sparkles className="w-4 h-4" /> GreenTech Corporate Commute Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Good morning, Rahul Verma</h1>
            <p className="text-emerald-100/90 text-sm mt-1">
              Employee ID: <span className="font-mono bg-emerald-700/50 px-2 py-0.5 rounded">GT001</span> • Office: Vijay Nagar HQ
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
            <Trophy className="w-8 h-8 text-amber-400" />
            <div>
              <div className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">Leaderboard</div>
              <div className="text-xl font-bold text-white">#3 in GreenTech</div>
            </div>
          </div>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-emerald-600 text-white border-none shadow-md">
            <CardContent className="p-4 sm:p-6 flex flex-col justify-center items-center text-center">
              <Leaf className="w-7 h-7 mb-2 opacity-90" />
              <p className="text-emerald-100 text-xs sm:text-sm font-medium">Eco Score</p>
              <p className="text-3xl font-bold">92<span className="text-sm font-normal text-emerald-200">/100</span></p>
              <span className="text-[11px] bg-emerald-500/60 px-2 py-0.5 rounded-full mt-2 font-medium">Top 5% Eco Tier</span>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <Zap className="w-7 h-7 text-amber-500 mx-auto mb-2" />
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Green Points</p>
              <p className="text-3xl font-bold text-slate-900">450</p>
              <span className="text-[11px] text-emerald-600 font-medium">+20 pts from last ride</span>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <Activity className="w-7 h-7 text-blue-500 mx-auto mb-2" />
              <p className="text-slate-500 text-xs sm:text-sm font-medium">CO₂ Avoided</p>
              <p className="text-3xl font-bold text-slate-900">12.8<span className="text-sm font-normal text-slate-500">kg</span></p>
              <span className="text-[11px] text-slate-500">~6 trees equivalent</span>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <Wallet className="w-7 h-7 text-green-600 mx-auto mb-2" />
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Money Saved</p>
              <p className="text-3xl font-bold text-slate-900">₹2,340</p>
              <span className="text-[11px] text-slate-500">vs solo cab rides</span>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Commute Input & Recommendation */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-emerald-200 shadow-sm">
              <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 pb-4">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-slate-900">
                  <Navigation className="w-5 h-5 text-emerald-600" />
                  Today's Corporate Commute
                </CardTitle>
                <CardDescription>
                  Enter your daily journey to evaluate transport modes, find company carpool matches, and log green credits.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-4" onSubmit={handlePlanSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">From (Home)</label>
                      <select
                        className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={fromLoc}
                        onChange={(e) => setFromLoc(e.target.value)}
                      >
                        {INDORE_LOCATIONS.map((l) => (
                          <option key={l.id || l.name} value={l.name}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">To (Office)</label>
                      <select
                        className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={toLoc}
                        onChange={(e) => setToLoc(e.target.value)}
                      >
                        {INDORE_LOCATIONS.map((l) => (
                          <option key={l.id || l.name} value={l.name}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Priority Profile</label>
                      <select
                        className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="balanced">Balanced (Cost + Eco + Time)</option>
                        <option value="eco-friendly">Eco-Friendly (Max CO₂ Reduction)</option>
                        <option value="save-money">Cost-Saver (Lowest Fare)</option>
                        <option value="save-time">Fastest Commute</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Carpool Seats Offered</label>
                      <Input
                        type="number"
                        min="0"
                        max="4"
                        value={carpoolSeats}
                        onChange={(e) => setCarpoolSeats(e.target.value)}
                        className="h-10"
                        placeholder="Seats available"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base font-semibold shadow-sm">
                    Find Best Option
                  </Button>
                </form>

                {tripCompletedSuccess && (
                  <div className="mt-6 p-4 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center gap-3 text-emerald-900">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Commute Completed & Green Points Credited!</h4>
                      <p className="text-xs text-emerald-800">
                        Automation event dispatched to viaSocket. HR leaderboard updated.
                      </p>
                    </div>
                  </div>
                )}

                {/* Recommendation Results */}
                {isPlanning && planResult && (
                  <div className="mt-8 space-y-4 animate-in fade-in duration-300">
                    <h3 className="font-bold text-slate-900 text-base border-b pb-2 flex items-center justify-between">
                      <span>Evaluated Commute Options</span>
                      <span className="text-xs font-normal text-slate-500">
                        {fromLoc} → {toLoc} ({formatDistance(planResult.recommended?.distance)})
                      </span>
                    </h3>

                    {/* Best Recommended Option */}
                    <div className="relative overflow-hidden border-2 border-emerald-500 rounded-2xl p-5 bg-emerald-50/40">
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3.5 py-1 rounded-bl-xl flex items-center gap-1">
                        <Leaf className="w-3.5 h-3.5" /> BEST RECOMMENDED OPTION
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mt-2">
                        <div className="flex items-center gap-3.5">
                          <div className="p-3.5 bg-emerald-100 text-emerald-800 rounded-2xl">
                            {planResult.recommended.mode === "bus" && <Bus className="w-7 h-7" />}
                            {planResult.recommended.mode === "carpool" && <Users className="w-7 h-7" />}
                            {planResult.recommended.mode === "cycling" && <Leaf className="w-7 h-7" />}
                            {planResult.recommended.mode === "cab" && <Car className="w-7 h-7" />}
                            {planResult.recommended.mode === "personal" && <Car className="w-7 h-7" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-xl text-slate-900 capitalize">
                              {planResult.recommended.mode === "bus" ? "BRTS / Public Bus" : planResult.recommended.mode}
                            </h4>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {formatDuration(planResult.recommended.time)} • {formatDistance(planResult.recommended.distance)} • {formatCO2(planResult.recommended.co2)} CO₂
                            </p>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <div className="text-2xl font-black text-slate-900">{formatCurrency(planResult.recommended.cost)}</div>
                          <div className="text-xs text-emerald-700 font-bold">
                            Eco Score: {planResult.recommended.ecoScore}/100
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 p-3 rounded-xl border border-emerald-200 mt-4 text-xs text-slate-700">
                        <span className="font-semibold text-emerald-800">Why recommended: </span>
                        {planResult.recommended.reason}
                      </div>

                      <Button
                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 h-11 text-sm font-semibold shadow-sm"
                        onClick={() => handleCompleteCommute(planResult.recommended)}
                        disabled={completingTrip}
                      >
                        {completingTrip ? "Recording Commute..." : "Complete Commute & Earn Green Points"}
                      </Button>
                    </div>

                    {/* Carpool match if available */}
                    {planResult.carpoolMatch && (
                      <div className="border border-purple-200 rounded-2xl p-4 bg-purple-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-slate-900 text-sm">
                                Carpool with {planResult.carpoolMatch.driverName}
                              </h5>
                              <span className="bg-purple-200 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {planResult.carpoolMatch.availableSeats} seats
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">
                              Departs {planResult.carpoolMatch.departureTime} • {formatCurrency(planResult.carpoolMatch.estimatedCost)}/seat • Saves {formatCurrency(planResult.carpoolMatch.estimatedSavings)}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-300 text-purple-800 hover:bg-purple-100"
                          onClick={() => handleCompleteCommute({
                            mode: "carpool",
                            cost: planResult.carpoolMatch.estimatedCost,
                            distance: planResult.recommended.distance,
                            time: 25,
                            co2: planResult.carpoolMatch.estimatedCO2PerPerson,
                            ecoScore: 88,
                            moneySaved: planResult.carpoolMatch.estimatedSavings,
                            co2Saved: 1.1,
                          })}
                        >
                          Join Carpool
                        </Button>
                      </div>
                    )}

                    {/* Other alternatives */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Other Available Modes</h4>
                      {planResult.options.slice(1).map((opt: any, idx: number) => (
                        <div
                          key={idx}
                          className="border border-slate-200 rounded-xl p-3.5 bg-white flex items-center justify-between hover:border-slate-300 transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-sm capitalize text-slate-800">{opt.mode}</p>
                            <p className="text-xs text-slate-500">
                              {formatDuration(opt.time)} • {formatDistance(opt.distance)} • {formatCO2(opt.co2)} CO₂
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900 text-sm">{formatCurrency(opt.cost)}</p>
                            <p className="text-xs text-slate-500">Score: {opt.ecoScore}/100</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel: Leaderboard & Policy */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  GreenTech Commute Leaderboard
                </CardTitle>
                <CardDescription>Top colleagues this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {[
                  { rank: 1, name: "Sneha Gupta", score: 94, points: 620, mode: "Cycling" },
                  { rank: 2, name: "Nisha Tiwari", score: 91, points: 550, mode: "Cycling" },
                  { rank: 3, name: "Rahul Verma (You)", score: 87, points: 450, mode: "BRTS / Carpool" },
                  { rank: 4, name: "Kavita Sharma", score: 85, points: 410, mode: "Bus" },
                  { rank: 5, name: "Vikram Singh", score: 82, points: 440, mode: "Carpool" },
                ].map((emp, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm ${
                      emp.name.includes("You")
                        ? "bg-emerald-50 border border-emerald-200 font-semibold"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0
                            ? "bg-amber-100 text-amber-800"
                            : i === 1
                            ? "bg-slate-200 text-slate-700"
                            : i === 2
                            ? "bg-amber-50 text-amber-900"
                            : "text-slate-500"
                        }`}
                      >
                        #{emp.rank}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-slate-900">{emp.name}</p>
                        <p className="text-[11px] text-slate-500">{emp.mode}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-700">{emp.points} pts</span>
                      <p className="text-[10px] text-slate-400">Score {emp.score}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Leaf className="w-4 h-4" /> Company Commute Policy
                </div>
                <h4 className="font-bold text-base text-white">Monthly Sustainable Bonus</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Employees with Eco Score &gt; 80 receive ₹2,000 corporate transit subsidy & parking priority.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
                  <span>Current Tier: <strong className="text-emerald-400">Eligible</strong></span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
