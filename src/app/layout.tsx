import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ResumeATS Pro | Free Production-Ready ATS Resume Analyzer',
  description:
    'Know your resume’s ATS score before the recruiter does. Analyze your resume against 28 ATS checks, discover missing keywords, and get actionable bullet-point improvements.',
  keywords: [
    'ATS Resume Checker',
    'Resume Scanner',
    'Applicant Tracking System',
    'ATS Score',
    'Resume Keyword Matcher',
    'Resume Optimizer',
    'Tech Resume Review',
  ],
  authors: [{ name: 'ResumeATS Team' }],
  openGraph: {
    title: 'ResumeATS Pro — ATS Compatibility & Keyword Analyzer',
    description:
      'Analyze your resume against ATS best practices and target job descriptions. Free, private, and instant.',
    type: 'website',
    url: 'https://resumeats.pro',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
