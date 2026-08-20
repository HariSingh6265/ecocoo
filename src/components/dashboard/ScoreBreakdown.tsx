'use client';

import React, { useState } from 'react';
import { CategoryScoreDetail } from '@/types';
import { Layout, FileText, Key, Award, UserCheck, ShieldCheck, ChevronRight, X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { getScoreColor } from '@/lib/utils';

interface ScoreBreakdownProps {
  breakdown: {
    formatting: CategoryScoreDetail;
    content: CategoryScoreDetail;
    keywords: CategoryScoreDetail;
    experience: CategoryScoreDetail;
    contact: CategoryScoreDetail;
    atsCompatibility: CategoryScoreDetail;
  };
}

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);

  const categories = [
    { key: 'formatting', title: 'Formatting & Layout', icon: Layout, detail: breakdown.formatting },
    { key: 'content', title: 'Content Quality', icon: FileText, detail: breakdown.content },
    { key: 'keywords', title: 'Keyword Optimization', icon: Key, detail: breakdown.keywords },
    { key: 'experience', title: 'Experience & Impact', icon: Award, detail: breakdown.experience },
    { key: 'contact', title: 'Contact Information', icon: UserCheck, detail: breakdown.contact },
    { key: 'atsCompatibility', title: 'ATS Compatibility', icon: ShieldCheck, detail: breakdown.atsCompatibility },
  ];

  const activeModalData = categories.find((c) => c.key === selectedCategoryKey);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Score Breakdown by Category
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          Click any category for in-depth audit & fixes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const colors = getScoreColor(cat.detail.percentage);

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategoryKey(cat.key)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left flex flex-col justify-between group space-y-4"
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                      {cat.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {cat.detail.score} / {cat.detail.maxScore} points
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {cat.detail.percentage}%
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${colors.badge}`}>
                    {cat.detail.rating}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.detail.percentage >= 85
                        ? 'bg-emerald-500'
                        : cat.detail.percentage >= 70
                        ? 'bg-indigo-500'
                        : cat.detail.percentage >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${cat.detail.percentage}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Drill-down Modal */}
      {activeModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[88vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <activeModalData.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeModalData.title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Score: {activeModalData.detail.score} / {activeModalData.detail.maxScore} points ({activeModalData.detail.percentage}%)
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCategoryKey(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 text-xs sm:text-sm">
              {/* What was checked */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  What was checked:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {activeModalData.detail.whatWasChecked.map((chk, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What is good */}
              {activeModalData.detail.whatIsGood.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    What you're doing well:
                  </h4>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    {activeModalData.detail.whatIsGood.map((good, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{good}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What is wrong */}
              {activeModalData.detail.whatIsWrong.length > 0 && (
                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
                  <h4 className="font-bold text-rose-900 dark:text-rose-300 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    Issues to resolve:
                  </h4>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    {activeModalData.detail.whatIsWrong.map((wrong, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold">✗</span>
                        <span>{wrong}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How to improve */}
              {activeModalData.detail.howToImprove.length > 0 && (
                <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    How to improve this score:
                  </h4>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                    {activeModalData.detail.howToImprove.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">→</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Close button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCategoryKey(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
