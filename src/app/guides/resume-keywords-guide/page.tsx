import React from 'react';
import Link from 'next/link';
import { ArrowRight, Key, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Keywords Guide: How to Match Job Descriptions | ResumeATS Pro',
  description: 'Master the art of keyword optimization for ATS without stuffing or sounding robotic.',
};

export default function ResumeKeywordsGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Guides</span>
        <span>/</span>
        <span className="text-indigo-600 dark:text-indigo-400">Resume Keywords Strategy</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Keyword Optimization Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          How to Optimize Resume Keywords for ATS Algorithms
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Learn how to extract high-impact technical keywords from job descriptions and integrate them naturally into your project and experience bullet points.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Types of Keywords ATS Parsers Look For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">Hard / Technical Skills</span>
              <p className="text-xs text-slate-500">Programming languages, frameworks, cloud tools, databases (e.g., React, TypeScript, Docker, PostgreSQL).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">Methodologies & Tools</span>
              <p className="text-xs text-slate-500">Agile, Scrum, CI/CD, TDD, REST APIs, Microservices, Git, JIRA.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. The Natural Integration Technique
          </h2>
          <p>
            Instead of just listing keywords in a giant block at the bottom, integrate them into your bullet points using the <strong>XYZ achievement formula</strong>:
          </p>
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-[11px] text-slate-800 dark:text-slate-200">
            "Architected and deployed microservices using <strong className="text-indigo-600">Docker</strong> and <strong className="text-indigo-600">Node.js</strong> on <strong className="text-indigo-600">AWS ECS</strong>, reducing server latency by 35%."
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Compare your keywords against a real job</h3>
          <p className="text-xs text-slate-400">
            Paste any job description to see your exact matched vs missing keyword breakdown.
          </p>
        </div>
        <Link
          href="/analyze"
          className="px-6 py-3 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-indigo-50 shadow-md transition flex items-center gap-2 flex-shrink-0"
        >
          <Key className="w-4 h-4 text-indigo-600" />
          Analyze Keywords Now
        </Link>
      </div>
    </div>
  );
}
