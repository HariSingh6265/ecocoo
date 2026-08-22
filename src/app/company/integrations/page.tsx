"use client";

import { useEffect, useState } from "react";
import {
  Webhook,
  CheckCircle2,
  AlertCircle,
  Clock,
  Play,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  Send,
  Cpu,
  RefreshCw,
  ExternalLink,
  Code2,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";

export default function IntegrationsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [selectedEventType, setSelectedEventType] = useState("commute.completed");

  const loadIntegrations = async () => {
    try {
      const res = await fetch("/api/company/integrations");
      if (res.ok) {
        setData(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIntegrations();
  }, []);

  const handleTriggerTest = async () => {
    setTriggering(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/company/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: selectedEventType,
          employeeId: "GT002",
          employeeName: "Sneha Gupta",
          transportMode: "cycling",
          cost: 0,
          co2Saved: 1.85,
          ecoScore: 94,
          greenPoints: 30,
        }),
      });
      if (res.ok) {
        const result = await res.json();
        setTestResult(result.event);
        await loadIntegrations();
      }
    } catch (err) {
      console.error("Trigger error:", err);
    } finally {
      setTriggering(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar role="company" />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Cpu className="w-4 h-4" /> Enterprise Automation Layer
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Automation & Integrations</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Connect viaSocket to automate corporate HR rewards, ESG compliance logs, and employee notifications.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadIntegrations}
            className="flex items-center gap-2 rounded-xl"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh Status
          </Button>
        </div>

        {/* Integration Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* viaSocket Core Status */}
          <Card className="md:col-span-2 border-slate-200 shadow-sm overflow-hidden bg-white">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-indigo-600"></div>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Webhook className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">viaSocket Webhook Layer</h3>
                      {data?.enabled && data?.configured ? (
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-slate-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Standby (Local Event Engine Active)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Architecture: EcoCommute Event Bus → viaSocket Webhook → HR / Slack / ESG Sheets
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 shrink-0">
                  <div>VIASOCKET_ENABLED: <strong>{data?.enabled ? "true" : "false"}</strong></div>
                  <div>STATUS: <strong>{data?.status || "ready"}</strong></div>
                </div>
              </div>

              {/* Supported Workflow Events */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Configured Workflow Event Dispatchers:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <code>commute.completed</code>
                  </div>
                  <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-950 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <code>employee.registered</code>
                  </div>
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <code>reward.earned</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Trigger Panel */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900">
                <Play className="w-4 h-4 text-emerald-600" />
                Dispatch Test Event
              </CardTitle>
              <CardDescription className="text-xs">
                Simulate a real-time event through viaSocket
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Select Event Type</label>
                <select
                  className="flex h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                >
                  <option value="commute.completed">commute.completed (Sustainable Ride)</option>
                  <option value="employee.registered">employee.registered (New Onboarding)</option>
                  <option value="reward.earned">reward.earned (Monthly Bonus)</option>
                  <option value="carpool.matched">carpool.matched (Ride Share)</option>
                </select>
              </div>

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-10 text-xs font-bold rounded-xl"
                onClick={handleTriggerTest}
                disabled={triggering}
              >
                <Send className="w-3.5 h-3.5 mr-2" />
                {triggering ? "Dispatching..." : "Send Event to viaSocket"}
              </Button>

              {testResult && (
                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono space-y-1">
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Event Dispatched
                  </div>
                  <div>ID: {testResult.eventId}</div>
                  <div>Status: {testResult.status}</div>
                  <div className="text-slate-400 truncate">{testResult.responseMessage}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Event Log */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">Recent Automation Events</CardTitle>
              <CardDescription className="text-xs">
                Chronological log of dispatched events, delivery status, and payload responses
              </CardDescription>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
              {data?.events?.length || 0} Total Events Logged
            </span>
          </CardHeader>
          <CardContent className="p-0">
            {data?.events?.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No automation events recorded yet. Complete a sustainable commute or trigger a test event above!
              </div>
            ) : (
              <div className="divide-y divide-slate-100 overflow-x-auto">
                {data?.events?.map((evt: any, idx: number) => {
                  const isDelivered = evt.status === "delivered";
                  const isLogged = evt.status === "logged_locally";

                  return (
                    <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {evt.eventType}
                          </code>
                          <span className="font-mono text-slate-400">{evt.eventId}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              isDelivered
                                ? "bg-emerald-100 text-emerald-800"
                                : isLogged
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {isDelivered ? "✓ Delivered to viaSocket" : isLogged ? "✓ Logged Locally (Demo Mode)" : "⚠ Webhook Dispatched"}
                          </span>
                        </div>
                        <p className="text-slate-600 truncate max-w-xl">
                          Employee: <strong>{evt.payload?.employeeName || evt.employeeId || "Rahul Verma"}</strong> • Mode: <strong className="capitalize">{evt.payload?.transportMode || "Sustainable"}</strong> • CO₂ Saved: <strong>{evt.payload?.co2Saved || 0} kg</strong> • Points: <strong>+{evt.payload?.greenPoints || 0}</strong>
                        </p>
                        {evt.responseMessage && (
                          <p className="text-[11px] text-slate-400 italic">
                            Response: {evt.responseMessage}
                          </p>
                        )}
                      </div>

                      <div className="text-slate-400 text-right shrink-0 flex md:flex-col items-center md:items-end justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDateTime(evt.createdAt)}</span>
                        </div>
                        {evt.statusCode && (
                          <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                            HTTP {evt.statusCode}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
