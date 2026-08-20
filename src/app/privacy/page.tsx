import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Retention | ResumeATS Pro',
  description: 'Our commitment to data privacy, ephemeral resume processing, and security.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Privacy Focused</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy & Data Retention
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Ephemeral File Processing
          </h2>
          <p>
            Your resume file is uploaded over an encrypted TLS connection and processed in-memory solely for the purpose of computing your ATS score and improvement report. We do not permanently store your raw resume files on our servers unless you create an account and explicitly choose to save your analysis history.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. No Selling of Personal Data
          </h2>
          <p>
            We strictly do not sell, rent, or distribute your personal information, resume text, contact details, or job search activity to third-party recruiters, advertisers, or data brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Account Data & Deletion
          </h2>
          <p>
            If you create an account, your email and saved analysis reports are stored securely in our private database. You can delete any saved analysis or delete your entire account at any time with immediate effect.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Security Standards
          </h2>
          <p>
            All passwords are encrypted with bcrypt hashing, sessions are secured with HTTP-only cookies, and API endpoints enforce strict input validation and file size limits.
          </p>
        </section>
      </div>
    </div>
  );
}
