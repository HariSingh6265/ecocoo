import { ATSAnalysisResult, ParsedResumeData, ResumeStrength } from '@/types';
import { formatScoreRating } from '@/lib/utils';
import { analyzeFormatting } from './formatting-analyzer';
import { analyzeContent } from './content-analyzer';
import { analyzeKeywords } from './keyword-analyzer';
import { analyzeExperience } from './experience-analyzer';
import { analyzeContact } from './contact-analyzer';
import { analyzeATSCompatibility } from './ats-compatibility-analyzer';
import { calculateJobMatch } from './job-matcher';

export function runATSAnalysis(
  data: ParsedResumeData,
  options: {
    resumeName?: string;
    jobDescription?: string;
    jobTitle?: string;
    jobCompany?: string;
  } = {}
): ATSAnalysisResult {
  const { resumeName = 'Uploaded Resume', jobDescription, jobTitle, jobCompany } = options;
  const analysisMode = jobDescription && jobDescription.trim().length > 20 ? 'resume_and_job' : 'resume_only';

  // Run all 6 category analyzers
  const formattingRes = analyzeFormatting(data);
  const contentRes = analyzeContent(data);
  const keywordsRes = analyzeKeywords(data, jobDescription);
  const experienceRes = analyzeExperience(data);
  const contactRes = analyzeContact(data);
  const compatibilityRes = analyzeATSCompatibility(data);

  // Calculate Overall Score (sum of all 6 category scores)
  const overallScore = Math.min(
    100,
    Math.max(
      0,
      formattingRes.scoreDetail.score +
      contentRes.scoreDetail.score +
      keywordsRes.scoreDetail.score +
      experienceRes.scoreDetail.score +
      contactRes.scoreDetail.score +
      compatibilityRes.scoreDetail.score
    )
  );

  const overallRating = formatScoreRating(overallScore);

  // Aggregate problems and sort by severity
  const severityRank = { critical: 0, warning: 1, improvement: 2 };
  const allProblems = [
    ...formattingRes.problems,
    ...contentRes.problems,
    ...keywordsRes.problems,
    ...experienceRes.problems,
    ...contactRes.problems,
    ...compatibilityRes.problems,
  ].sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);

  // Generate Strengths from good points
  const strengths: ResumeStrength[] = [];
  const allGoodPoints = [
    ...formattingRes.scoreDetail.whatIsGood.map((t) => ({ category: 'Formatting', text: t })),
    ...contentRes.scoreDetail.whatIsGood.map((t) => ({ category: 'Content Quality', text: t })),
    ...keywordsRes.scoreDetail.whatIsGood.map((t) => ({ category: 'Keywords', text: t })),
    ...experienceRes.scoreDetail.whatIsGood.map((t) => ({ category: 'Experience & Impact', text: t })),
    ...contactRes.scoreDetail.whatIsGood.map((t) => ({ category: 'Contact Information', text: t })),
    ...compatibilityRes.scoreDetail.whatIsGood.map((t) => ({ category: 'ATS Compatibility', text: t })),
  ];

  allGoodPoints.slice(0, 6).forEach((item, idx) => {
    strengths.push({
      id: `str-${idx + 1}`,
      category: item.category,
      title: item.text.split(':')[0] || item.text.slice(0, 40),
      detail: item.text,
    });
  });

  // Calculate Job Match if JD provided
  let jobMatch;
  if (analysisMode === 'resume_and_job' && jobDescription) {
    jobMatch = calculateJobMatch(
      data,
      jobDescription,
      keywordsRes.matchedKeywords,
      keywordsRes.missingKeywords
    );
  }

  // Generate Top 5 Prioritized Improvements
  const topImprovements: string[] = [];
  if (allProblems.length > 0) {
    allProblems.slice(0, 5).forEach((prob) => {
      topImprovements.push(prob.recommendedFix);
    });
  }
  if (topImprovements.length < 5) {
    topImprovements.push('Tailor your skills section to match the specific keywords in your target job descriptions.');
    topImprovements.push('Add quantifiable metrics (e.g. % improvement, time saved) to every project bullet point.');
    topImprovements.push('Ensure a clean 1-column layout without tables or text boxes for 100% ATS readability.');
  }

  // Score Summary
  let scoreSummary = '';
  if (overallScore >= 85) {
    scoreSummary = `Your resume has an outstanding ATS score of ${overallScore}/100. It adheres closely to modern parser standards and features strong keywords, structure, and readability.`;
  } else if (overallScore >= 70) {
    scoreSummary = `Your resume scored ${overallScore}/100, which is in the competitive tier. Addressing a few keyword gaps and bullet point metrics will give you an extra edge.`;
  } else if (overallScore >= 50) {
    scoreSummary = `Your resume scored ${overallScore}/100. Several formatting, keyword, or impact issues are holding back your ATS ranking. Follow the prioritized recommendations below.`;
  } else {
    scoreSummary = `Your resume scored ${overallScore}/100 and requires significant optimization. Resolving the critical issues listed below will substantially improve its ATS parseability.`;
  }

  const analysisId = `ats_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  return {
    id: analysisId,
    resumeName,
    analyzedAt: new Date().toISOString(),
    analysisMode,
    jobTitle,
    jobCompany,
    overallScore,
    overallRating,
    scoreSummary,
    breakdown: {
      formatting: formattingRes.scoreDetail,
      content: contentRes.scoreDetail,
      keywords: keywordsRes.scoreDetail,
      experience: experienceRes.scoreDetail,
      contact: contactRes.scoreDetail,
      atsCompatibility: compatibilityRes.scoreDetail,
    },
    keywords: {
      matched: keywordsRes.matchedKeywords,
      missing: keywordsRes.missingKeywords,
      recommended: keywordsRes.recommendedKeywords,
      densityStats: keywordsRes.densityStats,
    },
    problems: allProblems,
    strengths,
    bulletAnalysis: experienceRes.bulletImprovements,
    sectionAnalysis: data.detectedSections,
    jobMatch,
    topImprovements: topImprovements.slice(0, 5),
    contactInfo: data.contactInfo,
    wordCount: data.wordCount,
    pageCountEstimate: data.pageCountEstimate,
  };
}
