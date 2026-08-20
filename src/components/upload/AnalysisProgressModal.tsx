'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, FileSearch, Sparkles } from 'lucide-react';

interface AnalysisProgressModalProps {
  isOpen: boolean;
  hasJobDescription: boolean;
}

export function AnalysisProgressModal({ isOpen, hasJobDescription }: AnalysisProgressModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { title: 'Extracting resume text & document structure', detail: 'Parsing text stream, font encoding, and layout safety...' },
    { title: 'Detecting sections & contact details', detail: 'Locating work history, education, skills, email, and phone...' },
    { title: 'Evaluating formatting & ATS readability', detail: 'Auditing single-column flow, tables, and symbol anomalies...' },
    { title: 'Analyzing keywords & technical competencies', detail: 'Extracting technical taxonomy, developer tools, and action verbs...' },
    ...(hasJobDescription
      ? [{ title: 'Matching against target job description', detail: 'Calculating keyword coverage and identifying critical skill gaps...' }]
      : []),
    { title: 'Generating actionable recommendations', detail: 'Synthesizing Top 5 improvements and bullet point rewrites...' },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isOpen, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30 animate-pulse">
            <FileSearch className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Analyzing Your Resume...
          </h3>
          <p className="text-xs text-slate-500">
            Running 28 ATS screening checks against industry benchmarks
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.title}
                className={`p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800 scale-[1.02]'
                    : isCompleted
                    ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-90'
                    : 'border-transparent opacity-40'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-bold leading-tight ${
                      isCurrent
                        ? 'text-indigo-900 dark:text-indigo-200'
                        : isCompleted
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  {isCurrent && (
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5 animate-fade-in leading-normal">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
