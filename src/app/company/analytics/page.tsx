"use client";

import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ComposedChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";

const monthlyData = [
  { name: 'Jan', co2: 400, cost: 2400, carpool: 24, active: 40 },
  { name: 'Feb', co2: 500, cost: 2800, carpool: 28, active: 45 },
  { name: 'Mar', co2: 650, cost: 3500, carpool: 35, active: 55 },
  { name: 'Apr', co2: 800, cost: 4200, carpool: 42, active: 65 },
  { name: 'May', co2: 950, cost: 5100, carpool: 48, active: 75 },
  { name: 'Jun', co2: 1200, cost: 6500, carpool: 55, active: 85 },
];

const scoreDistribution = [
  { range: '0-20', users: 5 },
  { range: '21-40', users: 15 },
  { range: '41-60', users: 45 },
  { range: '61-80', users: 120 },
  { range: '81-100', users: 265 },
];

const modeTrends = [
  { name: 'Mon', carpool: 40, bus: 30, ev: 20, solo: 10 },
  { name: 'Tue', carpool: 42, bus: 32, ev: 22, solo: 8 },
  { name: 'Wed', carpool: 45, bus: 30, ev: 25, solo: 5 },
  { name: 'Thu', carpool: 41, bus: 35, ev: 22, solo: 7 },
  { name: 'Fri', carpool: 38, bus: 28, ev: 20, solo: 15 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar role="company" />
      
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics & Reports</h1>
            <p className="text-slate-500">Deep dive into your company's sustainability metrics</p>
          </div>
          <div className="flex bg-white rounded-lg p-1 border border-slate-200">
            {['1w', '1m', '3m', '6m', '1y'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  timeRange === t ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cumulative CO₂ Savings (kg)</CardTitle>
              <CardDescription>Total environmental impact over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="co2" stroke="#10b981" fillOpacity={1} fill="url(#colorCo2)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Impact & Adoption</CardTitle>
              <CardDescription>Money saved vs active participants</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="cost" name="₹ Saved" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="active" name="Active Users" stroke="#f59e0b" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transport Mode Trends</CardTitle>
              <CardDescription>Daily breakdown of commuting methods</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={modeTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="carpool" stackId="1" stroke="#10b981" fill="#10b981" />
                  <Area type="monotone" dataKey="bus" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  <Area type="monotone" dataKey="ev" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                  <Area type="monotone" dataKey="solo" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eco Score Distribution</CardTitle>
              <CardDescription>Number of employees in each score range</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="users" name="Employees" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
