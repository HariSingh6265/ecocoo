'use client';

import React, { useState } from 'react';
import { ListChecks, CheckCircle2, Circle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ImprovementRoadmapProps {
  topImprovements: string[];
}

export function ImprovementRoadmap({ topImprovements }: ImprovementRoadmapProps) {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());

  const toggleItem = (idx: number) => {
    setCompletedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <ListChecks className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Your Top 5 High-Impact Improvements
            </h3>
            <p className="text-xs text-slate-500">
              Prioritized checklist to boost your resume’s ATS score and callback rate
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
          {completedItems.size} of {topImprovements.length} Completed
        </span>
      </div>

      <div className="space-y-3">
        {topImprovements.map((tip, idx) => {
          const isDone = completedItems.has(idx);
          const impactLevel = idx === 0 ? 'Highest Impact' : idx <= 2 ? 'High Impact' : 'Medium Impact';

          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleItem(idx)}
              className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                isDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 opacity-80'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-400 dark:border-slate-500 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-bold leading-relaxed ${
                      isDone
                        ? 'line-through text-slate-500 dark:text-slate-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {tip}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      idx === 0
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : idx <= 2
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                    }`}
                  >
                    {impactLevel}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Once you update your resume with these fixes, re-upload to verify your improved score.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl shadow-sm transition"
        >
          Re-Analyze Updated Resume
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
