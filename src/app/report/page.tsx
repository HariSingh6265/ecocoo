'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ATSAnalysisResult } from '@/types';
import { ReportView } from '@/components/dashboard/ReportView';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GuestReportPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('current_ats_analysis');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setAnalysis(parsed);
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Loading analysis report...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          No Recent Analysis Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          Please upload your resume to generate a detailed ATS compatibility score and improvement report.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl shadow-md transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Go to Resume Analyzer
        </Link>
      </div>
    );
  }

  return <ReportView analysis={analysis} isSaved={false} />;
}
