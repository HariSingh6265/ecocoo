import React from 'react';
import { SectionAnalysisItem } from '@/types';
import { Layers, CheckCircle2, AlertCircle, HelpCircle, XCircle } from 'lucide-react';

interface SectionAnalysisProps {
  sections: SectionAnalysisItem[];
}

export function SectionAnalysis({ sections }: SectionAnalysisProps) {
  const getStatusBadge = (status: SectionAnalysisItem['status']) => {
    switch (status) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Present
          </span>
        );
      case 'weak':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-3 h-3 text-amber-600" /> Needs Detail
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <XCircle className="w-3 h-3 text-rose-600" /> Missing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Optional
          </span>
        );
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Resume Section Health & Organization
          </h3>
          <p className="text-xs text-slate-500">
            Structural audit of standard resume sections expected by ATS parsers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((sec) => (
          <div
            key={sec.name}
            className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {sec.displayName}
                </h4>
                {sec.wordCount !== undefined && sec.wordCount > 0 && (
                  <span className="text-[11px] text-slate-500">
                    {sec.wordCount} words · {sec.lineCount} lines
                  </span>
                )}
              </div>
              {getStatusBadge(sec.status)}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {sec.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
