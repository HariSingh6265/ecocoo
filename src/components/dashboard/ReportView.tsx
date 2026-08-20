'use client';

import React, { useState } from 'react';
import { ATSAnalysisResult } from '@/types';
import { ScoreGauge } from './ScoreGauge';
import { ScoreBreakdown } from './ScoreBreakdown';
import { JobMatchCard } from './JobMatchCard';
import { KeywordMatrix } from './KeywordMatrix';
import { ProblemsStrengths } from './ProblemsStrengths';
import { BulletAnalyzer } from './BulletAnalyzer';
import { SectionAnalysis } from './SectionAnalysis';
import { ImprovementRoadmap } from './ImprovementRoadmap';
import { ReportActions } from './ReportActions';
import { formatDate } from '@/lib/utils';
import { FileText, Calendar, Sparkles, Target, BarChart2, ShieldCheck } from 'lucide-react';

interface ReportViewProps {
  analysis: ATSAnalysisResult;
  isSaved?: boolean;
}

export function ReportView({ analysis, isSaved }: ReportViewProps) {
  const [activeSection, setActiveSection] = useState<string>('all');

  const navItems = [
    { id: 'all', label: 'Complete Report' },
    { id: 'scores', label: 'Score Breakdown' },
    { id: 'keywords', label: 'Keywords Matrix' },
    ...(analysis.jobMatch ? [{ id: 'job-match', label: 'Job Match' }] : []),
    { id: 'problems', label: 'Problems & Strengths' },
    { id: 'bullets', label: 'Bullet Rewriter' },
    { id: 'sections', label: 'Section Health' },
    { id: 'roadmap', label: 'Top Improvements' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              {analysis.analysisMode === 'resume_and_job' ? 'Resume + Job Description Match' : 'Resume-Only General ATS Scan'}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(analysis.analyzedAt)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <span className="truncate">{analysis.resumeName}</span>
          </h1>

          {analysis.jobTitle && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Target Role: <strong className="text-slate-800 dark:text-slate-200">{analysis.jobTitle}</strong>
              {analysis.jobCompany && ` at ${analysis.jobCompany}`}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <ReportActions analysisId={analysis.id} isSaved={isSaved} />
      </div>

      {/* Quick Nav Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80 dark:border-slate-800 no-print">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeSection === item.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Score Gauge */}
      <ScoreGauge
        score={analysis.overallScore}
        rating={analysis.overallRating}
        scoreSummary={analysis.scoreSummary}
      />

      {/* Section Content based on active tab */}
      {(activeSection === 'all' || activeSection === 'job-match') && analysis.jobMatch && (
        <JobMatchCard
          jobMatch={analysis.jobMatch}
          jobTitle={analysis.jobTitle}
          jobCompany={analysis.jobCompany}
        />
      )}

      {(activeSection === 'all' || activeSection === 'scores') && (
        <ScoreBreakdown breakdown={analysis.breakdown} />
      )}

      {(activeSection === 'all' || activeSection === 'keywords') && (
        <KeywordMatrix
          matchedKeywords={analysis.keywords.matched}
          missingKeywords={analysis.keywords.missing}
          recommendedKeywords={analysis.keywords.recommended}
          densityStats={analysis.keywords.densityStats}
          hasJobDescription={analysis.analysisMode === 'resume_and_job'}
        />
      )}

      {(activeSection === 'all' || activeSection === 'problems') && (
        <ProblemsStrengths
          problems={analysis.problems}
          strengths={analysis.strengths}
        />
      )}

      {(activeSection === 'all' || activeSection === 'bullets') && (
        <BulletAnalyzer bulletImprovements={analysis.bulletAnalysis} />
      )}

      {(activeSection === 'all' || activeSection === 'sections') && (
        <SectionAnalysis sections={analysis.sectionAnalysis} />
      )}

      {(activeSection === 'all' || activeSection === 'roadmap') && (
        <ImprovementRoadmap topImprovements={analysis.topImprovements} />
      )}
    </div>
  );
}
