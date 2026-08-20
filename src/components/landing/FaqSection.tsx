'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is an Applicant Tracking System (ATS)?',
      a: 'An ATS is software used by employers to collect, sort, scan, and rank job applications. Before a recruiter reads your resume, the ATS parses its text into database fields (like skills, work history, and education) and searches for keywords relevant to the job opening.',
    },
    {
      q: 'Does a 90+ ATS score guarantee an interview?',
      a: 'No. An ATS score is an estimate of how well your resume matches ATS formatting guidelines, extractability standards, and keyword requirements. While a high score ensures your resume gets past automated filters into recruiter hands, final interview decisions are made by human hiring managers based on genuine qualifications.',
    },
    {
      q: 'Is my resume data kept private and secure?',
      a: 'Yes, 100%. We process resumes in-memory for the duration of the analysis. We do not store or sell your resume contents. Resumes are only saved to a private database if you create an account and explicitly choose to save your analysis history.',
    },
    {
      q: 'Should I upload a PDF or DOCX file?',
      a: 'Both PDF and DOCX are supported. As long as your PDF is created directly from Microsoft Word or Google Docs (text-based, not an image scan or Canva graphic with multi-column text boxes), standard ATS engines will parse it cleanly.',
    },
    {
      q: 'Should I put invisible or white text keywords in my resume?',
      a: 'Never. That is an outdated myth. Modern ATS systems strip all font colors and parse pure plaintext. If an ATS or recruiter sees a block of repeated keywords in the plain text output, your application is immediately flagged for keyword stuffing and rejected.',
    },
    {
      q: 'What is the difference between Resume-Only and Job Description mode?',
      a: 'Resume-Only mode checks general ATS formatting, structural health, action verbs, and baseline technical keywords. Job Description mode performs a deep comparative match against the exact tools, requirements, and keywords of a specific job posting.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Know About ATS
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Clear, honest answers about resume parsing and ATS optimization.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/40"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
