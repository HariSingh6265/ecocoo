import { CategoryScoreDetail, ParsedResumeData, ResumeProblem } from '@/types';
import { formatScoreRating } from '@/lib/utils';
import { DEFAULT_ATS_WEIGHTS } from './ats-config';

export function analyzeContact(data: ParsedResumeData): {
  scoreDetail: CategoryScoreDetail;
  problems: ResumeProblem[];
} {
  const maxScore = DEFAULT_ATS_WEIGHTS.contact; // 10
  let score = maxScore;
  const problems: ResumeProblem[] = [];
  const whatWasChecked: string[] = [
    'Candidate full name visibility',
    'Valid email address format',
    'Phone number format and availability',
    'LinkedIn profile link',
    'GitHub / Portfolio / Project links',
    'Location (City, State/Country)'
  ];
  const whatIsGood: string[] = [];
  const whatIsWrong: string[] = [];
  const howToImprove: string[] = [];

  const { contactInfo } = data;

  // Name check
  if (contactInfo.name) {
    whatIsGood.push(`Full name identified: "${contactInfo.name}".`);
  } else {
    score -= 2;
    whatIsWrong.push('Candidate name could not be distinctly isolated at the top.');
    howToImprove.push('Place your full name in large, clear text at the very top of the first page.');
  }

  // Email check
  if (contactInfo.email) {
    whatIsGood.push(`Valid professional email detected: ${contactInfo.email}.`);
  } else {
    score -= 4;
    whatIsWrong.push('No valid email address detected.');
    howToImprove.push('Include a professional email address prominently in the header.');
    problems.push({
      id: 'cntct-missing-email',
      category: 'contact',
      severity: 'critical',
      problem: 'No email address found in resume header.',
      whyItMatters: 'Recruiters and automated ATS systems communicate primarily via email; missing an email prevents interview invites.',
      recommendedFix: 'Add a clean, clickable email address (e.g. name@domain.com) at the top of your resume.',
    });
  }

  // Phone check
  if (contactInfo.phone) {
    whatIsGood.push(`Phone number detected: ${contactInfo.phone}.`);
  } else {
    score -= 2;
    whatIsWrong.push('Phone number missing or formatted in an unparseable style.');
    howToImprove.push('Add a phone number with country/area code (e.g. +1 555-019-2834).');
    problems.push({
      id: 'cntct-missing-phone',
      category: 'contact',
      severity: 'warning',
      problem: 'No phone number detected.',
      whyItMatters: 'Recruiters often conduct initial phone screens; a missing phone number causes friction.',
      recommendedFix: 'Include your direct mobile number with country code.',
    });
  }

  // LinkedIn check
  if (contactInfo.linkedIn) {
    whatIsGood.push('LinkedIn profile URL detected.');
  } else {
    score -= 1;
    whatIsWrong.push('No LinkedIn profile link detected.');
    howToImprove.push('Add your customized LinkedIn URL (e.g. linkedin.com/in/yourname).');
    problems.push({
      id: 'cntct-missing-linkedin',
      category: 'contact',
      severity: 'improvement',
      problem: 'LinkedIn profile link is missing.',
      whyItMatters: 'Over 90% of technical recruiters cross-reference LinkedIn profiles during candidate evaluation.',
      recommendedFix: 'Add a clean link to your LinkedIn profile in the contact header.',
    });
  }

  // GitHub or Portfolio check
  if (contactInfo.github || contactInfo.portfolio) {
    whatIsGood.push('GitHub / Portfolio link present, showcasing live projects.');
  } else {
    howToImprove.push('Include a link to your GitHub profile or personal portfolio website.');
  }

  // Location check
  if (contactInfo.location) {
    whatIsGood.push(`Location detected: ${contactInfo.location}.`);
  } else {
    score -= 1;
    whatIsWrong.push('No clear city/state location detected.');
    howToImprove.push('Add your City and State/Country (e.g. "San Francisco, CA" or "Bangalore, India").');
  }

  score = Math.max(0, Math.min(maxScore, score));
  const percentage = Math.round((score / maxScore) * 100);

  return {
    scoreDetail: {
      score,
      maxScore,
      percentage,
      rating: formatScoreRating(percentage),
      whatWasChecked,
      whatIsGood,
      whatIsWrong,
      howToImprove,
    },
    problems,
  };
}
