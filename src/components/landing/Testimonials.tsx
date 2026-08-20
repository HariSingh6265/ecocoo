import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'Computer Science Graduate',
      feedback: 'I had no idea my Canva 2-column resume was failing ATS scans completely. Once I followed the single-column recommendations and added missing tech keywords, I started receiving initial recruiter callbacks.',
      scoreBefore: '52',
      scoreAfter: '88',
    },
    {
      name: 'Priya Patel',
      role: 'Frontend Developer Applicant',
      feedback: 'The keyword match against the job description is invaluable. It highlighted that I forgot to explicitly list TypeScript and Jest even though I used them in my projects. Fixed it in 5 minutes.',
      scoreBefore: '64',
      scoreAfter: '91',
    },
    {
      name: 'David Kim',
      role: 'Junior DevOps Engineer',
      feedback: 'The bullet point analyzer showed me how passive my descriptions were. Replacing "worked on docker" with action verbs and metrics made a huge difference in my resume clarity.',
      scoreBefore: '59',
      scoreAfter: '86',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Real Job Seeker Experiences
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by Students & Software Engineers
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Real feedback from candidates who optimized their resumes before applying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-7 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{t.feedback}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <span className="text-[11px] text-slate-500">{t.role}</span>
                </div>
                <div className="text-right text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Score: {t.scoreBefore} → {t.scoreAfter}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
