"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  MapPin,
  TrendingDown,
  DollarSign,
  Bus,
  Leaf,
  Trophy,
  ArrowRight,
  Activity,
  Car,
  Cpu,
  Award,
  BarChart3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import { formatCurrency, formatCO2 } from "@/lib/utils";

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#06b6d4", "#ef4444"];

export default function CompanyDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCompanyData() {
      try {
        const res = await fetch("/api/company/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadCompanyData();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar role="company" />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading corporate mobility analytics...</p>
          </div>
        </main>
      </div>
    );
  }

  const weeklyTrend = stats.weeklyTrend || [
    { week: "Week 1", co2Saved: 18.2, trips: 42 },
    { week: "Week 2", co2Saved: 21.5, trips: 48 },
    { week: "Week 3", co2Saved: 19.8, trips: 45 },
    { week: "Week 4", co2Saved: 16.9, trips: 38 },
  ];

  const modeDistribution = stats.modeDistribution || [
    { mode: "bus", count: 42, percentage: 35 },
    { mode: "carpool", count: 28, percentage: 23 },
    { mode: "cycling", count: 18, percentage: 15 },
    { mode: "personal", count: 14, percentage: 12 },
    { mode: "cab", count: 10, percentage: 8 },
    { mode: "walking", count: 8, percentage: 7 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar role="company" />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header & Quick Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Sparkles className="w-4 h-4" /> B2B Corporate Commute Command Center
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {stats.company?.name || "GreenTech Solutions"}
            </h1>
            <p className="text-slate-500 text-sm">
              Headquarters: {stats.company?.location || "Vijay Nagar, Indore"} • Live Sustainability Analytics
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link href="/company/employees">
              <Button variant="outline" className="border-slate-300 text-slate-700 rounded-xl text-xs font-bold h-10">
                <Users className="w-4 h-4 mr-1.5" /> Manage Employees
              </Button>
            </Link>
            <Link href="/company/rewards">
              <Button variant="outline" className="border-emerald-200 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-xs font-bold h-10">
                <Award className="w-4 h-4 mr-1.5" /> Rewards & Budget
              </Button>
            </Link>
            <Link href="/company/integrations">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold h-10 shadow-sm">
                <Cpu className="w-4 h-4 mr-1.5" /> viaSocket Automation
              </Button>
            </Link>
          </div>
        </div>

        {/* Top KPI Cards (Corporate) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Employees</span>
                  <span className="text-3xl font-extrabold text-slate-900">{stats.totalEmployees || 8}</span>
                  <span className="text-[11px] text-emerald-600 font-medium">100% onboarded</span>
                </div>
                <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Today's Trips</span>
                  <span className="text-3xl font-extrabold text-slate-900">{stats.todayTrips || 14}</span>
                  <span className="text-[11px] text-purple-600 font-medium">11 sustainable commutes</span>
                </div>
                <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 shadow-sm bg-emerald-50/40">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">CO₂ Avoided (Month)</span>
                  <span className="text-3xl font-extrabold text-emerald-700">{formatCO2(stats.co2SavedMonth || 76.4)}</span>
                  <span className="text-[11px] text-emerald-700 font-medium">+18% vs last month</span>
                </div>
                <div className="p-3.5 bg-emerald-100 text-emerald-700 rounded-2xl border border-emerald-200">
                  <TrendingDown className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Corporate Savings</span>
                  <span className="text-3xl font-extrabold text-slate-900">{formatCurrency(stats.moneySavedMonth || 14820)}</span>
                  <span className="text-[11px] text-slate-500">Transit expense saved</span>
                </div>
                <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metric Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900 text-white border-none rounded-2xl shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Sustainable Commute Rate
                  </span>
                  <Leaf className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex items-end gap-3 mt-2">
                  <span className="text-4xl font-extrabold text-emerald-400">{stats.sustainablePercentage || 68}%</span>
                  <span className="text-xs text-slate-300 mb-1">of all employee journeys</span>
                </div>
                <div className="mt-4 w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${stats.sustainablePercentage || 68}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Carpool Adoption Rate
                </p>
                <p className="text-3xl font-extrabold text-slate-900">{stats.carpoolRate || 28}%</p>
                <p className="text-xs text-purple-700 font-medium mt-1">4 active carpool groups</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Car className="w-7 h-7" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Public Transit / BRTS Usage
                </p>
                <p className="text-3xl font-extrabold text-slate-900">{stats.publicTransportUsage || 42}%</p>
                <p className="text-xs text-blue-700 font-medium mt-1">iBus corridor passes utilized</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Bus className="w-7 h-7" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts & Leaderboard Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Impact Trend Line Chart */}
            <Card className="border-slate-200 shadow-sm bg-white rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-900">Weekly Sustainability Trends</CardTitle>
                <CardDescription className="text-xs">
                  CO₂ emissions avoided (kg) vs logged employee trips
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      name="CO₂ Saved (kg)"
                      dataKey="co2Saved"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      name="Commute Trips"
                      dataKey="trips"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mode Distribution & viaSocket Integration Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-slate-200 shadow-sm bg-white rounded-2xl">
                <CardHeader className="pb-1">
                  <CardTitle className="text-base font-bold text-slate-900">Transport Distribution</CardTitle>
                  <CardDescription className="text-xs">Split of employee transit choices</CardDescription>
                </CardHeader>
                <CardContent className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={modeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="percentage"
                      >
                        {modeDistribution.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "11px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-none rounded-2xl shadow-md p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <Cpu className="w-4 h-4" /> viaSocket Automation Status
                  </div>
                  <h4 className="text-lg font-bold">HR & ESG Automations Active</h4>
                  <p className="text-xs text-indigo-200/80 mt-1 leading-relaxed">
                    Auto-credit employee rewards when sustainable commute milestones are completed. Sync with HR spreadsheets & Slack notifications.
                  </p>
                </div>

                <div className="pt-4">
                  <Link href="/company/integrations">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs h-10 rounded-xl">
                      Open Integrations Hub <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* Top Employees Leaderboard Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full border-slate-200 shadow-sm bg-white rounded-2xl">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <CardTitle className="text-base font-bold text-slate-900">Green Commuters Leaderboard</CardTitle>
                </div>
                <CardDescription className="text-xs">Top ranking employees for monthly rewards</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {stats.topEmployees?.map((emp: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                            index === 0
                              ? "bg-amber-100 text-amber-800 ring-2 ring-amber-300"
                              : index === 1
                              ? "bg-slate-200 text-slate-700"
                              : index === 2
                              ? "bg-amber-50 text-amber-900"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{emp.name}</p>
                          <p className="text-xs text-slate-500">{emp.trips} trips completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-bold">
                          {emp.ecoScore}/100
                        </div>
                        <p className="text-xs font-semibold text-amber-600 mt-0.5">+{emp.greenPoints} pts</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/company/employees" className="block mt-6">
                  <Button variant="outline" className="w-full text-xs font-bold rounded-xl h-10 border-slate-200">
                    View All Employees <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
