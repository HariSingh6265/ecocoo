"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Leaf,
  Building2,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  UserPlus,
  Compass,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";

export default function HomePage() {
  const router = useRouter();
  const [authTab, setAuthTab] = useState<"signin" | "signup" | "company">("signin");

  // Sign In State
  const [loginEmail, setLoginEmail] = useState("demo@ecocommute.in");
  const [loginPassword, setLoginPassword] = useState("demo1234");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Sign Up State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  // Active User session if already logged in
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) setCurrentUser(data.user);
        }
      } catch (e) {}
    }
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
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
        setLoginError(data.error || "Invalid login credentials");
      }
    } catch (err) {
      setLoginError("An error occurred during authentication");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          role: "user",
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setSignupError(data.error || "Registration failed");
      }
    } catch (err) {
      setSignupError("An error occurred during registration");
    } finally {
      setSignupLoading(false);
    }
  };

  const quickFill = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setAuthTab("signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-8 md:py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand & Value Prop */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              EcoCommute • Problem ID: IHSA5
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Sustainable Urban Mobility Platform
            </h1>

            <p className="text-slate-600 text-sm leading-relaxed">
              Sign in or create your commuter account to compare real-time routes, calculate carbon avoidance, earn Green Points, and access corporate mobility benefits.
            </p>

            {currentUser ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Logged in as {currentUser.name} ({currentUser.email})
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => router.push(currentUser.role === "company" ? "/company/dashboard" : "/dashboard")}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs font-bold rounded-xl h-9"
                  >
                    Go to Your Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Quick 1-Click Demo Profiles:
                </div>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <button
                    onClick={() => quickFill("demo@ecocommute.in", "demo1234")}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-800 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-600" /> B2C Commuter
                  </button>
                  <button
                    onClick={() => quickFill("admin@greentech.in", "company1234")}
                    className="px-3 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-800 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" /> B2B Corporate
                  </button>
                  <button
                    onClick={() => quickFill("rahul@greentech.in", "employee1234")}
                    className="px-3 py-1.5 bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-xl text-xs font-semibold text-slate-700 hover:text-purple-800 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-purple-600" /> Employee
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Authentication Card with Tabs */}
          <div className="lg:col-span-7">
            <Card className="shadow-xl border border-slate-200 rounded-3xl bg-white overflow-hidden">
              {/* Tab Selector */}
              <div className="grid grid-cols-3 bg-slate-100/80 p-1.5 border-b border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAuthTab("signin")}
                  className={`py-2.5 rounded-2xl transition-all text-center ${
                    authTab === "signin"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Sign In (Login)
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab("signup")}
                  className={`py-2.5 rounded-2xl transition-all text-center ${
                    authTab === "signup"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Sign Up (New User)
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/company/register")}
                  className="py-2.5 rounded-2xl transition-all text-center text-indigo-700 hover:bg-white/60 flex items-center justify-center gap-1"
                >
                  <Building2 className="w-3.5 h-3.5" /> Corporate
                </button>
              </div>

              <CardContent className="p-6 sm:p-8">
                {/* TAB 1: SIGN IN */}
                {authTab === "signin" && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
                      <p className="text-xs text-slate-500">Sign in to your EcoCommute account</p>
                    </div>

                    {loginError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl">
                        {loginError}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-600">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="demo@ecocommute.in"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-xs font-bold uppercase text-slate-600">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="password"
                          type="password"
                          required
                          placeholder="demo1234"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 font-bold rounded-2xl text-sm shadow-md shadow-emerald-600/20 mt-2"
                      disabled={loginLoading}
                    >
                      {loginLoading ? "Authenticating..." : "Sign In to EcoCommute"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                )}

                {/* TAB 2: SIGN UP */}
                {authTab === "signup" && (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-slate-900">Create Commuter Account</h2>
                      <p className="text-xs text-slate-500">Start tracking carbon savings and green rewards</p>
                    </div>

                    {signupError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl">
                        {signupError}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="signup-name" className="text-xs font-bold uppercase text-slate-600">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        required
                        placeholder="e.g. Hari Singh"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="h-11 rounded-xl bg-slate-50 border-slate-200"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="signup-email" className="text-xs font-bold uppercase text-slate-600">Email Address</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="h-11 rounded-xl bg-slate-50 border-slate-200"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="signup-pass" className="text-xs font-bold uppercase text-slate-600">Password</Label>
                      <Input
                        id="signup-pass"
                        type="password"
                        required
                        placeholder="Create a secure password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="h-11 rounded-xl bg-slate-50 border-slate-200"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 font-bold rounded-2xl text-sm shadow-md shadow-emerald-600/20 mt-2"
                      disabled={signupLoading}
                    >
                      {signupLoading ? "Creating Account..." : "Create Free Commuter Account"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                )}
              </CardContent>

              <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                <Link href="/plan" className="hover:text-emerald-700 font-semibold flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" /> Plan Route Directly
                </Link>
                <Link href="/company/register" className="hover:text-indigo-700 font-semibold flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> Register Company (B2B)
                </Link>
              </CardFooter>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
