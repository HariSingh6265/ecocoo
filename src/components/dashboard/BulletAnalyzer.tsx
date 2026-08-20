'use client';

import React, { useState } from 'react';
import { BulletImprovement } from '@/types';
import { TrendingUp, Copy, Check, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface BulletAnalyzerProps {
  bulletImprovements: BulletImprovement[];
}

export function BulletAnalyzer({ bulletImprovements }: BulletAnalyzerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rewritingId, setRewritingId] = useState<string | null>(null);
  const [activeRewrites, setActiveRewrites] = useState<Record<string, string>>({});

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRewriteWithAI = async (item: BulletImprovement) => {
    setRewritingId(item.id);
    try {
      const res = await fetch('/api/rewrite-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: item.originalText,
          roleContext: 'Software Engineer',
        }),
      });
      const data = await res.json();
      if (data.rewritten) {
        setActiveRewrites((prev) => ({
          ...prev,
          [item.id]: data.rewritten,
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRewritingId(null);
    }
  };

  if (bulletImprovements.length === 0) {
    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Bullet-Point Impact Analyzer
            </h3>
            <p className="text-xs text-slate-500">
              Evaluates action verbs, quantifiable outcomes, and XYZ structure
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
          <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
            ✓ High Bullet Quality
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Your bullet points already feature strong action verbs and outcome metrics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Bullet-Point Impact Analyzer ({bulletImprovements.length} Weak Bullets Detected)
            </h3>
            <p className="text-xs text-slate-500">
              Transform passive task descriptions into high-scoring, outcome-driven accomplishments
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {bulletImprovements.map((item) => {
          const currentSuggestion = activeRewrites[item.id] || item.suggestedImprovement;
          const isCopied = copiedId === item.id;
          const isRewriting = rewritingId === item.id;

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Section: {item.section}
                </span>
                <div className="flex items-center gap-1.5">
                  {item.issues.map((iss, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                    >
                      {iss}
                    </span>
                  ))}
                </div>
              </div>

              {/* Side by side original vs improved */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Original */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Original Bullet (From Resume)
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
                    "{item.originalText}"
                  </p>
                </div>

                {/* Suggested */}
                <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Recommended XYZ Formula
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRewriteWithAI(item)}
                        disabled={isRewriting}
                        className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 disabled:opacity-50"
                        title="Generate another variation"
                      >
                        <RefreshCw className={`w-3 h-3 ${isRewriting ? 'animate-spin' : ''}`} />
                        Regenerate
                      </button>
                      <button
                        onClick={() => handleCopy(item.id, currentSuggestion)}
                        className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 flex items-center gap-1"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        {isCopied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                    "{currentSuggestion}"
                  </p>
                </div>
              </div>

              {/* Metric prompts */}
              <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 pt-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Metrics to quantify:
                </span>
                {item.metricsToConsider.slice(0, 2).map((m, idx) => (
                  <span key={idx} className="bg-slate-200/70 dark:bg-slate-700/60 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
