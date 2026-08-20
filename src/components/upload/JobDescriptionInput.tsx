'use client';

import React from 'react';
import { Target, Sparkles, X } from 'lucide-react';
import { SAMPLE_JOBS } from '@/lib/sample-jobs';

interface JobDescriptionInputProps {
  jobDescription: string;
  jobTitle: string;
  jobCompany: string;
  onChangeJobDescription: (val: string) => void;
  onChangeJobTitle: (val: string) => void;
  onChangeJobCompany: (val: string) => void;
}

export function JobDescriptionInput({
  jobDescription,
  jobTitle,
  jobCompany,
  onChangeJobDescription,
  onChangeJobTitle,
  onChangeJobCompany,
}: JobDescriptionInputProps) {
  const isJobMode = jobDescription.trim().length > 20;

  const handleSelectSampleJob = (sampleId: string) => {
    const job = SAMPLE_JOBS.find((j) => j.id === sampleId);
    if (job) {
      onChangeJobTitle(job.title);
      onChangeJobCompany(job.company);
      onChangeJobDescription(job.description);
    }
  };

  const handleClear = () => {
    onChangeJobDescription('');
    onChangeJobTitle('');
    onChangeJobCompany('');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-600" />
            2. Target Job Description
            <span className="text-xs font-normal text-slate-500">(Optional)</span>
          </label>
        </div>

        {/* Dynamic Mode Badge */}
        <div className="flex items-center gap-2">
          {isJobMode ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Mode 2: Job Match Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              Mode 1: General ATS Scan
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Paste a job posting to unlock keyword matching, missing skills detection, and role-specific gap analysis.
      </p>

      {/* Sample Job Presets */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          Or test with a sample role:
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_JOBS.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => handleSelectSampleJob(job.id)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              + {job.title.split(' ')[0]} {job.title.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          rows={6}
          value={jobDescription}
          onChange={(e) => onChangeJobDescription(e.target.value)}
          placeholder="Paste the target job description here (e.g. responsibilities, required skills, qualifications)..."
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-y"
        />

        {jobDescription && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Clear job description"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>
          {jobDescription.length > 0 ? `${jobDescription.split(/\s+/).filter(Boolean).length} words` : 'No job description provided'}
        </span>
        <span>Leave blank for general ATS formatting and structure analysis.</span>
      </div>
    </div>
  );
}
