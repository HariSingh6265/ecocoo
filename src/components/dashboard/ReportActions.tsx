'use client';

import React, { useState } from 'react';
import { Printer, Share2, ArrowLeft, Check, Bookmark, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ReportActionsProps {
  analysisId: string;
  isSaved?: boolean;
}

export function ReportActions({ analysisId, isSaved }: ReportActionsProps) {
  const [copiedShare, setCopiedShare] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My ATS Resume Score Report',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm no-print">
      <Link
        href="/analyze"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Analyze Another Resume
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-2 rounded-xl transition"
        >
          <Printer className="w-4 h-4" />
          Print / Save PDF
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-2 rounded-xl transition"
        >
          {copiedShare ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          {copiedShare ? 'Link Copied!' : 'Share Report'}
        </button>

        {isSaved && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <Bookmark className="w-3.5 h-3.5" />
            Saved to Account
          </span>
        )}
      </div>
    </div>
  );
}
