import React from 'react';
import { Target, Search, FileEdit, Zap, Shield, Sparkles, CheckSquare, BarChart3 } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      title: 'Target Job Matching',
      desc: 'Compare your resume against any job posting to calculate match percentage across technical skills, experience, and education.',
      icon: Target,
    },
    {
      title: 'Missing Keyword Detection',
      desc: 'Instantly uncover high-priority keywords, frameworks, and developer tools mentioned in the job description that are missing from your resume.',
      icon: Search,
    },
    {
      title: 'Weak Bullet Point Rewriter',
      desc: 'Detects passive bullets and generates outcome-driven XYZ rewrites with action verbs and quantifiable metric prompts.',
      icon: FileEdit,
    },
    {
      title: 'Categorized Problems Log',
      desc: 'Clear classification of issues into Critical, Warning, and Improvement with Problem → Why It Matters → How to Fix.',
      icon: CheckSquare,
    },
    {
      title: 'Section Recognition & Health',
      desc: 'Audits Contact Info, Summary, Experience, Education, Skills, Projects, and Certifications for completeness and positioning.',
      icon: BarChart3,
    },
    {
      title: '100% Ephemeral Privacy',
      desc: 'Your resume is analyzed in-memory and never sold or shared. Zero permanent storage unless you choose to save it.',
      icon: Shield,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Engine Features
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Modern Job Seekers & Engineers
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Everything you need to transform a generic resume into a targeted, high-ranking application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-800">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
