'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, FileText, Calendar, Trash2, ArrowRight, Sparkles, ShieldCheck, Plus } from 'lucide-react';
import { formatDate, getScoreColor } from '@/lib/utils';

interface SavedAnalysisItem {
  id: string;
  resumeName: string;
  jobTitle: string | null;
  overallScore: number;
  formattingScore: number;
  contentScore: number;
  keywordScore: number;
  experienceScore: number;
  contactScore: number;
  atsCompatibilityScore: number;
  jobMatchScore: number | null;
  createdAt: string;
}

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<SavedAnalysisItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const fetchHistory = () => {
    setIsLoading(true);
    fetch('/api/analyses')
      .then(async (res) => {
        if (res.status === 401) {
          setIsUnauthorized(true);
          return [];
        }
        const data = await res.json();
        return data.analyses || [];
      })
      .then((list) => {
        setAnalyses(list);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this saved analysis?')) return;
    try {
      await fetch(`/api/analyses/${id}`, { method: 'DELETE' });
      setAnalyses((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  if (isUnauthorized) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
          <History className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Sign In to View Your Analysis History
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Create a free account or log in to track your ATS scores over time, save past reports, and monitor resume improvements.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/login"
            className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-xl hover:bg-slate-200 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <History className="w-7 h-7 text-indigo-600" />
            My Saved Analyses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your resume scores, job matches, and optimization progress over time
          </p>
        </div>

        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          New Resume Analysis
        </Link>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 text-sm">
          Loading your saved analyses...
        </div>
      ) : analyses.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 max-w-lg mx-auto">
          <FileText className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Saved Analyses Yet
          </h3>
          <p className="text-xs text-slate-500">
            Upload your resume now to calculate your ATS score and save it to your account history.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl transition"
          >
            Start First Analysis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analyses.map((item) => {
            const colors = getScoreColor(item.overallScore);

            return (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                        {item.resumeName}
                      </h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.jobTitle || 'General ATS Scan'}
                      </p>
                    </div>

                    {/* Overall Score Badge */}
                    <div className={`px-3 py-1 rounded-xl text-center flex-shrink-0 ${colors.bg} border ${colors.border}`}>
                      <span className={`text-lg font-extrabold ${colors.text}`}>
                        {item.overallScore}
                      </span>
                      <span className="text-[10px] text-slate-400 block -mt-1 font-bold">/ 100</span>
                    </div>
                  </div>

                  {/* Sub-scores mini grid */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <div>
                      <span className="text-slate-400 block">Formatting</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{item.formattingScore}/20</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Keywords</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{item.keywordScore}/25</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Experience</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{item.experienceScore}/15</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.createdAt)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition"
                      title="Delete saved report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/report/${item.id}`}
                      className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                      View Report
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
