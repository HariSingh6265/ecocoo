'use client';

import React, { useState } from 'react';
import { XCircle, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

export function BeforeAfterComparison() {
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Real Comparison
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See the Difference an ATS-Optimized Resume Makes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Small formatting and keyword mistakes can drop your ATS score from 94 to 48.
          </p>

          {/* Toggle buttons */}
          <div className="inline-flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl mt-4">
            <button
              onClick={() => setActiveTab('after')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'after'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ATS-Optimized Resume (94/100)
            </button>
            <button
              onClick={() => setActiveTab('before')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'before'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <XCircle className="w-4 h-4 text-rose-500" />
              Unoptimized Resume (48/100)
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'after' ? (
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
                <div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    ATS Score: 94 / 100 · Shortlist Tier
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                    Clean, High-Impact ATS Structure
                  </h3>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span className="font-semibold text-emerald-600">✓ 100% Parsed Successfully</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Single-Column Standard Layout
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Linear vertical hierarchy guarantees that every modern ATS reads content in correct sequential order without scrambling columns.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> XYZ Quantified Bullet Points
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px] bg-white dark:bg-slate-800 p-2.5 rounded border border-emerald-200 dark:border-emerald-800">
                      "Engineered scalable GraphQL APIs in Node.js, reducing server response latency by 42% for 20k+ concurrent requests."
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Categorized Skills Matrix
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Explicit sections for Languages, Frameworks, Cloud, and Databases enable ATS keyword algorithms to index proficiencies instantly.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Plaintext Contact Header
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Clean email, mobile phone with country code, LinkedIn URL, and GitHub portfolio without complex icons or text boxes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-rose-500/40 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
                <div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                    ATS Score: 48 / 100 · High Risk of Rejection
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                    Common ATS Pitfalls & Parsing Traps
                  </h3>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span className="font-semibold text-rose-600">✗ Failed 8 Core ATS Checks</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 space-y-2">
                    <span className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" /> Multi-Column Layout / Canva Tables
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Sidebars and two-column templates cause ATS parsers to merge left and right columns horizontally, scrambling your job titles and dates.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 space-y-2">
                    <span className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" /> Passive, Metric-Free Bullet Points
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px] bg-white dark:bg-slate-800 p-2.5 rounded border border-rose-200 dark:border-rose-800">
                      "Responsible for working on backend tasks and maintaining databases."
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 space-y-2">
                    <span className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" /> Graphical Skill Rating Bars
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Rating your Python skills as "4 out of 5 stars" using graphical circles is completely invisible to ATS and wastes valuable space.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 space-y-2">
                    <span className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" /> Contact Info in Header/Footer Boxes
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Many ATS systems ignore document header and footer zones, resulting in missing email and phone numbers in your profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
