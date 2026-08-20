import { CategoryScoreDetail, ParsedResumeData, ResumeProblem } from '@/types';
import { formatScoreRating } from '@/lib/utils';
import { DEFAULT_ATS_WEIGHTS } from './ats-config';

export function analyzeContent(data: ParsedResumeData): {
  scoreDetail: CategoryScoreDetail;
  problems: ResumeProblem[];
} {
  const maxScore = DEFAULT_ATS_WEIGHTS.content; // 20
  let score = maxScore;
  const problems: ResumeProblem[] = [];
  const whatWasChecked: string[] = [
    'Resume length and word density (ideal 450–900 words)',
    'Professional summary / profile section',
    'Work experience details and tenure',
    'Education credentials (degree, major, university)',
    'Skills categorization',
    'Projects and portfolio evidence',
    'Certifications and accreditations'
  ];
  const whatIsGood: string[] = [];
  const whatIsWrong: string[] = [];
  const howToImprove: string[] = [];

  // Check 1: Word Count
  if (data.wordCount >= 400 && data.wordCount <= 950) {
    whatIsGood.push(`Optimal resume length (${data.wordCount} words) suitable for a 1–2 page professional resume.`);
  } else if (data.wordCount < 250) {
    score -= 4;
    whatIsWrong.push(`Resume is too brief (${data.wordCount} words), lacking sufficient detail.`);
    howToImprove.push('Expand on your projects, responsibilities, technical tools, and measurable achievements.');
    problems.push({
      id: 'cnt-too-short',
      category: 'content',
      severity: 'warning',
      problem: `Resume content is too brief (${data.wordCount} words).`,
      whyItMatters: 'A very short resume often fails ATS keyword density thresholds and lacks proof of experience.',
      recommendedFix: 'Add bullet points detailing specific responsibilities, tools used, and outcomes for each role.',
    });
  } else if (data.wordCount > 1300) {
    score -= 2;
    whatIsWrong.push(`Resume is overly lengthy (${data.wordCount} words), risking reader fatigue.`);
    howToImprove.push('Condense older or less relevant roles and focus on your top achievements from the last 5–7 years.');
    problems.push({
      id: 'cnt-too-long',
      category: 'content',
      severity: 'improvement',
      problem: `Resume is unusually long (${data.wordCount} words).`,
      whyItMatters: 'Recruiters spend 6–10 seconds on initial scan; excessive text dilutes your key achievements.',
      recommendedFix: 'Trim verbose sentences, eliminate redundant bullets, and aim for a crisp 1–2 page document.',
    });
  } else {
    whatIsGood.push(`Good overall content depth (${data.wordCount} words).`);
  }

  // Check 2: Professional Summary
  const summarySec = data.detectedSections.find((s) => s.name === 'summary');
  if (summarySec && summarySec.status === 'present') {
    whatIsGood.push('Includes a professional summary to position your career narrative.');
  } else {
    score -= 2;
    whatIsWrong.push('Missing a dedicated Professional Summary section.');
    howToImprove.push('Add a 2–3 sentence professional summary highlighting your specialization and top skills.');
    problems.push({
      id: 'cnt-missing-summary',
      category: 'content',
      severity: 'improvement',
      problem: 'No Professional Summary or Profile found at the top.',
      whyItMatters: 'A concise summary immediately frames your qualifications for both human recruiters and keyword rankers.',
      recommendedFix: 'Add a 3-line Summary highlighting your role title, years of experience, core tech stack, and notable accomplishment.',
    });
  }

  // Check 3: Education
  const eduSec = data.detectedSections.find((s) => s.name === 'education');
  if (eduSec && eduSec.status === 'present') {
    whatIsGood.push('Dedicated Education section with degrees and academic background.');
  } else {
    score -= 4;
    whatIsWrong.push('Education section is missing or unidentifiable.');
    howToImprove.push('Include your degree, institution name, major, and graduation year.');
    problems.push({
      id: 'cnt-missing-education',
      category: 'content',
      severity: 'critical',
      problem: 'Education credentials missing or unparsed.',
      whyItMatters: 'Many ATS filters automatically screen out applicants without explicit degree/major matches.',
      recommendedFix: 'Add a clear "EDUCATION" section listing Degree, Major, University, and Graduation Year.',
    });
  }

  // Check 4: Skills Section
  const skillsSec = data.detectedSections.find((s) => s.name === 'skills');
  if (skillsSec && skillsSec.status === 'present') {
    whatIsGood.push('Explicit Skills section highlighting key competencies.');
  } else {
    score -= 4;
    whatIsWrong.push('No dedicated Technical Skills section detected.');
    howToImprove.push('Create a categorized Skills section (e.g., Languages, Frameworks, Databases, Tools).');
    problems.push({
      id: 'cnt-missing-skills-section',
      category: 'content',
      severity: 'critical',
      problem: 'Missing a dedicated Skills section.',
      whyItMatters: 'Without a clear skills block, ATS parsers must hunt through body text, often missing core qualifications.',
      recommendedFix: 'Add a "TECHNICAL SKILLS" section categorized by Languages, Frameworks, Developer Tools, and Cloud.',
    });
  }

  // Check 5: Projects
  const projSec = data.detectedSections.find((s) => s.name === 'projects');
  if (projSec && projSec.status === 'present') {
    whatIsGood.push('Includes technical or academic projects demonstrating hands-on execution.');
  } else {
    whatIsWrong.push('No separate Projects section detected.');
    howToImprove.push('Include 2–3 notable projects showcasing relevant tools and GitHub/live demo links.');
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
