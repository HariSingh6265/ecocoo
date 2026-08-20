import React from 'react';
import { JobMatchBreakdown } from '@/types';
import { Target, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, Compass } from 'lucide-react';
import { getScoreColor } from '@/lib/utils';

interface JobMatchCardProps {
  jobMatch: JobMatchBreakdown;
  jobTitle?: string;
  jobCompany?: string;
}

export function JobMatchCard({ jobMatch, jobTitle, jobCompany }: JobMatchCardProps) {
  const colors = getScoreColor(jobMatch.overallMatchPercentage);

  const dimensions = [
    { label: 'Technical Skills Match', score: jobMatch.technicalSkillsMatch },
    { label: 'Keyword Coverage', score: jobMatch.keywordMatch },
    { label: 'Experience Depth', score: jobMatch.experienceMatch },
    { label: 'Education Alignment', score: jobMatch.educationMatch },
    { label: 'Job Title Alignment', score: jobMatch.jobTitleAlignment },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Job Match Alignment
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Mode 2 Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {jobTitle ? `${jobTitle} ${jobCompany ? `at ${jobCompany}` : ''}` : 'Target Job Description Analysis'}
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-black ${colors.text}`}>
            {jobMatch.overallMatchPercentage}%
          </span>
          <span className="text-xs text-slate-500 font-semibold uppercase">
            Match Score
          </span>
        </div>
      </div>

      {/* 5-Dimensional Match Bars */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Match Dimensions Breakdown
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dimensions.map((dim) => (
            <div key={dim.label} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                <span>{dim.label}</span>
                <span>{dim.score}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    dim.score >= 80 ? 'bg-emerald-500' : dim.score >= 65 ? 'bg-indigo-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${dim.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Matching Areas & Biggest Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Top Matches */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-3">
          <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Top Matching Strengths
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {jobMatch.topMatchingAreas.map((area, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Biggest Gaps */}
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-3">
          <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Biggest Skill & Requirement Gaps
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {jobMatch.biggestGaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">!</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
