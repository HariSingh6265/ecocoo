import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle, FileSearch, Sparkles, BookOpen } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is an ATS? Complete Guide to Applicant Tracking Systems | ResumeATS Pro',
  description: 'Learn how Applicant Tracking Systems work, what recruiters look for, and how to optimize your resume to pass automated ATS filters.',
};

export default function WhatIsAnAtsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Guides</span>
        <span>/</span>
        <span className="text-indigo-600 dark:text-indigo-400">What is an ATS?</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Comprehensive ATS Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          What is an ATS? How Applicant Tracking Systems Read Resumes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          An in-depth breakdown of modern resume parsing engines, keyword indexing algorithms, and the exact steps to ensure your resume reaches human hiring managers.
        </p>
      </div>

      {/* Main Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Understanding the Role of an ATS
          </h2>
          <p>
            An <strong>Applicant Tracking System (ATS)</strong> is human resources software used by over 98% of Fortune 500 enterprises and thousands of high-growth tech startups. When you submit an application through Greenhouse, Lever, Workday, Taleo, or BambooHR, your resume is first received by the ATS.
          </p>
          <p>
            The software parses the document into plain text, extracts candidate data (name, contact info, job titles, education, dates, and technical skills), and creates a searchable candidate profile.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. The 3 Phases of ATS Processing
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Text Extraction & OCR:</strong> The parser converts the PDF or DOCX file into raw text tokens. Complex layouts, Canva templates, or multi-column grids can corrupt this phase.
            </li>
            <li>
              <strong>Section & Entity Recognition:</strong> The system identifies standard headers (Experience, Education, Skills) to categorize your career history.
            </li>
            <li>
              <strong>Keyword & Qualification Ranking:</strong> The ATS searches for required keywords, degree requirements, and minimum years of experience specified by the job description.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Common ATS Myths Debunked
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 space-y-1">
              <span className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" /> Myth: White Text Keywords Work
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                Fact: ATS software parses all text into a single plaintext stream, making white-text stuffing instantly obvious and triggering instant rejection.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Fact: Single Column Resumes Win
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                A clean, single-column vertical layout with standard bullet points guarantees 100% extractability across all ATS vendors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Ready to check your resume?</h3>
          <p className="text-xs text-indigo-200">
            Get your instant ATS score, missing keywords, and 28-point audit for free.
          </p>
        </div>
        <Link
          href="/analyze"
          className="px-6 py-3 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-indigo-50 shadow-md transition flex items-center gap-2 flex-shrink-0"
        >
          <FileSearch className="w-4 h-4 text-indigo-600" />
          Scan Resume Now
        </Link>
      </div>
    </div>
  );
}
