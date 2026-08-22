"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Leaf, Coins, Target, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DEMO_CHART_DATA = [
  { name: 'Jan', co2: 12, money: 450 },
  { name: 'Feb', co2: 18, money: 620 },
  { name: 'Mar', co2: 24, money: 850 },
  { name: 'Apr', co2: 30, money: 1100 },
  { name: 'May', co2: 45, money: 1550 },
  { name: 'Jun', co2: 60, money: 2100 },
];

const MODE_DATA = [
  { name: 'Bus', value: 35 },
  { name: 'Carpool', value: 25 },
  { name: 'Cycling', value: 20 },
  { name: 'Walking', value: 10 },
  { name: 'Cab', value: 10 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function ImpactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Impact</h1>
          <p className="text-gray-500 mt-1">Visualize your contribution to a greener planet.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full text-green-600"><Leaf className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total CO₂ Saved</p>
                <h3 className="text-2xl font-bold text-gray-900">189 kg</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full text-yellow-600"><Coins className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Money Saved</p>
                <h3 className="text-2xl font-bold text-gray-900">₹6,670</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Target className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Eco Score</p>
                <h3 className="text-2xl font-bold text-gray-900">84/100</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600"><TrendingUp className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Trips</p>
                <h3 className="text-2xl font-bold text-gray-900">42</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>CO₂ Saved Over Time</CardTitle>
              <CardDescription>Cumulative carbon emissions avoided (kg)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEMO_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Money Saved Over Time</CardTitle>
              <CardDescription>Cumulative savings vs cab fares (₹)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEMO_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="money" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Transport Mode Distribution</CardTitle>
              <CardDescription>Percentage of trips by transport mode</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full flex flex-col md:flex-row items-center">
              <div className="flex-1 w-full h-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MODE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {MODE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 mt-4 md:mt-0 px-4">
                {MODE_DATA.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  );
}
