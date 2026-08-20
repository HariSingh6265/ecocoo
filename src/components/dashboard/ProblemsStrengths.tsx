import React from 'react';
import { ResumeProblem, ResumeStrength } from '@/types';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface ProblemsStrengthsProps {
  problems: ResumeProblem[];
  strengths: ResumeStrength[];
}

export function ProblemsStrengths({ problems, strengths }: ProblemsStrengthsProps) {
  const criticalProblems = problems.filter((p) => p.severity === 'critical');
  const warningProblems = problems.filter((p) => p.severity === 'warning');
  const improvementProblems = problems.filter((p) => p.severity === 'improvement');

  return (
    <div className="space-y-8">
      {/* Problems Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Problems & Vulnerabilities Found ({problems.length})
              </h3>
              <p className="text-xs text-slate-500">
                Issues identified that reduce your ATS ranking or risk automatic filtering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            {criticalProblems.length > 0 && (
              <span className="px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                {criticalProblems.length} Critical
              </span>
            )}
            {warningProblems.length > 0 && (
              <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {warningProblems.length} Warnings
              </span>
            )}
            {improvementProblems.length > 0 && (
              <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {improvementProblems.length} Improvements
              </span>
            )}
          </div>
        </div>

        {problems.length === 0 ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
              No Major ATS Problems Detected!
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Your resume follows strong structural, formatting, and content best practices.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {problems.map((item) => {
              const isCritical = item.severity === 'critical';
              const isWarning = item.severity === 'warning';

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCritical
                      ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/80'
                      : isWarning
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/80'
                      : 'bg-indigo-50/30 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {isCritical ? (
                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      )}
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.problem}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isCritical
                          ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                          : isWarning
                          ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                          : 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                        Why it matters:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.whyItMatters}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Recommended Fix:
                      </span>
                      <p className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                        {item.recommendedFix}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Strengths Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              What You're Doing Well ({strengths.length})
            </h3>
            <p className="text-xs text-slate-500">
              Positive signals and strong elements recognized in your resume
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {strengths.map((str) => (
            <div
              key={str.id}
              className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                {str.category}
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                ✓ {str.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
