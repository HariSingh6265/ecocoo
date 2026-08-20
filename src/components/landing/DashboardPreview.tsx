import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export function DashboardPreview() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        {/* Fake Browser Chrome */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-500 font-mono ml-2 hidden sm:inline">
              resume-ats-analyzer / report / alex_chen_fullstack.pdf
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" /> High Pass Rate (84/100)
          </div>
        </div>

        {/* Dashboard Preview Body */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-xl">
            {/* Score circle */}
            <div className="md:col-span-4 flex items-center gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-500/10 border-4 border-indigo-400">
                <div className="text-center">
                  <span className="text-3xl font-extrabold tracking-tight">84</span>
                  <span className="text-xs text-indigo-200 block -mt-1">/ 100</span>
                </div>
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Strong Match
                </span>
                <h3 className="text-lg font-bold mt-1">Ready for Submission</h3>
                <p className="text-xs text-slate-300">Passed 24 of 28 ATS screening checks</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="md:col-span-8 grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-indigo-900/60 pt-4 md:pt-0 md:pl-6 text-center sm:text-left">
              <div>
                <span className="text-xs text-indigo-300 font-medium">Keywords Matched</span>
                <p className="text-xl font-bold text-white mt-0.5">18 / 22</p>
                <span className="text-[10px] text-emerald-400">82% keyword coverage</span>
              </div>
              <div>
                <span className="text-xs text-indigo-300 font-medium">Quantified Bullets</span>
                <p className="text-xl font-bold text-white mt-0.5">75%</p>
                <span className="text-[10px] text-indigo-300">Strong metric density</span>
              </div>
              <div>
                <span className="text-xs text-indigo-300 font-medium">Layout Safety</span>
                <p className="text-xl font-bold text-emerald-400 mt-0.5">100%</p>
                <span className="text-[10px] text-slate-400">Single-column clean</span>
              </div>
            </div>
          </div>

          {/* 6 Category Breakdown Grid Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Formatting', score: '95%', tag: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { label: 'Content', score: '85%', tag: 'Strong', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
              { label: 'Keywords', score: '82%', tag: 'Strong', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
              { label: 'Experience', score: '78%', tag: 'Good', color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { label: 'Contact Info', score: '100%', tag: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { label: 'ATS Parsability', score: '90%', tag: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
            ].map((cat) => (
              <div key={cat.label} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="text-[11px] text-slate-500 font-medium block truncate">{cat.label}</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{cat.score}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${cat.color}`}>
                    {cat.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Side-by-Side: Keywords & Actionable Bullet Improvement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Keywords Match Matrix */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Target Keyword Analysis
                </h4>
                <span className="text-xs text-slate-500 font-medium">Software Engineer JD</span>
              </div>

              <div className="space-y-2.5">
                <div>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-1.5">
                    ✓ Matched Target Skills (18)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'REST APIs', 'Git', 'CI/CD', 'Jest'].map((kw) => (
                      <span key={kw} className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 block mb-1.5">
                    ✗ Missing High-Priority Keywords (4)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['AWS Lambda', 'Kubernetes', 'GraphQL', 'Redis'].map((kw) => (
                      <span key={kw} className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bullet Point Improvement Preview */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Bullet-Point Rewriter
                </h4>
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Weak Bullet Detected
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">Original Bullet (Passive)</span>
                  <p className="text-slate-700 dark:text-slate-300 line-through opacity-75">
                    "Worked on a website using React and helped improve performance."
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                  <span className="text-[10px] font-semibold uppercase text-indigo-600 dark:text-indigo-400 block mb-1">
                    ✓ Recommended ATS Optimization (XYZ Impact)
                  </span>
                  <p className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                    "Architected and deployed responsive user interfaces using <strong className="text-indigo-700 dark:text-indigo-300">React and Next.js</strong>, boosting page speed by <strong className="text-indigo-700 dark:text-indigo-300">35%</strong> and scaling to 15k+ daily active users."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
