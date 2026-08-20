'use client';

import React, { useEffect, useState } from 'react';
import { getScoreColor } from '@/lib/utils';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScoreGaugeProps {
  score: number;
  rating: string;
  scoreSummary: string;
}

export function ScoreGauge({ score, rating, scoreSummary }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const colors = getScoreColor(score);

  useEffect(() => {
    // Animate score number
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = score / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
        if (score >= 80) {
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 },
            });
          } catch (e) {}
        }
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Circle stroke calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6 sm:gap-10">
      {/* Animated SVG Circle */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="12"
            className="stroke-slate-100 dark:stroke-slate-800 fill-none"
          />
          {/* Animated score circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colors.ring} fill-none transition-all duration-300 ease-out`}
          />
        </svg>

        {/* Center score label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-black tracking-tight ${colors.text}`}>
            {animatedScore}
          </span>
          <span className="text-xs text-slate-400 font-semibold uppercase -mt-1">
            out of 100
          </span>
        </div>
      </div>

      {/* Details & Summary */}
      <div className="space-y-3 text-center md:text-left flex-1">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
          <span className={`px-3 py-1 text-xs font-extrabold rounded-full ${colors.badge} border ${colors.border}`}>
            {rating} ATS Compatibility
          </span>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            28 Deterministic Checks
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Overall ATS Match Score
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {scoreSummary}
        </p>

        <p className="text-[11px] text-slate-400 italic">
          * Note: This score is a programmatic estimate based on ATS parsing rules and does not guarantee job interviews.
        </p>
      </div>
    </div>
  );
}
