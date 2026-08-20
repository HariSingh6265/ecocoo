import { JobMatchBreakdown, ParsedResumeData, KeywordMatchItem } from '@/types';
import { extractKeywordsFromText } from './keyword-analyzer';

export function calculateJobMatch(
  data: ParsedResumeData,
  jobDescription: string,
  matchedKeywords: KeywordMatchItem[],
  missingKeywords: KeywordMatchItem[]
): JobMatchBreakdown {
  const jdLower = jobDescription.toLowerCase();
  const resumeLower = data.cleanText.toLowerCase();

  // 1. Technical Skills Match
  const techMatched = matchedKeywords.filter((k) => k.category === 'technical' || k.category === 'tools').length;
  const techMissing = missingKeywords.filter((k) => k.category === 'technical' || k.category === 'tools').length;
  const totalTech = techMatched + techMissing;
  const technicalSkillsMatch = totalTech > 0 ? Math.round((techMatched / totalTech) * 100) : 85;

  // 2. Keyword Match
  const totalKeywords = matchedKeywords.length + missingKeywords.length;
  const keywordMatch = totalKeywords > 0 ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 80;

  // 3. Experience Match
  let experienceMatch = 70;
  // Look for year requirements in JD (e.g. "3+ years", "5 years")
  const expMatchJD = jobDescription.match(/(\d+)\+?\s*years?(?:\s+of)?\s+experience/i);
  const requiredYears = expMatchJD ? parseInt(expMatchJD[1], 10) : 2;
  
  // Look for years mentioned in resume
  const expMatchesResume = data.cleanText.match(/(\d+)\+?\s*years?(?:\s+of)?\s+experience/i);
  const candidateYears = expMatchesResume ? parseInt(expMatchesResume[1], 10) : 2;

  if (candidateYears >= requiredYears) {
    experienceMatch = 95;
  } else {
    experienceMatch = Math.max(50, Math.round((candidateYears / Math.max(1, requiredYears)) * 90));
  }

  // 4. Education Match
  let educationMatch = 85;
  const degrees = ['bachelor', 'master', 'phd', 'b.s.', 'm.s.', 'b.tech', 'm.tech', 'computer science', 'engineering'];
  let degreeInJD = false;
  let degreeInResume = false;

  for (const deg of degrees) {
    if (jdLower.includes(deg)) degreeInJD = true;
    if (resumeLower.includes(deg)) degreeInResume = true;
  }

  if (degreeInJD && degreeInResume) {
    educationMatch = 100;
  } else if (!degreeInJD && degreeInResume) {
    educationMatch = 95;
  } else if (degreeInJD && !degreeInResume) {
    educationMatch = 60;
  }

  // 5. Job Title Alignment
  let jobTitleAlignment = 65;
  const jobTitles = [
    'software engineer', 'full stack developer', 'frontend developer', 'backend developer',
    'data scientist', 'data analyst', 'devops engineer', 'product manager', 'machine learning engineer',
    'cloud architect', 'qa engineer', 'systems engineer', 'mobile developer'
  ];

  let detectedJobTitleInJD: string | null = null;
  for (const title of jobTitles) {
    if (jdLower.includes(title)) {
      detectedJobTitleInJD = title;
      break;
    }
  }

  if (detectedJobTitleInJD) {
    if (resumeLower.includes(detectedJobTitleInJD)) {
      jobTitleAlignment = 95;
    } else {
      // Check partial title match
      const titleWords = detectedJobTitleInJD.split(/\s+/);
      const matches = titleWords.filter((w) => resumeLower.includes(w)).length;
      jobTitleAlignment = Math.max(40, Math.round((matches / titleWords.length) * 85));
    }
  }

  // Overall Weighted Match
  const overallMatchPercentage = Math.round(
    technicalSkillsMatch * 0.35 +
    keywordMatch * 0.25 +
    experienceMatch * 0.20 +
    educationMatch * 0.10 +
    jobTitleAlignment * 0.10
  );

  // Top Matching Areas
  const topMatchingAreas: string[] = [];
  const topMatchedSkills = matchedKeywords.slice(0, 4).map((k) => k.keyword);
  if (topMatchedSkills.length > 0) {
    topMatchingAreas.push(`Core competencies: ${topMatchedSkills.join(', ')}`);
  }
  if (educationMatch >= 90) {
    topMatchingAreas.push('Academic qualifications and degree requirements aligned');
  }
  if (technicalSkillsMatch >= 75) {
    topMatchingAreas.push('High alignment with technical stack and development tools');
  }
  if (topMatchingAreas.length < 2) {
    topMatchingAreas.push('Standard technical background and relevant industry skills');
  }

  // Biggest Gaps
  const biggestGaps: string[] = [];
  const highPriorityMissing = missingKeywords.filter((k) => k.importance === 'high').map((k) => k.keyword);
  if (highPriorityMissing.length > 0) {
    biggestGaps.push(`Key missing tools/frameworks: ${highPriorityMissing.slice(0, 4).join(', ')}`);
  }
  if (jobTitleAlignment < 70 && detectedJobTitleInJD) {
    biggestGaps.push(`Target role title "${detectedJobTitleInJD}" is not explicitly reflected in your headline or summary.`);
  }
  if (experienceMatch < 70) {
    biggestGaps.push(`Experience depth gap compared to the ${requiredYears}+ years requested in the posting.`);
  }
  if (biggestGaps.length === 0) {
    biggestGaps.push('Minor domain-specific nuances; ensure project bullet points highlight business impact.');
  }

  return {
    overallMatchPercentage,
    technicalSkillsMatch,
    experienceMatch,
    keywordMatch,
    educationMatch,
    jobTitleAlignment,
    topMatchingAreas,
    biggestGaps,
  };
}
