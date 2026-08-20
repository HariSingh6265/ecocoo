export type ProblemSeverity = 'critical' | 'warning' | 'improvement';

export interface ResumeProblem {
  id: string;
  category: 'formatting' | 'content' | 'keywords' | 'experience' | 'contact' | 'ats_compatibility';
  severity: ProblemSeverity;
  problem: string;
  whyItMatters: string;
  recommendedFix: string;
}

export interface ResumeStrength {
  id: string;
  category: string;
  title: string;
  detail: string;
}

export interface BulletImprovement {
  id: string;
  originalText: string;
  section: string;
  issues: string[];
  suggestedImprovement: string;
  metricsToConsider: string[];
  actionVerbUsed?: string;
  hasMetric: boolean;
}

export interface SectionAnalysisItem {
  name: string;
  displayName: string;
  status: 'present' | 'missing' | 'weak' | 'optional';
  summary: string;
  contentSnippet?: string;
  lineCount?: number;
  wordCount?: number;
}

export interface KeywordMatchItem {
  keyword: string;
  category: 'technical' | 'tools' | 'soft_skills' | 'methodology' | 'certifications' | 'general';
  frequencyInResume: number;
  frequencyInJob?: number;
  importance: 'high' | 'medium' | 'low';
}

export interface CategoryScoreDetail {
  score: number;
  maxScore: number;
  percentage: number;
  rating: 'Excellent' | 'Strong' | 'Good' | 'Needs Improvement' | 'Poor';
  whatWasChecked: string[];
  whatIsGood: string[];
  whatIsWrong: string[];
  howToImprove: string[];
}

export interface JobMatchBreakdown {
  overallMatchPercentage: number;
  technicalSkillsMatch: number;
  experienceMatch: number;
  keywordMatch: number;
  educationMatch: number;
  jobTitleAlignment: number;
  topMatchingAreas: string[];
  biggestGaps: string[];
}

export interface ParsedContactInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
  linkedIn: string | null;
  github: string | null;
  portfolio: string | null;
  location: string | null;
}

export interface ParsedResumeData {
  rawText: string;
  cleanText: string;
  lines: string[];
  wordCount: number;
  charCount: number;
  pageCountEstimate: number;
  contactInfo: ParsedContactInfo;
  sections: Record<string, string>;
  detectedSections: SectionAnalysisItem[];
  hasTables: boolean;
  hasMultiColumns: boolean;
  hasUnusualSymbols: boolean;
  hasImagesOrGraphics: boolean;
  isScannedOrLowText: boolean;
}

export interface ATSAnalysisResult {
  id: string;
  resumeName: string;
  analyzedAt: string;
  analysisMode: 'resume_only' | 'resume_and_job';
  jobTitle?: string;
  jobCompany?: string;
  
  overallScore: number;
  overallRating: 'Excellent' | 'Strong' | 'Good' | 'Needs Improvement' | 'Poor';
  scoreSummary: string;
  
  breakdown: {
    formatting: CategoryScoreDetail;
    content: CategoryScoreDetail;
    keywords: CategoryScoreDetail;
    experience: CategoryScoreDetail;
    contact: CategoryScoreDetail;
    atsCompatibility: CategoryScoreDetail;
  };
  
  keywords: {
    matched: KeywordMatchItem[];
    missing: KeywordMatchItem[];
    recommended: KeywordMatchItem[];
    densityStats: {
      totalKeywordsDetected: number;
      uniqueKeywordsCount: number;
      keywordStuffingRisk: boolean;
    };
  };
  
  problems: ResumeProblem[];
  strengths: ResumeStrength[];
  bulletAnalysis: BulletImprovement[];
  sectionAnalysis: SectionAnalysisItem[];
  jobMatch?: JobMatchBreakdown;
  topImprovements: string[];
  contactInfo: ParsedContactInfo;
  wordCount: number;
  pageCountEstimate: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  planTier: 'FREE' | 'PRO';
  createdAt: string;
}

export interface SavedAnalysisSummary {
  id: string;
  resumeName: string;
  jobTitle?: string | null;
  overallScore: number;
  overallRating: string;
  analysisMode: string;
  createdAt: string;
}
