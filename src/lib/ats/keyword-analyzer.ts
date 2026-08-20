import { CategoryScoreDetail, KeywordMatchItem, ParsedResumeData, ResumeProblem } from '@/types';
import { formatScoreRating } from '@/lib/utils';
import { COMMON_SKILLS_DICTIONARY, DEFAULT_ATS_WEIGHTS } from './ats-config';

export function extractKeywordsFromText(text: string): {
  foundKeywords: Map<string, { category: KeywordMatchItem['category']; count: number }>;
} {
  const lower = text.toLowerCase();
  const foundKeywords = new Map<string, { category: KeywordMatchItem['category']; count: number }>();

  // Helper to test if skill is present as whole word / phrase
  const checkSkill = (skill: string, category: KeywordMatchItem['category']) => {
    // Escape special regex chars like c++, .net, c#
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9#+.])${escaped}(?:$|[^a-zA-Z0-9#+.])`, 'gi');
    const matches = lower.match(regex);
    if (matches && matches.length > 0) {
      foundKeywords.set(skill, {
        category,
        count: matches.length,
      });
    }
  };

  for (const [catKey, skills] of Object.entries(COMMON_SKILLS_DICTIONARY)) {
    let category: KeywordMatchItem['category'] = 'technical';
    if (catKey === 'cloud_devops' || catKey === 'tools_methodologies') category = 'tools';
    else if (catKey === 'soft_skills') category = 'soft_skills';
    else if (catKey === 'ai_data') category = 'technical';
    else if (catKey === 'databases') category = 'technical';

    for (const skill of skills) {
      checkSkill(skill, category);
    }
  }

  return { foundKeywords };
}

