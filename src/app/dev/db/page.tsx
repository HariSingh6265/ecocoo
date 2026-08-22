"use client";

import { useEffect, useState } from "react";
import { Database, Shield, Users, Building2, MapPin, Gift, Cpu, FileText, RefreshCw, EyeOff, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/navbar";

const TABLES = [
  { id: "users", label: "Users", icon: Users },
  { id: "companies", label: "Companies", icon: Building2 },
  { id: "employees", label: "Employees", icon: Users },
  { id: "trips", label: "Trips Ledger", icon: MapPin },
  { id: "rewards", label: "Rewards & Wallet", icon: Gift },
  { id: "automationEvents", label: "viaSocket Events", icon: Cpu },
  { id: "auditLogs", label: "Audit Logs", icon: FileText },
];

export default function DevDbExplorerPage() {
  const [selectedTable, setSelectedTable] = useState("users");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async (table: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dev/db?table=${table}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedTable);
  }, [selectedTable]);

  const filtered = records.filter((r) =>
    JSON.stringify(r).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">
              <Database className="w-4 h-4" /> Internal Developer Database Explorer
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Database Inspection Tool</h1>
            <p className="text-slate-500 text-sm">
              Live inspection of application entities, trips, and audit tables.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-2xl text-amber-900 text-xs font-medium shrink-0">
            <EyeOff className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Zero Password Policy: All credentials redacted from query layer</span>
          </div>
        </div>

        {/* Table Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {TABLES.map((t) => {
            const Icon = t.icon;
            const active = selectedTable === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTable(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Search & Refresh */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder={`Filter in ${selectedTable}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 rounded-xl bg-slate-50 border-slate-200 text-xs"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => loadData(selectedTable)}
            className="rounded-xl text-xs font-bold"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh Table ({filtered.length} rows)
          </Button>
        </div>

        {/* Table / JSON Data Viewer */}
        <Card className="border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 capitalize">
              {selectedTable} Collection ({filtered.length} records)
            </CardTitle>
            <CardDescription className="text-xs">
              Raw database record view with strict redaction of sensitive credentials
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                Reading database collection...
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                No records found in table "{selectedTable}".
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-100">
                    <tr>
                      <th className="p-3">#</th>
                      {Object.keys(filtered[0] || {})
                        .slice(0, 7)
                        .map((key) => (
                          <th key={key} className="p-3">{key}</th>
                        ))}
                      <th className="p-3">Details (JSON)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filtered.map((row, idx) => {
                      const keys = Object.keys(row).slice(0, 7);
                      return (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 text-slate-400 font-bold">{idx + 1}</td>
                          {keys.map((k) => {
                            const val = row[k];
                            const displayVal = typeof val === "object" ? JSON.stringify(val) : String(val);
                            return (
                              <td key={k} className="p-3 text-slate-800 max-w-[200px] truncate" title={displayVal}>
                                {displayVal}
                              </td>
                            );
                          })}
                          <td className="p-3">
                            <details className="cursor-pointer">
                              <summary className="text-indigo-600 font-sans font-bold hover:underline">View Raw</summary>
                              <pre className="mt-2 p-3 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto text-[11px] max-w-xl">
                                {JSON.stringify(row, null, 2)}
                              </pre>
                            </details>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
