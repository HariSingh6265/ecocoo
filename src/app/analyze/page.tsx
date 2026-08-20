'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileUploader } from '@/components/upload/FileUploader';
import { JobDescriptionInput } from '@/components/upload/JobDescriptionInput';
import { AnalysisProgressModal } from '@/components/upload/AnalysisProgressModal';
import { Sparkles, ArrowRight, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobCompany, setJobCompany] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Please upload a PDF or DOCX resume to begin analysis.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription.trim());
      }
      if (jobTitle.trim()) {
        formData.append('jobTitle', jobTitle.trim());
      }
      if (jobCompany.trim()) {
        formData.append('jobCompany', jobCompany.trim());
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze resume. Please verify the file format and try again.');
      }

      // Store in session storage for immediate viewing
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('current_ats_analysis', JSON.stringify(data.analysis));
      }

      // Small delay to allow the loading animation to complete smoothly
      setTimeout(() => {
        setIsLoading(false);
        if (data.isSaved && data.analysis.id) {
          router.push(`/report/${data.analysis.id}`);
        } else {
          router.push('/report');
        }
      }, 800);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[85vh] py-12 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant ATS Compatibility Audit</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Analyze Your Resume
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Upload your resume and optionally paste a job description to get a comprehensive 100-point score, missing keywords, and actionable fixes.
          </p>
        </div>

        {/* Upload Form Card */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8"
        >
          {/* Step 1: File Uploader */}
          <FileUploader
            file={file}
            onFileSelect={(f) => {
              setFile(f);
              if (errorMessage) setErrorMessage(null);
            }}
            error={errorMessage}
          />

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Step 2: Job Description Input */}
          <JobDescriptionInput
            jobDescription={jobDescription}
            jobTitle={jobTitle}
            jobCompany={jobCompany}
            onChangeJobDescription={setJobDescription}
            onChangeJobTitle={setJobTitle}
            onChangeJobCompany={setJobCompany}
          />

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!file || isLoading}
              className="w-full py-4 rounded-2xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 hover:gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Analyze Resume Now
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Private & Ephemeral
              </span>
              <span>•</span>
              <span>No permanent storage unless saved</span>
              <span>•</span>
              <span>28 algorithmic checks</span>
            </div>
          </div>
        </form>
      </div>

      {/* Progress Animation Modal */}
      <AnalysisProgressModal
        isOpen={isLoading}
        hasJobDescription={jobDescription.trim().length > 20}
      />
    </div>
  );
}
