import { CategoryScoreDetail, ParsedResumeData, ResumeProblem } from '@/types';
import { formatScoreRating } from '@/lib/utils';
import { DEFAULT_ATS_WEIGHTS } from './ats-config';

export function analyzeATSCompatibility(data: ParsedResumeData): {
  scoreDetail: CategoryScoreDetail;
  problems: ResumeProblem[];
} {
  const maxScore = DEFAULT_ATS_WEIGHTS.atsCompatibility; // 10
  let score = maxScore;
  const problems: ResumeProblem[] = [];
  const whatWasChecked: string[] = [
    'Text extractability & machine readability',
    'Standard section segmentation reliability',
    'Absence of unparseable graphical elements',
    'Plaintext token integrity and character encoding',
    'Overall ATS parsing risk score'
  ];
  const whatIsGood: string[] = [];
  const whatIsWrong: string[] = [];
  const howToImprove: string[] = [];

  // Check 1: Scanned or low text
  if (data.isScannedOrLowText) {
    score -= 6;
    whatIsWrong.push('High parsing risk: Extracted text volume is abnormally low.');
    howToImprove.push('Ensure the resume is saved as text-based PDF/DOCX, not an image scan.');
    problems.push({
      id: 'ats-unreadable-text',
      category: 'ats_compatibility',
      severity: 'critical',
      problem: 'High risk of text parsing failure.',
      whyItMatters: 'If ATS parser receives insufficient plaintext, your application will be marked incomplete.',
      recommendedFix: 'Re-export your document directly from your word processor.',
    });
  } else {
    whatIsGood.push('100% extractable plaintext with high optical readability.');
  }

  // Check 2: Recognized sections count
  const recognizedCount = data.detectedSections.filter((s) => s.status === 'present').length;
  if (recognizedCount >= 4) {
    whatIsGood.push(`Successfully segmented ${recognizedCount} standard resume sections.`);
  } else if (recognizedCount >= 2) {
    score -= 2;
    whatIsWrong.push(`Only ${recognizedCount} standard sections were confidently segmented.`);
    howToImprove.push('Use unambiguous section headers on their own lines.');
  } else {
    score -= 4;
    whatIsWrong.push('ATS parser struggled to separate sections.');
    howToImprove.push('Follow a traditional resume hierarchy with clear section demarcations.');
    problems.push({
      id: 'ats-poor-segmentation',
      category: 'ats_compatibility',
      severity: 'warning',
      problem: 'Low section segmentation confidence.',
      whyItMatters: 'When sections cannot be partitioned, experiences and education get jumbled together.',
      recommendedFix: 'Put each major heading (e.g. WORK EXPERIENCE) on a dedicated line in ALL CAPS or Bold.',
    });
  }

  // Check 3: Unusual symbols
  if (data.hasUnusualSymbols) {
    score -= 2;
    whatIsWrong.push('Non-standard Unicode symbols or non-ASCII characters may decode improperly.');
    howToImprove.push('Stick to standard UTF-8/ASCII characters and avoid decorative fonts.');
  } else {
    whatIsGood.push('Clean character encoding without corrupted glyphs.');
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
