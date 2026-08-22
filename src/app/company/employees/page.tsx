"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Leaf,
  Car,
  Bus,
  MapPin,
  Award,
  Plus,
  UserCheck,
  CheckCircle2,
  X,
  Send,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/navbar";
import { formatCO2, formatCurrency } from "@/lib/utils";
import { INDORE_LOCATIONS } from "@/lib/config";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Form state
  const [empCode, setEmpCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [homeLoc, setHomeLoc] = useState("Palasia");
  const [officeLoc, setOfficeLoc] = useState("Vijay Nagar");
  const [arrivalTime, setArrivalTime] = useState("09:00");
  const [departureTime, setDepartureTime] = useState("18:00");
  const [preferredMode, setPreferredMode] = useState("bus");

  const loadEmployees = async () => {
    try {
      const res = await fetch("/api/company/employees");
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/company/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeCode: empCode || `GT00${Math.floor(10 + Math.random() * 90)}`,
          name,
          email,
          homeLocation: { name: homeLoc, lat: 22.7236, lng: 75.8824 },
          officeLocation: { name: officeLoc, lat: 22.7533, lng: 75.8937 },
          arrivalTime,
          departureTime,
          preferredMode,
        }),
      });

      if (res.ok) {
        setSuccessMsg(`Employee "${name}" registered and viaSocket event dispatched!`);
        setShowAddModal(false);
        // Reset form
        setName("");
        setEmail("");
        setEmpCode("");
        await loadEmployees();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = employees
    .filter(
      (e) =>
        (e.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.employeeCode || e.code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "score") return (b.ecoScore || 0) - (a.ecoScore || 0);
      if (sortBy === "points") return (b.greenPoints || 0) - (a.greenPoints || 0);
      if (sortBy === "trips") return (b.totalTrips || 0) - (a.totalTrips || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar role="company" />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Building2 className="w-4 h-4" /> GreenTech Employee Commute Directory
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Employee Management</h1>
            <p className="text-slate-500 text-sm">
              Manage one-time registrations, origin-destination profiles, and carbon footprints.
            </p>
          </div>

          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold h-11 shadow-sm shrink-0"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Register New Employee
          </Button>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Search & Sort Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-200">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by employee name, code (e.g. GT001), or email..."
              className="pl-10 bg-slate-50 border-slate-200 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="flex h-10 w-[200px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="score">Sort by Eco Score</option>
              <option value="points">Sort by Green Points</option>
              <option value="trips">Sort by Logged Trips</option>
            </select>
          </div>
        </div>

        {/* Employee Cards Grid */}
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            Loading registered employees...
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-dashed p-12 text-center text-slate-500">
            No employees found matching your search criteria.
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((emp, idx) => {
              const home = emp.homeLocation?.name || emp.home || "Palasia";
              const office = emp.officeLocation?.name || emp.office || "Vijay Nagar";
              const score = emp.ecoScore || emp.score || 80;
              const points = emp.greenPoints || emp.points || 250;
              const trips = emp.totalTrips || 24;
              const co2Saved = emp.totalCO2Saved || emp.co2 || 8.5;
              const moneySaved = emp.totalMoneySaved || emp.saved || 1500;
              const code = emp.employeeCode || emp.code || `GT00${idx + 1}`;

              return (
                <Card key={emp._id || emp.id || idx} className="overflow-hidden hover:shadow-md transition-shadow rounded-2xl border-slate-200 bg-white">
                  <div
                    className={`h-2 w-full ${
                      score >= 90 ? "bg-emerald-500" : score >= 75 ? "bg-blue-500" : "bg-amber-500"
                    }`}
                  />
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{emp.name}</h3>
                        <p className="text-xs font-mono text-slate-500">{code} • {emp.email}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            score >= 90
                              ? "bg-emerald-100 text-emerald-800"
                              : score >= 75
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          Score: {score}/100
                        </span>
                        <span className="text-xs text-amber-600 font-bold mt-1 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> {points} pts
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate font-medium">{home} → {office}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Preferred Mode</span>
                        <span className="font-bold text-slate-800 capitalize">{emp.preferredMode || "Bus"}</span>
                      </div>
                      <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Work Shift</span>
                        <span className="font-bold text-slate-800">
                          {emp.arrivalTime || "09:00"} - {emp.departureTime || "18:00"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                      <div className="flex items-center gap-1">
                        <Leaf className="w-3.5 h-3.5" />
                        <span>-{formatCO2(co2Saved)} CO₂</span>
                      </div>
                      <div>
                        <span>+{formatCurrency(moneySaved)} saved</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Modal: One-Time Employee Registration */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-none my-8 overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">One-Time Employee Registration</h3>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Onboard employee and trigger automated viaSocket HR webhook
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <CardContent className="p-6">
                <form onSubmit={handleAddEmployee} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-bold uppercase text-slate-600">Full Name</Label>
                      <Input
                        id="name"
                        required
                        placeholder="e.g. Meera Joshi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl h-10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="empCode" className="text-xs font-bold uppercase text-slate-600">Employee ID</Label>
                      <Input
                        id="empCode"
                        placeholder="GT009"
                        value={empCode}
                        onChange={(e) => setEmpCode(e.target.value)}
                        className="rounded-xl h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-600">Company Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="meera@greentech.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl h-10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="homeLoc" className="text-xs font-bold uppercase text-slate-600">Home Location</Label>
                      <select
                        id="homeLoc"
                        className="flex h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={homeLoc}
                        onChange={(e) => setHomeLoc(e.target.value)}
                      >
                        {INDORE_LOCATIONS.map((l) => (
                          <option key={l.id || l.name} value={l.name}>{l.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="officeLoc" className="text-xs font-bold uppercase text-slate-600">Office Location</Label>
                      <select
                        id="officeLoc"
                        className="flex h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={officeLoc}
                        onChange={(e) => setOfficeLoc(e.target.value)}
                      >
                        {INDORE_LOCATIONS.map((l) => (
                          <option key={l.id || l.name} value={l.name}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="arrival" className="text-xs font-bold uppercase text-slate-600">Arrival</Label>
                      <Input
                        id="arrival"
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="rounded-xl h-10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="departure" className="text-xs font-bold uppercase text-slate-600">Departure</Label>
                      <Input
                        id="departure"
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="rounded-xl h-10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prefMode" className="text-xs font-bold uppercase text-slate-600">Preferred</Label>
                      <select
                        id="prefMode"
                        className="flex h-10 w-full rounded-xl border border-slate-300 bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={preferredMode}
                        onChange={(e) => setPreferredMode(e.target.value)}
                      >
                        <option value="bus">Bus</option>
                        <option value="carpool">Carpool</option>
                        <option value="cycling">Cycling</option>
                        <option value="cab">Cab</option>
                        <option value="personal">Personal</option>
                        <option value="walking">Walking</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddModal(false)}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold"
                      disabled={submitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {submitting ? "Registering..." : "Complete Registration"}
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
