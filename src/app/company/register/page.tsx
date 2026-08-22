"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Building2, MapPin, Clock, DollarSign, Bus, Car, Bike, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INDORE_LOCATIONS, TRANSPORT_MODES } from "@/lib/config";

export default function CompanyRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      role: "company",
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      officeLocation: formData.get("officeLocation"),
      workingHours: `${formData.get("startTime")} - ${formData.get("endTime")}`,
      commutePolicy: formData.get("commutePolicy"),
      monthlyBudget: Number(formData.get("monthlyBudget")),
      transportOptions: Array.from(formData.getAll("transportOptions")),
      rewardRules: formData.get("rewardRules"),
      bestEmployeeCriteria: formData.get("bestEmployeeCriteria"),
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      router.push("/company/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl border-emerald-100 shadow-xl shadow-emerald-900/5">
        <CardHeader className="space-y-1 text-center bg-emerald-50/50 rounded-t-xl pb-8 pt-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-emerald-950">
            Register your Company
          </CardTitle>
          <CardDescription className="text-emerald-700/80 text-base">
            Join EcoCommute and build a sustainable workplace
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                Company Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" name="name" required placeholder="GreenTech Corp" className="focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="admin@greentech.in" className="focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required className="focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officeLocation">Office Location</Label>
                  <select
                    id="officeLocation"
                    name="officeLocation"
                    required
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select location...</option>
                    {INDORE_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Work Policies
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Working Hours Start</Label>
                  <Input id="startTime" name="startTime" type="time" required defaultValue="09:00" className="focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Working Hours End</Label>
                  <Input id="endTime" name="endTime" type="time" required defaultValue="18:00" className="focus-visible:ring-emerald-500" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="commutePolicy">Employee Commute Policy</Label>
                  <textarea
                    id="commutePolicy"
                    name="commutePolicy"
                    rows={3}
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    placeholder="Briefly describe your company's commute policy..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Bus className="w-5 h-5 text-emerald-600" />
                Transport & Rewards
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyBudget">Monthly Commute & Reward Budget (₹)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <Input id="monthlyBudget" name="monthlyBudget" type="number" required min="0" placeholder="50000" className="pl-10 focus-visible:ring-emerald-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Supported Transport Modes</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TRANSPORT_MODES.map((mode) => (
                      <label key={mode} className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                        <input
                          type="checkbox"
                          name="transportOptions"
                          value={mode}
                          className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium capitalize">{mode.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rewardRules">Reward Rules</Label>
                  <textarea
                    id="rewardRules"
                    name="rewardRules"
                    rows={2}
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    placeholder="e.g., 100 points for carpool, 50 points for EV..."
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bestEmployeeCriteria">Best Employee Criteria</Label>
                  <textarea
                    id="bestEmployeeCriteria"
                    name="bestEmployeeCriteria"
                    rows={2}
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    placeholder="e.g., Highest eco score, most carpools offered..."
                  ></textarea>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
            >
              {isLoading ? "Registering..." : "Register Company"}
              <Send className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
