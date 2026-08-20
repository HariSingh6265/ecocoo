import React from 'react';
import { FileText } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ResumeATS Pro',
  description: 'Terms and conditions for using the ResumeATS compatibility scanner.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Service Purpose & Disclaimer
          </h2>
          <p>
            ResumeATS Pro provides programmatic resume analysis and keyword matching based on common Applicant Tracking System best practices.
          </p>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300">
            <strong>Important Notice:</strong> ResumeATS Pro is not affiliated with any employer or recruitment software vendor. An ATS score is an estimate of parser compatibility and does not guarantee that a candidate will receive an interview, job offer, or specific hiring outcome.
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Acceptable Use
          </h2>
          <p>
            Users agree to upload only legitimate resumes that they own or have explicit authorization to analyze. You may not upload malicious files, exploit system resources, or attempt to reverse-engineer proprietary algorithms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Limitation of Liability
          </h2>
          <p>
            The service is provided on an "as is" and "as available" basis. ResumeATS Pro is not liable for hiring decisions, missed opportunities, or third-party ATS system behavior.
          </p>
        </section>
      </div>
    </div>
  );
}
