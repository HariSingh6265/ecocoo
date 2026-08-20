'use client';

import React, { useState } from 'react';
import { KeywordMatchItem } from '@/types';
import { Key, CheckCircle2, XCircle, Sparkles, AlertCircle, Info } from 'lucide-react';

interface KeywordMatrixProps {
  matchedKeywords: KeywordMatchItem[];
  missingKeywords: KeywordMatchItem[];
  recommendedKeywords: KeywordMatchItem[];
  densityStats: {
    totalKeywordsDetected: number;
    uniqueKeywordsCount: number;
    keywordStuffingRisk: boolean;
  };
  hasJobDescription: boolean;
}

export function KeywordMatrix({
  matchedKeywords,
  missingKeywords,
  recommendedKeywords,
  densityStats,
  hasJobDescription,
}: KeywordMatrixProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filterKeywords = (list: KeywordMatchItem[]) => {
    if (filterCategory === 'all') return list;
    return list.filter((k) => k.category === filterCategory);
  };

  const filteredMatched = filterKeywords(matchedKeywords);
  const filteredMissing = filterKeywords(missingKeywords);
  const filteredRecommended = filterKeywords(recommendedKeywords);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Keyword Optimization Matrix
            </h3>
            <p className="text-xs text-slate-500">
              {hasJobDescription
                ? 'Target Job Description vs Your Resume Keywords'
                : 'Detected Industry Skills & Keyword Density'}
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'technical', label: 'Tech & Langs' },
            { id: 'tools', label: 'Tools & Cloud' },
            { id: 'soft_skills', label: 'Soft Skills' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterCategory === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Matched & Missing Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Matched Keywords ({filteredMatched.length})
            </h4>
            <span className="text-[11px] text-slate-500">Found in resume</span>
          </div>

          {filteredMatched.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No keywords match the selected filter.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredMatched.map((k) => (
                <span
                  key={k.keyword}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                >
                  <span>{k.keyword}</span>
                  {k.frequencyInResume > 1 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-200/70 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-200">
                      ×{k.frequencyInResume}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Keywords (if JD provided) */}
        {hasJobDescription && (
          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                Missing Target Keywords ({filteredMissing.length})
              </h4>
              <span className="text-[11px] text-slate-500">In job posting</span>
            </div>

            {filteredMissing.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Fantastic! No major missing keywords for this category.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filteredMissing.map((k) => (
                  <span
                    key={k.keyword}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-rose-50 text-rose-900 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
                  >
                    <span>+ {k.keyword}</span>
                    {k.importance === 'high' && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200">
                        High Priority
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recommended complementary keywords (if resume-only mode) */}
        {!hasJobDescription && filteredRecommended.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Recommended Domain Skills ({filteredRecommended.length})
              </h4>
              <span className="text-[11px] text-slate-500">Suggested additions</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {filteredRecommended.map((k) => (
                <span
                  key={k.keyword}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-900 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800"
                >
                  <span>+ {k.keyword}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Honest Anti-Stuffing Notice */}
      <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-900 dark:text-amber-300">Crucial Advice on Keywords:</strong>
          <p>
            Only add missing keywords that genuinely represent your experience. Never copy-paste skill lists or use hidden text. ATS algorithms and human interviewers evaluate how skills are used in context.
          </p>
        </div>
      </div>
    </div>
  );
}
