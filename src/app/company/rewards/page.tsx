"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Gift,
  Star,
  Zap,
  UserPlus,
  IndianRupee,
  CheckCircle2,
  TrendingUp,
  X,
  Send,
  Building2,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/navbar";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function RewardsPage() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Form
  const [empName, setEmpName] = useState("Rahul Verma");
  const [empId, setEmpId] = useState("GT001");
  const [points, setPoints] = useState("200");
  const [amount, setAmount] = useState("1000");
  const [reason, setReason] = useState("Top Weekly Carpool Organizer");

  const loadRewards = async () => {
    try {
      const res = await fetch("/api/company/rewards");
      if (res.ok) {
        const data = await res.json();
        setRewards(data.rewards || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRewards();
  }, []);

  const handleAwardReward = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/company/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: empId,
          employeeName: empName,
          points: parseInt(points) || 100,
          amount: parseFloat(amount) || 500,
          reason,
        }),
      });

      if (res.ok) {
        setSuccessMsg(`Reward granted to ${empName}! viaSocket webhook dispatched.`);
        setShowModal(false);
        await loadRewards();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar role="company" />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Building2 className="w-4 h-4" /> GreenTech Rewards Program
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Corporate Rewards & Budget</h1>
            <p className="text-slate-500 text-sm">
              Incentivize clean transit choices and distribute corporate commuter bonuses.
            </p>
          </div>

          <Button
            onClick={() => setShowModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold h-11 shadow-sm shrink-0"
          >
            <Gift className="w-4 h-4 mr-2" />
            Distribute Employee Reward
          </Button>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Budget & Program Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="border-slate-200 bg-white shadow-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Reward Budget</p>
                  <p className="text-3xl font-extrabold text-slate-900 mt-1">₹50,000</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">₹14,500 disbursed this month</p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                  <IndianRupee className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Green Points Pool</p>
                  <p className="text-3xl font-extrabold text-amber-600 mt-1">12,450</p>
                  <p className="text-xs text-slate-500 mt-1">Cumulative employee earnings</p>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Eligible Employees</p>
                  <p className="text-3xl font-extrabold text-indigo-600 mt-1">8 / 8</p>
                  <p className="text-xs text-indigo-600 font-semibold mt-1">100% active in program</p>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reward Rules & Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-slate-200 shadow-sm bg-white rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <Star className="w-5 h-5 text-amber-500" /> Configured Corporate Reward Rules
              </CardTitle>
              <CardDescription className="text-xs">
                Incentive criteria configured in your company profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 border border-emerald-100 rounded-2xl bg-emerald-50/50 flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Carpool Ride Hosting</h4>
                    <p className="text-xs text-slate-600 mt-0.5">+20 Green Points + ₹50 transit fuel credit per passenger</p>
                  </div>
                </div>

                <div className="p-4 border border-blue-100 rounded-2xl bg-blue-50/50 flex items-start gap-3">
                  <div className="p-2.5 bg-blue-100 text-blue-800 rounded-xl shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">BRTS / EV Commuting</h4>
                    <p className="text-xs text-slate-600 mt-0.5">+15 Green Points + 100% corporate monthly pass reimbursement</p>
                  </div>
                </div>

                <div className="p-4 border border-teal-100 rounded-2xl bg-teal-50/50 flex items-start gap-3">
                  <div className="p-2.5 bg-teal-100 text-teal-800 rounded-xl shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Active Cycling / Walking</h4>
                    <p className="text-xs text-slate-600 mt-0.5">+30 Green Points per trip + corporate wellness reward</p>
                  </div>
                </div>

                <div className="p-4 border border-purple-100 rounded-2xl bg-purple-50/50 flex items-start gap-3">
                  <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Monthly Top Eco-Performer</h4>
                    <p className="text-xs text-slate-600 mt-0.5">₹2,000 cash bonus + reserved EV parking slot</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Rankings */}
          <Card className="border-slate-200 shadow-sm bg-white rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Monthly Award Candidates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {[
                { name: "Sneha Gupta", score: 94, reason: "30 Cycling Trips" },
                { name: "Nisha Tiwari", score: 91, reason: "26 Clean Commutes" },
                { name: "Rahul Verma", score: 87, reason: "24 Shared Rides" },
              ].map((c, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                  <div>
                    <p className="font-bold text-xs text-slate-900">{c.name}</p>
                    <p className="text-[11px] text-slate-500">{c.reason}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    Score {c.score}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Distributed Rewards Log */}
        <Card className="border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-900">Reward Distribution Ledger</CardTitle>
            <CardDescription className="text-xs">
              History of bonuses and green points awarded to team members
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {rewards.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No rewards distributed yet. Click "Distribute Employee Reward" to award your first bonus!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {rewards.map((r: any, idx: number) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-sm text-slate-900">{r.employeeName || "Rahul Verma"}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{r.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-emerald-700 text-sm">+{r.points} Green Points</p>
                      {r.amount && (
                        <p className="text-xs font-semibold text-slate-700">Bonus: {formatCurrency(r.amount)}</p>
                      )}
                      <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(r.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Distribute Reward Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-emerald-600 p-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Grant Employee Reward</h3>
                  <p className="text-xs text-emerald-100">Auto-dispatches viaSocket webhook workflow</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white hover:bg-white/20 p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <CardContent className="p-6">
                <form onSubmit={handleAwardReward} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase text-slate-600">Employee Name</Label>
                    <Input
                      required
                      value={empName}
                      onChange={(e) => setEmpName(e.target.value)}
                      className="rounded-xl h-10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase text-slate-600">Green Points</Label>
                      <Input
                        type="number"
                        required
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        className="rounded-xl h-10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase text-slate-600">Bonus Amount (₹)</Label>
                      <Input
                        type="number"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="rounded-xl h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase text-slate-600">Recognition Reason</Label>
                    <Input
                      required
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="rounded-xl h-10"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl" disabled={submitting}>
                      <Send className="w-4 h-4 mr-2" />
                      {submitting ? "Awarding..." : "Grant & Dispatch Event"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
