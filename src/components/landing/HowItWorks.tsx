import React from 'react';
import { UploadCloud, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Resume',
      desc: 'Drag and drop your resume in PDF or DOCX format. Our engine parses sections, layout, contact info, and text extractability in seconds.',
      icon: UploadCloud,
    },
    {
      number: '02',
      title: 'Add Job Description (Optional)',
      desc: 'Paste the job posting you want to target. The engine compares required technical skills, qualifications, and keyword densities against your resume.',
      icon: FileText,
    },
    {
      number: '03',
      title: 'Get ATS Score & Roadmap',
      desc: 'Receive a transparent 100-point score, missing keywords list, categorized formatting problems, and actionable bullet-point rewrite suggestions.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How ResumeATS Analyzes Your Resume
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            No complex setup or credit card required. Get instant feedback on your resume’s hiring potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 dark:text-slate-700">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700/60 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Step {idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl shadow-md transition"
          >
            Start Your Free Analysis Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