export function analyzeKeywords(
  data: ParsedResumeData,
  jobDescription?: string
): {
  scoreDetail: CategoryScoreDetail;
  matchedKeywords: KeywordMatchItem[];
  missingKeywords: KeywordMatchItem[];
  recommendedKeywords: KeywordMatchItem[];
  densityStats: {
    totalKeywordsDetected: number;
    uniqueKeywordsCount: number;
    keywordStuffingRisk: boolean;
  };
  problems: ResumeProblem[];
} {
  const maxScore = DEFAULT_ATS_WEIGHTS.keywords; // 25
  let score = maxScore;
  const problems: ResumeProblem[] = [];
  const whatWasChecked: string[] = [
    'Technical skills and industry terminology',
    'Developer tools, frameworks, and database keywords',
    'Soft skills and collaboration proficiencies',
    'Keyword density and repetition distribution',
    'Keyword stuffing / spam risk',
  ];
  const whatIsGood: string[] = [];
  const whatIsWrong: string[] = [];
  const howToImprove: string[] = [];

  const resumeKeywordsMap = extractKeywordsFromText(data.cleanText).foundKeywords;
  let totalKeywordsDetected = 0;
  let maxSingleRepetition = 0;

  resumeKeywordsMap.forEach((info) => {
    totalKeywordsDetected += info.count;
    if (info.count > maxSingleRepetition) {
      maxSingleRepetition = info.count;
    }
  });

  const uniqueKeywordsCount = resumeKeywordsMap.size;
  const keywordStuffingRisk =
    maxSingleRepetition > 9 || (data.wordCount > 0 && totalKeywordsDetected / data.wordCount > 0.22);

  const matchedKeywords: KeywordMatchItem[] = [];
  const missingKeywords: KeywordMatchItem[] = [];
  const recommendedKeywords: KeywordMatchItem[] = [];

  if (jobDescription && jobDescription.trim().length > 20) {
    whatWasChecked.push('Direct comparison against target Job Description requirements');
    const jobKeywordsMap = extractKeywordsFromText(jobDescription).foundKeywords;

    // Check matches
    jobKeywordsMap.forEach((jobInfo, skill) => {
      if (resumeKeywordsMap.has(skill)) {
        const resInfo = resumeKeywordsMap.get(skill)!;
        matchedKeywords.push({
          keyword: skill,
          category: jobInfo.category,
          frequencyInResume: resInfo.count,
          frequencyInJob: jobInfo.count,
          importance: jobInfo.count >= 2 ? 'high' : 'medium',
        });
      } else {
        missingKeywords.push({
          keyword: skill,
          category: jobInfo.category,
          frequencyInResume: 0,
          frequencyInJob: jobInfo.count,
          importance: jobInfo.count >= 2 ? 'high' : 'medium',
        });
      }
    });

    // Sort matched by job frequency
    matchedKeywords.sort((a, b) => (b.frequencyInJob || 0) - (a.frequencyInJob || 0));
    missingKeywords.sort((a, b) => (b.frequencyInJob || 0) - (a.frequencyInJob || 0));

    // Calculate match ratio
    const totalJobSkills = jobKeywordsMap.size;
    const matchCount = matchedKeywords.length;
    const matchRatio = totalJobSkills > 0 ? matchCount / totalJobSkills : 1;

    if (matchRatio >= 0.7) {
      whatIsGood.push(
        `Strong keyword alignment: matches ${matchCount} out of ${totalJobSkills} key competencies from the job description.`
      );
      score = Math.round(maxScore * (0.8 + matchRatio * 0.2));
    } else if (matchRatio >= 0.45) {
      const penalty = Math.round(maxScore * (1 - matchRatio) * 0.7);
      score -= penalty;
      whatIsGood.push(`Matches ${matchCount} important requirements from the target role.`);
      whatIsWrong.push(
        `Missing ${missingKeywords.length} keywords that were highlighted in the job description.`
      );
      howToImprove.push(
        `Naturally incorporate missing skills like ${missingKeywords
          .slice(0, 3)
          .map((k) => k.keyword)
          .join(', ')} if you have experience with them.`
      );
      problems.push({
        id: 'kw-missing-target-skills',
        category: 'keywords',
        severity: 'warning',
        problem: `Missing ${missingKeywords.length} target skills found in the job description.`,
        whyItMatters:
          'ATS software ranks applicants based on how closely their resumes match the specific keywords in the job description.',
        recommendedFix: `Review the missing keywords list (${missingKeywords
          .slice(0, 4)
          .map((k) => k.keyword)
          .join(', ')}) and add them where truthful in your skills and project bullets.`,
      });
    } else {
      const penalty = Math.round(maxScore * 0.55);
      score -= penalty;
      whatIsWrong.push(
        `Significant keyword gap: only matches ${matchCount} of ${totalJobSkills} target keywords from the job description.`
      );
      howToImprove.push(
        'Tailor your resume specifically for this role by addressing the required technical competencies.'
      );
      problems.push({
        id: 'kw-heavy-mismatch',
        category: 'keywords',
        severity: 'critical',
        problem: 'Low keyword match with the provided job description.',
        whyItMatters:
          'A low keyword match score is the primary reason resumes get filtered out before recruiter review.',
        recommendedFix:
          'Align your technical skills and project descriptions directly with the tools and frameworks requested in the job posting.',
      });
    }
  } else {
    // Resume-only general ATS keyword analysis
    if (uniqueKeywordsCount >= 14) {
      whatIsGood.push(
        `Rich technical vocabulary with ${uniqueKeywordsCount} distinct industry skills and technologies.`
      );
    } else if (uniqueKeywordsCount >= 8) {
      score -= 3;
      whatIsGood.push(`Identified ${uniqueKeywordsCount} relevant technical keywords.`);
      whatIsWrong.push('Keyword diversity could be expanded to strengthen ATS discoverability.');
      howToImprove.push(
        'Specify concrete developer tools, testing frameworks, and cloud services you have worked with.'
      );
    } else {
      score -= 8;
      whatIsWrong.push(`Very few technical skills identified (${uniqueKeywordsCount} skills found).`);
      howToImprove.push(
        'Add specific tools, programming languages, databases, and libraries to your skills section.'
      );
      problems.push({
        id: 'kw-low-density',
        category: 'keywords',
        severity: 'warning',
        problem: 'Low technical keyword count across the resume.',
        whyItMatters:
          'ATS search filters index candidates by specific technical keywords (e.g. "React", "Docker", "PostgreSQL").',
        recommendedFix:
          'Expand your Skills section with exact technology names and mention them in your experience bullet points.',
      });
    }

    // Populate matched from resume keywords
    resumeKeywordsMap.forEach((info, skill) => {
      matchedKeywords.push({
        keyword: skill,
        category: info.category,
        frequencyInResume: info.count,
        importance: 'medium',
      });
    });
    matchedKeywords.sort((a, b) => b.frequencyInResume - a.frequencyInResume);

    // Provide relevant recommendations based on what is present
    if (resumeKeywordsMap.has('react') && !resumeKeywordsMap.has('typescript')) {
      recommendedKeywords.push({
        keyword: 'TypeScript',
        category: 'technical',
        frequencyInResume: 0,
        importance: 'high',
      });
    }
    if (resumeKeywordsMap.has('node.js') && !resumeKeywordsMap.has('docker')) {
      recommendedKeywords.push({
        keyword: 'Docker',
        category: 'tools',
        frequencyInResume: 0,
        importance: 'high',
      });
    }
    if (!resumeKeywordsMap.has('git')) {
      recommendedKeywords.push({
        keyword: 'Git',
        category: 'tools',
        frequencyInResume: 0,
        importance: 'high',
      });
    }
    if (!resumeKeywordsMap.has('ci/cd') && !resumeKeywordsMap.has('github actions')) {
      recommendedKeywords.push({
        keyword: 'CI/CD',
        category: 'tools',
        frequencyInResume: 0,
        importance: 'medium',
      });
    }
    if (!resumeKeywordsMap.has('unit testing') && !resumeKeywordsMap.has('jest')) {
      recommendedKeywords.push({
        keyword: 'Unit Testing',
        category: 'methodology',
        frequencyInResume: 0,
        importance: 'medium',
      });
    }
  }

  // Check keyword stuffing
  if (keywordStuffingRisk) {
    score -= 4;
    whatIsWrong.push('Potential keyword stuffing detected (excessive repetition of specific terms).');
    howToImprove.push(
      'Avoid artificially repeating keywords. Use each skill in context within bullet points.'
    );
    problems.push({
      id: 'kw-stuffing-risk',
      category: 'keywords',
      severity: 'warning',
      problem: 'Unnatural repetition of keywords detected.',
      whyItMatters:
        'Modern ATS and recruiters penalize resumes that spam keyword lists or repeat terms artificially.',
      recommendedFix:
        'Distribute keywords naturally across genuine project and experience accomplishments.',
    });
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
    matchedKeywords,
    missingKeywords,
    recommendedKeywords,
    densityStats: {
      totalKeywordsDetected,
      uniqueKeywordsCount,
      keywordStuffingRisk,
    },
    problems,
  };
}
