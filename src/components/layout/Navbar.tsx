'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileSearch, Sparkles, User, LogOut, History, Menu, X, ArrowRight, ShieldCheck, QrCode } from 'lucide-react';
import { UpiPaymentModal } from '@/components/payment/UpiPaymentModal';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; planTier: string } | null>(null);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch auth status
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setCurrentUser(data.user);
        else setCurrentUser(null);
      })
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { label: 'Analyze Resume', href: '/analyze', badge: 'Free' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'ATS Breakdown', href: '/#score-breakdown' },
    { label: 'Pricing (From ₹19)', href: '/pricing' },
    { label: 'Guides', href: '/guides/what-is-an-ats' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800'
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <FileSearch className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                ResumeATS
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800">
                  Pro
                </span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium -mt-1">
                ATS Compatibility Engine
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 ${
                  pathname === link.href
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Auth & CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsUpiModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 px-3 py-2 rounded-lg border border-indigo-200/60 dark:border-indigo-800 transition"
            >
              <QrCode className="w-3.5 h-3.5" />
              Upgrade (₹19+)
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/history"
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <History className="w-4 h-4" />
                  My Analyses
                </Link>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 px-3 py-2 rounded-lg transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 px-4 py-2 rounded-lg shadow-sm shadow-indigo-600/20 transition-all hover:gap-2"
                >
                  Analyze Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsUpiModalOpen(true)}
              className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-200"
            >
              ₹19 Pro
            </button>
            <Link
              href="/analyze"
              className="text-xs font-medium text-white bg-indigo-600 px-3 py-1.5 rounded-lg"
            >
              Analyze
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 px-2 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <>
                <Link
                  href="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-indigo-600 px-2 py-1.5 flex items-center gap-2"
                >
                  <History className="w-4 h-4" />
                  My Saved Analyses
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium text-rose-600 px-2 py-1.5 flex items-center gap-2 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out ({currentUser.name})
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 py-2 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-sm font-medium text-white bg-indigo-600 py-2 rounded-lg"
                >
                  Create Free Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
      />
    </header>
  );
}
