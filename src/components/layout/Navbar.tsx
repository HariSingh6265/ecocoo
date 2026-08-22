"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Leaf,
  Menu,
  X,
  User,
  Building2,
  Navigation,
  BarChart3,
  Award,
  Cpu,
  History,
  Zap,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  role?: "user" | "company" | "employee";
}

export function Navbar({ role }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeRole, setActiveRole] = React.useState<"user" | "company" | "employee">("user");

  React.useEffect(() => {
    if (role) {
      setActiveRole(role);
    } else if (pathname.startsWith("/company")) {
      setActiveRole("company");
    } else if (pathname.startsWith("/employee")) {
      setActiveRole("employee");
    } else {
      setActiveRole("user");
    }
  }, [pathname, role]);

  const b2cLinks = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/plan", label: "Plan Commute", icon: Navigation },
    { href: "/history", label: "Trip History", icon: History },
    { href: "/impact", label: "Impact Analytics", icon: Leaf },
    { href: "/profile", label: "Profile & Points", icon: User },
  ];

  const b2bLinks = [
    { href: "/company/dashboard", label: "Corporate Overview", icon: Building2 },
    { href: "/company/employees", label: "Employees", icon: User },
    { href: "/company/analytics", label: "ESG Analytics", icon: BarChart3 },
    { href: "/company/rewards", label: "Rewards & Budget", icon: Award },
    { href: "/company/integrations", label: "viaSocket Automation", icon: Cpu },
  ];

  const employeeLinks = [
    { href: "/employee/dashboard", label: "Today's Commute", icon: Navigation },
    { href: "/dashboard", label: "B2C Personal View", icon: BarChart3 },
    { href: "/company/dashboard", label: "Company Portal", icon: Building2 },
  ];

  const currentLinks =
    activeRole === "company"
      ? b2bLinks
      : activeRole === "employee"
      ? employeeLinks
      : b2cLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-xs">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
              <Leaf className="h-5 w-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                Eco<span className="text-emerald-600">Commute</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Sustainable Transit Platform
              </span>
            </div>
          </Link>

          {/* Mode Switcher Pill */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <Link
              href="/dashboard"
              className={cn(
                "px-3 py-1 rounded-lg transition-all",
                activeRole === "user"
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              B2C Individual
            </Link>
            <Link
              href="/company/dashboard"
              className={cn(
                "px-3 py-1 rounded-lg transition-all",
                activeRole === "company"
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              B2B Corporate
            </Link>
            <Link
              href="/employee/dashboard"
              className={cn(
                "px-3 py-1 rounded-lg transition-all",
                activeRole === "employee"
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              Employee Daily
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {currentLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-800 font-bold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick CTA Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {activeRole === "company" ? (
            <Link href="/company/integrations">
              <Button size="sm" variant="outline" className="text-xs h-9 rounded-xl border-slate-300">
                <Cpu className="w-3.5 h-3.5 mr-1.5 text-indigo-600" /> viaSocket Integrations
              </Button>
            </Link>
          ) : (
            <Link href="/plan">
              <Button size="sm" className="text-xs h-9 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold">
                <Navigation className="w-3.5 h-3.5 mr-1.5" /> Find Best Option
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-4">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex-1 py-1.5 text-center rounded-lg",
                activeRole === "user" ? "bg-white text-emerald-800 shadow-xs font-bold" : "text-slate-600"
              )}
            >
              B2C Commuter
            </Link>
            <Link
              href="/company/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex-1 py-1.5 text-center rounded-lg",
                activeRole === "company" ? "bg-white text-emerald-800 shadow-xs font-bold" : "text-slate-600"
              )}
            >
              B2B Corporate
            </Link>
            <Link
              href="/employee/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex-1 py-1.5 text-center rounded-lg",
                activeRole === "employee" ? "bg-white text-emerald-800 shadow-xs font-bold" : "text-slate-600"
              )}
            >
              Employee Daily
            </Link>
          </div>

          <nav className="flex flex-col space-y-1">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium",
                    pathname === link.href
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
