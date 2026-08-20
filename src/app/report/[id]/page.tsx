'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ATSAnalysisResult } from '@/types';
import { ReportView } from '@/components/dashboard/ReportView';
import { Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SavedReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/analyses/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Report not found');
        }
        return res.json();
      })
      .then((data) => {
        setAnalysis(data.analysis);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Loading saved analysis report...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {error || 'Analysis Not Found'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          The requested analysis may have been deleted or requires you to log in to your account.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/history"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            My Analyses
          </Link>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition"
          >
            New Analysis
          </Link>
        </div>
      </div>
    );
  }

  return <ReportView analysis={analysis} isSaved={true} />;
}
