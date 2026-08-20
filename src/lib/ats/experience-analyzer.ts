import { CategoryScoreDetail, ParsedResumeData, ResumeProblem, BulletImprovement } from '@/types';
import { formatScoreRating } from '@/lib/utils';
import { DEFAULT_ATS_WEIGHTS } from './ats-config';
import { analyzeBulletPoints } from './bullet-analyzer';

export function analyzeExperience(data: ParsedResumeData): {
  scoreDetail: CategoryScoreDetail;
  bulletImprovements: BulletImprovement[];
  problems: ResumeProblem[];
} {
  const maxScore = DEFAULT_ATS_WEIGHTS.experience; // 15
  let score = maxScore;
  const problems: ResumeProblem[] = [];
  const whatWasChecked: string[] = [
    'Strong action verbs at the beginning of bullet points',
    'Quantifiable achievements (percentages, revenue, scale, latency)',
    'Outcome-oriented statements vs passive task descriptions',
    'Technical context and tool mentions in work history',
    'Bullet point structure and clarity'
  ];
  const whatIsGood: string[] = [];
  const whatIsWrong: string[] = [];
  const howToImprove: string[] = [];

  const experienceText = data.sections['experience'] || '';
  const projectsText = data.sections['projects'] || '';

  const {
    bulletImprovements,
    totalBullets,
    bulletsWithActionVerbs,
    bulletsWithMetrics,
  } = analyzeBulletPoints(experienceText, projectsText);

  if (totalBullets === 0) {
    score -= 8;
    whatIsWrong.push('No bulleted experience or project points detected.');
    howToImprove.push('Use structured bullet points for each job and project rather than solid paragraphs.');
    problems.push({
      id: 'exp-no-bullets',
      category: 'experience',
      severity: 'critical',
      problem: 'Experience descriptions lack bullet points.',
      whyItMatters: 'ATS parsers and recruiters skim bullet points; large blocks of text are rarely read thoroughly.',
      recommendedFix: 'Break down each role into 3–5 bullet points starting with strong action verbs.',
    });
  } else {
    // Action verb ratio
    const verbRatio = bulletsWithActionVerbs / totalBullets;
    if (verbRatio >= 0.7) {
      whatIsGood.push(`Excellent use of dynamic action verbs (${Math.round(verbRatio * 100)}% of bullets begin with strong verbs).`);
    } else if (verbRatio >= 0.4) {
      score -= 2;
      whatIsGood.push(`Good foundation of action verbs (${Math.round(verbRatio * 100)}% of bullets).`);
      whatIsWrong.push('Several bullets start with passive phrases like "worked on" or "responsible for".');
      howToImprove.push('Begin every bullet point with an assertive action verb (e.g. "Architected", "Engineered", "Spearheaded").');
    } else {
      score -= 4;
      whatIsWrong.push('Most bullet points start with passive language rather than action verbs.');
      howToImprove.push('Replace passive phrases with strong action verbs that highlight your direct contribution.');
      problems.push({
        id: 'exp-passive-verbs',
        category: 'experience',
        severity: 'warning',
        problem: 'Too many passive or responsibility-based phrases.',
        whyItMatters: 'Passive language fails to convey ownership and reduces ATS impact scoring.',
        recommendedFix: 'Rewrite bullets to start with power verbs like Developed, Designed, Automated, or Reduced.',
      });
    }

    // Metric ratio
    const metricRatio = bulletsWithMetrics / totalBullets;
    if (metricRatio >= 0.4) {
      whatIsGood.push(`Strong quantifiable impact: ${Math.round(metricRatio * 100)}% of bullets include measurable metrics or numbers.`);
    } else if (metricRatio >= 0.15) {
      score -= 2;
      whatIsGood.push('Includes some measurable outcomes in experience descriptions.');
      whatIsWrong.push('More bullet points would benefit from concrete metrics or numbers.');
      howToImprove.push('Add specific numbers (e.g., "% improvement", "user count", "latency reduction", "$ saved").');
    } else {
      score -= 4;
      whatIsWrong.push('Very few quantifiable achievements or measurable results found.');
      howToImprove.push('Quantify your contributions with real metrics, percentages, team sizes, or efficiency gains.');
      problems.push({
        id: 'exp-lacks-metrics',
        category: 'experience',
        severity: 'improvement',
        problem: 'Experience bullet points lack measurable metrics.',
        whyItMatters: 'Resumes with quantifiable data (e.g. "reduced load time by 35%") stand out 3x more to hiring managers.',
        recommendedFix: 'Use the XYZ formula: Accomplished [X], as measured by [Y], by doing [Z]. Add estimates where exact numbers are unknown.',
      });
    }
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
    bulletImprovements,
    problems,
  };
}
