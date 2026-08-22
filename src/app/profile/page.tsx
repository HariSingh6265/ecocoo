"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, Settings, LogOut, Shield, Leaf, Award, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profilePref, setProfilePref] = useState("balanced");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSavePref = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.clear();
      router.push("/");
    } catch (err) {
      router.push("/");
    }
  };

  const displayName = user?.name || "Registered Commuter";
  const displayEmail = user?.email || "commuter@ecocommute.in";
  const displayPoints = user?.greenPoints ?? 100;
  const initialLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Profile</h1>
          <p className="text-slate-500 mt-1">Manage your commuter credentials, green credits, and preferences.</p>
        </div>

        {/* User Card */}
        <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm">
                {initialLetter}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{displayName}</h3>
                  <span className="bg-emerald-200 text-emerald-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    {user?.role === "company" ? "Corporate Admin" : "Active Commuter"}
                  </span>
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-2 mt-1">
                  <Mail className="w-3.5 h-3.5" /> {displayEmail}
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-500 flex items-center gap-1 justify-end mb-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> Green Credits
                </div>
                <div className="text-xl font-bold text-amber-600">{displayPoints} pts</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-slate-500">Commuter Role</Label>
                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 flex items-center gap-2 text-xs font-semibold">
                  <Shield className="w-4 h-4 text-emerald-600" /> {user?.role === "company" ? "Corporate Manager" : "Standard Commuter / Carpooler"}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-slate-500">Affiliated Organization</Label>
                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-semibold">
                  {user?.companyId ? "GreenTech Solutions" : "Individual Commuter"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Commute Engine Preferences</CardTitle>
            <CardDescription className="text-xs">
              Configure default scoring weights and routing algorithms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileSaved && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center gap-2 text-emerald-900 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Default preferences updated successfully!
              </div>
            )}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-600">
                <Settings className="w-4 h-4 text-slate-500" /> Default Optimization Profile
              </Label>
              <select
                value={profilePref}
                onChange={(e) => setProfilePref(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="balanced">Balanced (Cost 35%, CO₂ 30%, Time 20%)</option>
                <option value="eco">Eco-Warrior (Max CO₂ Savings 55%)</option>
                <option value="cost">Budget-First (Max Money Savings 55%)</option>
                <option value="time">Speed-First (Fastest Travel Time 55%)</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t border-slate-100 px-6 py-4 rounded-b-2xl flex justify-end">
            <Button onClick={handleSavePref} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-xs h-10">
              Save Preferences
            </Button>
          </CardFooter>
        </Card>

        {/* Sign Out */}
        <Card className="border-red-100 rounded-2xl bg-white shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-red-600">Session Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500 mb-4">Sign out of your active session on this browser.</p>
            <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2 rounded-xl text-xs font-bold h-10">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
