import React from 'react';
import { Layout, FileText, Key, Award, UserCheck, ShieldCheck, HelpCircle } from 'lucide-react';

export function AtsExplainer() {
  const categories = [
    {
      title: 'Formatting & Structure',
      points: '20 Points',
      icon: Layout,
      desc: 'Checks standard section headings, single-column readability, table risks, and text flow.',
    },
    {
      title: 'Content Quality',
      points: '20 Points',
      icon: FileText,
      desc: 'Evaluates word count (450–900 words), summary depth, education details, and project evidence.',
    },
    {
      title: 'Keyword Optimization',
      points: '25 Points',
      icon: Key,
      desc: 'Matches technical skills, tools, and domain keywords against target job descriptions or industry benchmarks.',
    },
    {
      title: 'Experience & Impact',
      points: '15 Points',
      icon: Award,
      desc: 'Analyzes dynamic action verbs and quantifiable metrics (%, $, scale, users) in bullet points.',
    },
    {
      title: 'Contact Information',
      points: '10 Points',
      icon: UserCheck,
      desc: 'Validates presence of name, professional email, phone number, LinkedIn, and GitHub links.',
    },
    {
      title: 'ATS Parsability',
      points: '10 Points',
      icon: ShieldCheck,
      desc: 'Ensures 100% extractable plaintext, clean character encoding, and zero image-only scanning traps.',
    },
  ];

  return (
    <section id="score-breakdown" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Transparent Scoring Engine
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Your 100-Point ATS Score is Calculated
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            No mysterious black-box algorithms or random numbers. Every point is calculated from measurable, actionable criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {cat.points}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex items-start gap-4 max-w-4xl mx-auto">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">Why does ATS scoring matter?</span>
            <p>
              Over 90% of Fortune 500 companies and tech startups use Applicant Tracking Systems (like Greenhouse, Lever, Workday, and Taleo) to screen resumes before human recruiters read them. Resumes that fail formatting standards or miss required skills are filtered out automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
