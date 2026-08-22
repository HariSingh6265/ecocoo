"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Building2, User, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@ecocommute.in");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user?.role === "company") {
          router.push("/company/dashboard");
        } else if (data.user?.role === "employee") {
          router.push("/employee/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        const data = await res.json();
        setError(data.error || "Invalid login credentials");
      }
    } catch (err) {
      setError("An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border border-slate-200 rounded-3xl bg-white overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 to-indigo-600"></div>
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-2 shadow-xs">
            <Leaf className="w-6 h-6 fill-current" />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900">Sign in to EcoCommute</CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Access your B2C commuter profile or B2B corporate portal
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Quick Demo Logins */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              Quick 1-Click Demo Logins:
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => fillCredentials("demo@ecocommute.in", "demo1234")}
                className="p-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold transition-all text-center"
              >
                B2C User
              </button>
              <button
                type="button"
                onClick={() => fillCredentials("admin@greentech.in", "company1234")}
                className="p-2 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold transition-all text-center"
              >
                B2B Admin
              </button>
              <button
                type="button"
                onClick={() => fillCredentials("rahul@greentech.in", "employee1234")}
                className="p-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold transition-all text-center"
              >
                Employee
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-600">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@ecocommute.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold uppercase text-slate-600">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="demo1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 rounded-xl"
              />
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 font-bold rounded-xl" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In to Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t border-slate-100 pt-4 bg-slate-50/50">
          <div className="text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-emerald-700 hover:underline font-bold">
              Sign up as Commuter
            </Link>{" "}
            or{" "}
            <Link href="/company/register" className="text-indigo-700 hover:underline font-bold">
              Register Company
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
