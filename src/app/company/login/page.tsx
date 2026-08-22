"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Building2, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CompanyLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "company" }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      router.push("/company/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-600/20">
            <Building2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Company Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Manage your organization's green commute
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border-emerald-100 shadow-xl shadow-emerald-900/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your corporate admin credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@greentech.in"
                    required
                    className="pl-10 focus-visible:ring-emerald-500"
                    defaultValue="admin@greentech.in"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10 focus-visible:ring-emerald-500"
                    defaultValue="company1234"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl shadow-md transition-all"
              >
                {isLoading ? "Signing in..." : "Sign In as Company"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-slate-100 pt-6">
            <div className="text-sm text-center text-slate-500 bg-slate-50 p-3 rounded-lg w-full">
              <span className="font-medium text-slate-700">Demo Hint:</span> admin@greentech.in / company1234
            </div>
            <div className="text-sm text-center text-slate-600">
              Not registered yet?{" "}
              <Link href="/company/register" className="font-medium text-emerald-600 hover:text-emerald-500">
                Register your company
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
