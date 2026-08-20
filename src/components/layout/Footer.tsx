import React from 'react';
import Link from 'next/link';
import { FileSearch, ShieldCheck, Lock, Heart, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <FileSearch className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                ResumeATS <span className="text-xs text-indigo-400 font-medium">Pro</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An intelligent, transparent ATS compatibility and resume scoring engine designed for students, fresh graduates, and tech job seekers.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Privacy Focused
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Ephemeral File Processing
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/analyze" className="hover:text-indigo-400 transition">
                  Free Resume Analyzer
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-indigo-400 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#score-breakdown" className="hover:text-indigo-400 transition">
                  Scoring Weights (100 pts)
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-indigo-400 transition">
                  Pricing & Pro Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & SEO */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Guides & Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/guides/what-is-an-ats" className="hover:text-indigo-400 transition">
                  What is an ATS? (Complete Guide)
                </Link>
              </li>
              <li>
                <Link href="/guides/ats-formatting-guide" className="hover:text-indigo-400 transition">
                  ATS Formatting Best Practices
                </Link>
              </li>
              <li>
                <Link href="/guides/resume-keywords-guide" className="hover:text-indigo-400 transition">
                  Resume Keywords Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Trust & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition">
                  Privacy Policy & Data Retention
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 text-[11px] leading-relaxed text-slate-400">
            <strong className="text-slate-300">Important Disclaimer:</strong> ResumeATS is an independent ATS compatibility analyzer and resume scoring tool. The ATS score is a deterministic estimate based on industry best practices and algorithmic checks. It does not represent an actual hiring decision and does not guarantee job interviews or employment.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p>© {new Date().getFullYear()} ResumeATS Analyzer. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with precision for modern job seekers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
